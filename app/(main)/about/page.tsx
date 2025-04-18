import Blocks from "@/components/blocks";
import { fetchSanityPageBySlug } from "../actions";
import { generatePageMetadata } from "@/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";
import FooterWithContactUs from "@/components/footer/footer-with-contact-us";
import ElseHeader from "@/components/header/else-nav";

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
  <Blocks blocks={page?.blocks ?? []} />
  <FooterWithContactUs />
  </>
  
}