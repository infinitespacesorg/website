"use server"
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from '@/lib/supabase/admin'
import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { cookies, headers } from "next/headers";

export async function createTeamAction(formData: FormData) {
    const projectName = formData.get("projectName")

    if (!projectName) throw new Error('No project name provided')

    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) throw new Error("Not authenticated")

    console.log(projectName)

    const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert({ name: projectName, created_by: user.id })
        .select()
        .single()

    if (projectError || !newProject) {
        console.error(projectError)
        throw new Error('Failed to create project')
    }

    console.log(user)

    const { data: newProjectProfile, error: projectProfileError } = await supabase.from('project_profiles').insert({
        project_id: newProject.id,
        account_id: user.id,
        role: 'owner'
    }).select().single()

    if (projectProfileError || !newProjectProfile) {
        console.error(projectProfileError)
        throw new Error('Failed to create project account')
    }

    return newProject
}



