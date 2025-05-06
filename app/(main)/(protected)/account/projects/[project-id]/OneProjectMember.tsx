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

    return (
        <div
          className="flex flex-row justify-between align-middle p-3 lg:px-5"
        >
          <div className="flex flex-row justify-baseline align-middle">
            <div className="w-[100px]">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={member.accounts.profile_image || ISLogo.src}
                  alt={member.project_username ?? ""}
                />
              </Avatar>
            </div>
            <p className="w-[200px] my-auto">{member.project_username != '' ? member.project_username : `${member.accounts.full_name} - pending invite`}</p>
          </div>
          <p className="my-auto">{member.role}</p>
        </div>
      );
}