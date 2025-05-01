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

export const getAllTeamAccountsAction = async (teamId: string) => {

    const supabase = await createSupabaseServerClient();

    const { data: allTeamAccounts, error: allTeamAccountsError } = await supabase.from('team_accounts').select('*').eq('team_id', teamId)

    console.log(allTeamAccounts)

    if (allTeamAccountsError || !allTeamAccounts) {
        console.error(allTeamAccountsError)
        throw new Error('Failed to fetch team accounts')
    }

    const allIDs = allTeamAccounts.map((acc) => acc.account_id)

    const { data: allTeamUsers, error: allTeamUsersError } = await supabase.from('accounts').select('*').in('id', allIDs)

    if (allTeamUsersError || !allTeamUsers) {
        console.error(allTeamUsersError)
        throw new Error('Failed to fetch team accounts')
    }

    return [allTeamAccounts, allTeamUsers]

}

export async function updateTeamUsernameAction(
    formData: FormData
): Promise<void> {

    console.log(formData)

    const teamID = formData.get('teamID')
    const yourTeamAccountID = formData.get('team_account_id')
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

    const { data: userName, error } = await supabase.from('team_accounts').update({ team_username: result.data.username }).eq("id", yourTeamAccountID)

    if (userName) console.log(userName)

    if (error && error.code === '23505') {
        console.error(error)
        throw new Error('This username is already taken! Choose a different username')
    }

    else if (error) {
        console.error(error)
        throw new Error("Failed to update project username", { cause: error })
    }

    revalidatePath(`/account/teams/${teamID}`)
}

export async function updateTeamNameAction(
    formData: FormData
): Promise<void> {

    const teamNameFormSchema = z.object({
        name: z.string().min(1, { message: "Please enter your team name" }),
    });
    const name = formData.get("name")
    const teamID = formData.get('teamID')

    const result = teamNameFormSchema.safeParse({ name })

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

    const { data: teamName, error } = await supabase.from('teams').update({ name: result.data.name }).eq("id", teamID)

    if (error) {
        throw new Error("Failed to update team name", { cause: error })
    }
    revalidatePath(`/account/teams/${teamID}`)
}

export async function deleteTeamAccountAction (formData: FormData
): Promise<void> { 

    const teamAccountID = formData.get('teamAccountID')?.toString()
    if (!teamAccountID) throw new Error('No account ID provided')

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from('team-accounts').delete().eq('id', teamAccountID)

    if (error) {
        throw new Error("Failed to leave team", { cause: error })
    }
    else return revalidatePath(`/account/profile`);
}