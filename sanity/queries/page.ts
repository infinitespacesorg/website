import { groq } from "next-sanity";
import { heroWithImageQuery } from "./hero/hero-with-image";
import { heroTextCenteredQuery } from "./hero/hero-text-centered";
import { heroColorBodyTextQuery } from "./hero/hero-color-body-text";
import { heroFlexTextQuery } from "./hero/hero-flex-text"
import { sectionHeaderQuery } from "./section-header";
import { splitRowQuery } from "./split/split-row";
import { gridRowQuery } from "./grid/grid-row";
import { carousel1Query } from "./carousel/carousel-1";
import { carousel2Query } from "./carousel/carousel-2";
import { timelineQuery } from "./timeline";
import { cta1Query } from "./cta/cta-1";
import { logoCloud1Query } from "./logo-cloud/logo-cloud-1";
import { faqsQuery } from "./faqs";
import { formNewsletterQuery } from "./forms/newsletter";
import { allPostsQuery } from "./all-posts";
import { aboutYouTestQuery } from "./forms/aboutyoutest";
import { contactUsFormQuery } from "./forms/contact-us";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${heroWithImageQuery},
      ${heroTextCenteredQuery},
      ${heroColorBodyTextQuery},
      ${heroFlexTextQuery},
      ${sectionHeaderQuery},
      ${splitRowQuery},
      ${gridRowQuery},
      ${carousel1Query},
      ${carousel2Query},
      ${timelineQuery},
      ${cta1Query},
      ${logoCloud1Query},
      ${faqsQuery},
      ${formNewsletterQuery},
      ${allPostsQuery},
      ${aboutYouTestQuery},
      ${contactUsFormQuery}
    },
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;
