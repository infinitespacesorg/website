"use client";

// okay so here we need a UI like this:

// (project profile image) Project display name

// Project user name - overwrite your user display name in this project

// Members table (outlined):
// user (image) - name

// Invite member - invite a user to your project through email
// a form to invite the user through their email
// HOW SHOULD THIS LOGIC WORK?
// if the target user does already have an account, you should send them an email
// that makes them a new project_profile AND logs them in,
// so that when they click the link, they arrive at /account/projects/project-id
// with a valid project_profile

// if the target user DOES NOT have an account, send them an email that
// makes them a new account AND makes them a new project profile

// project profile image - upload an image for your project
// show the image on the right
// CREATE A NEW BUCKET FOR TEAM IMAGES

// Project display name
// Change the display name of your project
// Show the project name, edit button with a pencil

// Leave Project
// leave this project and remove your project profile
// leave project button
// HOW SHOULD THIS LOGIC WORK??
// if they are the project creator / admin and they leave, what should happen?

import { useUser } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useTransition } from "react";
import {
  getAllProjectProfilesAction,
  deleteProjectProfileAction,
  deleteProjectAction,
  uploadProjectImageAction,
} from "./actions";
import { ProjectProfileWithAccount } from "@/types";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SquarePen, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectNameForm from "./projectNameForm";
import ProjectUsernameForm from "./projectUsernameForm";
import { toast } from "sonner";
import ISLogo from "@/public/favicon.png";
import { useProjectImages } from "../../useProjectImages";
import InviteTeamMemberForm from "./inviteTeamMemberForm";
import OneProjectMember from "./OneProjectMember";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function ProjectPage() {
  const {
    projectProfiles,
    projects,
    setProjects,
    loading,
    refreshUserContext,
  } = useUser();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [updateProjectUsername, setUpdateProjectUsername] = useState(false);
  const [updateProjectName, setUpdateProjectName] = useState(false);
  const [updateProjectProfileImage, setUpdateProjectProfileImage] =
    useState(false);
  const [inviteProjectMember, setInviteProjectMember] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [allProjectProfiles, setAllProjectProfiles] = useState<
    ProjectProfileWithAccount[]
  >([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const params = useParams();
  const projectId = params["project-id"];
  const project = projects.find((t) => t.id === projectId);
  const yourProjectProfile = projectProfiles?.find(
    (t) => t.project_id === project?.id
  );

  const signedUrls = useProjectImages(projects);

  useEffect(() => {
    if (project) {
      const fetchData = async () => {
        try {
          const gotProjectProfiles = await getAllProjectProfilesAction(
            project.id
          );
          setAllProjectProfiles(gotProjectProfiles);
        } catch (err: any) {
          // console.error(err.message);
        }
      };

      fetchData();
    }
  }, [project]);

  const formSchema = z.object({
    project_name: z.string().refine((val) => val === project!.name, {
      message: "Project name does not match",
    }),
  });

  useEffect(() => {
    if (showDeleteDialog) {
      dialogRef.current?.showModal();
    }
  }, [showDeleteDialog]);

  const deleteForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_name: "",
    },
  });

  if (loading)
    return <p className="m-auto my-20 text-center">loading project...</p>;
  if (!project)
    return <p className="m-auto my-20 text-center">Project not found</p>;

  function AvatarUploadInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 999999)
        toast.error("Uploaded profile images must be < 1 MB");

      const formData = new FormData();
      formData.append("project-image", file);
      formData.append("project-id", project!.id.toString());
      formData.append("project-role", yourProjectProfile!.role);

      try {
        const { url } = await uploadProjectImageAction(formData);
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === projectId
              ? { ...proj, project_profile_image: url }
              : proj
          )
        );
        refreshUserContext()
        toast.success("Project image updated");
        setUpdateProjectProfileImage(false);
      } catch (err: any) {
        // console.error(err.message);
        toast.error(err.message);
      }

      inputRef.current?.value && (inputRef.current.value = "");
    }

    return (
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        name="profileImage"
        onChange={handleChange}
      />
    );
  }

  function displayProjectMembers() {
    if (allProjectProfiles.length > 0) {
      const sortedPPs = allProjectProfiles.sort((a, b) =>
        b.role.localeCompare(a.role)
      );
      return (
        <div className="border-2 rounded-xl">
          <div className="flex flex-row justify-between border-b-2 p-3 lg:px-5">
            <div className="flex flex-row justify-baseline align-middle">
              <p className="w-[50px] md:w-[100px]"></p>
              <p className="w-[100px] md:w-[200px]">Name</p>
            </div>
            <p className="role">Role</p>
          </div>
          {sortedPPs.map((mem) => (
            <OneProjectMember member={mem} key={mem.id} />
          ))}
        </div>
      );
    } else return null;
  }

  function ProjectProfileImage() {
    return (
      <div className="flex flex-row w-fit justify-center align-baseline gap-3 m-auto">
        {updateProjectProfileImage && <AvatarUploadInput />}
        <Avatar className="w-10 h-10 mr-3">
          <AvatarImage
            src={signedUrls[project!.id] || ISLogo.src}
            alt={project?.name ?? ""}
          />
          <AvatarFallback>{project?.name?.slice(0, 2) || "IS"}</AvatarFallback>
        </Avatar>
        {updateProjectProfileImage ? (
          <Button
            className="h-9"
            size="sm"
            onClick={() => setUpdateProjectProfileImage(false)}
          >
            <X />
          </Button>
        ) : (
          <Button
            className="h-9"
            size="sm"
            onClick={() => setUpdateProjectProfileImage(true)}
          >
            <SquarePen />
          </Button>
        )}
      </div>
    );
  }

  function ProjectUsernameFormOrName() {
    return updateProjectUsername && yourProjectProfile ? (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <ProjectUsernameForm
          yourProjectProfile={yourProjectProfile}
          setUpdateProjectUsername={setUpdateProjectUsername}
          setAllProjectProfiles={setAllProjectProfiles}
        />
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateProjectUsername(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <p className="h-fit m-auto">{yourProjectProfile?.project_username}</p>
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateProjectUsername(true)}
        >
          <SquarePen />
        </Button>
      </div>
    );
  }

  function ProjectDisplayNameFormOrName() {
    return updateProjectName && project ? (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <ProjectNameForm
          project={project}
          setUpdateProjectName={setUpdateProjectName}
        />
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateProjectName(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <p className="h-fit m-auto">{project?.name}</p>
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateProjectName(true)}
        >
          <SquarePen />
        </Button>
      </div>
    );
  }

  function handleInviteMember() {
    return inviteProjectMember && project ? (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <InviteTeamMemberForm
          project={project}
          setAllProjectProfiles={setAllProjectProfiles}
          setInviteProjectMember={setInviteProjectMember}
        />
        <Button
          className="h-9"
          size="sm"
          onClick={() => setInviteProjectMember(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <Button
          className="h-9"
          size="sm"
          onClick={() => setInviteProjectMember(true)}
        >
          Invite User
        </Button>
      </div>
    );
  }

  function deleteDialog() {
    return (
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <DialogContent className="fixed z-50 w-[90vw] sm:max-w-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl">
            <DialogTitle className="text-xl text-center font-semibold mb-2">
              Delete {project!.name}?
            </DialogTitle>

            <DialogDescription className="mb-4 text-sm text-muted-foreground">
              Since you are the project owner, leaving this project will delete
              the project and all of its associated data.
            </DialogDescription>
            <Form {...deleteForm}>
              <form onSubmit={deleteForm.handleSubmit(handleDeleteProject)}>
                <FormField
                  control={deleteForm.control}
                  name="project_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder={`Enter your project name to continue`}
                          autoComplete="off"
                          data-1p-ignore
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full mt-3"
                  size="sm"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  )}
                  Confirm & Delete
                </Button>
              </form>
            </Form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }

  async function handleLeaveProject() {
    const formData = new FormData();
    formData.append("projectProfileID", yourProjectProfile!.id);
    formData.append("role", yourProjectProfile!.role);

    try {
      const deleted = await deleteProjectProfileAction(formData);
      if (deleted && deleted === yourProjectProfile!.id) {
        setProjects((prev) => prev.filter((proj) => proj.id !== projectId));
        refreshUserContext();
        router.push(`/account/profile`);
      }
    } catch (err: any) {
      toast.error(err.message);
      // console.error(err.message);
    }
  }

  async function handleDeleteProject(values: z.infer<typeof formSchema>) {
    const result = formSchema.safeParse(values);

    if (!result.success) {
      console.log(result.error.message);
      toast.error(result.error.message);
    } else {
      const formData = new FormData();
      formData.append("submitted-project-name", values.project_name);
      formData.append("project-name", project!.name);
      formData.append("projectProfileID", yourProjectProfile!.id);
      formData.append("role", yourProjectProfile!.role);
      formData.append("projectID", yourProjectProfile!.project_id);
      try {
        const deleted = await deleteProjectAction(formData);
        if (deleted && deleted === yourProjectProfile!.id) {
        setProjects((prev) => prev.filter((proj) => proj.id !== projectId));
        refreshUserContext();
        router.push(`/account/profile`);
      }
      } catch (err: any) {
        toast.error(err.message);
        // console.error(err.message);
      }
    }
  }

  return (
    <section>
      <div className="p-3 border-b-2 flex flex-row justify-between items-end">
        <div className="flex flex-row justify-center items-center">
          <Avatar className="w-8 h-8 md:w-10 md:h-10 mr-3">
            <AvatarImage
              src={signedUrls[project!.id] || ISLogo.src}
              alt={project?.name ?? ""}
            />
            <AvatarFallback>
              {project?.name?.slice(0, 2) || "IS"}
            </AvatarFallback>
          </Avatar>
          <h4 className="text-lg md:text-xl">{project.name}</h4>
        </div>
        <h5 className="h-fit text-md md:text-xl">
          {yourProjectProfile?.role === "owner" ? "Project Owner" : ""}
          {/* {yourProjectProfile?.role} */}
        </h5>
      </div>
      <div className="flex flex-row gap-3 md:gap-0 justify-between items-center py-3 border-b-2">
        <div>
          <h4 className="text-lg md:text-xl">Project username</h4>
          <p className="text-xs md:text-sm">
            Change your user display name in this project
          </p>
        </div>
        <div>{ProjectUsernameFormOrName()}</div>
      </div>
      <div className="py-3 border-b-2">
        <h4 className="py-3 text-lg md:text-xl">Members</h4>
        <div className="px-5">{displayProjectMembers()}</div>
      </div>
      {yourProjectProfile?.role === "owner" && (
        <div className="flex flex-row gap-3 md:gap-0 justify-between items-center py-3 border-b-2">
          <div>
            <h4 className="text-lg md:text-xl">Invite member</h4>
            <p className="text-xs md:text-sm">
              Invite a user to your project through email
            </p>
          </div>
          <div>{handleInviteMember()}</div>
        </div>
      )}
      {yourProjectProfile?.role === "owner" && (
        <div className="flex flex-row gap-3 md:gap-0 justify-between items-center py-3 border-b-2">
          <div>
            <h4 className="text-lg md:text-xl">Project profile image</h4>
            <p className="text-xs md:text-sm">
              Upload an image for your project
            </p>
          </div>
          <div>{ProjectProfileImage()}</div>
        </div>
      )}
      {yourProjectProfile?.role === "owner" && (
        <div className="flex flex-row gap-3 md:gap-0 justify-between items-center py-3 border-b-2">
          <div>
            <h4 className="text-lg md:text-xl">Project display name</h4>
            <p className="text-xs md:text-sm">
              Change the display name of your project
            </p>
          </div>
          <div>{ProjectDisplayNameFormOrName()}</div>
        </div>
      )}
      <div className="flex flex-row gap-3 md:gap-0 justify-between items-center py-3 border-b-2">
        <div>
          <h4 className="text-lg md:text-xl">Leave project</h4>
          <p className="text-xs md:text-sm">
            {yourProjectProfile?.role === "owner"
              ? "Since you are the owner, leaving the project will delete the project"
              : "Leave this project and remove your project profile"}
          </p>
        </div>
        <div className="w-fit my-auto">
          {yourProjectProfile?.role === "owner" ? (
            <Button type="submit" onClick={() => setShowDeleteDialog(true)}>
              Leave project
            </Button>
          ) : (
            <Button type="submit" onClick={() => handleLeaveProject()}>
              Leave project
            </Button>
          )}
        </div>
      </div>
      {showDeleteDialog && deleteDialog()}
    </section>
  );
}
