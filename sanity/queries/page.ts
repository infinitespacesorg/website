import { groq } from "next-sanity";
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
import { allTeamMembersQuery } from "./all-team-members";
import { allEventsQuery } from "./all-events";
import { scrollyTextQuery } from "./scrolly-text";
import { allPastProjectsQuery } from "./all-pastProjects";
import { basicBlockContentQuery } from "./basic-block-content";
import { heroQuery } from "./hero/hero";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${heroQuery},
      ${basicBlockContentQuery},
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
      ${allTeamMembersQuery},
      ${allEventsQuery},
      ${aboutYouTestQuery},
      ${contactUsFormQuery},
      ${scrollyTextQuery},
      ${allPastProjectsQuery}
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
