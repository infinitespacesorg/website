import SectionContainer from "@/components/ui/section-container";
import OneEvent from "./one-event";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";
import { fetchSanityEvents } from "@/app/(main)/[slug]/actions";

type AllEventsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "all-events" }
>;

export default async function AllTeamMembers({
  padding,
  colorVariant,
}: AllEventsProps) {
  const color = stegaClean(colorVariant);
  const events = await fetchSanityEvents();

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80vw] lg:w-[60vw] m-auto">
        {events.map((event) => (
          <Link
            key={event?.slug?.current}
            className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={event.externalLink!}
          >
            <OneEvent
              key={event.slug?.current}
              slug={event.slug}
              name={event?.name ?? ""}
              startDateTime={event?.startDateTime}
              endDateTime={event?.endDateTime}
              address={event?.address ?? ""}
              city={event?.city ?? ""}
              state={event?.state ?? ""}
              description={event?.description ?? ''}
              externalLink={event?.externalLink}
              image={event?.image}
            />
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}
