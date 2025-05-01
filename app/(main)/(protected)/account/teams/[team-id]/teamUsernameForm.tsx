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
import { updateTeamUsernameAction } from "./actions";
import { useTransition } from "react";
import { useUser } from "@/context/UserContext";
import { TeamAccount } from "@/types";

type TeamUsernameFormProps = {
    yourTeamAccount: TeamAccount;
}

const teamUsernameFormSchema = z.object({
  team_username: z.string().min(1, { message: "Please enter your team username" }),
});

export default function TeamUsernameForm({yourTeamAccount}: TeamUsernameFormProps) {
  const { account, setAccount, setTeamAccounts } = useUser();
  const [isPending, startTransition] = useTransition();

  const usernameForm = useForm<z.infer<typeof teamUsernameFormSchema>>({
    resolver: zodResolver(teamUsernameFormSchema),
    defaultValues: {
      team_username: account?.username ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof teamUsernameFormSchema>) => {
    const formData = new FormData();
    formData.append("team_username", values.team_username);
    formData.append('teamID', yourTeamAccount.team_id);
    formData.append('team_account_id', yourTeamAccount.id);

    try {
      await updateTeamUsernameAction(formData);
      startTransition(async () => {
        setTeamAccounts((prev) =>
          prev ? { ...prev, username: values.team_username } : prev
        );
      });
      toast.success("Team username updated!");
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
          name="team_username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your new username for this team"
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