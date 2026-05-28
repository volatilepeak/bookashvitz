import { NextRequest, NextResponse } from 'next/server'
import { createLead } from '@/lib/data'
import { sendLeadNotification, sendLeadConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, event_type, event_date, guest_count, city, state, service_type, message, source_page } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const lead = await createLead({
      name,
      email,
      phone: phone || null,
      event_type: event_type || null,
      event_date: event_date || null,
      guest_count: guest_count ? Number(guest_count) : null,
      city: city || null,
      state: state || null,
      service_type: service_type || null,
      message: message || null,
      source_page: source_page || null,
    })

    // Send emails in background — don't block response
    Promise.all([
      sendLeadNotification(lead).catch(err => console.error('Lead notification email failed:', err)),
      sendLeadConfirmation(lead).catch(err => console.error('Lead confirmation email failed:', err)),
    ])

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
