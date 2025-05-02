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