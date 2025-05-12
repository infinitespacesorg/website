"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { parseMessageFromSearchParams } from "@/lib/utils";
import { InviteGoogleSignInAction } from './actions'

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters " })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must include at least one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must include at least one uppercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Must include at least one number",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "Must include at least one special character",
    }),
});

function ErrorMessage() {
  const searchParams = useSearchParams();
  const message = parseMessageFromSearchParams(searchParams);

  if (!message || !("error" in message)) return null;

  return <p className="text-sm text-destructive">{message.error}</p>;
}

export default function ConfirmInvitePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUserContext, authUser } = useUser();
  const [isPending, startTransition] = useTransition();

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const redirectTo = searchParams.get("redirect_to");

  const [emailVerified, setEmailVerified] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyInvite = async () => {
      if (!token_hash || !type) return;

      const { data, error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash,
      });

      if (error) {
        console.error("OTP Verification failed", error);
        return;
      }

      setEmailVerified(true);
    };

    verifyInvite();
  }, [token_hash, type]);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSupaAuthSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      console.log("what about this");

      const user = authUser;
      if (!user) {
        console.error("No authUser available");
        toast.error("You're not logged in.");
        return;
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("user_id", user.id);
      formData.append('password', values.password)

      await InviteGoogleSignInAction(formData);

      refreshUserContext();

      router.push(redirectTo || "/account/profile");
    } catch (err) {
      console.error("Unhandled error", err);
      toast.error("Something went wrong.");
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      console.log("clicked that");

      const user = authUser;
      if (!user) {
        console.error("No authUser available");
        toast.error("You're not logged in.");
        return;
      }

      const formData = new FormData();
      formData.append("username", username);
      formData.append("user_id", user.id);

      await InviteGoogleSignInAction(formData);

      refreshUserContext();

      const origin = window.location.origin;
      const googleRedirectUrl = `${origin}/auth/callback?redirect_to=${redirectTo || "/account"}`;
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: googleRedirectUrl,
        },
      });
    } catch (err) {
      console.error("Unhandled error", err);
      toast.error("Something went wrong.");
    }
  };

  if (!emailVerified)
    return (
      <p className="space-y-4 w-fit mx-auto pt-50">Verifying your invite...</p>
    );

  return (
    <div className="space-y-4 w-[80vw] max-w-[400px] mx-auto pt-25">
      <h2 className="text-xl font-bold text-center">Complete your signup</h2>
      <p className="text-sm text-muted-foreground">
        Choose how to finish setting up your Infinite Spaces account:
      </p>
      <div className="space-y-2">
        <p>Please enter a username for your account</p>
        <Input
          type="username"
          placeholder="Set your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <hr className="my-10" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSupaAuthSubmit)}
          className="flex flex-col w-full max-w-md m-auto py-3 gap-2 [&>input]:mb-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Set your password to login with your email address:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder=""
                    autoComplete="off"
                    data-1p-ignore
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="h-9 w-full text-center"
            size="sm"
            type="submit"
            disabled={isPending}
          >
            {isPending && <Loader2 className="w-6 h-6 mr-2 animate-spin" />}
            Continue with Email
          </Button>
          <Suspense>
            <ErrorMessage />
          </Suspense>
        </form>
      </Form>
      <p className="w-fit mx-auto my-3">- or -</p>
      <Button
        variant="outline"
        className="w-full text-center"
        onClick={handleGoogleSignIn}
      >
        Continue with Google
      </Button>
    </div>
  );
}
