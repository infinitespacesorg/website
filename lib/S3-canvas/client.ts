import { createBrowserClient } from '@supabase/ssr'

export function createClient() {

  console.log("Playbox Supabase client init:", {
  url: process.env.NEXT_PUBLIC_SUPABASE_PLAYBOX_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_PLAYBOX_ANON_KEY?.slice(0, 10),
})

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_PLAYBOX_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PLAYBOX_ANON_KEY!,
    {auth: {
      persistSession: true,
      autoRefreshToken: true
    }}
  )

  
}
