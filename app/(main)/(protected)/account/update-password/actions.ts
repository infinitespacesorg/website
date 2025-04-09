'use server';

import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { encodedRedirect } from '@/lib/utils';

export const updatePasswordAction = async (formData: FormData) => {
  const cookieStore = await cookies();
  const supabase = await createSupabaseServerClient(cookieStore);

  const newPassword = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (newPassword != confirmPassword) {
    return encodedRedirect(
          "error",
          "/account/update-password",
          "Password and confirmation do not match.",
        );
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { error: error.message };
  }

  // Optionally redirect or confirm update
  revalidatePath('/', 'layout')
  redirect('/account?message=password-updated');
}