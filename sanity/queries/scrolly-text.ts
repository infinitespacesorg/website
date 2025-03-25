import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const scrollyTextQuery = groq`
  _type == "scrolly-text" => {
    _type,
    _key,
    text,
    colorVariant,
    motionVariant,
    padding,
    fontVariant
  }
`;