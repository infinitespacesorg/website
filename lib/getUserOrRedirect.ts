import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";

export async function getUserOrRedirect() {
      
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect('/login')
}