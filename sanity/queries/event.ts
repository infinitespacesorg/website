import { groq } from "next-sanity";

export const eventQuery = groq`*[_type == "event" && slug.current == $slug][0]{
    _type,
    name, 
    startDateTime,
    endDateTime,
    address,
    city,
    state,
    externalLink,
    description,
    slug,
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