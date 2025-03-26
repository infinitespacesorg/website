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
    excerpt,
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
    },
    meta_title,
    meta_description,
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
    },
    noindex
}`;

export const EVENTS_SLUGS_QUERY = groq`*[_type == "event" && defined(slug)]{slug}`;