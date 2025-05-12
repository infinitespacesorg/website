import Blocks from "@/components/blocks";
import { fetchSanityPageBySlug } from "../actions";
import { generatePageMetadata } from "@/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";
import dynamic from "next/dynamic";

const ElseHeader = dynamic(() => import("@/components/header/else-nav"), {
  ssr: false,
});

const FooterWithContactUs = dynamic(() => import("@/components/footer/footer-with-contact-us"), {
  ssr: false,
});

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: "about" });

  return generatePageMetadata({ page, slug: "about" });
}

export default async function AboutPage() {
  const page = await fetchSanityPageBySlug({ slug: "about" });

  if (!page) {
    return MissingSanityPage({ document: "page", slug: "about" });
  }

  return <>
  <ElseHeader />
  <div className="pt-15 md:pt-0">
  <Blocks blocks={page?.blocks ?? []} />
  </div>
  <FooterWithContactUs />
  </>
  
}