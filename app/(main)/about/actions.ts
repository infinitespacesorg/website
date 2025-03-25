"use server";
import { teamMemberQuery } from "@/sanity/queries/team-member";
import { TEAM_MEMBERS_QUERY, TEAM_MEMBERS_SLUGS_QUERY } from "@/sanity/queries/team-members";
import { sanityFetch } from "@/sanity/lib/live";
import { TeamMemberQueryResult, TEAM_MEMBERS_QUERYResult, TEAM_MEMBERS_SLUGS_QUERYResult } from "@/sanity.types";

export const fetchSanityTeamMembers = async (): Promise<TEAM_MEMBERS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: TEAM_MEMBERS_QUERY,
  });

  return data;
};

export const fetchSanityTeamMembersStaticParams =
  async (): Promise<TEAM_MEMBERS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: TEAM_MEMBERS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityTeamMemberBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<TeamMemberQueryResult> => {
  const { data } = await sanityFetch({
    query: teamMemberQuery,
    params: { slug },
  });

  return data;
};