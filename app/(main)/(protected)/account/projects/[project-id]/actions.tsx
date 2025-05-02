"use server"
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from '@/lib/supabase/admin'
import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { resend } from "@/lib/utils"
import { ResendResetPasswordTemplate } from "@/emails/ResetPassword";
import { randomUUID } from 'crypto'

export const getAllProjectProfilesAction = async (projectId: string) => {

    const supabase = await createSupabaseServerClient();

    const { data: allProjectProfiles, error: allProjectProfilesError } = await supabase.from('project_profiles').select('*').eq('project_id', projectId)

    console.log(allProjectProfiles)

    if (allProjectProfilesError || !allProjectProfiles) {
        console.error(allProjectProfilesError)
        throw new Error('Failed to fetch project accounts')
    }

    const allIDs = allProjectProfiles.map((acc) => acc.account_id)

    const { data: allProjectUsers, error: allProjectUsersError } = await supabase.from('accounts').select('*').in('id', allIDs)

    if (allProjectUsersError || !allProjectUsers) {
        console.error(allProjectUsersError)
        throw new Error('Failed to fetch project profiles')
    }

    return [allProjectProfiles, allProjectUsers]

}

export async function updateProjectUsernameAction(
    formData: FormData
): Promise<void> {

    console.log(formData)

    const projectID = formData.get('project_ID')
    const yourProjectProfileID = formData.get('project_profile_id')
    const username = formData.get("username")
    const usernameFormSchema = z.object({
        username: z.string().min(1, { message: "Please enter your username" }),
    });

    const result = usernameFormSchema.safeParse({ username })


    if (!result.success) {
        const errorMessage = result.error.format().username?._errors?.[0]
        throw new Error(errorMessage)
    }

    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    console.log(user)

    if (!user || userError) {
        throw new Error("Not authenticated");
    }

    const { data: userName, error } = await supabase.from('project_profiles').update({ project_username: result.data.username }).eq("id", yourProjectProfileID)

    if (userName) console.log(userName)

    if (error && error.code === '23505') {
        console.error(error)
        throw new Error('This username is already taken! Choose a different username')
    }

    else if (error) {
        console.error(error)
        throw new Error("Failed to update project username", { cause: error })
    }

    revalidatePath(`/account/projects/${projectID}`)
}

export async function updateProjectNameAction(
    formData: FormData
): Promise<void> {

    const projectNameFormSchema = z.object({
        name: z.string().min(1, { message: "Please enter your project name" }),
    });
    const name = formData.get("name")
    const projectID = formData.get('project_ID')

    const result = projectNameFormSchema.safeParse({ name })

    if (!result.success) {
        const errorMessage = result.error.format().name?._errors?.[0] || "Invalid input";
        throw new Error(errorMessage);
    }

    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
        throw new Error("Not authenticated");
    }

    const { data: projectName, error } = await supabase.from('projects').update({ name: result.data.name }).eq("id", projectID)

    if (error) {
        throw new Error("Failed to update project name", { cause: error })
    }
    revalidatePath(`/account/projects/${projectID}`)
}

export async function deleteProjectProfileAction (formData: FormData
): Promise<void> { 

    const projectProfileID = formData.get('projectProfileID')?.toString()
    if (!projectProfileID) throw new Error('No account ID provided')

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from('project_profiles').delete().eq('id', projectProfileID)

    if (error) {
        throw new Error("Failed to leave project", { cause: error })
    }
    else return revalidatePath(`/account/profile`);
}