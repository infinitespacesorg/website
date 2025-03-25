"use client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { EVENTS_QUERYResult } from "@/sanity.types";

type OneEvent = NonNullable<EVENTS_QUERYResult[number]>;

interface EventProps extends Omit<OneEvent, "_type"> {
  className?: string;
}

export default function OneEvent({
  slug,
  name,
  startDateTime,
  endDateTime,
  address,
  city,
  state,
  externalLink,
  description,
  image,
}: EventProps) {

  console.log(startDateTime, endDateTime)

    let eventDate
    const startDate = new Date(startDateTime!)
    const endDate = new Date(endDateTime!)
    let segments = startDate.toDateString().split(' ')
    if (startDate.toDateString() === endDate.toDateString()) {
        let formatted = `${segments[1]} ${segments[2]}, ${segments[3]}`
        eventDate = `${formatted}`
    }
    else {
        let endSegments = endDate.toDateString().split(' ')
        eventDate = `${segments[1]} ${segments[2]}, ${segments[3]} - ${endSegments[1]} ${endSegments[2]}, ${endSegments[3]}`
    } 

  return (
    <div className="border-2 rounded-2xl p-5 hover:border-black">
        {image && image.asset?._id && (
          <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[15rem] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || ""}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              fill
              style={{
                objectFit: "cover",
              }}
              quality={100}
            />
          </div>
        )}
      <h1 className="text-2xl text-center py-5">{name}</h1>
      <h2 className="text-xl py-2">{eventDate}</h2>
      <h3 className="text-base py-2">{address} - {city}, {state}</h3>
      <p className="text-sm py-2">{description}</p>
    </div>
  );
}
