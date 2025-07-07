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

type AboutYouTestProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "about-you-test" }
>;

export default function AboutYouTest({
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
  formField5,
}: AboutYouTestProps) {
  const formSchema = z.object({
    firstName: z.string().min(1, { message: "Please enter your first name" }),
    lastName: z.string().min(1, { message: "Please enter your last name" }),
    creativeType: z
      .string()
      .min(1, { message: "Please enter your creative type" }),
    location: z.string().min(1, { message: "Please enter your location" }),
    album2025: z
      .string()
      .min(1, { message: "Please enter your favorite album" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      creativeType: "",
      location: "",
      album2025: "",
    },
  });

  const { isSubmitting } = form.formState;

  // this doesn't work yet!
  const handleSend = useCallback(
    async ({
      firstName,
      lastName,
      creativeType,
      location,
      album2025,
    }: {
      firstName: string;
      lastName: string;
      location: string;
      creativeType: string;
      album2025: string;
    }) => {
      try {

        const response = await fetch("/api/submitAYTForm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            location,
            creativeType,
            album2025,
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
    <SectionContainer color={color} padding={padding}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <p className={`my-2`}>{formField1}</p>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Paul"
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Allen"
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
            <p className={`my-2`}>{formField3}</p>
            <FormField
              control={form.control}
              name="creativeType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="musician"
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
            <p className={`my-2`}>{formField4}</p>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Seattle"
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
            <p className={`my-2`}>{formField5}</p>
            <FormField
              control={form.control}
              name="album2025"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="GNX"
                      autoComplete="off"
                      autoCapitalize="on"
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="h-9 my-4"
              size="sm"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
              )}
              {buttonText}
            </Button>
          </div>
          {consentText && <p className={`mt-4 text-xs`}>{consentText}</p>}
        </form>
      </Form>
    </SectionContainer>
  );
}
