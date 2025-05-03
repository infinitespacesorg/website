"use client";

// okay so here we need a UI like this:

// (project profile image) Project display name

// Project user name - overwrite your user display name in this project

// Members table (outlined):
// user (image) - name

// Invite member - invite a user to your project through email
// a form to invite the user through their email
// HOW SHOULD THIS LOGIC WORK?

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
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  getAllProjectProfilesAction,
  deleteProjectProfileAction,
  uploadProjectImageAction,
} from "./actions";
import { ProjectProfile, Account } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, SquarePen, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectNameForm from "./projectNameForm";
import ProjectUsernameForm from "./projectUsernameForm";
import { toast } from "sonner";

export default function ProjectPage() {
  const {
    authUser,
    account,
    setAccount,
    projectProfiles,
    projects,
    setProjects,
    loading,
  } = useUser();
  const [updateProjectUsername, setUpdateProjectUsername] = useState(false);
  const [updateProjectName, setUpdateProjectName] = useState(false);
  const [updateProjectProfileImage, setUpdateProjectProfileImage] =
    useState(false);
  const [allProjectProfiles, setAllProjectProfiles] = useState<
    ProjectProfile[]
  >([]);
  const [allUserAccounts, setAllUserAccounts] = useState<Account[]>([]);

  const params = useParams();
  const projectId = params["project-id"];
  const project = projects?.find((t) => t.id === projectId);
  const yourProjectProfile = projectProfiles?.find(
    (t) => t.project_id === project?.id
  );

  useEffect(() => {
    if (project) {
      const fetchData = async () => {
        try {
          const [gotProjectProfiles, gotUserAccounts] =
            await getAllProjectProfilesAction(project.id);
          setAllProjectProfiles(gotProjectProfiles);
          setAllUserAccounts(gotUserAccounts);
        } catch (err: any) {
          console.error(err.message);
        }
      };

      fetchData();
    }
  }, [project]);

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

      try {
        const { url } = await uploadProjectImageAction(formData);
        console.log("Avatar uploaded to: ", url);
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === projectId
              ? { ...proj, project_profile_image: url }
              : proj
          )
        );
        setUpdateProjectProfileImage(false);
      } catch (err: any) {
        console.error(err.message);
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
    return (
      <div className="border-2 rounded-xl">
        <div className="flex flex-row justify-baseline border-b-2 p-3">
          <p className="w-[150px]">User</p>
          <p className="w-[200px]">Name</p>
        </div>
        {allUserAccounts.map((mem) => {
          return (
            <div
              key={mem.id}
              className=" flex flex-row gap-[100px] justify-baseline align-middle p-3"
            >
              <img className="w-[50px] h-[50px]" src={mem.profile_image} />
              <p className="w-[200px] my-auto">{mem.username}</p>
            </div>
          );
        })}
      </div>
    );
  }

  function ProjectProfileImage() {
    return (
      <div className="flex flex-row w-fit justify-center align-baseline gap-3 m-auto">
        {updateProjectProfileImage && <AvatarUploadInput />}
        <Avatar className="w-10 h-10 mr-3">
          {project?.project_profile_image && (
            <AvatarImage
              src={project?.project_profile_image}
              alt={project?.name ?? ""}
            />
          )}
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

  return (
    <section>
      <div className="py-3 border-b-2 flex flex-row justify-between items-end">
        <div className="flex flex-row justify-center items-center">
          <Avatar className="w-10 h-10 mr-3">
            {project?.project_profile_image && (
              <AvatarImage
                src={project?.project_profile_image}
                alt={project?.name ?? ""}
              />
            )}
            <AvatarFallback>
              {project?.name?.slice(0, 2) || "IS"}
            </AvatarFallback>
          </Avatar>
          <h4>{project.name}</h4>
        </div>
        <h5 className="h-fit text-base">
          {yourProjectProfile?.role === "owner" ? "Project Owner" : ""}
        </h5>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Project username</h4>
          <p className="text-sm">
            Change your user display name in this project
          </p>
        </div>
        <div>{ProjectUsernameFormOrName()}</div>
      </div>
      <div className="py-3 border-b-2">
        <h4 className="py-3">Members</h4>
        <div className="px-5">{displayProjectMembers()}</div>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Invite member</h4>
          <p className="text-sm">Invite a user to your project through email</p>
        </div>
        <form className="flex flex-row justify-between items-center">
          <input type="email"></input>
          <Button
            className="h-9"
            size="sm"
            onClick={() => setUpdateProjectProfileImage(true)}
          >
            Invite user
          </Button>
        </form>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Project profile image</h4>
          <p className="text-sm">Upload an image for your project</p>
        </div>
        <div>{ProjectProfileImage()}</div>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Project display name</h4>
          <p className="text-sm">Change the display name of your project</p>
        </div>
        <div>{ProjectDisplayNameFormOrName()}</div>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Leave project</h4>
          <p className="text-sm">
            {yourProjectProfile?.role === "owner"
              ? "Since you are the owner, leaving the project will delete the project"
              : "Leave this project and remove your project profile"}
          </p>
        </div>
        <div className="w-fit my-auto">
          <form action={deleteProjectProfileAction}>
            <Input
              type="hidden"
              name="projectProfileID"
              value={yourProjectProfile?.id}
            />
            <Button type="submit">Leave project</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
