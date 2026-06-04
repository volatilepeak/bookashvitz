import { MetadataRoute } from 'next'
import { getAllVendorSlugs, getAllCities, getAllStates, getAllBlogSlugs } from '@/lib/data'
import { CATEGORIES, SITE_URL, TOP_CITIES } from '@/lib/constants'

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

  // State pages: merge DB states with target city states
  const stateSlugSet: Record<string, boolean> = {}
  states.forEach(s => { stateSlugSet[s.state_slug] = true })
  TOP_CITIES.forEach(c => { stateSlugSet[c.stateSlug] = true })
  const statePages: MetadataRoute.Sitemap = Object.keys(stateSlugSet).map(slug => ({
    url: `${SITE_URL}/states/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // City pages: merge DB cities with target cities
  const cityKeySet: Record<string, boolean> = {}
  cities.forEach(c => { cityKeySet[`${c.state_slug}/${c.city_slug}`] = true })
  TOP_CITIES.forEach(c => { cityKeySet[`${c.stateSlug}/${c.citySlug}`] = true })
  const cityPages: MetadataRoute.Sitemap = Object.keys(cityKeySet).map(key => ({
    url: `${SITE_URL}/states/${key}`,
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
