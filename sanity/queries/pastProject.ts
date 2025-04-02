import { groq } from "next-sanity";

export const pastProjectQuery = groq`*[_type == "pastProject" && slug.current == $slug][0]{
    _type,
    name, 
    slug,
    teamMember,
    impact,
    description,
    associatedLink,
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
    }
}`;