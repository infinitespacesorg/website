import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
    name: "pastProject",
    title: 'Past Project',
    type: 'document',
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "teamMember",
            title: "Team Member",
            type: "reference",
            to: { type: "teamMember" },
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            placeholder: 'Paragraph about this experience, the tech, the scale, etc.'
        }),
        defineField({
            name: "impact",
            title: "Impact",
            type: "text",
            placeholder: "How does this past project impact what you are bringing to Infinite Spaces?"
        }),
        defineField({
            name: 'associatedLink',
            title: 'Personal Website / Linkto',
            type: "url",
            validation: Rule => Rule.uri({
                scheme: ['http', 'https']
              })
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true
            },
            fields: [
                defineField({
                    name: "alt",
                    type: "string",
                    title: "Alternative Text",
                }),
            ],
            validation: (Rule) => Rule.required(),
        }),
        orderRankField({ type: "pastProject" }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
        },
    },
})