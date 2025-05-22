import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
    name: "event",
    title: 'Event',
    type: 'document',
    groups: [
        {
          name: "content",
          title: "Content",
        },
        {
          name: "seo",
          title: "SEO",
        },
        {
          name: "settings",
          title: "Settings",
        },
      ],
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            group: 'content',
            validation: (Rule) => Rule.required().max(120).warning("An event name shouldn't be more than 120 characters"),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: 'settings',
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "startDateTime",
            title: "Start DateTime",
            type: "datetime",
            group: 'settings',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
              },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "endDateTime",
            title: "End DateTime",
            type: "datetime",
            group: 'settings',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
                timeStep: 15,
              },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "address",
            title: "Address",
            type: "string",
            group: 'settings',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "city",
            title: "City",
            type: "string",
            group: 'settings',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "state",
            title: "State",
            type: "string",
            group: 'settings',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "block-content",
            group: 'content',
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            group: 'content',
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            group: 'settings',
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
            name: "externalLink",
            title: "External Link",
            type: "url",
            group: 'settings',
            validation: Rule => Rule.required().uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              })
        }),
        defineField({
            name: "meta_title",
            title: "Meta Title",
            type: "string",
            group: "seo",
          }),
          defineField({
            name: "meta_description",
            title: "Meta Description",
            type: "text",
            group: "seo",
          }),
          defineField({
            name: "noindex",
            title: "No Index",
            type: "boolean",
            initialValue: false,
            group: "seo",
          }),
          defineField({
            name: "ogImage",
            title: "Open Graph Image - [1200x630]",
            type: "image",
            group: "seo",
          }),
        orderRankField({ type: "event" }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: 'startDateTime',
            media: "image",
        },
    },
})