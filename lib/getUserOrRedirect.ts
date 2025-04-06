import { redirect } from "next/navigation";
import { createMiddlewareClient } from "./supabase/server";

export async function getUserOrRedirect() {
    const supabase = await createMiddlewareClient()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect('/login')
}