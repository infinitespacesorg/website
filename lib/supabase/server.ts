// things related to Supabase
// added by Mason, taken from https://github.com/vercel/next.js/tree/canary/examples/with-supabase/utils/supabase

// THIS CURRENTLY WORKS PLEASE DO NOT TRY TO CHANGE IT UNTIL @supabase/ssr 0.7 or 0.6.2 at least

import { createServerClient } from "@supabase/ssr";
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL_S3!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_S3!,
    {
      auth: {
        flowType: "pkce"
      },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}