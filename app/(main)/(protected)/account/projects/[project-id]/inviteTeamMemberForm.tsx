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
import React, { useTransition } from "react";
import { inviteProjectMemberAction } from "./actions";
import { Project, ProjectProfileWithAccount } from "@/types";

type InviteTeamMemberFormProps = {
  project: Project;
  setAllProjectProfiles: React.Dispatch<React.SetStateAction<ProjectProfileWithAccount[]>>;
  setInviteProjectMember: React.Dispatch<React.SetStateAction<boolean>>
}

const inviteTeamMemberFormSchema = z.object({
  email: z.string().email().min(1, { message: "Please enter an email address for your invited project member" }),
});

export default function InviteTeamMemberForm({project, setInviteProjectMember, setAllProjectProfiles}: InviteTeamMemberFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof inviteTeamMemberFormSchema>>({
    resolver: zodResolver(inviteTeamMemberFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof inviteTeamMemberFormSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append('project_ID', project.id)

    try {
      const result = await inviteProjectMemberAction(formData);
      setAllProjectProfiles((prev) => (prev ? [result, ...prev] : [result]));
      setInviteProjectMember(false)
      toast.success("Invite sent!");
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter an email address"
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
          Send Invite
        </Button>
      </form>
    </Form>
  );
}