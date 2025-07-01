"use server";
import { createClient } from "@/lib/S3-canvas/server";
import { supabaseAdmin } from "@/lib/S3-canvas/admin";
import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resend } from "@/lib/utils";
import { ResendResetPasswordTemplate } from "@/emails/ResetPassword";
import { ResendConfirmUpdatedEmailTemplate } from "@/emails/ConfirmUpdatedEmail";

export const resetPasswordAction = async (formData: FormData) => {
  const email = formData.get("accountEmail") as string;
  const origin = (await headers()).get("origin");

  if (!email) throw new Error("No account email provided");

  const { data: linkData, error: linkError } =
    await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

  if (linkError || !linkData?.properties?.action_link)
    return encodedRedirect(
      "error",
      "/login?view=signup",
      "Reset Password email link could not be generated."
    );

  const token = linkData.properties.hashed_token;
  const type = linkData.properties.verification_type;

  const confirmUrl = `${origin}/auth/confirm?token_hash=${token}&type=${type}&redirect_to=/update-password`;

  if (linkData) {
    await resend.emails.send({
      from: "Steve at Infinite Spaces <steve@infinitespaces.org>",
      to: email,
      subject: "Reset your password",
      react: ResendResetPasswordTemplate({ confirmationUrl: confirmUrl }),
    });
  }

  revalidatePath("/account/settings");
};

export async function updateEmailAddress(formData: FormData): Promise<void> {
  const origin = (await headers()).get("origin");
  const newEmail = formData.get("email")?.toString()
  if (!newEmail) throw new Error('Please provide a new email address')

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || !user.email || userError) throw new Error("Not authenticated");

  // only the new email address is required to be confirmed by clicking a link
  // if we want to confirm through the current and the new email address,
  // change the email auth provider settings
  // see https://supabase.com/docs/reference/javascript/auth-admin-generatelink

  const { data: linkData, error: linkError } =
    await supabaseAdmin.auth.admin.generateLink({
      type: "email_change_new",
      email: user.email.toString(),
      newEmail,
      options: {
        redirectTo: `${origin}/auth/sync`,
      },
    });

  if (linkError || !linkData?.properties?.action_link)
    return encodedRedirect(
      "error",
      "/account/settings",
      "Update email address link could not be generated."
    );

  const token = linkData.properties.hashed_token;
  const type = linkData.properties.verification_type;

  const confirmUrl = `${origin}/auth/confirm?token_hash=${token}&type=${type}&redirect_to=/account/settings`;

  if (linkData) {
    await resend.emails.send({
      from: "Steve at Infinite Spaces <steve@infinitespaces.org>",
      to: newEmail,
      subject: "Confirm your updated email address",
      react: ResendConfirmUpdatedEmailTemplate({ confirmationUrl: linkData?.properties?.action_link }),
      // react: ResendConfirmUpdatedEmailTemplate({ confirmationUrl: confirmUrl }),
    });
  }

  revalidatePath("/account/settings");
}

export const deleteAccountAction = async (formData: FormData) => {
  const email = formData.get("email");
  const accountId = formData.get("accountID")?.toString();
  if (!accountId) throw new Error("No account ID provided");

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) throw new Error("Not authenticated");

  if (user.email != email) throw new Error('Please make sure your email address is entered correctly')

  const { error } = await supabaseAdmin.auth.admin.deleteUser(accountId);

  if (error) {
    return encodedRedirect("error", "/account", "Failed to delete account");
  } else return redirect("/auth/sync?next=/login");
};
