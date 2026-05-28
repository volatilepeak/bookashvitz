import { neon } from '@neondatabase/serverless'

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(process.env.DATABASE_URL)
}

// Types
export interface Vendor {
  id: string
  name: string
  slug: string
  description: string | null
  phone: string | null
  email: string | null
  website: string | null
  instagram: string | null
  city: string
  city_slug: string
  state: string
  state_slug: string
  state_abbr: string
  zip_code: string | null
  service_area: string | null
  latitude: number | null
  longitude: number | null
  categories: string[]
  price_range: string | null
  min_guests: number | null
  max_guests: number | null
  setup_types: string | null
  photo_url: string | null
  photos: string[]
  is_premium: boolean
  is_verified: boolean
  is_featured: boolean
  listing_tier: string
  claimed: boolean
  claimed_by_email: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  event_type: string | null
  event_date: string | null
  guest_count: number | null
  city: string | null
  state: string | null
  service_type: string | null
  message: string | null
  source_page: string | null
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  author: string
  status: string
  published_at: string
  created_at: string
  updated_at: string
}

export interface CityInfo {
  city: string
  city_slug: string
  state: string
  state_slug: string
  state_abbr: string
  vendor_count: number
}

export interface StateInfo {
  state: string
  state_slug: string
  state_abbr: string
  vendor_count: number
  city_count: number
}
