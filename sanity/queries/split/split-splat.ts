import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const splitSplatQuery = groq`
  _type == "split-splat" => {
    _type,
    _key,
    div{
      asset->{
        _id,
        mimeType,
      },
      alt
    },
  }
`;
