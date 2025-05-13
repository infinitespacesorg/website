"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { randomUUID } from "crypto";

export async function upsertUsername(formData: FormData): Promise<void> {
  const username = formData.get("username");
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
    .from("accounts")
    .update({ username: result.data.username })
    .eq("id", user.id);

  if (error && error.code === "23505") {
    // console.error(error);
    throw new Error(
      "This username is already taken! Choose a different username"
    );
  } else if (error) {
    // console.error(error);
    throw new Error("Failed to update username", { cause: error });
  }

  revalidatePath("/account");
}

export async function upsertFullName(formData: FormData): Promise<void> {
  const fullNameFormSchema = z.object({
    full_name: z.string().min(1, { message: "Please enter your full name" }),
  });
  const full_name = formData.get("full_name");

  const result = fullNameFormSchema.safeParse({ full_name });

  if (!result.success) {
    const errorMessage =
      result.error.format().full_name?._errors?.[0] || "Invalid input";
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

  const { data: fullName, error } = await supabase
    .from("accounts")
    .update({ full_name: result.data.full_name })
    .eq("id", user.id);

  if (error) {
    throw new Error("Failed to update full name", { cause: error });
  }
  revalidatePath("/account/profile");
}

export async function uploadProfileImageAction(formData: FormData) {
  const file = formData.get("profile-image") as File | null;
  if (!file) throw new Error("No file provided");

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
    .from("profile-images")
    .upload(`public/${user.id}/${fileName}`, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data: urlData } = supabase.storage
    .from("profile-images")
    .getPublicUrl(`public/${user.id}/${fileName}`);

  await supabase
    .from("accounts")
    .update({ profile_image: urlData.publicUrl })
    .eq("id", user.id);

  return { url: urlData.publicUrl };
}
