import { defineField, defineType } from "sanity";
import { Calendar1 } from "lucide-react";

export default defineType({
  name: "all-events",
  type: "object",
  title: "All Events",
  description: "A list of all events",
  icon: Calendar1,
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
        title: "All Events",
      };
    },
  },
});