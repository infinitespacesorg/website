import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
    name: "aytformSubmission",
    title: "AYT Form Submission",
    type: "document",
    fields: [
        defineField({
            name: "firstName",
            title: "First Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "lastName",
            title: "Last Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "creativeType",
            title: "Creative Type",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "album2025",
            title: "Album 2025",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
              list: ["pending", "approved", "rejected"],
            },
            initialValue: "pending",
          }),
        orderRankField({ type: "aytformSubmission" }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
        },
    },
});