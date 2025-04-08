"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUpAction } from "@/app/(main)/(auth-pages)/actions";
import { FormMessage, Message } from "@/components/ui/form-message";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const signupFormSchema = z.object({
  email: z.string().email({ message: "Please enter your email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters " }),
});

export default function SignUpForm({
  searchParams,
}: {
  searchParams: Message;
}) {
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

    await signUpAction(formData);
  };

  return (
    <form
      className="flex flex-col min-w-64 w-80 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p className="text-sm text text-foreground">
        Already have an account?{" "}
        <Link className="text-primary font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        {/* <Input name="email" placeholder="you@example.com" required /> */}
        <Input
          {...register("email")}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <Label htmlFor="password">Password</Label>
        {/* <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={8}
            required
          /> */}
        <Input
          {...register("password")}
          type="password"
          placeholder="Your password"
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <SubmitButton type="submit" pendingText="Signing up...">
          Sign up
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
