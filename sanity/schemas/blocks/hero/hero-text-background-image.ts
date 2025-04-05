import { defineField, defineType } from "sanity";
import { TextSelect } from "lucide-react";

const SIZE_VARIANTS = [
  {title: '1', value: 'text-lg'},
  {title: '2', value: 'text-xl'},
  {title: '3', value: 'text-2xl'},
  {title: '4', value: 'text-3xl'},
  {title: '5', value: 'text-4xl'},
  {title: '6', value: 'text-5xl'},
  {title: '7', value: 'text-6xl'},
  {title: '8', value: 'text-7xl'},
  {title: '9', value: 'text-8xl'},
  {title: '10', value: 'text-9xl'},
]

export default defineType({
  name: "hero-text-background-image",
  title: "Hero Text Background Image",
  type: "object",
  icon: TextSelect,
  fields: [
    defineField({
      name: "text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: 'size',
      type: 'string',
      options: {
        list: SIZE_VARIANTS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "6",
    })
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Text Background Image",
        subtitle: title,
      };
    },
  },
});