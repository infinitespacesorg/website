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
import { Calendar, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ElseHeader from "@/components/header/else-nav";
import FooterWithContactUs from "@/components/footer/footer-with-contact-us";

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

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };
  
  const startDate = new Date(event.startDateTime!);
  const endDate = new Date(event.endDateTime!);
  
  const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);
  const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
  
  const startDateString = dateFormatter.format(startDate);
  const endDateString = dateFormatter.format(endDate);
  
  const startTime = timeFormatter.format(startDate);
  const endTime = timeFormatter.format(endDate);
  
  let eventDate: string;
  
  if (startDateString === endDateString) {
    eventDate = startDateString;
  } else {
    eventDate = `${startDateString} - ${endDateString}`;
  }

  const location = `${event.address} - ${event.city}, ${event.state}`;

  console.log('using the event/slug/page')

  return (
    <main>
      <ElseHeader/>
    <section>
      <div className="container py-15 px-0 md:py-20 w-[90vw] md:w-[80vw] md:max-w-[1000px]">
        <div className="flex flex-col md:flex-row justify-start align-baseline gap-10">
          <div className="relative w-[80vw] h-[80vw] max-w-[400px] max-h-[400px] m-auto md:m-0 md:w-[35vw] lg:w-[400px] md:h-[35vw] lg:h-[400px]">
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
                  borderRadius: "20px",
                  margin: 'auto',
                }}
                fill
                quality={100}
              />
            )}
          </div>
          <div className="my-2 md:w-[calc(100% - 35vw - 20px)] lg:w-[calc(100% - 420px)]">
            <h1 className="text-3xl lg:text-5xl lg:mb-10">{event.name}</h1>
            <div className="flex flex-row justify-start items-center my-5 gap-5">
              <div className="h-fit">
                <Calendar className="w-fit h-fit" />
              </div>
              <div>
                <h3 className="text-base lg:text-xl">{eventDate}</h3>
                <p className="text-base lg:text-lg">
                  {startTime} - {endTime}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-start items-center my-5 gap-5">
              <MapPin />
              <h3 className="text-base lg:text-xl">{location}</h3>
            </div>

            {event.externalLink && (
              <div className="p-3 border-2 rounded-2xl">
                <p className="text-sm lg:text-base">
                  To join the event, register below:
                </p>
                <a
                  href={`${event.externalLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="my-2 w-full text-center">Register</Button>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="my-10">
          <h4 className="text-lg lg:text-xl">About event:</h4>
          <hr className="bg-background my-2" />
          {event.description && (
            <div className="my-3">
              <PortableTextRenderer value={event.description} />
            </div>
          )}
        </div>
      </div>
      {/* orientation='horizontal' doesn't do anything right now, lame! */}
      {/* <div className="w-[90vw] m-auto">
        
        <Accordion className="space-y-4 flex gap-4" type="single" orientation="horizontal">
          <AccordionItem className="flex flex-row" key={'1'} value="Coldplay Climate Pledge">
            <AccordionTrigger className="writing-vertical">Coldplay Climate Pledge</AccordionTrigger>
            <AccordionContent className="w-1/2">hello I am content</AccordionContent>
          </AccordionItem>
          <AccordionItem className="flex flex-row" key={'2'} value="Beyonce OTR 2">
            <AccordionTrigger className="writing-vertical">Beyonce OTR 2</AccordionTrigger>
            <AccordionContent className="w-[500px]">hello I am content</AccordionContent>
          </AccordionItem>
          <AccordionItem className="flex flex-row" key={'3'} value="Fred Again Alexandra Palace">
            <AccordionTrigger className="writing-vertical">Fred Again Alexandra Palace</AccordionTrigger>
            <AccordionContent className="w-1/2">hello I am content</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> */}
    </section>
    <FooterWithContactUs />
    </main>
  );
}
