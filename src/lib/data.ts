import { getDb, Vendor, Lead, BlogPost, CityInfo, StateInfo } from './db'

// ── Vendors ──

export async function getFeaturedVendors(): Promise<Vendor[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM vendors
    WHERE status = 'active' AND is_featured = TRUE
    ORDER BY name ASC
    LIMIT 6
  `
  return rows as Vendor[]
}

export async function getVendorBySlug(slug: string): Promise<Vendor | null> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM vendors WHERE slug = ${slug} AND status = 'active' LIMIT 1
  `
  return (rows[0] as Vendor) || null
}

export async function getVendorsByCity(citySlug: string, stateSlug: string): Promise<Vendor[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM vendors
    WHERE city_slug = ${citySlug} AND state_slug = ${stateSlug} AND status = 'active'
    ORDER BY is_featured DESC, is_premium DESC, name ASC
  `
  return rows as Vendor[]
}

export async function getVendorsByState(stateSlug: string): Promise<Vendor[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM vendors
    WHERE state_slug = ${stateSlug} AND status = 'active'
    ORDER BY is_featured DESC, city ASC, name ASC
  `
  return rows as Vendor[]
}

export async function getVendorsByCategory(category: string): Promise<Vendor[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM vendors
    WHERE ${category} = ANY(categories) AND status = 'active'
    ORDER BY is_featured DESC, name ASC
  `
  return rows as Vendor[]
}

export async function getAllVendorSlugs(): Promise<{ slug: string }[]> {
  const sql = getDb()
  const rows = await sql`SELECT slug FROM vendors WHERE status = 'active'`
  return rows as { slug: string }[]
}

export async function getVendorCount(): Promise<number> {
  const sql = getDb()
  const rows = await sql`SELECT COUNT(*) as count FROM vendors WHERE status = 'active'`
  return Number(rows[0].count)
}

// ── Cities ──

export async function getCitiesByState(stateSlug: string): Promise<CityInfo[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT city, city_slug, state, state_slug, state_abbr, COUNT(*) as vendor_count
    FROM vendors
    WHERE state_slug = ${stateSlug} AND status = 'active'
    GROUP BY city, city_slug, state, state_slug, state_abbr
    ORDER BY vendor_count DESC, city ASC
  `
  return rows as CityInfo[]
}

export async function getCityInfo(citySlug: string, stateSlug: string): Promise<CityInfo | null> {
  const sql = getDb()
  const rows = await sql`
    SELECT city, city_slug, state, state_slug, state_abbr, COUNT(*) as vendor_count
    FROM vendors
    WHERE city_slug = ${citySlug} AND state_slug = ${stateSlug} AND status = 'active'
    GROUP BY city, city_slug, state, state_slug, state_abbr
    LIMIT 1
  `
  return (rows[0] as CityInfo) || null
}

export async function getPopularCities(limit: number = 12): Promise<CityInfo[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT city, city_slug, state, state_slug, state_abbr, COUNT(*) as vendor_count
    FROM vendors
    WHERE status = 'active'
    GROUP BY city, city_slug, state, state_slug, state_abbr
    ORDER BY vendor_count DESC, city ASC
    LIMIT ${limit}
  `
  return rows as CityInfo[]
}

export async function getAllCities(): Promise<CityInfo[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT city, city_slug, state, state_slug, state_abbr, COUNT(*) as vendor_count
    FROM vendors
    WHERE status = 'active'
    GROUP BY city, city_slug, state, state_slug, state_abbr
    ORDER BY state ASC, city ASC
  `
  return rows as CityInfo[]
}

export async function getCityCount(): Promise<number> {
  const sql = getDb()
  const rows = await sql`
    SELECT COUNT(DISTINCT city_slug || '-' || state_slug) as count
    FROM vendors WHERE status = 'active'
  `
  return Number(rows[0].count)
}

// ── States ──

export async function getAllStates(): Promise<StateInfo[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT state, state_slug, state_abbr,
      COUNT(*) as vendor_count,
      COUNT(DISTINCT city_slug) as city_count
    FROM vendors
    WHERE status = 'active'
    GROUP BY state, state_slug, state_abbr
    ORDER BY state ASC
  `
  return rows as StateInfo[]
}

export async function getStateInfo(stateSlug: string): Promise<StateInfo | null> {
  const sql = getDb()
  const rows = await sql`
    SELECT state, state_slug, state_abbr,
      COUNT(*) as vendor_count,
      COUNT(DISTINCT city_slug) as city_count
    FROM vendors
    WHERE state_slug = ${stateSlug} AND status = 'active'
    GROUP BY state, state_slug, state_abbr
    LIMIT 1
  `
  return (rows[0] as StateInfo) || null
}

// ── Blog ──

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM blog_posts
    WHERE status = 'published'
    ORDER BY published_at DESC
  `
  return rows as BlogPost[]
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM blog_posts WHERE slug = ${slug} AND status = 'published' LIMIT 1
  `
  return (rows[0] as BlogPost) || null
}

export async function getAllBlogSlugs(): Promise<{ slug: string }[]> {
  const sql = getDb()
  const rows = await sql`SELECT slug FROM blog_posts WHERE status = 'published'`
  return rows as { slug: string }[]
}

export async function getRelatedVendors(vendorId: string, citySlug: string, stateSlug: string, limit = 3): Promise<Vendor[]> {
  const sql = getDb()
  // Try same city first, then fall back to same state
  const rows = await sql`
    SELECT * FROM vendors
    WHERE id != ${vendorId} AND status = 'active'
    ORDER BY
      CASE WHEN city_slug = ${citySlug} THEN 0 ELSE 1 END,
      CASE WHEN state_slug = ${stateSlug} THEN 0 ELSE 1 END,
      is_featured DESC, rating DESC NULLS LAST
    LIMIT ${limit}
  `
  return rows as Vendor[]
}

// ── Leads ──

export async function createLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
  const sql = getDb()
  const rows = await sql`
    INSERT INTO leads (name, email, phone, event_type, event_date, guest_count, city, state, service_type, message, source_page)
    VALUES (${lead.name}, ${lead.email}, ${lead.phone}, ${lead.event_type}, ${lead.event_date}, ${lead.guest_count}, ${lead.city}, ${lead.state}, ${lead.service_type}, ${lead.message}, ${lead.source_page})
    RETURNING *
  `
  return rows[0] as Lead
}
