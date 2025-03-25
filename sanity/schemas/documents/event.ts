import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
    name: "event",
    title: 'Event',
    type: 'document',
    // from Luma - Name, Start DateTime, end DateTime, Address, City, State, Image, Link, Description, Slug
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required().max(120).warning("An event name shouldn't be more than 120 characters"),
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
            name: "startDateTime",
            title: "Start DateTime",
            type: "datetime",
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
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "city",
            title: "City",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "state",
            title: "State",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        // defineField({
        //     name: "description",
        //     title: "Description",
        //     type: "block-content",
        // }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
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
            name: "externalLink",
            title: "External Link",
            type: "url",
            validation: Rule => Rule.required().uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              })
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