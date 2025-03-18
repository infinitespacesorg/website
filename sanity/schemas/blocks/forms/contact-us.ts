import { defineField, defineType } from "sanity";
import { Clipboard } from "lucide-react";
import { STACK_ALIGN } from "../shared/layout-variants";

export default defineType({
  name: "contact-us-form",
  type: "object",
  title: "Contact Us Form",
  description:
    "A test form - tell me about yourself.",
  icon: Clipboard,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "stackAlign",
      type: "string",
      title: "Stack Layout Alignment",
      options: {
        list: STACK_ALIGN.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
        name: "formField1",
        type: "string",
        initialValue: "Name:",
    }),
    defineField({
        name: "formField2",
        type: "string",
        initialValue: "Email address:",
    }),
    defineField({
        name: 'formField3',
        type: "string",
        initialValue: "Website / url:",
    }),
    defineField({
        name: 'formField4',
        type: "string",
        initialValue: "Message:",
    }),
    defineField({
      name: "consentText",
      type: "text",
      initialValue:
        "By submitting this form, you agree to the terms and conditions.",
    }),
    defineField({
      name: "buttonText",
      type: "string",
      initialValue: "Submit",
    }),
    defineField({
      name: "successMessage",
      type: "text",
      initialValue: "Thank you for your submission!",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Us Form",
      };
    },
  },
});