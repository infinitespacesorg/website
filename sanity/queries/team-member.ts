import { groq } from "next-sanity";

export const teamMemberQuery = groq`*[_type == "teamMember" && slug.current == $slug][0]{
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
