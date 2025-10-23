"use client";
import dynamic from 'next/dynamic';
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitSplat = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-splat" }
>;

const SplatViewer = dynamic(
  () => import('@/components/custom/SplatViewer'),
  { ssr: false, loading: () => <div>Loading 3D viewer...</div> }
);

export default function SplitSplat({ div }: SplitSplat) {
  return (
    <div>
      <h1>My 3D Scene</h1>
      <SplatViewer />
    </div>
  );
}
