import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const basicBlockContentQuery = groq`
  _type == "basic-block-content" => {
    _type,
    _key,
    padding,
    customTailwind,
    body[]{
      ...,
        children[]{
        ...
      }
    }
  }
`;
