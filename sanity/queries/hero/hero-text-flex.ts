import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const heroTextFlexQuery = groq`
  _type == "hero-text-flex" => {
    _type,
    _key,
    bigText,
    smallerText,
    flexType,
    colorVariant
}
`;