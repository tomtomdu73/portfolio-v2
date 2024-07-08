import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'
import { QueryParams } from 'sanity'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
})

export async function sanityFetch<T>({
  query,
  qParams = {},
  tags,
}: {
  query: string
  qParams?: QueryParams
  tags: string[]
}): Promise<T> {
  return client.fetch<T>(query, qParams, {
    cache: process.env.VERCEL_ENV === 'development' ? 'no-store' : 'force-cache',
    next: { tags },
  })
}
