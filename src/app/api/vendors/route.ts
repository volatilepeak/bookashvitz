import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { sendVendorSubmissionNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      business_name,
      contact_name,
      email,
      phone,
      website,
      city,
      state,
      categories,
      description,
      photo_url,
    } = body

    if (!business_name || !contact_name || !email) {
      return NextResponse.json(
        { error: 'Business name, contact name, and email are required.' },
        { status: 400 }
      )
    }

    // Persist submission to vendor_submissions table
    try {
      const sql = getDb()
      await sql`
        INSERT INTO vendor_submissions
          (business_name, contact_name, email, phone, website, city, state, categories, description, photo_url, status)
        VALUES
          (${business_name}, ${contact_name}, ${email}, ${phone || null},
           ${website || null}, ${city || null}, ${state || null},
           ${categories || []}, ${description || null}, ${photo_url || null},
           'pending')
      `
    } catch (dbError) {
      // Log but don't fail the submission if DB write fails — email still goes out
      console.error('Failed to persist vendor submission to DB:', dbError)
    }

    // Send notification email
    await sendVendorSubmissionNotification({
      business_name,
      contact_name,
      email,
      phone: phone || '',
      website: website || '',
      city: city || '',
      state: state || '',
      categories: categories || [],
      description: description || '',
      photo_url: photo_url || null,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error processing vendor submission:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
