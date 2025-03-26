import { notFound } from "next/navigation";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
  fetchSanityEventBySlug,
  fetchSanityEventsStaticParams,
} from "../actions";
import { generatePageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export async function generateStaticParams() {
  const events = await fetchSanityEventsStaticParams();

  return events.map((event) => ({
    slug: event.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const event = await fetchSanityEventBySlug({ slug: params.slug });

  if (!event) {
    notFound();
  }

  return generatePageMetadata({ page: event, slug: `/event/${params.slug}` });
}

export default async function EventPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const event = await fetchSanityEventBySlug(params);

  if (!event) {
    notFound();
  }

  const location = `${event.address} - ${event.city}, ${event.state}`;

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="relative w-[40vw] md:w-[400px] h-[40vw] md:h-[400px]">
        {event.image && (
          <Image
            src={urlFor(event.image).url()}
            alt={event.image.alt || ""}
            placeholder={
              event.image?.asset?.metadata?.lqip ? "blur" : undefined
            }
            blurDataURL={event.image?.asset?.metadata?.lqip || ""}
            style={{
              objectFit: "cover",
            }}
            fill
            quality={100}
          />
        )}
        </div>
        <h1>{event.name}</h1>
        <h3>{event.startDateTime}</h3>
        <h3>{location}</h3>
        {event.description && (
          <PortableTextRenderer value={event.description} />
        )}
        {event.externalLink && (
          <>
            <p>To join the event, register below:</p>
            <Link className="" href={event.externalLink}>
              Register
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
