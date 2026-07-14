import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { sendBuildLeadNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, project_type, build_type, location_type, budget_range, timeline, city, state, message, source_page } = body

    if (!name || !email || !project_type || !city) {
      return NextResponse.json({ error: 'Name, email, project type, and city are required.' }, { status: 400 })
    }

    // Store in leads table with service_type indicating it's a build lead
    const sql = getDb()
    await sql`
      INSERT INTO leads (name, email, phone, event_type, service_type, city, state, message, source_page)
      VALUES (${name}, ${email}, ${phone || null}, ${`BUILD: ${project_type} | ${build_type || ''} | ${location_type || ''} | Budget: ${budget_range || 'N/A'} | Timeline: ${timeline || 'N/A'}`}, ${'Custom Build'}, ${city}, ${state || null}, ${message || null}, ${source_page || null})
    `

    // Send notification
    sendBuildLeadNotification({
      name, email, phone, project_type, build_type, location_type, budget_range, timeline, city, state, message,
    }).catch(err => console.error('Build lead notification failed:', err))

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error creating build lead:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
