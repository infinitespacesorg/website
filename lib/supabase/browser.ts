import { createBrowserClient } from "@supabase/ssr";

export const supabase =
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_WEBSITE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_WEBSITE_ANON_KEY!,
  );