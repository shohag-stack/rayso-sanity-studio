import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {template} from './schemaTypes'
import { components } from './schemaTypes/components'

export default defineConfig({
  name: 'default',
  title: 'rayso-studio',

  projectId: '8nqi1w1n',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [template, components],
  },
})
