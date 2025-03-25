import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const allTeamMembersQuery = groq`
_type == "all-team-members" => {
  _type,
  _key,
  padding,
  colorVariant,
}
`