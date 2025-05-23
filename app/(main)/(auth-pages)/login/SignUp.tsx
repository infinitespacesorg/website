"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUpAction } from "@/app/(main)/(auth-pages)/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

const signupFormSchema = z.object({
  email: z.string().email({ message: "Please enter your email address" }),
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

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      await signUpAction(formData);
      toast.success(
        "Thanks for signing up! Please check your email for a verification link."
      );
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <form
      className="flex flex-col min-w-64 w-80 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text-sm text text-foreground">
        Already have an account?
        <Link
          className="text-primary font-medium underline"
          href="/login?view=signin"
        >
          Sign in
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        {errors.email && (
          <p className="text-destructive text-sm my-1">
            {errors.email.message}
          </p>
        )}
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="Your password"
          autoComplete="new-password"
          required
        />
        {errors.password && (
          <p className="text-destructive text-sm my-3">
            {errors.password.message}
          </p>
        )}
        <SubmitButton type="submit" pendingText="Signing up...">
          Sign up
        </SubmitButton>
      </div>
    </form>
  );
}
