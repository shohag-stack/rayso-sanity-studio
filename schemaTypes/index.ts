import {defineType, defineField} from 'sanity'

export const template = defineType({
  name: 'template',
  title: 'Template',
  type: 'document',

  fields: [
    // BASIC INFO
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),



    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
    }),

    defineField({
        name: "liveLink",
        title: "Live Link",
        type: "url",
    }),

    defineField({
        name: "purchaseLink",
        title: "Purchase Link",
        type: "url",
    }),
    defineField({
      name:"videoUrl",
      title: "Video Preview",
      type: "url",
    }),

    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          {title: 'Free', value: 'free'},
          {title: 'Premium', value: 'premium'},
        ],
      },
    }),

    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),

    // IMAGE
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // STACK ARRAY
    defineField({
      name: 'stack',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
  name: "categories",
  title: "Categories",
  type: "array",
  of: [
    {
      type: "string",
      options: {
        list: [
          { title: "Free", value: "free" },
          { title: "Premium", value: "premium" },
          { title: "Real Estate", value: "real-estate" },
          { title: "Home Services", value: "home-services" },
          { title: "Mortgage", value: "mortgage" },
          { title: "Next.js", value: "nextjs" },
        ],
      },
    },
  ],
  validation: (Rule) =>
    Rule.custom((values: string[] | undefined) => {
      const allowed = [
        "free",
        "premium",
        "real-estate",
        "home-services",
        "mortgage",
        "nextjs",
      ];

      if (!values) return true;

      const invalid = values.find((v) => !allowed.includes(v));

      return invalid
        ? `Invalid category: ${invalid}`
        : true;
    }),
}),

    // STATS ARRAY
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'num',
              type: 'string',
              title: 'Number',
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
            },
          ],
        },
      ],
    }),

    // FEATURES ARRAY
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'desc',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    }),

    defineField({
  name: "status",
  title: "Status",
  type: "string",
  options: {
    list: [
      { title: "Live", value: "live" },
      { title: "Coming Soon", value: "coming-soon" },
    ],
    layout: "radio",
  },
  initialValue: "live",
})
  ],
})
