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
import { updateProjectUsernameAction } from "./actions";
import { useTransition } from "react";
import { useUser } from "@/context/UserContext";
import { ProjectProfile } from "@/types";

type ProjectUsernameFormProps = {
    yourProjectProfile: ProjectProfile;
}

const projectUsernameFormSchema = z.object({
  project_username: z.string().min(1, { message: "Please enter your project username" }),
});

export default function ProjectUsernameForm({yourProjectProfile}: ProjectUsernameFormProps) {
  const { account, setAccount, setProjectProfiles } = useUser();
  const [isPending, startTransition] = useTransition();

  const usernameForm = useForm<z.infer<typeof projectUsernameFormSchema>>({
    resolver: zodResolver(projectUsernameFormSchema),
    defaultValues: {
      project_username: account?.username ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectUsernameFormSchema>) => {
    const formData = new FormData();
    formData.append("project_username", values.project_username);
    formData.append('project_ID', yourProjectProfile.project_id);
    formData.append('project_profile_id', yourProjectProfile.id);

    try {
      await updateProjectUsernameAction(formData);
      startTransition(async () => {
        setProjectProfiles((prev) =>
          prev ? { ...prev, username: values.project_username } : prev
        );
      });
      toast.success("Project username updated!");
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
          name="project_username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your new username for this project"
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