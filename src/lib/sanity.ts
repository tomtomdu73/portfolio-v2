import { PortableTextBlock, groq } from 'next-sanity'
import { Image } from 'sanity'

import { client } from '@/sanity/lib/client'

export interface Testimonial {
  id: string
  name: string
  bio: string
  review: PortableTextBlock[]
}

export interface ProductType {
  id: string
  name: string
  bio: string
  review: PortableTextBlock[]
}

export interface ExperienceType {
  id: string
  title: string
  company: string
  companyUrl?: string
  description: PortableTextBlock[]
  startDate: string
  endDate?: string
  location: string
  stacks: string[]
  logo: Image
}

export interface ClientType {
  id: string
  title: string
  description: string
  logo: Image
  stacks: string[]
  endDate: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch<Testimonial[]>(
    groq`*[_type == "testimony"] {
          "id": _id,
          name,
          bio,
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
          company,
          companyUrl,
          logo,
          location,
          description[]{
              ...,
              markDefs[]{
                  ...
              }
          },
          startDate,
          endDate,
          stacks,
    }`
  )
}
export async function getClients(): Promise<ClientType[]> {
  return client.fetch<ClientType[]>(
    groq`*[_type == "client"] {
          "id": _id,
          title,
          description,
          logo,
          stacks,
          endDate
    }`
  )
}
