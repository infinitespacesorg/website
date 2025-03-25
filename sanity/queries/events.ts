import { groq } from "next-sanity";

export const EVENTS_QUERY = groq`*[_type == "event" && defined(slug.current) && endDateTime > now()] | order(startDateTime asc){
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

export const EVENTS_SLUGS_QUERY = groq`*[_type == "event" && defined(slug)]{slug}`;