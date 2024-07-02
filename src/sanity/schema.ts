import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemaTypes/blockContent'
import stack from './schemaTypes/stack'
import testimony from './schemaTypes/testimony'
import experience from './schemaTypes/experience'
import product from './schemaTypes/product'
import client from './schemaTypes/client'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [client, experience, product, testimony, stack, blockContent],
}
