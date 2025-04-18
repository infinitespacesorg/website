"use client";
import { forgotPasswordAction } from "@/app/(main)/(auth-pages)/actions";
import { FormMessage, Message } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type ForgotPasswordProps = {
  message: Message | null;
}

export default function ForgotPassword({ message }: ForgotPasswordProps ) {
  return (
    <>
      <form className="flex-1 flex flex-col w-80 gap-2 text-foreground [&>input]:mb-6 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/login?view=signin">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          {message && <FormMessage message={message} />}
        </div>
      </form>
    </>
  );
}