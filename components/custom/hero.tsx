import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import { SIZE_VARIANTS } from "@/lib/utils";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero" }
>;

export default function Hero({
  globalTextColorVariant,
  globalTextAlign,
  tagLine,
  taglineColorVariant,
  taglineSize,
  title,
  titleColorVariant,
  titleSize,
  titleBackgroundImage,
  titleCustomGradient,
  body,
  bodyColorVariant,
  bodyCustomGradient,
  bodySize,
  image,
  backgroundImage,
  backgroundColorVariant,
  flexType,
}: HeroProps) {
  const imageCheck = image ? true : false;
  const backgroundImageCheck = backgroundImage ? true : false;

  function getResponsiveSizes(size: string) {
    const index = SIZE_VARIANTS.findIndex((el) => el.value === size);
    const safe = (i: number) => SIZE_VARIANTS[Math.max(0, i)].value;
    return `${safe(index - 2)} md:${safe(index - 1)} lg:${size}`;
  }

  const backgroundStyle = backgroundImageCheck
    ? {
        backgroundImage: `url(${urlFor(backgroundImage!).url()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  // handles rendering Tagline text
  function Tagline() {
    const taglineSizing = getResponsiveSizes(taglineSize!);
    const taglineColor =
      taglineColorVariant || globalTextColorVariant || "text-base";

    if (tagLine)
      return (
        <h1
          className={`font-sans font-semibold w-full ${taglineSizing} ${taglineColor}`}
        >
          {tagLine}
        </h1>
      );
  }

  // handles rendering Title text
  function Title() {
    const titleSizing = getResponsiveSizes(titleSize!);
    const titleColor =
      titleColorVariant || globalTextColorVariant || "text-base";

    if (title) {
      if (titleBackgroundImage) return (
        <h2
          className={cn(
            `mt-6 mx-auto font-extrabold bg-cover bg-center text-clip w-fit m-auto`,
            flexType === "flex-row" || flexType === "flex-row-reverse"
              ? "w-[40vw] mx-auto"
              : "w-full",
            titleSizing,
            titleColor
          )}
          style={{
            backgroundImage: `url(${urlFor(titleBackgroundImage).url()})`,
          }}
        >
          <span
            className={cn(
              titleCustomGradient,
              titleCustomGradient ? "bg-clip-text text-transparent" : ""
            )}
          >
            {title}
          </span>
        </h2>
      )
      else return (
        <h2
          className={cn(
            `mt-6 mx-auto font-bold`,
            flexType === "flex-row" || flexType === "flex-row-reverse"
              ? "w-full md:w-[40vw]"
              : "w-full",
            titleSizing,
            titleColor
          )}
        >
          <span
            className={cn(
              titleCustomGradient,
              titleCustomGradient ? "bg-clip-text text-transparent" : ""
            )}
          >
            {title}
          </span>
        </h2>
      )
    }
  }

  // handles rendering body text
  // I'm 99% sure body will always be "string" type, but there's a fallback just in case
  // if flex-row/reverse & no image, force text-center on mobile
  function Body() {
    const bodySizing = getResponsiveSizes(bodySize!);
    const bodyColor = bodyColorVariant || globalTextColorVariant || "text-base";

    if (body)
      return (
        <div
          className={cn(
            bodySizing,
            bodyColor,
            `mt-6 md:max-w-2xl`,
            (flexType === "flex-row" && !imageCheck) ||
              (flexType === "flex-row-reverse" && !imageCheck)
              ? `w-full md:w-[40vw] text-center sm:${globalTextAlign}`
              : "w-full"
          )}
        >
          {typeof body === "string" ? (
            <span
              className={cn(
                bodyCustomGradient,
                bodyCustomGradient ? "bg-clip-text text-transparent" : ""
              )}
            >
              {body}
            </span>
          ) : (
            <PortableTextRenderer value={stegaClean(body)} />
          )}
        </div>
      );
  }

  // handles rendering all of the text
  // adds a gap if flex-row/reverse & no image
  // if there is an image, force text-center and flex-col on mobile
  function TextContainer() {
    return (
      <div
        className={cn(
          `flex-1 flex justify-center items-center text-center sm:${globalTextAlign}`,
          flexType === "flex-row" || flexType === "flex-row-reverse"
            ? backgroundColorVariant === "none"
            : `bg-${backgroundColorVariant}`,
          imageCheck && image?.asset ? `flex-col` : `flex-col md:${flexType}`,
          (flexType === "flex-row" && !imageCheck) ||
            (flexType === "flex-row-reverse" && !imageCheck)
            ? "gap-[5vw]"
            : ""
        )}
      >
        <div
          className={cn(
            "w-full",
            (flexType === "flex-row" && !imageCheck) ||
              (flexType === "flex-row-reverse" && !imageCheck)
              ? "max-w-[40vw] mx-auto"
              : ""
          )}
        >
          {Tagline()}
          {Title()}
        </div>
        {Body()}
      </div>
    );
  }

  // handles rendering the optional image
  // could return null if there is not an image
  function ImageContainer() {
    if (imageCheck && image?.asset)
      return (
        <div className="flex-1 flex justify-center items-center lg:max-w-[40vw]">
          <Image
            className="rounded-xl animate-fade-up [animation-delay:500ms] opacity-0"
            src={urlFor(image).url()}
            alt={image.alt || ""}
            width={image.asset.metadata?.dimensions?.width || 800}
            height={image.asset.metadata?.dimensions?.height || 800}
            placeholder={image.asset.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image.asset.metadata?.lqip || ""}
            quality={100}
          />
        </div>
      );
  }

  // if there is not an image, there will not be an ImageContainer,
  // so it won't really be flex-ing anything
  // but the "container" class gives it some padding and other styling
  function Flexbox() {
    return (
      <div
        className={`container flex flex-col md:${flexType} justify-center items-center gap-10 py-20 px-3 sm:px-1  gap-10`}
      >
        {TextContainer()}
        {ImageContainer()}
      </div>
    );
  }

  // if there is a background image or a background color variant
  // this wrapper will handle that
  function BackgroundWrapper() {
    return (
      <section
        className={cn(
          !backgroundImageCheck &&
            backgroundColorVariant !== "none" &&
            `bg-${backgroundColorVariant}`
        )}
        style={backgroundStyle}
      >
        {Flexbox()}
      </section>
    );
  }

  return <BackgroundWrapper />;
}
