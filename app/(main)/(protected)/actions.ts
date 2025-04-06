"use server"
import { createMiddlewareClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createMiddlewareClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Password and confirm password are required",
        );
    }

    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Passwords do not match",
        );
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Password update failed",
        );
    }

    encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export async function upsertUsername(
    formData: FormData
): Promise<void>{
    const supabase = await createMiddlewareClient()
    const username = formData.get("username")

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
        throw new Error("Not authenticated");
    }

    const { error } = await supabase.from('accounts').update({ username }).eq("id", user.id)

    if (error) {
        throw new Error("Failed to update username")
    }

    revalidatePath('/account')
}

export async function upsertFullName(
    formData: FormData
): Promise<void>{

    console.log(formData)

    const full_name = formData.get("full_name")

    const supabase = await createMiddlewareClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
        throw new Error("Not authenticated");
    }

    console.log(user)

    const { error } = await supabase.from('accounts').update({ full_name }).eq("id", user.id)

    if (error) {
        throw new Error("Failed to update full name", error)
    }
    revalidatePath('/account')
}