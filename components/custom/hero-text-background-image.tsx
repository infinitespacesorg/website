import { PAGE_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type HeroTextBackgroundImageProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "hero-text-background-image" }
>;

export default function HeroTextBackgroundImage({
  text, image
}: HeroTextBackgroundImageProps) {

  return (
    <section
      className={`py-20 text-left gap-2/10`}
    >
      {text && image && image.asset?._id && (
        <h1
        className="text-6xl font-extrabold bg-cover bg-center text-clip w-fit m-auto"
        style={{ backgroundImage: `url(${urlFor(image).url()})`}}
        >
          {text}
        </h1>
      )}
    </section>
  );
}