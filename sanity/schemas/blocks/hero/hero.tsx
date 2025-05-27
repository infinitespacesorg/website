import { defineField, defineType } from "sanity";
import { DiamondPlus } from "lucide-react";
import { FLEX_VARIANTS, SIZE_VARIANTS } from "../shared/layout-variants";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: DiamondPlus,
  fieldsets: [
        {
          name: "tagline",
          title: "Tagline",
          options: {
            collapsible: true,
            collapsed: true,
            modal: { type: 'popover'}
          }
        },
        {
          name: "title",
          title: "Title",
          options: {
            collapsible: true,
            collapsed: false,
            modal: { type: 'popover'}
          }
        },
        {
          name: "body",
          title: "Body Text",
          options: {
            collapsible: true,
            collapsed: true,
            modal: { type: 'popover'}
          }
        },
        {
          name: "images",
          title: "Images",
          options: {
            collapsible: true,
            collapsed: true,
            modal: { type: 'popover'}
          }
        },
        {
          name: "other",
          title: "Other",
          options: {
            collapsible: true,
            collapsed: true,
            modal: { type: 'popover'}
          }
        },

      ],
  fields: [
    defineField({
      name: "tagLine",
      type: "string",
      fieldset: 'tagline'
    }),
    defineField({
      name: "taglineSize",
      title: 'Tagline Size',
      fieldset: 'tagline',
      type: "string",
      options: {
        list: SIZE_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "dropdown",
      },
      initialValue: "text-lg",
    }),
    defineField({
      name: "taglineColorVariant",
      fieldset: 'tagline',
      type: "color-variant",
      title: "Color Variant",
      description: "Select a tagline color variant",
    }),
    defineField({
      name: "title",
      type: "string",
      fieldset: 'title',
    }),
    defineField({
      name: "titleSize",
      fieldset: 'title',
      title: 'Title Size',
      type: "string",
      options: {
        list: SIZE_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "dropdown",
      },
      initialValue: "text-3xl",
    }),
    defineField({
      name: "titleBackgroundImage",
      fieldset: 'title',
      title: "Title Background Image",
      type: "image",
      description: 'Use this to optionally use a background image to the title.',
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "titleColorVariant",
      type: "color-variant",
      fieldset: 'title',
      title: "Title Color Variant",
      description: "Select a title color variant",
    }),
    defineField({
      name: "titleCustomGradient",
      type: "string",
      fieldset: 'title',
      description: "Use this field to write custom Tailwind for a gradient. For example: 'bg-linear-to-l from-blue-500 to-red-500'. If this field is not empty, classes 'bg-clip-text text-transparent' will be applied to accommodate gradients.",
    }),
    defineField({
      name: "body",
      type: "string",
      fieldset: 'body',
    }),
    defineField({
      name: "bodySize",
      title: 'Body Size',
      fieldset: 'body',
      type: "string",
      options: {
        list: SIZE_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "dropdown",
      },
      initialValue: "text-base",
    }),
    defineField({
      name: "bodyColorVariant",
      fieldset: 'body',
      type: "color-variant",
      title: "Color Variant",
      description: "Select a body color variant",
    }),
    defineField({
      name: "bodyCustomGradient",
      type: "string",
      fieldset: 'body',
      description: "Use this field to write custom Tailwind for a gradient. For example: 'bg-linear-to-l from-blue-500 to-red-500'. If this field is not empty, classes 'bg-clip-text text-transparent' will be applied to accommodate gradients.",
    }),
    defineField({
      name: "image",
      fieldset: 'images',
      title: "Image",
      type: "image",
      description: 'Use this to optionally include an image element.',
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "backgroundImage",
      fieldset: 'images',
      title: "Background Image",
      type: "image",
      description: 'Use this to optionally use a background image for the entire block.',
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "backgroundColorVariant",
      type: "color-variant",
      title: "Background Color Variant",
      description: "Select a background color variant",
      fieldset: 'other'
    }),
    defineField({
      name: "globalTextColorVariant",
      type: "color-variant",
      title: "Global Text Color Variant",
      description: "Select a color variant for all text - feel free to leave other Color Variant values blank if you select anything other than 'None'.",
      fieldset: 'other'
    }),
    defineField({
        name: 'globalTextAlign',
        type: 'string',
        title: 'Global Text Align',
        description: 'Set the text-align for all text in the hero block',
        fieldset: 'other',
        options: {
            list: [{ title: "left", value: "text-left" },{ title: "center", value: "text-center" },{ title: "right", value: "text-right" },],
            layout: 'radio'
        },
        initialValue: "text-center"
    }),
    defineField({
      name: "flexType",
      type: "string",
      options: {
        list: FLEX_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "flex-row",
      fieldset: 'other'
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero",
        subtitle: title,
      };
    },
  },
});