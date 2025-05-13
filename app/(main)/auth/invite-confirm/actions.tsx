"use server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function InviteGoogleSignInAction(formData: FormData) {
  const username = formData.get("username");
  const userID = formData.get("user_id");

  const { error: usernameError } = await supabaseAdmin
    .from("accounts")
    .update({ username: username })
    .eq("id", userID);

  if (usernameError) {
    console.error(usernameError);
    throw new Error("username update error", { cause: usernameError });
  }

  const { error: PPUsernameError } = await supabaseAdmin
    .from("project_profiles")
    .update({ project_username: username })
    .eq("account_id", userID);

  if (PPUsernameError) {
    console.error("Project Profile update error", PPUsernameError.message);
    throw new Error("Project Profile update error", { cause: PPUsernameError });
  }
}

export async function InviteSupaAuthAction(formData: FormData) {
  const newPassword = formData.get("password")?.toString();
  if (!newPassword) throw new Error("no password");

  InviteGoogleSignInAction;

  const { data, error } = await supabaseAdmin.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Set password error:", error.message);
  } else {
    console.log("Updated user", data);
  }
}
