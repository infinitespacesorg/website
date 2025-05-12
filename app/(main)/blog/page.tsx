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
  const page = await fetchSanityPageBySlug({ slug: "blog" });

  return generatePageMetadata({ page, slug: "blog" });
}

export default async function BlogPage() {
  const page = await fetchSanityPageBySlug({ slug: "blog" });

  if (!page) {
    return MissingSanityPage({ document: "page", slug: "blog" });
  }

  return <>
  <ElseHeader />
  <div className="pt-15 md:py-0">
  <Blocks blocks={page?.blocks ?? []} />
  </div>
  <FooterWithContactUs />
  </>
  
}