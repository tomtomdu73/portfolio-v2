import { PortableTextBlock, groq } from 'next-sanity'
import { Image } from 'sanity'

import { sanityFetch } from '@/sanity/lib/client'

export interface BaseEntryType {
  id: string
  title: string
  description: string
  externalUrl?: string
  videoUrl?: string
  startDate?: string
  endDate?: string
  company?: string
  location?: string
}

export const hookSecret = process.env.SANITY_HOOK_SECRET

export interface ProductType extends BaseEntryType {
  image?: Image
}

export interface ExperienceType extends BaseEntryType {
  stacks: string[]
  logo: Image
}

export interface ClientType extends BaseEntryType {
  stacks: string[]
  logo: Image
}

export async function getProducts(): Promise<ProductType[]> {
  return sanityFetch<ProductType[]>({
    query: groq`*[_type == "product"] | order(startDate desc) {
          "id": _id,
          title,
          description,
          externalUrl,
          videoUrl,
          image,
          startDate
    }`,
    tags: ['product'],
  })
}
export async function getExperiences(): Promise<ExperienceType[]> {
  return sanityFetch<ExperienceType[]>({
    query: groq`*[_type == "experience"] {
          "id": _id,
          title,
          description,
          externalUrl,
          company,
          logo,
          location,
          startDate,
          endDate,
          stacks,
    }`,
    tags: ['experience'],
  })
}
export async function getClients(): Promise<ClientType[]> {
  return sanityFetch<ClientType[]>({
    query: groq`*[_type == "client"] | order(endDate desc){
          "id": _id,
          title,
          description,
          externalUrl,
          logo,
          stacks,
          endDate
    }`,
    tags: ['client'],
  })
}
