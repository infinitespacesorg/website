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
  return (
    <SectionContainer
      color={colorVariant}
      padding={padding}
      className="overflow-hidden whitespace-nowrap"
    >
      {text && (
        <div className={`inline-block scroll-text-${motionVariant}`}>
          <h1 className={`text-3xl ${fontVariant}`}>{text}</h1>
        </div>
      )}
    </SectionContainer>
  );
}

//   className={`w-3/10 mt-6 font-bold leading-[1.1] text-3xl md:text-4xl lg:text-5xl animate-fade-up [animation-delay:200ms] opacity-0`}
