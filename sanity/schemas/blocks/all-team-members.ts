import { defineField, defineType } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "all-team-members",
  type: "object",
  title: "All Team Members",
  description: "A list of all team members",
  icon: Users,
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
        title: "All Team Members",
      };
    },
  },
});