"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { encodedRedirect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { resend } from "@/lib/utils";
import { ResendResetPasswordTemplate } from "@/emails/ResetPassword";
import { randomUUID } from "crypto";
import { ResendInvitedUserTemplate } from "@/emails/InvitedUser";
import { ProjectProfileWithAccount, Account } from "@/types";

export const getAllProjectProfilesAction = async (projectId: string) => {

  const response = (await supabaseAdmin
    .from("project_profiles")
    .select(`*, accounts (*)`)
    .eq("project_id", projectId)) as {
    data: ProjectProfileWithAccount[];
    error: any;
  };

  const allProjectProfiles = response.data as ProjectProfileWithAccount[];
  const allProjectProfilesError = response.error;

  if (allProjectProfilesError || !allProjectProfiles) {
    console.error(allProjectProfilesError);
    throw new Error("Failed to fetch project accounts");
  }

  return allProjectProfiles;
};

export async function inviteProjectMemberAction(formData: FormData) {
  const projectID = formData.get("project_ID");
  const email = formData.get("email")?.toString();
  const origin = (await headers()).get("origin");

  if (!email) {
    throw new Error("please enter an email address");
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("Not authenticated");
  }

  const { data: targetUserID, error: targetUserIDError } = await supabase.rpc(
    "get_user_id_by_email",
    {
      p_email: email,
    }
  );

  let existingUsers = null

  if (targetUserID) {
    const { data: targetAccounts, error: userQueryError } = await supabaseAdmin
      .from("accounts")
      .select("id, username")
      .eq("id", targetUserID);

    if (userQueryError) {
      console.log(userQueryError);
      throw new Error("User query error", { cause: userQueryError });
    }
    else existingUsers = targetAccounts
  }

  let userId: string;

  if (existingUsers && existingUsers.length > 0) {
    userId = existingUsers[0].id;

    const { data: project_profile } = await supabase
      .from("project_profiles")
      .select("id")
      .eq("account_id", userId)
      .eq("project_id", projectID)
      .maybeSingle();

    console.log(project_profile);

    if (project_profile)
      throw new Error("This user is already a project member!");
    if (!project_profile) {
      const { data: newProjectProfile, error: nPPError } = await supabaseAdmin
        .from("project_profiles")
        .insert({
          account_id: userId,
          project_id: projectID,
          role: "collaborator",
          project_username: existingUsers[0].username,
        })
        .select()
        .single();

      if (nPPError || !newProjectProfile)
        throw new Error("error creating project profile", {
          cause: nPPError?.message,
        });

      newProjectProfile.account = existingUsers[0];

      return newProjectProfile[0];
    }
  }

  console.log("got here");

  const { data: inviteData, error: inviteError } =
    await supabaseAdmin.auth.admin.generateLink({
      type: "invite",
      email,
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

  if (inviteError || !inviteData?.user)
    throw new Error("failed to generate invite link", { cause: inviteError });

  const token = inviteData.properties.hashed_token;
  const type = inviteData.properties.verification_type;

  const confirmUrl = `${origin}/auth/invite-confirm?token_hash=${token}&type=${type}&redirect_to=/account/projects/${projectID}}`;

  userId = inviteData.user.id;

  console.log(inviteData)

  const {data: newPP, error: NPPError} = await supabaseAdmin.from("project_profiles").insert({
    account_id: userId,
    project_id: projectID,
    role: "collaborator",
  }).select();

  if (!newPP) {
    console.error(NPPError)
    throw new Error ('PP not created')
  }

  console.log(newPP)

  const mockAccount: Account = {
    created_at: newPP[0].created_at,
    id: userId,
    full_name: email,
    profile_image: "",
    username: ""
  }

  newPP[0]['accounts'] = mockAccount

  await resend.emails.send({
    to: email,
    from: "Steve at Infinite Spaces <steve@infinitespaces.org>",
    subject: `You've been invited to join an Infinite Spaces project`,
    react: ResendInvitedUserTemplate({ confirmationUrl: confirmUrl }),
  });

  return newPP
}

export async function updateProjectUsernameAction(
  formData: FormData
): Promise<void> {
  const projectID = formData.get("project_ID");
  const yourProjectProfileID = formData.get("project_profile_id");
  const username = formData.get("project_username");
  const usernameFormSchema = z.object({
    username: z.string().min(1, { message: "Please enter your username" }),
  });

  const result = usernameFormSchema.safeParse({ username });

  if (!result.success) {
    const errorMessage = result.error.format().username?._errors?.[0];
    throw new Error(errorMessage);
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("Not authenticated");
  }

  const { data: userName, error } = await supabase
    .from("project_profiles")
    .update({ project_username: result.data.username })
    .eq("id", yourProjectProfileID)
    .select();

  if (error && error.code === "23505") {
    console.error(error);
    throw new Error(
      "This username is already taken! Choose a different username"
    );
  } else if (error) {
    console.error(error);
    throw new Error("Failed to update project username", { cause: error });
  }

  revalidatePath(`/account/projects/${projectID}`);
}

export async function updateProjectNameAction(
  formData: FormData
): Promise<void> {
  const projectNameFormSchema = z.object({
    name: z.string().min(1, { message: "Please enter your project name" }),
  });
  const name = formData.get("name");
  const projectID = formData.get("project_ID");

  const result = projectNameFormSchema.safeParse({ name });

  if (!result.success) {
    const errorMessage =
      result.error.format().name?._errors?.[0] || "Invalid input";
    throw new Error(errorMessage);
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("Not authenticated");
  }

  const { data: projectName, error } = await supabase
    .from("projects")
    .update({ name: result.data.name })
    .eq("id", projectID);

  if (error) {
    throw new Error("Failed to update project name", { cause: error });
  }
  revalidatePath(`/account/projects/${projectID}`);
}

export async function uploadProjectImageAction(formData: FormData) {
  const file = formData.get("project-image") as File | null;
  const projectID = formData.get("project-id")?.toString();
  if (!file) throw new Error("No file provided");
  if (!projectID) throw new Error("No project associated with this file.");

  const fileExt = file.name.split(".").pop();
  const fileName = `${randomUUID()}.${fileExt}`;

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("Not authenticated");
  }

  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(`public/${projectID}/${fileName}`, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data: urlData } = supabase.storage
    .from("project-images")
    .getPublicUrl(`public/${projectID}/${fileName}`);

  await supabase
    .from("projects")
    .update({ project_profile_image: urlData.publicUrl })
    .eq("id", projectID);

  return { url: urlData.publicUrl };
}

export async function deleteProjectProfileAction(
  formData: FormData
): Promise<void> {
  const projectProfileID = formData.get("projectProfileID")?.toString();
  const role = formData.get("role")?.toString();
  const projectID = formData.get("projectID")?.toString();
  if (!projectProfileID) throw new Error("No account ID provided");
  if (!role) throw new Error("project profile has no role");

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("Not authenticated");
  }

  if (role === "owner") {
    const { data: list, error: listError } = await supabase.storage
      .from("project-images")
      .list(`public/${projectID}`, { limit: 100 });

    if (listError)
      throw new Error("Failed to list project files", { cause: listError });
    else if (list && list.length > 0) {
      const filesToDelete = list.map(
        (file) => `public/${projectID}/${file.name}`
      );
      const { data: imagesData, error: imagesError } = await supabase.storage
        .from("project-images")
        .remove(filesToDelete);
      if (imagesError)
        throw new Error("Failed to delete files", { cause: imagesError });
    }

    const { data, error: deleteProjectError } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectID);

    if (deleteProjectError) {
      throw new Error("Failed to delete project", {
        cause: deleteProjectError,
      });
    }
  } else {
    const { error } = await supabase
      .from("project_profiles")
      .delete()
      .eq("id", projectProfileID);

    if (error) throw new Error("Failed to leave project", { cause: error });
  }

  return revalidatePath(`/account/profile`);
}
