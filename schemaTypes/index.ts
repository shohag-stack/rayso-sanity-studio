import {defineType, defineField} from 'sanity'

// Keep in sync with src/lib/categories.ts in the Next.js site
const TEMPLATE_CATEGORIES = [
  // Pricing
  {title: 'Free', value: 'free'},
  {title: 'Premium', value: 'premium'},
  // Platform
  {title: 'Next.js', value: 'nextjs'},
  {title: 'Framer', value: 'framer'},
  {title: 'Astro', value: 'astro'},
  // Business
  {title: 'Real Estate', value: 'real-estate'},
  {title: 'Mortgage & Finance', value: 'mortgage'},
  {title: 'Home Services', value: 'home-services'},
  {title: 'Hotel & Resort', value: 'hotel'},
  {title: 'Restaurant & Food', value: 'restaurant'},
  {title: 'Automotive', value: 'automotive'},
  {title: 'Portfolio', value: 'portfolio'},
  {title: 'Photography', value: 'photography'},
  {title: 'Agency', value: 'agency'},
  {title: 'Blog & Magazine', value: 'blog-magazine'},
  {title: 'SaaS & Startup', value: 'saas'},
  {title: 'Health & Wellness', value: 'health'},
  {title: 'Legal & Consulting', value: 'consulting'},
  {title: 'Solar & Energy', value: 'solar-energy'},
]

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

    defineField({
      name: 'heroFeatured',
      title: 'Show in home page hero',
      description:
        'Shown inside the browser frame on the home page (video if set, otherwise the featured image). If several are on, the most recently edited wins.',
      type: 'boolean',
      initialValue: false,
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
        list: TEMPLATE_CATEGORIES,
      },
    },
  ],
  validation: (Rule) =>
    Rule.custom((values: string[] | undefined) => {
      const allowed = TEMPLATE_CATEGORIES.map((c) => c.value);

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
}),

    // ─── SALES & DELIVERY ─────────────────────────────────────
    defineField({
      name: 'lsVariantId',
      title: 'Lemon Squeezy Variant ID',
      description:
        'The one-time variant this template is sold as. Its attached ZIP is what buyers and members download.',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^\d+$/, {name: 'numeric ID'}).error('Use the numeric variant ID, e.g. 2190600'),
    }),

    defineField({
      name: 'includedInMembership',
      title: 'Included in All-Access',
      description: 'Members can download this template without buying it.',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'deliveryType',
      title: 'Delivery',
      type: 'string',
      options: {
        list: [
          {title: 'ZIP file (from Lemon Squeezy)', value: 'file'},
          {title: 'Link (e.g. Framer remix)', value: 'link'},
        ],
        layout: 'radio',
      },
      initialValue: 'file',
    }),

    defineField({
      name: 'deliveryLink',
      title: 'Delivery Link',
      description: 'Only shown to people who bought this template or are members.',
      type: 'url',
      hidden: ({parent}) => parent?.deliveryType !== 'link',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {deliveryType?: string} | undefined
          return parent?.deliveryType === 'link' && !value
            ? 'A link is required when delivery is "Link"'
            : true
        }),
    }),

    defineField({
      name: 'version',
      title: 'Version',
      description: 'Shown on the template page, e.g. 1.0.0',
      type: 'string',
    }),

  ],
})
