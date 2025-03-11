import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const hero3Query = groq`
  _type == "hero-3" => {
    _type,
    _key,
    tagLine,
    title,
    body,
    links,
  }
`;
