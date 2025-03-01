import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "testform",
  title: "Test Form",
  type: "document",
  fields: [
    defineField({
      name: "first_name",
      type: "string",
    }),
    defineField({
      name: "last_name",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "phoneNumber",
      type: "string",
    }),
    orderRankField({ type: "testform" }),
  ],

  preview: {
    select: {
      title: "name",
    },
  },
});