import { defineField, defineType } from "sanity";
import { Clipboard } from "lucide-react";
import { STACK_ALIGN } from "../shared/layout-variants";

export default defineType({
  name: "about-you-test",
  type: "object",
  title: "About You",
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
    }),
    defineField({
        name: "formField2",
        type: "string",
    }),
    defineField({
        name: 'formField3',
        type: "string",
    }),
    defineField({
        name: 'formField4',
        type: "string",
    }),
    defineField({
        name: 'formField5',
        type: "string",
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
        title: "About You",
      };
    },
  },
});