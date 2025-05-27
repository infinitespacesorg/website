import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";
import { FLEX_VARIANTS, SIZE_VARIANTS } from "../shared/layout-variants";


export default defineType({
  name: "superhero",
  title: "Super Hero",
  type: "object",
  icon: LayoutTemplate,
  groups: [
        {
          name: "tagline",
          title: "Tagline",
        },
        {
          name: "title",
          title: "Title",
        },
        {
          name: "body",
          title: "Body Text",
        },
        {
          name: "images",
          title: "Images",
        },
        {
          name: "other",
          title: "Other",
        },

      ],
  fields: [
    defineField({
      name: "tagLine",
      type: "string",
      group: 'tagline'
    }),
    defineField({
      name: "taglineSize",
      title: 'Tagline Size',
      group: 'tagline',
      type: "string",
      options: {
        list: SIZE_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "dropdown",
      },
      initialValue: "text-lg",
    }),
    defineField({
      name: "taglineColorVariant",
      group: 'tagline',
      type: "color-variant",
      title: "Color Variant",
      description: "Select a tagline color variant",
    }),
    defineField({
      name: "title",
      type: "string",
      group: 'title',
    }),
    defineField({
      name: "titleSize",
      group: 'title',
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
      group: 'title',
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
      group: 'title',
      title: "Title Color Variant",
      description: "Select a title color variant",
    }),
    defineField({
      name: "body",
      type: "string",
      group: 'body',
    }),
    defineField({
      name: "bodySize",
      title: 'Body Size',
      group: 'body',
      type: "string",
      options: {
        list: SIZE_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "dropdown",
      },
      initialValue: "text-base",
    }),
    defineField({
      name: "bodyColorVariant",
      group: 'body',
      type: "color-variant",
      title: "Color Variant",
      description: "Select a body color variant",
    }),
    defineField({
      name: "image",
      group: 'images',
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
      group: 'images',
      title: "Background Image",
      type: "image",
      description: 'Use this to optionally use a background image.',
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "globalTextColorVariant",
      type: "color-variant",
      title: "Global Text Color Variant",
      description: "Select a color variant for all text - feel free to leave other Color Variant values blank if you select anything other than 'None'.",
      group: 'other'
    }),
    defineField({
        name: 'globalTextAlign',
        type: 'string',
        title: 'Global Text Align',
        description: 'Set the text-align for all text in the hero block',
        group: 'other',
        options: {
            list: [{ title: "left", value: "text-left" },{ title: "center", value: "text-center" },{ title: "right", value: "text-right" },],
            layout: 'radio'
        },
        initialValue: "text-center"
    }),
    defineField({
      name: "backgroundColorVariant",
      type: "color-variant",
      title: "Background Color Variant",
      description: "Select a background color variant",
      group: 'other'
    }),
    defineField({
      name: "flexType",
      type: "string",
      options: {
        list: FLEX_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "flex-row",
      group: 'other'
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Super Hero",
        subtitle: title,
      };
    },
  },
});
