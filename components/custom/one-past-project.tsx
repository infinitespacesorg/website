"use client";
import { urlFor } from "@/sanity/lib/image";
import { PAST_PROJECTS_QUERYResult } from "@/sanity.types";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

type OnePastProject = NonNullable<PAST_PROJECTS_QUERYResult[number]>;

interface PastProjectProps extends Omit<OnePastProject, "_type"> {
  className?: string;
}

export default function OnePastProject({
  slug,
  name,
  associatedLink,
  description,
  impact,
  image,
  teamMember,
}: PastProjectProps) {
  return (
    <AccordionItem
      className="flex flex-row h-full hover:opacity-80"
      value={name!}
      style={{ backgroundImage: `url(${urlFor(image!)})` }}
    >
      <AccordionTrigger className="writing-vertical h-[90%] py-10 px-0 w-fit m-auto text-white font-extrabold ">
        <span className="text-lg">{name}</span>
      </AccordionTrigger>
      <AccordionContent className="w-full h-full bg-background/90">
        <div className="p-10">
          <h3>{name}</h3>
          {description && <p className="my-5">{description}</p>}
          {impact && <p className="my-5">{impact}</p>}
          {teamMember && (
            <div className="mt-5 text-sm text-muted-foreground">
              <p className="font-semibold">{teamMember.name}</p>
              <p>{teamMember.jobTitle}</p>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
