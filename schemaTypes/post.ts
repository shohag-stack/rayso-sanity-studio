import {defineArrayMember, defineField, defineType} from 'sanity'

// Keep in sync with src/lib/blog.ts (BLOG_CATEGORIES) in the Next.js site
const BLOG_CATEGORIES = [
  {title: 'Guides', value: 'guides'},
  {title: 'Next.js', value: 'nextjs'},
  {title: 'Sanity CMS', value: 'sanity'},
  {title: 'Design', value: 'design'},
  {title: 'SEO', value: 'seo'},
  {title: 'Small Business', value: 'small-business'},
  {title: 'Migrations', value: 'migrations'},
  {title: 'News', value: 'news'},
]

// Blog post for rayso.studio/blogs. Written by people or by the AI marketer, which saves
// drafts (drafts.<id>) for review. The site only shows posts whose publishedAt has passed,
// so a published post with a future date is a scheduled post.
export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'meta', title: 'Meta'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(110),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'One or two sentences shown on the blog list and in search results.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'URL', validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']})}],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt text'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [{type: 'string', options: {list: BLOG_CATEGORIES}}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'relatedTemplates',
      title: 'Related Templates',
      description: 'Shown under the post as a call to action.',
      type: 'array',
      group: 'content',
      of: [{type: 'reference', to: [{type: 'template'}]}],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      description: 'Defaults to the title.',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      description: 'Defaults to the excerpt.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(170),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'meta',
      initialValue: 'rayso team',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      description: 'The post appears on the site from this time. A future date schedules it.',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aiGenerated',
      title: 'Written by the AI marketer',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      readOnly: true,
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      description: 'Pages the research drew on. Shown at the end of the post.',
      type: 'array',
      group: 'meta',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'url', type: 'url', title: 'URL', validation: (Rule) => Rule.required()},
          ],
          preview: {select: {title: 'title', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  orderings: [
    {title: 'Published, newest', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', media: 'coverImage', date: 'publishedAt', ai: 'aiGenerated'},
    prepare({title, media, date, ai}) {
      const when = date ? new Date(date).toLocaleDateString() : 'No date'
      return {title, media, subtitle: ai ? `${when} · AI draft` : when}
    },
  },
})
