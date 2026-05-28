import { MetadataRoute } from 'next'
import { getAllVendorSlugs, getAllCities, getAllStates, getAllBlogSlugs } from '@/lib/data'
import { CATEGORIES, SITE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [vendorSlugs, cities, states, blogSlugs] = await Promise.all([
    getAllVendorSlugs(),
    getAllCities(),
    getAllStates(),
    getAllBlogSlugs(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/states`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/categories`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/get-quotes`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/add-your-listing`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const statePages: MetadataRoute.Sitemap = states.map(s => ({
    url: `${SITE_URL}/states/${s.state_slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const cityPages: MetadataRoute.Sitemap = cities.map(c => ({
    url: `${SITE_URL}/states/${c.state_slug}/${c.city_slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const vendorPages: MetadataRoute.Sitemap = vendorSlugs.map(v => ({
    url: `${SITE_URL}/vendors/${v.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(c => ({
    url: `${SITE_URL}/categories/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(b => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...statePages, ...cityPages, ...vendorPages, ...categoryPages, ...blogPages]
}
