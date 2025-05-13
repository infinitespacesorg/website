import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { ISLogo } from "@/lib/utils";

type OneProjectMemberProps = {
    member: {
      id: string;
      role: string;
      project_username: string | null;
      accounts: {
        full_name: string | null;
        profile_image: string | null;
      };
    };
  };

export default function OneProjectMember ({member}: OneProjectMemberProps) {

    let projectName = member.project_username

    if (projectName === '') projectName = member.accounts.full_name + ' - pending invite'
    else if (projectName === null) projectName = member.accounts.full_name

    return (
        <div
          className="flex flex-row justify-between align-middle p-3 lg:px-5"
        >
          <div className="flex flex-row justify-baseline align-middle">
            <div className="w-[50px] md:w-[100px]">
              <Avatar className="w-8 h-8 md:w-12 md:h-12">
                <AvatarImage
                  src={member.accounts.profile_image || ISLogo.src}
                  alt={member.project_username ?? ""}
                />
              </Avatar>
            </div>
            <p className="w-[100px] md:w-[200px] text-sm my-auto">{projectName}</p>
          </div>
          <p className="my-auto text-sm">{member.role}</p>
        </div>
      );
}