import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const allPastProjectsQuery = groq`
_type == "all-past-projects" => {
  _type,
  _key,
  padding,
  colorVariant,
}
`