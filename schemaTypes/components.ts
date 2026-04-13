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
              {title: 'Testimonials', value: 'testimonials'},
              {title: 'Accordions', value: 'accordions'},
              {title: 'Features', value: 'features'},
            ],
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((values: string[] | undefined) => {
          const allowed = ['heroes', 'navbars', 'pricing', 'testimonials', 'accordions', 'features']
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
