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
    description[]{
      ...,
      _type == "image" => {
        ...,
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
        }
      }
    },
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