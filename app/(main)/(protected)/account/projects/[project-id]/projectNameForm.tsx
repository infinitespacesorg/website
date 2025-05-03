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
import { updateProjectNameAction } from "./actions";
import { useUser } from "@/context/UserContext";
import { Project } from "@/types";

type ProjectNameFormProps = {
  project: Project;
  setUpdateProjectName: React.Dispatch<React.SetStateAction<boolean>>
}

const projectNameFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter a name for your project" }),
});

export default function ProjectNameForm({project, setUpdateProjectName}: ProjectNameFormProps) {
  const { account, setAccount, projects, setProjects, refreshUserContext } = useUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof projectNameFormSchema>>({
    resolver: zodResolver(projectNameFormSchema),
    defaultValues: {
      name: project?.name ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectNameFormSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append('project_ID', project.id)

    try {
      await updateProjectNameAction(formData);
      setProjects((prev) => prev.map((proj) => proj.id === project.id ? {... proj, name: values.name} : proj))
      setUpdateProjectName(false)
      toast.success("Project name updated!");
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
                  placeholder="Enter your new project display name"
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