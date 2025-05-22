import { PAGE_QUERYResult } from "@/sanity.types";
import HeroWithImage from "@/components/ui/hero/hero-with-image";
import HeroTextCentered from "@/components/ui/hero/hero-text-centered";
import HeroColorBodyText from "@/components/ui/hero/hero-color-body-text";
import SectionHeader from "@/components/ui/section-header";
import SplitRow from "@/components/ui/split/split-row";
import GridRow from "@/components/ui/grid/grid-row";
import Carousel1 from "@/components/ui/carousel/carousel-1";
import Carousel2 from "@/components/ui/carousel/carousel-2";
import TimelineRow from "@/components/ui/timeline/timeline-row";
import Cta1 from "@/components/ui/cta/cta-1";
import LogoCloud1 from "@/components/ui/logo-cloud/logo-cloud-1";
import FAQs from "@/components/ui/faqs";
import FormNewsletter from "@/components/ui/forms/newsletter";
import AllPosts from "@/components/ui/all-posts";
import AboutYouTest from "./custom/about-you-test";
import HeroTextFlex from "./custom/hero-flex-text";
import ContactUsForm from "./custom/contact-us"
import AllTeamMembers from "./custom/all-team-members";
import AllEvents from "./custom/all-events"
import ScrollyText from "./custom/scrolly-text";
import HeroTextBackgroundImage from "./custom/hero-text-background-image";
import AllPastProjects from "./custom/all-past-projects";

type Block = NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number];

const componentMap: {
  [K in Block["_type"]]: React.ComponentType<Extract<Block, { _type: K }>>;
} = {
  "hero-flex-text": HeroTextFlex,
  "hero-with-image": HeroWithImage,
  "hero-color-body-text": HeroColorBodyText,
  "hero-text-centered": HeroTextCentered,
  "hero-text-background-image": HeroTextBackgroundImage,
  "section-header": SectionHeader,
  "split-row": SplitRow,
  "grid-row": GridRow,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "logo-cloud-1": LogoCloud1,
  faqs: FAQs,
  "form-newsletter": FormNewsletter,
  "all-posts": AllPosts,
  "all-team-members": AllTeamMembers,
  "all-events": AllEvents,
  "all-past-projects": AllPastProjects,
  "about-you-test": AboutYouTest,
  'contact-us-form': ContactUsForm,
  'scrolly-text': ScrollyText,
};

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        if (!Component) {
          // Fallback for development/debugging of new component types
          console.warn(
            `No component implemented for block type: ${block._type}`
          );
          return <div data-type={block._type} key={block._key} />;
        }
        return <Component {...(block as any)} key={block._key} />;
      })}
    </>
  );
}
