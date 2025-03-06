import { PAGE_QUERYResult } from "@/sanity.types";

type AboutYouTestProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "about-you-test" }
>;

export default function AboutYouTest ({padding, colorVariant, stackAlign, consentText, buttonText, successMessage, formField1, formField2, formField3, formField4, formField5}: AboutYouTestProps) {
    return (
        <div>
            <p>{formField1}</p>
            <p>{formField2}</p>
            <p>{formField3}</p>
            <p>{formField4}</p>
            <p>{formField5}</p>
        </div>
    )
}