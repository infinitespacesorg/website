import SectionContainer from "@/components/ui/section-container";
import PostCard from "@/components/ui/post-card";
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {teamMembers.map((mem) => (
          <Link
            key={mem?.slug?.current}
            className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={`/blog/${mem?.slug?.current}`}
          >
            <PostCard
              title={mem?.name ?? ""}
              excerpt={mem?.bio ?? ""}
              image={mem?.image ?? null}
            />
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}