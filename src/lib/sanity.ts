import { PortableTextBlock, groq } from 'next-sanity'
import { Image } from 'sanity'

import { client } from '@/sanity/lib/client'

export interface Testimonial {
  id: string
  name: string
  bio: string
  review: PortableTextBlock[]
}

export interface BaseEntryType {
  id: string
  title: string
  description: string
  externalUrl?: string
  videoUrl?: string
  endDate?: string
}

export interface ProductType extends BaseEntryType {
  review: PortableTextBlock[]
}

export interface ExperienceType extends BaseEntryType {
  company: string
  startDate: string
  location: string
  stacks: string[]
  logo: Image
}

export interface ClientType extends BaseEntryType {
  logo: Image
  stacks: string[]
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch<Testimonial[]>(
    groq`*[_type == "testimony"] {
        "id": _id,
        title,
        description,
        externalUrl,
        review[]{
            ...,
            markDefs[]{
                ...
            }
        },
    }`
  )
}

export async function getProducts(): Promise<ProductType[]> {
  return client.fetch<ProductType[]>(
    groq`*[_type == "product"] {
          "id": _id,
          title,
          description,
          externalUrl,
          videoUrl,
          image
    }`
  )
}
export async function getExperiences(): Promise<ExperienceType[]> {
  return client.fetch<ExperienceType[]>(
    groq`*[_type == "experience"] {
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
    }`
  )
}
export async function getClients(): Promise<ClientType[]> {
  return client.fetch<ClientType[]>(
    groq`*[_type == "client"] | order(endDate desc){
          "id": _id,
          title,
          description,
          externalUrl,
          logo,
          stacks,
          endDate
    }`
  )
}
