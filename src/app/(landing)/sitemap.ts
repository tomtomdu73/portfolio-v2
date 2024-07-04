import { MetadataRoute } from 'next'

type SitemapItem = {
  url: string
  lastModified?: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: SitemapItem[] = []

  //add static pages
  sitemap.push({
    url: 'https://cosialls.fr',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  })

  return sitemap
}
