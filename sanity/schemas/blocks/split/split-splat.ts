import { defineField, defineType } from "sanity";
import { Info } from "lucide-react";

export default defineType({
  name: "split-splat",
  type: "object",
  icon: Info,
  description: "Column with splat.",
  fields: [
    defineField({
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "image.alt",
    },
    prepare({ title }) {
      return {
        title: title || "No Title",
      };
    },
  },
});
