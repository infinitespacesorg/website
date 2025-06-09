import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "basic-block-content",
  type: "object",
  icon: TextQuote,
  title: "Basic Block Content",
  description: "A basic block content element to add various content.",
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "customTailwind",
      title: 'Custom Tailwind',
      type: "string",
      description: 'add your own custom Tailwind here to modify the styling of this block'
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Basic Block Content",
      };
    },
  },
});