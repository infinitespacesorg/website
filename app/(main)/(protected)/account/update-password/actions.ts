'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { encodedRedirect } from '@/lib/utils';

export const updatePasswordAction = async (formData: FormData) => {

  const newPassword = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (newPassword != confirmPassword) {
    return encodedRedirect(
      "error",
      "/account/update-password",
      "Password and confirmation do not match.",
    );
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (!user || userError) throw new Error("Not authenticated")

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout')
  return redirect("/auth/sync?next=/account?message=password-updated");
}