import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

// Force Node.js runtime (not edge) — File/FormData streaming is more reliable
export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    // Verify the blob token is present at runtime
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage not configured (BLOB_READ_WRITE_TOKEN missing).' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Clean filename: strip path, sanitize, add timestamp for uniqueness
    const originalName = file.name.split('/').pop() || 'photo'
    const cleanName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
    const timestamp = Date.now()
    const filename = `vendor-submissions/${timestamp}-${cleanName}`

    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return NextResponse.json({ url: blob.url }, { status: 200 })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: `Upload failed: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    )
  }
}
