import SectionContainer from "@/components/ui/section-container";
import OneTeamMember from "./one-team-member";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityTeamMembers } from '@/app/(main)/about/actions'

type AllTeamMembersProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "all-team-members" }
>;

export default async function AllTeamMembers({
  padding,
  colorVariant,
}: AllTeamMembersProps) {
  const color = stegaClean(colorVariant);
  const teamMembers = await fetchSanityTeamMembers();

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80vw] lg:w-[60vw] m-auto">
        {teamMembers.map((mem) => (
            <OneTeamMember
              key={mem.slug?.current}
              slug={mem.slug}
              name={mem?.name ?? ""}
              bio={mem?.bio ?? ""}
              image={mem?.image}
              jobTitle={mem?.jobTitle}
            />
        ))}
      </div>
    </SectionContainer>
  );
}