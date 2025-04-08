import { createMiddlewareClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString() || "/account";

  // console.log(requestUrl)

  if (code) {
    const supabase = await createMiddlewareClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) console.error("❌ exchange error:", error);
    else console.log("✅ exchange success:", data);
  }

  return NextResponse.redirect(`${origin}/auth/sync?next=${encodeURIComponent(redirectTo)}`);
}