import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERYResult } from "@/sanity.types";
import { SIZE_VARIANTS } from "@/lib/utils";

type SuperheroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "superhero" }
>;

export default function Superhero({
  globalTextColorVariant,
  globalTextAlign,
  tagLine,
  taglineColorVariant,
  taglineSize,
  title,
  titleColorVariant,
  titleSize,
  titleBackgroundImage,
  body,
  bodyColorVariant,
  bodySize,
  image,
  backgroundImage,
  backgroundColorVariant,
  flexType,
}: SuperheroProps) {
  const imageCheck = image ? true : false;
  const backgroundImageCheck = backgroundImage ? true : false;

  function getResponsiveSizes(size: string) {
    const index = SIZE_VARIANTS.findIndex((el) => el.value === size);
    const safe = (i: number) => SIZE_VARIANTS[Math.max(0, i)].value;
    return `${safe(index - 2)} md:${safe(index - 1)} lg:${size}`;
  }

  const taglineSizing = getResponsiveSizes(taglineSize!);
  const titleSizing = getResponsiveSizes(titleSize!);
  const bodySizing = getResponsiveSizes(bodySize!);

  const taglineColor =
    taglineColorVariant || globalTextColorVariant || "text-base";
  const titleColor = titleColorVariant || globalTextColorVariant || "text-base";
  const bodyColor = bodyColorVariant || globalTextColorVariant || "text-base";

  const backgroundStyle = backgroundImageCheck
    ? {
        backgroundImage: `url(${urlFor(backgroundImage!).url()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <section
      className={cn(
        ``,
        !backgroundImageCheck &&
          backgroundColorVariant !== "none" &&
          `bg-${backgroundColorVariant}`
      )}
      style={backgroundStyle}
    >
      <div
        className={`container flex ${flexType} justify-center items-center gap-10 py-20 px-10 gap-10`}
      >
        {imageCheck && image?.asset && (
          <div className="flex-1 flex justify-center items-center max-w-[40vw]">
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
        )}

        <div
          className={cn(
            `"flex-1 flex justify-center items-center`,
            flexType === "flex-row" || flexType === "flex-row-reverse"
              ? backgroundColorVariant === "none"
              : `bg-${backgroundColorVariant}`,
            globalTextAlign,
            imageCheck && image?.asset ? 'flex-col' : flexType
          )}
        >
          <div>
            {tagLine && (
              <h1
                className={`font-sans font-semibold animate-fade-up ${taglineSizing} ${taglineColor} [animation-delay:100ms] opacity-0`}
              >
                {tagLine}
              </h1>
            )}
            {title && (
              <div>
                {titleBackgroundImage ? (
                  <h2
                    className={cn(`mt-6 font-extrabold bg-cover bg-center text-clip w-fit m-auto ${titleSizing} ${titleColor}`, flexType === 'flex-row' || flexType === 'flex-row-reverse' ? 'w-[30vw] m-auto' : 'w-fit')}
                    style={{
                      backgroundImage: `url(${urlFor(titleBackgroundImage).url()})`,
                    }}
                  >
                    {title}
                  </h2>
                ) : (
                  <h2 className={cn(`mt-6 font-bold ${titleSizing} ${titleColor}`, flexType === 'flex-row' || flexType === 'flex-row-reverse' ? 'w-[30vw]' : 'w-fit')}>
                    {title}
                  </h2>
                )}
              </div>
            )}
          </div>
          {body && (
            <div className={cn(`mt-6 ${bodySizing} ${bodyColor} max-w-2xl`, flexType === 'flex-row' || flexType === 'flex-row-reverse' ? 'w-[40vw]' : 'w-fit')}>
              {typeof body === "string" ? (
                <p>{body}</p>
              ) : (
                <PortableTextRenderer value={stegaClean(body)} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );

  //   if (!imageCheck) {
  //     return (
  //       <section
  //         className={cn(
  //           `flex ${flexType} justify-center items-center py-20 px-10 text-left gap-[20px])`,
  //           backgroundColorVariant === "none" ? "" : `bg${backgroundColorVariant}`
  //         )}
  //       >
  //         <div className="flex flex-col justify-center">
  //           {tagLine && (
  //             <h1
  //               className={`leading-[0] font-sans animate-fade-up ${taglineSizing} [animation-delay:100ms] opacity-0`}
  //             >
  //               <span className={`${taglineColor} font-semibold`}>{tagLine}</span>
  //             </h1>
  //           )}
  //           {title && (
  //             <h2
  //               className={`mt-6 font-bold leading-[1.1] ${titleSizing} animate-fade-up [animation-delay:200ms] opacity-0`}
  //             >
  //               {title}
  //             </h2>
  //           )}
  //           {body && (
  //             <div
  //               className={`${bodySizing} mt-6 animate-fade-up [animation-delay:300ms] opacity-0`}
  //             >
  //               {body}
  //             </div>
  //           )}
  //         </div>
  //         <div className="flex flex-col justify-center">
  //           {image && image.asset?._id && (
  //             <Image
  //               className="rounded-xl animate-fade-up [animation-delay:500ms] opacity-0"
  //               src={urlFor(image).url()}
  //               alt={image.alt || ""}
  //               width={image.asset?.metadata?.dimensions?.width || 800}
  //               height={image.asset?.metadata?.dimensions?.height || 800}
  //               placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
  //               blurDataURL={image?.asset?.metadata?.lqip || ""}
  //               quality={100}
  //             />
  //           )}
  //         </div>
  //       </section>
  //     );
  //   } else
  //     return (
  //       <section
  //         className={`flex ${flexType} bg-${backgroundColorVariant} justify-center items-center py-20 text-left gap-2/10`}
  //       >
  //         <div>
  //           {tagLine && (
  //             <h1
  //               className={`w-3/10 mt-6 font-bold leading-[1.1] text-3xl md:text-4xl lg:text-5xl animate-fade-up [animation-delay:200ms] opacity-0`}
  //             >
  //               {tagLine}
  //             </h1>
  //           )}
  //           {title && (
  //             <h1
  //               className={`w-3/10 mt-6 font-bold leading-[1.1] text-3xl md:text-4xl lg:text-5xl animate-fade-up [animation-delay:200ms] opacity-0`}
  //             >
  //               {title}
  //             </h1>
  //           )}
  //         </div>
  //         {body && (
  //           <h2
  //             className={`w-4/10 text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0`}
  //           >
  //             <span className="bg-linear-to-l from-blue-500 to-red-500 bg-clip-text text-transparent">
  //               {body}
  //             </span>
  //           </h2>
  //         )}
  //       </section>
  //     );
}

// if there's an image, it does this in a flexbox:
// IMAGE
// everything else

// if there's not an image, then you do a flexbox with
// tagline, title
// body text

// if there's a background image, then it uses that background image,
// if not, it can use the backgroundColorVariant
