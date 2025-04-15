"use server";

import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { resend } from "@/lib/utils"
import { ResendEmailConfirmationTemplate } from "@/emails/ConfirmEmail";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const origin = (await headers()).get("origin");
  const cookieStore = await cookies()

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/login?view=signup",
      "Email and password are required",
    );
  }

  // const supabase = await createSupabaseServerClient(cookieStore);

  // const { data: userData, error: error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: {
  //     emailRedirectTo: `${origin}/auth/callback?redirect_to=/account`,
  //   },
  // });

  // this doesn't work yet, not sure how to bypass the Supabase email templates and use our own email template yet

//   Check to see if adding options.auth.flowType: PKCE will get all of the Resend stuff to work
// https://supabase.com/docs/reference/javascript/initializing
// https://supabase.com/docs/guides/auth/sessions/pkce-flow



  // I think we'll need to use the Send Email Auth Hook here:
  // https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook?queryGroups=language&language=http

  const { data: userData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
  });

  if (signUpError || !userData.user?.id) {
    console.error(signUpError?.code + " " + signUpError?.message);
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

  console.log(linkData)

  // manually build your own link:
  const token = linkData.properties.hashed_token;
  const type = linkData.properties.verification_type

  // const confirmUrl = `${origin}/auth/callback?token=${token}&type=${type}&redirect_to=/account`;

  const confirmUrl = `${origin}/auth/confirm?token_hash=${token}&type=${type}&redirect_to=/account`;

  if (userData) {
    await resend.emails.send({
      from: "Steve at Infinite Spaces <steve@infinitespaces.org>",
      to: email,
      subject: "Confirm your email",
      react: ResendEmailConfirmationTemplate({ confirmationUrl: confirmUrl })
      // react: ResendEmailConfirmationTemplate({ confirmationUrl: linkData.properties.action_link })
    })
  }

  revalidatePath('/', 'layout')
  return encodedRedirect(
    "success",
    "/login",
    "Thanks for signing up! Please check your email for a verification link.",
  );

  // if (error) {
  //   console.error(error.code + " " + error.message);
  //   return encodedRedirect("error", "/login", error.message, { view: 'signup' });
  // } else {
  //   revalidatePath('/', 'layout')
  //   return encodedRedirect(
  //     "success",
  //     "/login",
  //     "Thanks for signing up! Please check your email for a verification link.",
  //   );
  // }
}

export async function signInAction(formData: FormData) {
  const cookieStore = await cookies()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const supabase = await createSupabaseServerClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return encodedRedirect("error", "/login", error.message, { view: 'signin' });
  }

  revalidatePath('/', 'layout')
  return redirect("/auth/sync?next=/account");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const origin = (await headers()).get("origin");

  if (!email) {
    return encodedRedirect("error", "/login", "Email is required", { view: "forgot" });
  }

  const cookieStore = await cookies()
  const supabase = await createSupabaseServerClient(cookieStore);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/account/update-password`
  })

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/login",
      "Could not reset password",
      { view: 'forgot' }
    );
  }

  return encodedRedirect(
    "success",
    "/login",
    "Check your email for a link to reset your password.",
    { view: 'forgot' }
  );
};

export async function signOutAction() {
  const cookieStore = await cookies()
  const supabase = await createSupabaseServerClient(cookieStore);
  await supabase.auth.signOut();
  return redirect("/auth/sync?next=/login");
};

