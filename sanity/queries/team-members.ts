import { groq } from "next-sanity";

export const TEAM_MEMBERS_QUERY = groq`*[_type == "team-member" && defined(slug)] | order(_createdAt desc){
    _type,
    name,
    slug,
    jobTitle,
    bio,
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