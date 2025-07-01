"use server";

import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/S3-canvas/server";
import { supabaseAdmin } from "@/lib/S3-canvas/admin";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resend } from "@/lib/utils"
import { ResendEmailConfirmationTemplate } from "@/emails/ConfirmEmail";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/login?view=signup",
      "Email and password are required",
    );
  }

  const { data: userData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
  });

  if (signUpError || !userData.user?.id) {
    // console.error(signUpError?.code + " " + signUpError?.message);
    return encodedRedirect(
      "error",
      "/login?view=signup",
      "Could not sign up.",
    );
  }

  const { data: linkData, error: linkError } =
    await supabaseAdmin.auth.admin.generateLink({
      type: "signup",
      email,
      password,
      options: {
        redirectTo: `${origin}/auth/callback`
      }
    });

  if (linkError || !linkData?.properties?.action_link) return encodedRedirect(
    "error",
    "/login?view=signup",
    "Email link could not be generated.",
  );

  const token = linkData.properties.hashed_token;
  const type = linkData.properties.verification_type

  const confirmUrl = `${origin}/auth/confirm?token_hash=${token}&type=${type}&redirect_to=/account`;

  if (userData) {
    await resend.emails.send({
      from: "Steve at Infinite Spaces <steve@infinitespaces.org>",
      to: email,
      subject: "Confirm your email",
      react: ResendEmailConfirmationTemplate({ confirmationUrl: confirmUrl })
    })
  }

  revalidatePath('/', 'layout')
}

export async function signInAction(formData: FormData) {

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return encodedRedirect("error", "/login", error.message, { view: 'signin' });
  }

  revalidatePath('/', 'layout')
  return redirect("/auth/sync?next=/account");
};

export async function forgotPasswordAction (formData: FormData) {
  const email = formData.get("email")?.toString();
  const origin = (await headers()).get("origin");

  if (!email) {
    throw new Error('Email is required')
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/update-password`
  })

  if (error) {
    throw new Error('Could not reset password')
  }
};

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth/sync?next=/login");
};

