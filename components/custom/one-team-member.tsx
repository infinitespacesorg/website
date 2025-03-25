"use client";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { TEAM_MEMBERS_QUERYResult } from "@/sanity.types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type OneTeamMember = NonNullable<TEAM_MEMBERS_QUERYResult[number]>;

interface TeamMemberProps extends Omit<OneTeamMember, "_type"> {
  className?: string;
}

export default function OneTeamMember({
  slug,
  name,
  image,
  bio,
  jobTitle,
}: TeamMemberProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function hoverElement() {
    return (
      <div className="hidden lg:flex w-full max-w-[300px] lg:max-w-[600px] m-auto flex-col text-center">
        {/* {image && image.asset?._id && (
          <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || ""}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              fill
              style={{
                objectFit: "cover",
              }}
              // sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={100}
            />
          </div>
        )} */}
        <h1 className="text-xl xl:text-2xl">{name}</h1>
        <h3 className="text-base xl:text-xl">{jobTitle}</h3>
      </div>
    );
  }

  return (
    <>
      <div
        className="w-full max-w-[300px] lg:max-w-[600px] h-[20rem] sm:h-[16rem] xl:h-[18rem] m-auto py-3 flex flex-col cursor-pointer hover:bg-primary/10 rounded-2xl"
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {image && image.asset?._id && (
          <div className="m-auto mb-4 relative h-[15rem] sm:h-50 w-[15rem] sm:w-50 rounded-2xl overflow-hidden">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || ""}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              fill
              style={{
                objectFit: "cover",
              }}
              // sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={100}
            />
          </div>
        )}
        <div className="lg:hidden w-[15rem] sm:w-70 m-auto text-center">
          <h1 className="text-xl">{name}</h1>
          <h3 className="text-base">{jobTitle}</h3>
        </div>
        {isHovering && hoverElement()}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-[80vw] md:max-w-[700px] flex flex-col sm:flex-row justify-between items-center p-4 md:p-10">
          {image && image.asset?._id && (
            <div className="relative w-full md:w-[30%] lg:w-[20%] h-64">
              <Image
                src={urlFor(image).url()}
                alt={image.alt || ""}
                placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || ""}
                fill
                style={{ objectFit: "cover", borderRadius: "50px" }}
                quality={100}
              />
            </div>
          )}
          <div className="w-fit md:w-[60%] lg:w-[70%">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-3xl">{name}</DialogTitle>
              <DialogDescription className="text-base sm:text-2xl">
                {jobTitle}
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm sm:text-base mt-5">{bio}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
