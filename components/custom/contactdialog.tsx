import { useForm } from "react-hook-form";
import { Form, FormDescription } from "../ui/form";
import Newsletter from "@/sanity/schemas/blocks/forms/newsletter";
import FormNewsletter from "../ui/forms/newsletter";

interface ContactDialogProps {
  contactDialogOpen: boolean;
  setContactDialogOpen: (open: boolean) => void;
}

export default function ContactDialog({
  setContactDialogOpen,
  contactDialogOpen,
}: ContactDialogProps) {
  const form = useForm();

  return (
    // eventually something with a separate handleSubmit function like this:
    // https://schemaui.com/docs/components/forms/form-newsletter
    <dialog className={contactDialogOpen ? "flex flex-row" : "hidden"}>
      {/* <form onSubmit={() => form.handleSubmit(onSubmit)}></form> */}
      <div>
        <h1>Contact Us</h1>
        <p>more text about contacting us</p>
      </div>
      <Form {...form}>
        <form onSubmit={() => console.log("submitted that form")}></form>
        <FormDescription>something</FormDescription>
      </Form>
    </dialog>
  );
}
