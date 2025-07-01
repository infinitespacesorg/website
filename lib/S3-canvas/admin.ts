import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PLAYBOX_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);