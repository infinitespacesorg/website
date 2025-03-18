import { defineType, defineField } from "sanity"
import { Columns2 } from "lucide-react"
import { FLEX_VARIANTS } from "../shared/layout-variants";

export default defineType({
    name: "hero-flex-text",
    title: "Hero Flex Text",
    type: "object",
    icon: Columns2,
    fields: [
        defineField({
            name: "bigText",
            type: "string",
        }),
        defineField({
            name: "smallerText",
            type: "string",
        }),
        defineField({
            name: "flexType",
            type: "string",
            options: {
                list: FLEX_VARIANTS.map(({ title, value }) => ({ title, value })),
                layout: "radio",
            },
            initialValue: "flex-row",
        }),
        defineField({
            name: "colorVariant",
            type: "color-variant",
            title: "Color Variant",
            description: "Select a background color variant",
          })
    ],
    preview: {
        select: {
            subtitle: "bigText",
        },
        prepare({ subtitle }) {
            return {
                title: "Hero Flex Text",
                subtitle: subtitle,
            };
        },
    },
});