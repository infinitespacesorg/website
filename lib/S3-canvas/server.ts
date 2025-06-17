import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const isProd = process.env.NODE_ENV === 'production';

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL_S3!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_S3!,
    {
      cookies: {
        getAll() {
          const all = cookieStore.getAll()
          console.log('[server.ts] getAll cookies: ', all)
          return all
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                ...(isProd && { domain: '.infinitespaces.co', sameSite: 'none', secure: true }),
              })
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
