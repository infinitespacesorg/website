"use server"
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function createTeamAction(formData: FormData) {
    const projectName = formData.get("projectName")
    const defaultUsername = formData.get('username')

    if (!projectName) throw new Error('No project name provided')

    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) throw new Error("Not authenticated")

    const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert({ name: projectName, created_by: user.id })
        .select()

    if (projectError || !newProject) {
        // console.error(projectError)
        throw new Error('Failed to create project')
    }

    const { data: newProjectProfile, error: projectProfileError } = await supabaseAdmin.from('project_profiles').insert({
        project_id: newProject[0].id,
        account_id: user.id,
        role: 'owner',
        project_username: defaultUsername,
    }).select()

    if (projectProfileError || !newProjectProfile) {
        // console.error(projectProfileError)
        throw new Error('Failed to create project account')
    }

    return [newProject[0], newProjectProfile[0]]
}



