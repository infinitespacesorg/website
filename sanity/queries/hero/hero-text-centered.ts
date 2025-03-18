import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const heroTextCenteredQuery = groq`
  _type == "hero-text-centered" => {
    _type,
    _key,
    tagLine,
    title,
    body[]{
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
    links,
  }
`;
