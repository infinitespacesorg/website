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

  console.log(contactDialogOpen)

  return (
    // eventually something with a separate handleSubmit function like this:
    // https://schemaui.com/docs/components/forms/form-newsletter
    <dialog className={`fixed bg-gray-900 w-full top-0 right-0 h-full ${contactDialogOpen ? "flex flex-row w-100 z-[200]" : "hidden"}`}>
      {/* <form onSubmit={() => form.handleSubmit(onSubmit)}></form> */}
      <div>
        <h1>Contact Us</h1>
        <p>more text about contacting us</p>
        <p onClick={() => setContactDialogOpen(false)}>CLOSE ME</p>
      </div>
      <Form {...form}>
        <form onSubmit={() => console.log("submitted that form")}></form>
        <FormDescription>something</FormDescription>
      </Form>
    </dialog>
  );
}
