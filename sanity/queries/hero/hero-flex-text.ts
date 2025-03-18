import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const heroFlexTextQuery = groq`
  _type == "hero-flex-text" => {
    _type,
    _key,
    bigText,
    smallerText,
    flexType,
    colorVariant
}
`;