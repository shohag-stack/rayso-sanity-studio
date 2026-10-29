import {defineField, defineType} from 'sanity'

// schemas/component.ts
export const components = defineType({
  name: 'component',
  title: 'Component',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Component Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'One or two sentences for the component page and Google results. Leave empty to use an auto-generated line.',
      validation: (Rule) => Rule.max(200).warning('Google shows roughly the first 160 characters.'),
    }),

    defineField({
      name: 'template',
      title: 'Source template',
      type: 'reference',
      to: [{type: 'template'}],
      description:
        'The template this section comes from. Its page links to that template, and the template page lists this section.',
    }),

    defineField({
      name:"video",
      title: "Video URL",
      type: "string"
    }),

    defineField({
        name: "preview",
        title: "Preview Image",
        type: "image"
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Heroes', value: 'heroes'},
              {title: 'Navbars', value: 'navbars'},
              {title: 'Pricing', value: 'pricing'},
              {title: 'Faq"s', value: 'faqs'},
              {title: 'Testimonials', value: 'testimonials'},
              {title: 'Accordions', value: 'accordions'},
              {title: 'Features', value: 'features'},
              {title: "Carousel", value: "carousel"},
              {title: "Footers", value: "footers"},
              {title: "Animation", value: "animation"},
              {title: "Call to Action", value: "cta"},
              {title: "Gallery", value: "gallery"}
            ],
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((values: string[] | undefined) => {
          const allowed = ['heroes', 'navbars', 'pricing', 'faqs', 'testimonials', 'accordions', 'features', 'carousel', "footers", "animation", "cta", "gallery"]
          if (!values) return true

          const invalid = values.find((v) => !allowed.includes(v))

          return invalid ? `Invalid category: ${invalid}` : true
        }),
    }),

    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
    }),
  ],
})
