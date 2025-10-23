import { groq } from "next-sanity";
import { splitContentQuery } from "./split-content";
import { splitCardsListQuery } from "./split-cards-list";
import { splitImageQuery } from "./split-image";
import { splitSplatQuery } from "./split-splat";
import { splitInfoListQuery } from "./split-info-list";

// @sanity-typegen-ignore
export const splitRowQuery = groq`
  _type == "split-row" => {
    _type,
    _key,
    padding,
    colorVariant,
    noGap,
    mobileFlip,
    splitColumns[]{
      ${splitContentQuery},
      ${splitCardsListQuery},
      ${splitImageQuery},
      ${splitSplatQuery},
      ${splitInfoListQuery},
    },
  }
`;
