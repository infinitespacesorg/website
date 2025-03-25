import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const allEventsQuery = groq`
_type == "all-events" => {
  _type,
  _key,
  padding,
  colorVariant,
}
`