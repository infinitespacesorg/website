"use server";
import { eventQuery } from "@/sanity/queries/event";
import { EVENTS_QUERY, EVENTS_SLUGS_QUERY } from "@/sanity/queries/events";
import { sanityFetch } from "@/sanity/lib/live";
import { EventQueryResult, EVENTS_QUERYResult, EVENTS_SLUGS_QUERYResult } from "@/sanity.types";

export const fetchSanityEvents = async (): Promise<EVENTS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: EVENTS_QUERY,
  });

  return data;
};

export const fetchSanityEventsStaticParams =
  async (): Promise<EVENTS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: EVENTS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

export const fetchSanityEventBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<EventQueryResult> => {
  const { data } = await sanityFetch({
    query: eventQuery,
    params: { slug },
  });

  return data;
};