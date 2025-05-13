"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Suspense, useTransition } from "react";
import { updatePasswordAction } from "./actions";
import { useSearchParams } from "next/navigation";
import { parseMessageFromSearchParams } from "@/lib/utils";

const formSchema = z.object({
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
  confirmPassword: z
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

export default function UpdatePasswordPage() {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const message = parseMessageFromSearchParams(searchParams);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      await updatePasswordAction(formData);

      toast.success("Password updated!");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-md m-auto py-15 p-4 gap-2 [&>input]:mb-4"
      >
        <h1 className="text-2xl font-medium">Reset password</h1>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password:</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password:</FormLabel>
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
        <Button className="h-9" size="sm" type="submit" disabled={isPending}>
          {isPending && <Loader2 className="w-6 h-6 mr-2 animate-spin" />}
          Reset Password
        </Button>
        <Suspense>
          <ErrorMessage />
        </Suspense>
      </form>
    </Form>
  );
}
