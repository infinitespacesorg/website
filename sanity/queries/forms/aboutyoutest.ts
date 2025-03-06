import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const aboutYouTestQuery = groq`
  _type == "about-you-test" => {
    _type,
    _key,
    padding,
    colorVariant,
    stackAlign,
    consentText,
    buttonText,
    successMessage,
    formField1,
    formField2,
    formField3,
    formField4,
    formField5
  }
`;