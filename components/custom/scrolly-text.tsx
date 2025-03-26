import { PAGE_QUERYResult } from "@/sanity.types";
import SectionContainer from "../ui/section-container";

type ScrollyTextProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "scrolly-text" }
>;

export default function ScrollyText({
  text,
  fontVariant,
  motionVariant,
  padding,
  colorVariant,
}: ScrollyTextProps) {

  const paddingClass =
  padding?.top && padding?.bottom
    ? "py-10"
    : padding?.top
    ? "pt-10"
    : padding?.bottom
    ? "pb-10"
    : "p-0";


  return (
    <section
      className={`marquee-wrapper w-full p-0 bg-${colorVariant} ${paddingClass}`}
    >
      {text && (
        <div className={`marquee-${motionVariant} ${fontVariant}`}>
          <span className="mx-8 text-3xl font-bold uppercase">{text}</span>
          <span className="mx-8 text-3xl font-bold uppercase">{text}</span>
        </div>
      )}
    </section>
  );
}

//   className={`w-3/10 mt-6 font-bold leading-[1.1] text-3xl md:text-4xl lg:text-5xl animate-fade-up [animation-delay:200ms] opacity-0`}
