"use server"
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { cookies } from "next/headers";

export const resetPasswordAction = async (formData: FormData) => {

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

    const cookieStore = await cookies()

    const supabase = await createSupabaseServerClient(cookieStore);

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
): Promise<void> {

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

    const supabase = await createSupabaseServerClient(cookieStore);

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

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

    console.log(user)

    const { error } = await supabase.from('accounts').update({ full_name: result.data.full_name }).eq("id", user.id)

    if (error) {
        throw new Error("Failed to update full name", error)
    }
    revalidatePath('/account')
}



