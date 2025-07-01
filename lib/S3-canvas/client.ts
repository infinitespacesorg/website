import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_PLAYBOX_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PLAYBOX_ANON_KEY!,
  )
}
