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
import { allTeamMembersQuery } from "./all-team-members";
import { allEventsQuery } from "./all-events";
import { heroTextBackgroundImageQuery } from "./hero/hero-text-background-image";
import { scrollyTextQuery } from "./scrolly-text";
import { allPastProjectsQuery } from "./all-pastProjects";
import { basicBlockContentQuery } from "./basic-block-content";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${heroWithImageQuery},
      ${heroTextCenteredQuery},
      ${heroColorBodyTextQuery},
      ${heroFlexTextQuery},
      ${heroTextBackgroundImageQuery},
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
