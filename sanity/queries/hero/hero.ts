import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const heroQuery = groq`
  _type == "hero" => {
    _type,
    _key,
    globalTextColorVariant,
    tagLine,
    taglineSize,
    taglineColorVariant,
    title,
    titleSize,
    titleColorVariant,
    titleCustomGradient,
    body,
    bodySize,
    bodyColorVariant,
    bodyCustomGradient,
    flexType,
    globalTextAlign,
    backgroundColorVariant,
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
    },
    backgroundImage{
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
    },
    titleBackgroundImage{
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
    },
  }
`;