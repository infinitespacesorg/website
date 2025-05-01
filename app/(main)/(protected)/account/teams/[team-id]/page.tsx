"use client";

// okay so here we need a UI like this:

// (team profile image) Team display name

// Team user name - overwrite your user display name in this team

// Members table (outlined):
// user (image) - name

// Invite member - invite a user to your team through email
// a form to invite the user through their email
// HOW SHOULD THIS LOGIC WORK?

// team profile image - upload an image for your team
// show the image on the right
// CREATE A NEW BUCKET FOR TEAM IMAGES

// Team display name
// Change the display name of your team
// Show the team name, edit button with a pencil

// Leave Team
// leave this team and remove your team profile
// leave team button
// HOW SHOULD THIS LOGIC WORK??
// if they are the team creator / admin and they leave, what should happen?

import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getAllTeamAccountsAction, deleteTeamAccountAction } from "./actions";
import { TeamAccount, Account } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, SquarePen, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import TeamNameForm from "./teamNameForm";
import TeamUsernameForm from "./teamUsernameForm";

export default function TeamPage() {
  const { authUser, account, setAccount, teamAccounts, teams, loading } =
    useUser();
  const [updateTeamUsername, setUpdateTeamUsername] = useState(false);
  const [updateTeamName, setUpdateTeamName] = useState(false);
  const [updateTeamProfileImage, setUpdateTeamProfileImage] = useState(false);
  const [allTeamAccounts, setAllTeamAccounts] = useState<TeamAccount[]>([]);
  const [allUserAccounts, setAllUserAccounts] = useState<Account[]>([]);

  const params = useParams();
  const teamId = params["team-id"];
  const team = teams?.find((t) => t.id === teamId);
  const yourTeamAccount = teamAccounts?.find((t) => t.team_id === team?.id);

  useEffect(() => {
    if (team) {
      const fetchData = async () => {
        try {
          const [gotTeamAccounts, gotUserAccounts] =
            await getAllTeamAccountsAction(team.id);
          setAllTeamAccounts(gotTeamAccounts);
          setAllUserAccounts(gotUserAccounts);
        } catch (err: any) {
          console.error(err.message);
        }
      };

      fetchData();
    }
  }, [team]);

  if (!team) return <p>Team not found</p>;

  function AvatarUploadInput() {
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profile-image", file);

      try {
        const { url } = await uploadProfileImageAction(formData);
        console.log("Avatar uploaded to: ", url);
        setAccount((prev) =>
          prev ? ({ ...prev, profile_image: url } as Account) : prev
        );
        setUpdateTeamProfileImage(false);
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

  function displayTeamMembers() {
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

  function TeamProfileImage() {
    return (
      <div className="flex flex-row w-fit justify-center align-baseline gap-3 m-auto">
        {updateTeamProfileImage && <AvatarUploadInput />}
        <Avatar className="w-10 h-10 mr-3">
          {team?.team_profile_image && (
            <AvatarImage
              src={team?.team_profile_image}
              alt={team?.name ?? ""}
            />
          )}
          <AvatarFallback>{team?.name?.slice(0, 2) || "IS"}</AvatarFallback>
        </Avatar>
        {updateTeamProfileImage ? (
          <Button
            className="h-9"
            size="sm"
            onClick={() => setUpdateTeamProfileImage(false)}
          >
            <X />
          </Button>
        ) : (
          <Button
            className="h-9"
            size="sm"
            onClick={() => setUpdateTeamProfileImage(true)}
          >
            <SquarePen />
          </Button>
        )}
      </div>
    );
  }

  function TeamUsernameFormOrName() {
    return updateTeamUsername && yourTeamAccount ? (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <TeamUsernameForm yourTeamAccount={yourTeamAccount} />
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateTeamUsername(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <p className="h-fit m-auto">{yourTeamAccount?.team_username}</p>
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateTeamUsername(true)}
        >
          <SquarePen />
        </Button>
      </div>
    );
  }

  function TeamDisplayNameFormOrName() {
    return updateTeamName && team ? (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <TeamNameForm team={team} />
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateTeamName(false)}
        >
          <X />
        </Button>
      </div>
    ) : (
      <div className="flex flex-row w-fit justify-center items-center gap-3 m-auto">
        <p className="h-fit m-auto">{team?.name}</p>
        <Button
          className="h-9"
          size="sm"
          onClick={() => setUpdateTeamName(true)}
        >
          <SquarePen />
        </Button>
      </div>
    );
  }

  return (
    <section>
      <div className="py-3 border-b-2 flex flex-row justify-between items-end">
        <div>
          <img className="inline" src={team.team_profile_image} />
          <h4>{team.name}</h4>
        </div>
        <h5 className="h-fit">
          {yourTeamAccount?.role === "owner" ? "Team Owner" : ""}
        </h5>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Project username</h4>
          <p className="text-sm">
            Change your user display name in this project
          </p>
        </div>
        <div>{TeamUsernameFormOrName()}</div>
      </div>
      <div className="py-3 border-b-2">
        <h4 className="py-3">Members</h4>
        <div className="px-5">{displayTeamMembers()}</div>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Invite member</h4>
          <p className="text-sm">Invite a user to your team through email</p>
        </div>
        <form className="flex flex-row justify-between items-center">
          <input type="email"></input>
          <Button
            className="h-9"
            size="sm"
            onClick={() => setUpdateTeamProfileImage(true)}
          >
            Invite user
          </Button>
        </form>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Team profile image</h4>
          <p className="text-sm">Upload an image for your team</p>
        </div>
        <div>{TeamProfileImage()}</div>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Team display name</h4>
          <p className="text-sm">Change the display name of your team</p>
        </div>
        <div>{TeamDisplayNameFormOrName()}</div>
      </div>
      <div className="flex flex-row justify-between items-center py-3 border-b-2">
        <div>
          <h4>Leave team</h4>
          <p className="text-sm">
            {yourTeamAccount?.role === 'owner' ? 'Since you are the owner, leaving the team will delete the team' : 'Leave this team and remove your team profile'}
          </p>
        </div>
        <div className="w-fit my-auto">
          <form action={deleteTeamAccountAction}>
            <Input type="hidden" name="teamAccountID" value={yourTeamAccount?.id} />
            <Button type="submit">Leave team</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
