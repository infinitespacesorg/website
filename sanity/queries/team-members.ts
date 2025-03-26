import { groq } from "next-sanity";

export const TEAM_MEMBERS_QUERY = groq`*[_type == "team-member" && defined(slug) && showOnAboutPage] | order(orderRank asc){
    _type,
    name,
    slug,
    jobTitle,
    bio,
    associatedLink,
    showOnAboutPage,
    image{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
}`;

export const TEAM_MEMBERS_SLUGS_QUERY = groq`*[_type == "team-member" && defined(slug)]{slug}`;