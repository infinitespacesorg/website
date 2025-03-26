import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
    name: "team-member",
    title: 'Team Member',
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
            name: "jobTitle",
            title: "Job Title",
            type: "string",
        }),
        defineField({
            name: "bio",
            title: "Bio",
            type: "text",
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
        }),
        defineField({
            name: 'showOnAboutPage',
            title: "Show on About Page?",
            type: 'boolean',
            initialValue: false,
        }),
        orderRankField({ type: "team-member" }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
        },
    },
})