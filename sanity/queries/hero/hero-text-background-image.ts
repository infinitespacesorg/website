import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const heroTextBackgroundImageQuery = groq`
  _type == "hero-text-background-image" => {
    _type,
    _key,
    text,
    image{
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
      },
      alt
    }
  }
`;