"use client";

import { Sheet, SheetContent, SheetTrigger, SheetDescription, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import Logo from "@/components/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { createTeamAction } from "../actions";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ISLogo from "@/public/favicon.png";
import Image from "next/image";
import { useProjectImages } from "./useProjectImages";

const navItems = [
  { name: "My Profile", path: "/account/profile" },
  { name: "Settings", path: "/account/settings" },
];

const projectNameFormSchema = z.object({
  projectName: z.string().min(1, { message: "Please enter your project name" }),
});

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { projects, setProjects, account, setAccount, setProjectProfiles } =
    useUser();

  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const signedUrls = useProjectImages(projects);

  const form = useForm<z.infer<typeof projectNameFormSchema>>({
    resolver: zodResolver(projectNameFormSchema),
    defaultValues: {
      projectName: "",
    },
  });

  async function handleCreateTeam(
    values: z.infer<typeof projectNameFormSchema>
  ) {
    const formData = new FormData();
    formData.append("projectName", values.projectName);
    if (account!.username) formData.append("username", account!.username);

    setIsCreating(true);

    try {
      const data = await createTeamAction(formData);
      setProjects((prev) => (prev ? [data[0], ...prev] : [data[0]]));
      setProjectProfiles((prev) => (prev ? [data[1], ...prev] : [data[1]]));
      console.log("Team created ", data);
      router.push(`/account/projects/${data[0].id}`);
    } catch (err: any) {
      console.error(err.message);
    }

    setShowProjectForm(false);
    setIsCreating(false);
  }

  function SidebarContent() {
    return (
      <div className="space-y-4 h-[70vh] flex flex-col justify-between items-baseline">
        <div className="w-full max-h-[50vh] flex flex-col justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          {projects && projects.length > 0 ? (
            <ul className="space-y-2  overflow-scroll">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={
                      `/account/projects/${project.id}` || "/account/settings"
                    }
                    onClick={() => setOpen(false)}
                    className={`flex flex-row justify-left items-center px-3 py-2 rounded ${pathname === `/account/projects/${project.id}` ? "bg-primary text-background" : "hover:bg-muted-foreground/10"}`}
                  >
                    <Avatar className="w-7 h-7 mr-3">
                      <AvatarImage
                        src={signedUrls[project.id] || ISLogo.src}
                        alt={project?.name ?? ""}
                      />
                    </Avatar>
                    <p>{project.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateTeam)}
              className={`mt-2 pt-2 space-y-2 ${showProjectForm ? "block" : "hidden"}`}
            >
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your new project name"
                        autoComplete="off"
                        data-1p-ignore
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="flex items-center h-9 w-fit m-auto"
                size="sm"
                type="submit"
                disabled={isCreating}
              >
                {isCreating ? "loading..." : "Create a new project"}
                {isCreating && (
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                )}
              </Button>
            </form>
          </Form>
          <Button
            onClick={() => setShowProjectForm(!showProjectForm)}
            className="block px-3 py-2 m-auto my-3 rounded"
          >
            {showProjectForm ? "Cancel" : "Create a Project"}
          </Button>
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4 text-center">Account</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded w-full ${pathname === item.path ? "bg-primary text-background" : "hover:bg-muted-foreground/10"}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden p-1 mx-1 rounded-2xl">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Account Menu</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6">
            <SheetHeader>
              <div className="mx-auto">
                <Logo mobile={true} />
              </div>
              <div className="sr-only">
                <SheetTitle>Account Navigation</SheetTitle>
                <SheetDescription>
                  Navigate to the account section pages
                </SheetDescription>
              </div>
            </SheetHeader>
            {SidebarContent()}
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:block w-64 bg-muted py-6 px-2 ml-2 rounded-lg mt-15 border-r min-h-[70vh]">
        <SidebarContent />
      </aside>
    </>
  );
}
