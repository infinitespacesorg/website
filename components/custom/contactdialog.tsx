import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormDescription } from "../ui/form";
import Newsletter from "@/sanity/schemas/blocks/forms/newsletter";
import FormNewsletter from "../ui/forms/newsletter";
import { Button } from "../ui/button";
import { motion } from "motion/react";

interface ContactDialogProps {
  contactDialogOpen: boolean;
  setContactDialogOpen: (open: boolean) => void;
}

interface SectionPadding {
  top: boolean;
  bottom: boolean;
  _type: "section-padding";
}

interface FormNewsletterProps {
  _type: "form-newsletter";
  _key?: string;
  padding?: SectionPadding;
  colorVariant?: "accent" | "background" | "card" | "destructive" | "muted" | "primary" | "secondary" | null;
  stackAlign?: "center" | "left" | "right" | null; // Optional
  consentText?: string | null;
  buttonText?: string | null;
  successMessage?: string | null;
}

export default function ContactDialog({
  setContactDialogOpen,
  contactDialogOpen,
}: ContactDialogProps) {
  const form = useForm();

  const [isExiting, setIsExiting] = useState(false);

  function handleClose() {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setContactDialogOpen(false);
    }, 100);
  }

  const formNewsletterProps: FormNewsletterProps = {
    padding: { bottom: true, top: true, _type: "section-padding" },
    colorVariant: "background",
    consentText:
      "By subscribing, you agree to receive emails from us. You can unsubscribe at any time.",
    buttonText: "Subscribe",
    successMessage: "Thank you for subscribing!",
    _type: "form-newsletter",
    _key: 'contact-dialog-form-newsletter',
    stackAlign: "center",
  };

  return (
    // eventually something with a separate handleSubmit function like this:
    // https://schemaui.com/docs/components/forms/form-newsletter
    contactDialogOpen && (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        className={` ${contactDialogOpen ? "fixed h-full w-full top-0 left-0 flex justify-center items-center z-9999 bg-background/80 backdrop-blur-xs" : "hidden"}`}
      >
        <Button
          className={
            "absolute right-5 top-10 bg-white text-black hover:bg-gray-200"
          }
          onClick={() => handleClose()}
          disabled={isExiting}
        >
          X
        </Button>
        {/* <form onSubmit={() => form.handleSubmit(onSubmit)}></form> */}
        <div
          className={`flex flex-row justify-center items-center bg-background mx-auto h-fit my-auto px-5 w-fit rounded-xl shadow-lg`}
        >
          <div>
            <h1>Get in touch</h1>
            <p className={`mt-3`}>We're excited to work with you!</p>
          </div>
          <div className="w-full max-w-md">
            <FormNewsletter {...formNewsletterProps} />
          </div>
        </div>

        {/* <Form {...form}>
        <form onSubmit={() => console.log("submitted that form")}></form>
        <FormDescription>something</FormDescription>
      </Form> */}
      </motion.div>
    )
  );
}
