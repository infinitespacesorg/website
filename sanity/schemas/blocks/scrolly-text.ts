import { defineField, defineType } from "sanity";
import { AArrowUp } from "lucide-react";

export const FONT_VARIANTS = [
    { title: "Normal", value: "font-sans" },
    { title: "Roboto", value: "font-roboto" },
    { title: 'NM', value: "font-nm" }
];

export const MOTION_VARIANTS = [
    { title: 'Slow', value: 'slow' },
    { title: 'Normal', value: 'normal' },
    { title: 'Fast', value: 'fast' }
]

export default defineType({
    name: "scrolly-text",
    title: "Scrolly Text",
    type: "object",
    icon: AArrowUp,
    fields: [
        defineField({
            name: "text",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "colorVariant",
            type: "color-variant",
            title: "Color Variant",
            description: "Select a background color variant",
        }),
        defineField({
            name: "padding",
            type: "section-padding",
        }),
        defineField({
            name: 'fontVariant',
            type: 'string',
            title: 'Font Variant',
            options: {
                list: FONT_VARIANTS.map(({ title, value }) => ({ title, value })),
                layout: 'radio',
            },
            initialValue: 'font-sans'
        }),
        defineField({
            name: 'motionVariant',
            type: 'string',
            title: 'Motion Variant',
            options: {
                list: MOTION_VARIANTS.map(({ title, value }) => ({ title, value })),
                layout: 'radio',
            },
            initialValue: '1'
        })
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare({ title }) {
            return {
                title: "Scrolly Text",
                subtitle: title,
            };
        },
    },
});