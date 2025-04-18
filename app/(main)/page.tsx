import Blocks from "@/components/blocks";
import { fetchSanityPageBySlug } from "./actions";
import { generatePageMetadata } from "@/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";
import HeroBlock from "@/components/custom/hero-block";
import Footer from "@/components/footer/footer";
import IndexHeader from "@/components/header/index-nav";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  return generatePageMetadata({ page, slug: "index" });
}

export default async function IndexPage() {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  if (!page) {
    return MissingSanityPage({ document: "page", slug: "index" });
  }

  return <>
  <IndexHeader />
  <HeroBlock/>
  <Blocks blocks={page?.blocks ?? []} />
  <Footer />
  </>
  
}
