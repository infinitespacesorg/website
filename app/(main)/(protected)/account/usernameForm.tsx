import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function UsernameForm() {
  const usernameFormSchema = z.object({
    username: z.string().min(1, { message: "Please enter your display name" }),
  });

  const usernameForm = useForm<z.infer<typeof usernameFormSchema>>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const { isSubmitting } = usernameForm.formState;

  const handleUNSend = useCallback(
    async ({ username }: { username: string }) => {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          toast("display name updated");
          usernameForm.reset();
        } else {
          toast.error(result.error);
        }
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
    [usernameForm]
  );

  async function onSubmitUN(values: z.infer<typeof usernameFormSchema>) {
    await handleUNSend(values);
  }

  return (
    <Form {...usernameForm}>
      <form className="" onSubmit={usernameForm.handleSubmit(onSubmitUN)}>
        <div className="flex gap-4">
          <FormField
            control={usernameForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your new username"
                    autoComplete="off"
                    data-1p-ignore
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="h-9"
            size="sm"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Loader2 className="w-6 h-6 mr-2 animate-spin" />
            )}
            update
          </Button>
        </div>
      </form>
    </Form>
  );
}
