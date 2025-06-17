// app/auth/sync/route.ts
import { createClient } from "@/lib/S3-canvas/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") || "/";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect(next);
  }

  return redirect("/auth/login");
}
