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

export const resetPasswordAction = async (formData: FormData) => {

    const email = formData.get("accountEmail") as string;
    const origin = (await headers()).get("origin");

    if (!email) throw new Error('No account email provided')

    const { data: linkData, error: linkError } =
        await supabaseAdmin.auth.admin.generateLink({
            type: 'recovery',
            email,
            options: {
                redirectTo: `${origin}/auth/callback`
            }
        });

    if (linkError || !linkData?.properties?.action_link) return encodedRedirect(
        "error",
        "/login?view=signup",
        "Reset Password email link could not be generated.",
    );

    const token = linkData.properties.hashed_token;
    const type = linkData.properties.verification_type

    const confirmUrl = `${origin}/auth/confirm?token_hash=${token}&type=${type}&redirect_to=/account/update-password`;

    if (linkData) {
        await resend.emails.send({
            from: "Steve at Infinite Spaces <steve@infinitespaces.org>",
            to: email,
            subject: "Reset your password",
            react: ResendResetPasswordTemplate({ confirmationUrl: confirmUrl })
        })
    }

    revalidatePath('/account/settings')
};

export async function updateEmailAddress(formData: FormData): Promise<void> {
    console.log("yeah this doesn't work yet")
}

export async function upsertUsername(
    formData: FormData
): Promise<void> {

    console.log(formData)

    const username = formData.get("username")
    const usernameFormSchema = z.object({
        username: z.string().min(1, { message: "Please enter your username" }),
    });

    const result = usernameFormSchema.safeParse({ username })

    console.log(result)

    if (!result.success) {
        const errorMessage = result.error.format().username?._errors?.[0]
        throw new Error(errorMessage)
    }

    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient();
    // const supabase = await createSupabaseServerClient(cookieStore);

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    console.log(user)

    if (!user || userError) {
        throw new Error("Not authenticated");
    }

    const { data: userName, error } = await supabase.from('accounts').update({ username: result.data.username }).eq("id", user.id)

    if (userName) console.log(userName)

    if (error && error.code === '23505') {
        console.error(error)
        throw new Error('This username is already taken! Choose a different username')
    }

    else if (error) {
        console.error(error)
        throw new Error("Failed to update username", { cause: error })
    }

    revalidatePath('/account')
}

export async function upsertFullName(
    formData: FormData
): Promise<void> {

    const fullNameFormSchema = z.object({
        full_name: z.string().min(1, { message: "Please enter your full name" }),
    });
    const full_name = formData.get("full_name")

    const result = fullNameFormSchema.safeParse({ full_name })

    if (!result.success) {
        const errorMessage = result.error.format().full_name?._errors?.[0] || "Invalid input";
        throw new Error(errorMessage);
    }

    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient();
    // const supabase = await createSupabaseServerClient(cookieStore);

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    console.log(user)

    if (!user || userError) {
        throw new Error("Not authenticated");
    }

    const { data: fullName, error } = await supabase.from('accounts').update({ full_name: result.data.full_name }).eq("id", user.id)

    if (error) {
        throw new Error("Failed to update full name", { cause: error })
    }
    revalidatePath('/account/profile')
}

export async function uploadProfileImageAction(formData: FormData) {
    const file = formData.get('profile-image') as File | null
    if (!file) throw new Error('No file provided')

    const fileExt = file.name.split('.').pop()
    const fileName = `${randomUUID()}.${fileExt}`

    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient();
    // const supabase = await createSupabaseServerClient(cookieStore);

    console.log(file)

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
        throw new Error("Not authenticated");
    }
    console.log(user)

    const { error: uploadError } = await supabase.storage.from('profile-images').upload(`public/${user.id}/${fileName}`, file, {
        contentType: file.type,
        upsert: false
    })

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

    const { data: urlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(`public/${user.id}/${fileName}`)

    // Optionally update profile
    await supabase
        .from('accounts')
        .update({ profile_image: urlData.publicUrl })
        .eq('id', user.id)

    return { url: urlData.publicUrl }
}

export async function createTeamAction(formData: FormData) {
    const teamName = formData.get("teamName")

    if (!teamName) throw new Error('No team name provided')

    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient();
    // const supabase = await createSupabaseServerClient(cookieStore);

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) throw new Error("Not authenticated")

    console.log(teamName)

    const { data: newTeam, error: teamError } = await supabase
        .from('teams')
        .insert({ name: teamName, created_by: user.id })
        .select()
        .single()

    if (teamError || !newTeam) {
        console.error(teamError)
        throw new Error('Failed to create team')
    }

    console.log(user)

    const { data: newTeamAccount, error: teamAccountError } = await supabase.from('team_accounts').insert({
        team_id: newTeam.id,
        account_id: user.id,
        role: 'owner'
    }).select().single()

    if (teamAccountError || !newTeamAccount) {
        console.error(teamAccountError)
        throw new Error('Failed to create team account')
    }

    return newTeam
}

export const deleteAccountAction = async (formData: FormData) => {
    const accountId = formData.get('accountId')?.toString()
    if (!accountId) throw new Error('No account ID provided')

    const { error } = await supabaseAdmin.auth.admin.deleteUser(accountId)

    if (error) {
        return encodedRedirect(
            "error",
            "/account",
            "Failed to delete account",
        );
    }
    else return redirect("/auth/sync?next=/login");
}



