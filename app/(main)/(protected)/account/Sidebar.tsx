"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { createTeamAction } from "../actions";
import { useRouter } from "next/navigation";
import * as z from "zod";
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

const navItems = [
  { name: "My Profile", path: "/account/profile" },
  { name: "Settings", path: "/account/settings" },
];

const teamNameFormSchema = z.object({
  teamName: z.string().min(1, { message: "Please enter your team name" }),
});

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { teams, setTeams, setAccount } = useUser();

  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);

  const form = useForm<z.infer<typeof teamNameFormSchema>>({
    resolver: zodResolver(teamNameFormSchema),
    defaultValues: {
      teamName: "",
    },
  });

  async function handleCreateTeam(values: z.infer<typeof teamNameFormSchema>) {
    const formData = new FormData();
    formData.append("teamName", values.teamName);

    setIsCreating(true);

    try {
      const { data } = await createTeamAction(formData);
      if (data) setTeams((prev) => (prev ? [...prev, data] : [data]));
      console.log("Team created ", data);
    } catch (err: any) {
      console.error(err.message);
    }

    setShowTeamForm(false);
    setIsCreating(false);
    router.refresh();
  }

  function SidebarContent() {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block px-3 py-2 rounded ${pathname === item.path ? "bg-primary text-background" : "hover:bg-muted-foreground/10"}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-semibold mb-4">Teams</h2>
        {teams && teams.length > 0 ? (
          <ul className="space-y-2">
            {teams.map((team) => (
              <li key={team.id}>
                <Link
                  href={`/account/teams/${team.id}` || '/account/settings'}
                  className={`block px-3 py-2 rounded ${pathname === `/account/teams/${team.id}` ? "bg-primary text-background" : "hover:bg-muted-foreground/10"}`}
                >
                  {team.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTeam)}
            className={`mt-2 space-y-2 ${showTeamForm ? "block" : "hidden"}`}
          >
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your new team name"
                      autoComplete="off"
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="block h-9 w-fit m-auto"
              size="sm"
              type="submit"
              disabled={isCreating}
            >
              {isCreating && <Loader2 className="w-6 h-6 mr-2 animate-spin" />}
              Create a new team
            </Button>
          </form>
        </Form>
        <Button
          onClick={() => setShowTeamForm(!showTeamForm)}
          className="block px-3 py-2 m-auto rounded"
        >
          {showTeamForm ? "Cancel" : "Create a Team"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden p-4 mt-15">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Menu</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6">
            {SidebarContent()}
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:block w-64 bg-muted p-6 mt-15 border-r min-h-screen">
        <SidebarContent />
      </aside>
    </>
  );
}
