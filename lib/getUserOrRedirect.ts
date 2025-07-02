import { redirect } from "next/navigation";
import { createClient } from "./S3-canvas/server";

export async function getUserOrRedirect() {
      
    const supabase = await createClient()

    console.log(supabase)

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect('/login')

    return user
}