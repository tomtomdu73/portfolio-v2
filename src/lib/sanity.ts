import { PortableTextBlock, groq } from 'next-sanity'
import { Image } from 'sanity'

import { client } from '@/sanity/lib/client'

export interface Testimonial {
  id: string
  name: string
  bio: string
  review: PortableTextBlock[]
}

export interface Product {
  id: string
  name: string
  bio: string
  review: PortableTextBlock[]
}

export interface ExperienceType {
  id: string
  title: string
  company: string
  description: PortableTextBlock[]
  startDate: string
  endDate?: string
  location: string
  stacks: string[]
  logo: Image
}

export interface ProjectType {
  id: string
  title: string
  description: string
  logo: Image
  stacks: string[]
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
export async function getProducts(): Promise<Product[]> {
  return client.fetch<Product[]>(
    groq`*[_type == "product"] {
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
export async function getExperiences(): Promise<ExperienceType[]> {
  return client.fetch<ExperienceType[]>(
    groq`*[_type == "experience"] {
          "id": _id,
          title,
          company,
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
export async function getProjects(): Promise<ProjectType[]> {
  return client.fetch<ProjectType[]>(
    groq`*[_type == "project"] {
          "id": _id,
          title,
          description,
          logo,
          stacks,
    }`
  )
}
