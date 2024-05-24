import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemaTypes/blockContent'
import stack from './schemaTypes/stack'
import project from './schemaTypes/project'
import testimony from './schemaTypes/testimony'
import experience from './schemaTypes/experience'
import product from './schemaTypes/product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, experience, product, testimony, stack, blockContent],
}
