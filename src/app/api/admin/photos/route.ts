import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const sql = getDb()
    const vendors = await sql`
      SELECT id, name, slug, city, state_abbr, photo_url
      FROM vendors
      WHERE status = 'active'
      ORDER BY
        (photo_url IS NULL OR photo_url = '') DESC,
        (COALESCE(rating, 0) * COALESCE(reviews, 0)) DESC NULLS LAST,
        name ASC
    `
    return NextResponse.json({ vendors }, { status: 200 })
  } catch (error) {
    console.error('Admin photos GET error:', error)
    return NextResponse.json({ error: 'Failed to load vendors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vendor_id, photo_url } = body

    if (!vendor_id) {
      return NextResponse.json({ error: 'vendor_id is required' }, { status: 400 })
    }

    const sql = getDb()
    // photo_url can be null (to clear), a blob URL, or a self-hosted /vendors/ path
    const result = await sql`
      UPDATE vendors
      SET photo_url = ${photo_url || null},
          updated_at = NOW()
      WHERE id = ${vendor_id}
      RETURNING id, name, photo_url
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, vendor: result[0] }, { status: 200 })
  } catch (error) {
    console.error('Admin photos POST error:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
