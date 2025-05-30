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
import { ProjectProfile, ProjectProfileWithAccount } from "@/types";

type ProjectUsernameFormProps = {
  yourProjectProfile: ProjectProfile;
  setUpdateProjectUsername: React.Dispatch<React.SetStateAction<boolean>>;
  setAllProjectProfiles: React.Dispatch<
    React.SetStateAction<ProjectProfileWithAccount[]>
  >;
};

const projectUsernameFormSchema = z.object({
  project_username: z
    .string()
    .min(1, { message: "Please enter your project username" }),
});

export default function ProjectUsernameForm({
  yourProjectProfile,
  setUpdateProjectUsername,
  setAllProjectProfiles,
}: ProjectUsernameFormProps) {
  const { account, setAccount, setProjectProfiles, refreshUserContext } =
    useUser();
  const [isPending, startTransition] = useTransition();

  const usernameForm = useForm<z.infer<typeof projectUsernameFormSchema>>({
    resolver: zodResolver(projectUsernameFormSchema),
    defaultValues: {
      project_username: yourProjectProfile.project_username ?? "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof projectUsernameFormSchema>
  ) => {
    const formData = new FormData();
    formData.append("project_username", values.project_username);
    formData.append("project_ID", yourProjectProfile.project_id);
    formData.append("project_profile_id", yourProjectProfile.id);

    try {
      await updateProjectUsernameAction(formData);
      // await refreshUserContext()
      setProjectProfiles((prev) =>
        prev.map((profile) =>
          profile.id === yourProjectProfile.id
            ? { ...profile, project_username: values.project_username }
            : profile
        )
      );
      setAllProjectProfiles((prev) =>
        prev.map((pp) =>
          pp.account_id === yourProjectProfile.account_id
            ? { ...pp, project_username: values.project_username }
            : pp
        )
      );
      setUpdateProjectUsername(false);
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
