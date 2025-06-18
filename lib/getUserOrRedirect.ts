import { redirect } from "next/navigation";
import { createClient } from "./S3-canvas/server";
import { useUser } from "@/context/UserContext";

export async function getUserOrRedirect() {
      
    const supabase = await createClient()
    const { refreshUserContext } = useUser()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect('/login')

    refreshUserContext()

    return user
}