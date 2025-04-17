import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { upsertFullName } from "../../actions";
import { useUser } from "@/context/UserContext";

const fullNameFormSchema = z.object({
  full_name: z.string().min(1, { message: "Please enter your full name" }),
});

export default function FullNameForm() {
  const { account, setAccount } = useUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof fullNameFormSchema>>({
    resolver: zodResolver(fullNameFormSchema),
    defaultValues: {
      full_name: account?.full_name ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof fullNameFormSchema>) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);

    try {
      await upsertFullName(formData);
      startTransition(async () => {
        setAccount((prev) =>
          prev ? { ...prev, full_name: values.full_name } : prev
        );
      });

      toast.success("Full name updated!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
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
        <Button className="h-9" size="sm" type="submit" disabled={isPending}>
          {isPending && <Loader2 className="w-6 h-6 mr-2 animate-spin" />}
          update
        </Button>
      </form>
    </Form>
  );
}
