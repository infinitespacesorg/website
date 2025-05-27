import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const superheroQuery = groq`
  _type == "superhero" => {
    _type,
    _key,
    globalTextColorVariant,
    tagLine,
    taglineSize,
    taglineColorVariant,
    title,
    titleSize,
    titleColorVariant,
    body,
    bodySize,
    bodyColorVariant,
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