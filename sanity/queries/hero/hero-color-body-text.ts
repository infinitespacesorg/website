import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const heroColorBodyTextQuery = groq`
  _type == "hero-color-body-text" => {
    _type,
    _key,
    tagLine,
    title,
    body,
    links,
  }
`;
