import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const contactUsFormQuery = groq`
  _type == "contact-us-form" => {
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
  }
`;