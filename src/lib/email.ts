import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadEmailData {
  name: string
  email: string
  phone?: string | null
  event_type?: string | null
  event_date?: string | null
  guest_count?: number | null
  city?: string | null
  state?: string | null
  service_type?: string | null
  message?: string | null
  source_page?: string | null
}

export async function sendLeadNotification(lead: LeadEmailData) {
  const details = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.event_type ? `Event Type: ${lead.event_type}` : null,
    lead.event_date ? `Event Date: ${lead.event_date}` : null,
    lead.guest_count ? `Guest Count: ${lead.guest_count}` : null,
    lead.city && lead.state ? `Location: ${lead.city}, ${lead.state}` : null,
    lead.service_type ? `Service Type: ${lead.service_type}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    lead.source_page ? `Source Page: ${lead.source_page}` : null,
  ].filter(Boolean).join('\n')

  await resend.emails.send({
    from: 'BookAShvitz <hello@bookashvitz.com>',
    to: 'hello@bookashvitz.com',
    subject: `New Lead: ${lead.name} — ${lead.service_type || 'General Inquiry'}`,
    text: `New lead submitted on BookAShvitz!\n\n${details}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e4620; padding: 24px; text-align: center;">
          <h1 style="color: #f8f5f0; margin: 0; font-size: 24px;">New Lead on BookAShvitz</h1>
        </div>
        <div style="padding: 24px; background: #fdfcfa; border: 1px solid #e5ddd0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Name</td><td style="padding: 8px 0;">${lead.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Email</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            ${lead.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Phone</td><td style="padding: 8px 0;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>` : ''}
            ${lead.event_type ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Event Type</td><td style="padding: 8px 0;">${lead.event_type}</td></tr>` : ''}
            ${lead.event_date ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Event Date</td><td style="padding: 8px 0;">${lead.event_date}</td></tr>` : ''}
            ${lead.guest_count ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Guest Count</td><td style="padding: 8px 0;">${lead.guest_count}</td></tr>` : ''}
            ${lead.city && lead.state ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Location</td><td style="padding: 8px 0;">${lead.city}, ${lead.state}</td></tr>` : ''}
            ${lead.service_type ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Service Type</td><td style="padding: 8px 0;">${lead.service_type}</td></tr>` : ''}
          </table>
          ${lead.message ? `<div style="margin-top: 16px; padding: 16px; background: #f0f5f0; border-radius: 8px;"><strong style="color: #1e4620;">Message:</strong><br/>${lead.message}</div>` : ''}
        </div>
        <div style="padding: 16px; text-align: center; color: #99a3af; font-size: 12px;">
          BookAShvitz.com — Mobile Sauna & Cold Plunge Directory
        </div>
      </div>
    `,
  })
}

export async function sendLeadConfirmation(lead: LeadEmailData) {
  await resend.emails.send({
    from: 'BookAShvitz <hello@bookashvitz.com>',
    to: lead.email,
    subject: `We got your request, ${lead.name}!`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e4620; padding: 24px; text-align: center;">
          <h1 style="color: #f8f5f0; margin: 0; font-size: 24px;">BookAShvitz</h1>
        </div>
        <div style="padding: 32px 24px; background: #fdfcfa; border: 1px solid #e5ddd0;">
          <h2 style="color: #1e4620; margin-top: 0;">Thanks for reaching out, ${lead.name}!</h2>
          <p style="color: #44403c; line-height: 1.6;">
            We received your request${lead.service_type ? ` for <strong>${lead.service_type}</strong>` : ''}${lead.city ? ` in <strong>${lead.city}</strong>` : ''}.
            Our team will review your details and connect you with the best local vendors for your event.
          </p>
          <p style="color: #44403c; line-height: 1.6;">
            Most vendors respond within 24–48 hours. In the meantime, feel free to
            <a href="https://bookashvitz.com/states" style="color: #1e4620; font-weight: bold;">browse more vendors</a>
            or check out our <a href="https://bookashvitz.com/blog" style="color: #1e4620; font-weight: bold;">planning guides</a>.
          </p>
          <p style="color: #44403c; line-height: 1.6;">
            Questions? Reply to this email anytime — we are happy to help.
          </p>
          <p style="color: #44403c; margin-bottom: 0;">
            — The BookAShvitz Team
          </p>
        </div>
        <div style="padding: 16px; text-align: center; color: #99a3af; font-size: 12px;">
          BookAShvitz.com — Mobile Sauna & Cold Plunge Directory
        </div>
      </div>
    `,
  })
}

interface VendorSubmissionData {
  business_name: string
  contact_name: string
  email: string
  phone?: string | null
  website?: string | null
  city: string
  state: string
  categories: string[]
  description?: string | null
}

export async function sendVendorSubmissionNotification(data: VendorSubmissionData) {
  await resend.emails.send({
    from: 'BookAShvitz <hello@bookashvitz.com>',
    to: 'hello@bookashvitz.com',
    subject: `New Vendor Submission: ${data.business_name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e4620; padding: 24px; text-align: center;">
          <h1 style="color: #f8f5f0; margin: 0; font-size: 24px;">New Vendor Submission</h1>
        </div>
        <div style="padding: 24px; background: #fdfcfa; border: 1px solid #e5ddd0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Business Name</td><td style="padding: 8px 0;">${data.business_name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Contact</td><td style="padding: 8px 0;">${data.contact_name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Phone</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
            ${data.website ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Website</td><td style="padding: 8px 0;"><a href="${data.website}">${data.website}</a></td></tr>` : ''}
            <tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Location</td><td style="padding: 8px 0;">${data.city}, ${data.state}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #1e4620;">Categories</td><td style="padding: 8px 0;">${data.categories.join(', ')}</td></tr>
          </table>
          ${data.description ? `<div style="margin-top: 16px; padding: 16px; background: #f0f5f0; border-radius: 8px;"><strong style="color: #1e4620;">Description:</strong><br/>${data.description}</div>` : ''}
        </div>
      </div>
    `,
  })
}
