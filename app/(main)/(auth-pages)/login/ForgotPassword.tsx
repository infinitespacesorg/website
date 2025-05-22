"use client";
import { forgotPasswordAction } from "@/app/(main)/(auth-pages)/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter your email address" }),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);

    try {
      await forgotPasswordAction(formData);
      toast.success("Check your email for a link to reset your password.");
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <>
      <form
        className="flex-1 flex flex-col w-80 gap-2 text-foreground [&>input]:mb-6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          <Input
            {...register("email")}
            name="email"
            placeholder="you@example.com"
            required
          />
          <SubmitButton type="submit" pendingText="Sending email...">
            Reset Password
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
