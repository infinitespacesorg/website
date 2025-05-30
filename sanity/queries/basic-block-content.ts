import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const basicBlockContentQuery = groq`
  _type == "basic-block-content" => {
    _type,
    _key,
    padding,
    customTailwind,
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
  }
`;
