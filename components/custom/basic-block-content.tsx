import { cn } from "@/lib/utils";
import { PAGE_QUERYResult } from "@/sanity.types";
import PortableTextRenderer from "../portable-text-renderer";
import { PortableTextBlock } from "next-sanity";

type BasicBlockContentProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "basic-block-content" }
>;

export default function BasicBlockContent({
  padding,
  customTailwind,
  body,
}: BasicBlockContentProps) {
  return (
    <section
      className={cn(
        padding?.top ? "md:pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "md:pb-16 xl:pb-20" : undefined,
        customTailwind
      )}
    >
      {body && body?.length > 0 && <PortableTextRenderer value={body} />}
    </section>
  );
}
