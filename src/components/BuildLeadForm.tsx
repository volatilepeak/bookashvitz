'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

interface BuildLeadFormProps {
  sourcePage?: string
  defaultCity?: string
  defaultState?: string
}

export function BuildLeadForm({ sourcePage = '', defaultCity = '', defaultState = '' }: BuildLeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    build_type: '',
    location_type: '',
    budget_range: '',
    timeline: '',
    city: defaultCity,
    state: defaultState,
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/build-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source_page: sourcePage }),
      })

      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch {
      setErrorMsg('Something went wrong. Please try again or email hello@bookashvitz.com.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-display text-xl font-semibold mb-2">Request Submitted!</h3>
        <p className="text-stone-500">We&apos;ll connect you with qualified sauna and cold plunge builders in your area within 24-48 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      {errorMsg && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{errorMsg}</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">What do you want built? *</label>
          <select name="project_type" value={form.project_type} onChange={handleChange} required className="select-field">
            <option value="">Select...</option>
            <option value="Sauna — Outdoor">Sauna — Outdoor</option>
            <option value="Sauna — Indoor">Sauna — Indoor</option>
            <option value="Cold Plunge — Outdoor">Cold Plunge — Outdoor</option>
            <option value="Cold Plunge — Indoor">Cold Plunge — Indoor</option>
            <option value="Both Sauna + Cold Plunge">Both Sauna + Cold Plunge</option>
            <option value="Infrared Sauna">Infrared Sauna</option>
            <option value="Steam Room">Steam Room</option>
            <option value="Not Sure — Need Guidance">Not Sure — Need Guidance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Build Type</label>
          <select name="build_type" value={form.build_type} onChange={handleChange} className="select-field">
            <option value="">Select...</option>
            <option value="Fully Custom Build">Fully Custom Build</option>
            <option value="Pre-Built / Kit Assembly">Pre-Built / Kit Assembly</option>
            <option value="Renovation / Conversion">Renovation / Conversion</option>
            <option value="Commercial Installation">Commercial Installation</option>
            <option value="Not Sure Yet">Not Sure Yet</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Property Type</label>
          <select name="location_type" value={form.location_type} onChange={handleChange} className="select-field">
            <option value="">Select...</option>
            <option value="Home / Residential">Home / Residential</option>
            <option value="Airbnb / Rental Property">Airbnb / Rental Property</option>
            <option value="Gym / Fitness Studio">Gym / Fitness Studio</option>
            <option value="Spa / Wellness Center">Spa / Wellness Center</option>
            <option value="Commercial / Office">Commercial / Office</option>
            <option value="Hotel / Resort">Hotel / Resort</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Budget Range</label>
          <select name="budget_range" value={form.budget_range} onChange={handleChange} className="select-field">
            <option value="">Select...</option>
            <option value="Under $5,000">Under $5,000</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
            <option value="$10,000 - $20,000">$10,000 - $20,000</option>
            <option value="$20,000 - $50,000">$20,000 - $50,000</option>
            <option value="$50,000+">$50,000+</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Timeline</label>
          <select name="timeline" value={form.timeline} onChange={handleChange} className="select-field">
            <option value="">Select...</option>
            <option value="ASAP">ASAP</option>
            <option value="1-3 Months">1-3 Months</option>
            <option value="3-6 Months">3-6 Months</option>
            <option value="6+ Months">6+ Months</option>
            <option value="Just Exploring">Just Exploring</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">City *</label>
          <input type="text" name="city" value={form.city} onChange={handleChange} required className="input-field" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">State</label>
        <input type="text" name="state" value={form.state} onChange={handleChange} className="input-field" />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Tell us about your project</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="input-field" placeholder="Describe your space, any preferences on materials, size, features you want..." />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2">
        <Send className="w-4 h-4" />
        {submitting ? 'Submitting...' : 'Get Free Builder Quotes'}
      </button>

      <p className="text-xs text-stone-400 text-center">Free, no obligation. We&apos;ll connect you with qualified local builders.</p>
    </form>
  )
}

export default BuildLeadForm
