"use server"
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from '@/lib/supabase/admin'
import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const resetPasswordAction = async (formData: FormData) => {

    const email = formData.get("accountEmail") as string;
    const origin = (await headers()).get("origin");

    if (!email) throw new Error('No account email provided')

    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient(cookieStore);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/account/update-password`
    })

    if (error) {
        throw new Error("Failed to update password", error)
    }
    else {
        console.log('yup it is here')
        revalidatePath('/', 'layout')
        return encodedRedirect(
          "success",
          "/account",
          "Please check your email for a password reset link.",
        );
      }
};

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
    const supabase = await createSupabaseServerClient(cookieStore);

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    console.log(user)

    if (!user || userError) {
        throw new Error("Not authenticated");
    }

    const { error } = await supabase.from('accounts').update({ username: result.data.username }).eq("id", user.id)

    if (error) {
        throw new Error("Failed to update username")
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
    const supabase = await createSupabaseServerClient(cookieStore);

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
        throw new Error("Not authenticated");
    }

    const { error } = await supabase.from('accounts').update({ full_name: result.data.full_name }).eq("id", user.id)

    if (error) {
        throw new Error("Failed to update full name", error)
    }
    revalidatePath('/account')
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



