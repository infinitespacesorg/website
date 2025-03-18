import { PAGE_QUERYResult } from "@/sanity.types";

type HeroTextFlexProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-flex-text" }
>;

export default function HeroTextFlex({
  bigText,
  smallerText,
  flexType,
  colorVariant
}: HeroTextFlexProps) {

  return (
    <section
      className={`flex ${flexType} bg-${colorVariant} justify-center items-center py-20 text-left gap-2/10`}
    >
      {bigText && (
        <h1
          className={`w-3/10 mt-6 font-bold leading-[1.1] text-3xl md:text-4xl lg:text-5xl animate-fade-up [animation-delay:200ms] opacity-0`}
        >
          {bigText}
        </h1>
      )}
      {smallerText && (
        <h2 className={`w-4/10 text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0`}>
          <span className="bg-linear-to-l from-blue-500 to-red-500 bg-clip-text text-transparent">{smallerText}</span>
        </h2>
      )}
    </section>
  );
}
