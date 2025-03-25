import { groq } from "next-sanity";

export const teamMemberQuery = groq`*[_type == "team-member" && slug.current == $slug][0]{
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
