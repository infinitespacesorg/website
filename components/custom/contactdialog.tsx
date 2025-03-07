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

export default function ContactDialog({
  setContactDialogOpen,
  contactDialogOpen,
}: ContactDialogProps) {
  const form = useForm();

  const [isExiting, setIsExiting] = useState(false);

  function handleClose () {
    setIsExiting(true)
    setTimeout(() => {
      setIsExiting(false)
      setContactDialogOpen(false)
    }, 500);
  }

  return (
    // eventually something with a separate handleSubmit function like this:
    // https://schemaui.com/docs/components/forms/form-newsletter
    contactDialogOpen && (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{duration: 0.5}}
        className={` bg-gray-900 text-white  ${contactDialogOpen ? "fixed h-full w-full top-0 left-0 z-9999" : "hidden"}`}
      >
        <Button
          className={
            "absolute right-5 top-20 bg-white text-black hover:bg-gray-200"
          }
          onClick={() => handleClose()}
          disabled={isExiting}
        >
          X
        </Button>
        {/* <form onSubmit={() => form.handleSubmit(onSubmit)}></form> */}
        <div
          className={`flex flex-col justify-center items-center mx-auto my-30 px-0 w-fit`}
        >
          <h1>Contact Us</h1>
          <p>more text about contacting us</p>
        </div>

        {/* <Form {...form}>
        <form onSubmit={() => console.log("submitted that form")}></form>
        <FormDescription>something</FormDescription>
      </Form> */}
      </motion.div>
    )
  );
}
