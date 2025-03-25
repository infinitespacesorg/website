import { defineField, defineType } from "sanity";
import { TextSelect } from "lucide-react";

export default defineType({
  name: "hero-text-background-image",
  title: "Hero Text Background Image",
  type: "object",
  icon: TextSelect,
  fields: [
    defineField({
      name: "text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
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
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Text Background Image",
        subtitle: title,
      };
    },
  },
});