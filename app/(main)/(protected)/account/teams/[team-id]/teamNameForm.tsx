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
import { updateTeamNameAction } from "./actions";
import { useUser } from "@/context/UserContext";
import { Team } from "@/types";

type TeamNameFormProps = {
    team: Team;
}

const teamNameFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your full name" }),
});

export default function TeamNameForm({team}: TeamNameFormProps) {
  const { account, setAccount } = useUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof teamNameFormSchema>>({
    resolver: zodResolver(teamNameFormSchema),
    defaultValues: {
      name: team?.name ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof teamNameFormSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append('teamID', team.id)

    try {
      await updateTeamNameAction(formData);

      toast.success("Team name updated!");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your new team display name"
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