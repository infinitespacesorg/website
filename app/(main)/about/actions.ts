"use server";
import { teamMemberQuery } from "@/sanity/queries/team-member";
import { pastProjectQuery } from "@/sanity/queries/pastProject";
import { TEAM_MEMBERS_QUERY, TEAM_MEMBERS_SLUGS_QUERY } from "@/sanity/queries/team-members";
import { PAST_PROJECTS_QUERY, PAST_PROJECTS_SLUGS_QUERY } from "@/sanity/queries/pastProjects";
import { sanityFetch } from "@/sanity/lib/live";
import { TeamMemberQueryResult, TEAM_MEMBERS_QUERYResult, TEAM_MEMBERS_SLUGS_QUERYResult, PastProjectQueryResult, PAST_PROJECTS_QUERYResult, PAST_PROJECTS_SLUGS_QUERYResult } from "@/sanity.types";

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

export const fetchSanityPastProjects = async (): Promise<PAST_PROJECTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAST_PROJECTS_QUERY,
  });

  return data;
};

export const fetchSanityPastProjectsStaticParams =
  async (): Promise<PAST_PROJECTS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: PAST_PROJECTS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityPastProjectBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PastProjectQueryResult> => {
  const { data } = await sanityFetch({
    query: pastProjectQuery,
    params: { slug },
  });

  return data;
};