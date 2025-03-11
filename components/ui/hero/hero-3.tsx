import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { PAGE_QUERYResult } from "@/sanity.types";

type Hero3Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-3" }
>;

export default function Hero3({ tagLine, title, body, links }: Hero3Props) {

  //  the text gradient didn't play well with the PTR Sanity component so I tried to figure out how to do it without it

  // basically you can't pass className or style props to the PTR component, and it renders different HTML elements based on the type defined in the schemas for the block, so you can't really control the styling of it as specifically as we would like to

  // but I did figure out how to make the gradient without having to use react-text-gradients, pretty simple in Tailwind

  return (
    <div className="container dark:bg-background py-20 lg:pt-40 text-center">
      {tagLine && (
        <h1 className="leading-[0] font-sans animate-fade-up [animation-delay:100ms] opacity-0">
          <span className="text-base font-semibold">{tagLine}</span>
        </h1>
      )}
      {title && (
        <h2 className="mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
          {title}
        </h2>
      )}
      {body && (
        <div className="text-lg mt-6 max-w-2xl mx-auto animate-fade-up [animation-delay:300ms] opacity-0">
          <span className="bg-linear-to-l from-blue-500 to-red-500 bg-clip-text text-transparent">
            {body}
          </span>
        </div>
      )}
      {links && links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-up [animation-delay:400ms] opacity-0">
          {links.map((link) => (
            <Button
              key={link.title}
              variant={stegaClean(link?.buttonVariant)}
              asChild
            >
              <Link
                href={link.href as string}
                target={link.target ? "_blank" : undefined}
                rel={link.target ? "noopener" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
