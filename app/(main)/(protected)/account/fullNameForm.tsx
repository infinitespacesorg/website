import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useEffect, useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function FullNameForm() {
  const fullNameFormSchema = z.object({
    full_name: z.string().min(1, { message: "Please enter your full name" }),
  });

  const fullNameForm = useForm<z.infer<typeof fullNameFormSchema>>({
    resolver: zodResolver(fullNameFormSchema),
    defaultValues: {
      full_name: "",
    },
  });

  const { isSubmitting } = fullNameForm.formState;

  const handleFNSend = useCallback(
    async ({ full_name }: { full_name: string }) => {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          toast("display name updated");
          fullNameForm.reset();
        } else {
          toast.error(result.error);
        }
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
    [fullNameForm]
  );

  async function onSubmitFN(values: z.infer<typeof fullNameFormSchema>) {
    await handleFNSend(values);
  }

  return (
    <Form {...fullNameForm}>
      <form className="" onSubmit={fullNameForm.handleSubmit(onSubmitFN)}>
        <div className="flex gap-4">
          <FormField
            control={fullNameForm.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your full name"
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
