import { defineField, defineType } from "sanity";
import { Presentation } from "lucide-react";

export default defineType({
  name: "all-past-projects",
  type: "object",
  title: "All Past Projects",
  description: "A list of all past projects",
  icon: Presentation,
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
  ],
  preview: {
    prepare() {
      return {
        title: "All Past Projects",
      };
    },
  },
});