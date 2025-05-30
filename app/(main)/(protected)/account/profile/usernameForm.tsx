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
import { upsertUsername } from "./actions";
import { useTransition } from "react";
import { useUser } from "@/context/UserContext";

const usernameFormSchema = z.object({
  username: z.string().min(1, { message: "Please enter your display name" }),
});

type UsernameFormProps = {
  setUpdateUsername: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FullNameForm({setUpdateUsername}: UsernameFormProps) {
  const { account, setAccount, refreshUserContext } = useUser();
  const [isPending, startTransition] = useTransition();

  const usernameForm = useForm<z.infer<typeof usernameFormSchema>>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: account?.username ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof usernameFormSchema>) => {
    const formData = new FormData();
    formData.append("username", values.username);

    try {
      await upsertUsername(formData);
      // await refreshUserContext()
      setAccount((prev) =>
        prev ? { ...prev, username: values.username } : prev
      );
      setUpdateUsername(false)
      toast.success("Username updated!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...usernameForm}>
      <form
        onSubmit={usernameForm.handleSubmit(onSubmit)}
        className="flex gap-4"
      >
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
        <Button className="h-9" size="sm" type="submit" disabled={isPending}>
          {isPending && <Loader2 className="w-6 h-6 mr-2 animate-spin" />}
          update
        </Button>
      </form>
    </Form>
  );
}
