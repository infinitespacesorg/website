"use client";
import CoverVideo from "@/components/custom/cover-video";
import { animate, motion } from "motion/react";

const MainVideo =
  "https://dkljmdqtvrkrnjdtdsjw.supabase.co/storage/v1/object/public/website-storage/stage-cut.mp4";

//import { IconButton, Button, Typography } from "@material-tailwind/react";
//import { PlayIcon } from "@heroicons/react/24/solid";

export default function HeroBlock() {
  return (
    <>
      <CoverVideo />
      {/*
    <div className="relative min-h-screen w-full bg-[url('/images/event.jpeg')] bg-cover bg-no-repeat">
        <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
    </div>
    */}
    </>
  );
}
