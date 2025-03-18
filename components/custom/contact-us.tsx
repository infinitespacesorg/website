"use client";
import { PAGE_QUERYResult } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import SectionContainer from "@/components/ui/section-container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useCallback } from "react";
import { Loader2 } from "lucide-react";
import { stegaClean } from "next-sanity";
import { TextArea } from "@/components/ui/textarea";

type ContactUsFormProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "contact-us-form" }
>;

export default function ContactUsForm({
  padding,
  colorVariant,
  stackAlign,
  consentText,
  buttonText,
  successMessage,
  formField1,
  formField2,
  formField3,
  formField4,
}: ContactUsFormProps) {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().email({ message: "Invalid email address" }),
    website: z.string().url().optional(),
    //   .min(1, { message: "Please enter your creative type" }),
    message: z
      .string()
      .min(10, { message: "Please let us know why you are contacting us" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      website: undefined,
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSend = useCallback(
    async ({ name, email, website, message }: z.infer<typeof formSchema>) => {
      try {
        console.log(name, email, website, message);
        const response = await fetch("/api/contact-us-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            website: website || undefined,
            message,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          toast(successMessage);
          form.reset();
        } else {
          toast.error(result.error);
        }
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
    [form]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleSend(values);
  }

  const color = stegaClean(colorVariant);

  return (
    <SectionContainer
      color={color}
      padding={padding}
      className="w-[30vw] max-w-[600px] mx-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <p className={`my-2`}>{formField1}</p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Paul Allen"
                      autoComplete="off"
                      autoCapitalize="on"
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <p className={`my-2`}>{formField2}</p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="paul.allen@gmail.com"
                      autoComplete="off"
                      autoCapitalize="off"
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <p className={`my-2`}>{formField3}</p>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="https://paulallen.biz (optional)"
                      autoComplete="off"
                      autoCapitalize="off"
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <p className={`my-2`}>{formField4}</p>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextArea
                      {...field}
                      className="h-40"
                      placeholder="message goes here"
                      autoComplete="off"
                      autoCapitalize="off"
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-2 my-4">
            <Button
              className="h-9"
              size="sm"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
              )}
              {buttonText}
            </Button>
            <Button
              className="h-9"
              size="sm"
              type="button"
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
          </div>
          {consentText && <p className={`mt-4 text-xs`}>{consentText}</p>}
        </form>
      </Form>
    </SectionContainer>
  );
}
