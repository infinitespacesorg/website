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
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { getAllTeamAccountsAction } from "./actions";
import { TeamAccount, Account } from "@/types";

export default function TeamPage() {
  const { authUser, account, setAccount, teamAccounts, teams, loading } =
    useUser();
  const [updateUsername, setUpdateUsername] = useState(false);
  const [updateFullName, setUpdateFullName] = useState(false);
  const [updateProfileImage, setUpdateProfileImage] = useState(false);
  const [allTeamAccounts, setAllTeamAccounts] = useState<TeamAccount[]>([]);
  const [allUserAccounts, setAllUserAccounts] = useState<Account[]>([])

  const { 'team-id': teamId } = useParams();
  const team = teams?.find((t) => t.id === teamId)

  if (!team) return <p>Team not found</p>;

    useEffect(() => {
        try {
            const result  = getAllTeamAccountsAction(team?.id)
                setAllTeamAccounts(result[0])
                setAllUserAccounts(result[1])
              } catch (err: any) {
                console.error(err.message);
              }
    }, [team])

  function displayTeamMembers() {
    return allUserAccounts.map((mem) => {
      <div>
        <image></image>
        <p>{mem.username}</p>
      </div>;
    });
  }

  return (
    <section>
      <div>
        <image></image>
        <h2>Team display name</h2>
      </div>
      <div>
        <div>
          <h2>Team user name</h2>
          <p>overwrite your user display name in this team</p>
        </div>
        <div>
          <p>Team user name</p>
          <button>pencil</button>
        </div>
      </div>
      <div>
        <h2>Members</h2>
        <div>{displayTeamMembers()}</div>
      </div>
      <div>
        <div>
          <h2>Invite member</h2>
          <p>invite a user to your team through email</p>
        </div>
        <form>
          <input type="email"></input>
          <button type="submit" />
        </form>
      </div>
      <div>
        <div>
          <h2>Team profile image</h2>
          <p>upload an image for your team</p>
        </div>
        <div>
          <image></image>
          <button>pencil</button>
        </div>
      </div>
      <div>
        <div>
          <h2>Team display name</h2>
          <p>Change the display name of your team</p>
        </div>
        <div>
          <p>Team user name</p>
          <button>pencil</button>
        </div>
      </div>
      <div>
        <div>
          <h2>Leave team</h2>
          <p>leave this team and remove your team profile</p>
        </div>
        <button type="submit" />
      </div>
    </section>
  );
}
