'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle } from 'lucide-react'
import { EVENT_TYPES, SERVICE_TYPES } from '@/lib/constants'

interface LeadFormProps {
  sourcePage?: string
  defaultCity?: string
  defaultState?: string
  defaultServiceType?: string
}

export function LeadForm({ sourcePage = '', defaultCity = '', defaultState = '', defaultServiceType = '' }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)
    const body = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      event_type: data.get('event_type') as string,
      event_date: data.get('event_date') as string,
      guest_count: data.get('guest_count') ? Number(data.get('guest_count')) : null,
      city: data.get('city') as string || defaultCity,
      state: data.get('state') as string || defaultState,
      service_type: data.get('service_type') as string,
      message: data.get('message') as string,
      source_page: sourcePage,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or email hello@bookashvitz.com directly.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <CheckCircle className="w-16 h-16 text-forest-500 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-forest-700 mb-2">Request Sent!</h3>
        <p className="text-stone-600 max-w-md mx-auto">
          Thanks for reaching out. We&apos;ll connect you with the best vendors in your area within 24–48 hours. Check your email for a confirmation.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-secondary mt-6 text-sm">
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Full Name *</label>
          <input type="text" id="name" name="name" required className="input-field" placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
          <input type="email" id="email" name="email" required className="input-field" placeholder="jane@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
          <input type="tel" id="phone" name="phone" className="input-field" placeholder="(555) 123-4567" />
        </div>
        <div>
          <label htmlFor="service_type" className="block text-sm font-medium text-stone-700 mb-1">Service Type</label>
          <select id="service_type" name="service_type" className="select-field" defaultValue={defaultServiceType}>
            <option value="">Select a service...</option>
            {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="event_type" className="block text-sm font-medium text-stone-700 mb-1">Event Type</label>
          <select id="event_type" name="event_type" className="select-field">
            <option value="">Select...</option>
            {EVENT_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="event_date" className="block text-sm font-medium text-stone-700 mb-1">Event Date</label>
          <input type="date" id="event_date" name="event_date" className="input-field" />
        </div>
        <div>
          <label htmlFor="guest_count" className="block text-sm font-medium text-stone-700 mb-1">Guest Count</label>
          <input type="number" id="guest_count" name="guest_count" min="1" className="input-field" placeholder="25" />
        </div>
      </div>

      {!defaultCity && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-stone-700 mb-1">City</label>
            <input type="text" id="city" name="city" className="input-field" placeholder="Austin" />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-stone-700 mb-1">State</label>
            <input type="text" id="state" name="state" className="input-field" placeholder="Texas" />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Tell us about your event</label>
        <textarea id="message" name="message" rows={4} className="input-field resize-none" placeholder="Any details about your event, venue, or special requests..." />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
          {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full text-base">
        {status === 'submitting' ? (
          <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Sending...</>
        ) : (
          <><Send className="w-5 h-5 mr-2" /> Get Free Quotes</>
        )}
      </button>
      <p className="text-xs text-stone-400 text-center">We&apos;ll connect you with vendors in your area. No spam, ever.</p>
    </form>
  )
}

export default LeadForm
