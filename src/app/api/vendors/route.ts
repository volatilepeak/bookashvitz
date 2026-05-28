import { NextRequest, NextResponse } from 'next/server'
import { sendVendorSubmissionNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { business_name, contact_name, email, phone, website, city, state, categories, description } = body

    if (!business_name || !contact_name || !email) {
      return NextResponse.json({ error: 'Business name, contact name, and email are required.' }, { status: 400 })
    }

    // Send notification to admin
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
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error processing vendor submission:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
