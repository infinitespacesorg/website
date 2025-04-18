import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";
import { cookies } from "next/headers";

export async function getUserOrRedirect() {
    const cookieStore = await cookies()
      
    const supabase = await createSupabaseServerClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect('/login')
}