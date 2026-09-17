'use client'

import { useState, useRef } from 'react'
import { Loader2, CheckCircle, Plus, Upload, X, Image as ImageIcon } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'

export function VendorSubmitForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoUploading, setPhotoUploading] = useState(false)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const [dragOver, setDragOver] = useState(false)

  function toggleCategory(name: string) {
    setSelectedCategories(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    )
  }

  async function uploadPhoto(file: File) {
    setPhotoUploading(true)
    setPhotoError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Upload failed')
      }
      const { url } = await res.json()
      setPhotoUrl(url)
    } catch (err: any) {
      setPhotoError(err.message || 'Upload failed')
    }
    setPhotoUploading(false)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadPhoto(file)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadPhoto(file)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)
    const body = {
      business_name: data.get('business_name') as string,
      contact_name: data.get('contact_name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      website: data.get('website') as string,
      city: data.get('city') as string,
      state: data.get('state') as string,
      categories: selectedCategories,
      description: data.get('description') as string,
      photo_url: photoUrl,
    }

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus('success')
      form.reset()
      setSelectedCategories([])
      setPhotoUrl(null)
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or email hello@bookashvitz.com.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <CheckCircle className="w-16 h-16 text-stone-500 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-stone-700 mb-2">Submission Received!</h3>
        <p className="text-stone-600 max-w-md mx-auto">
          Thanks for submitting your business. We&apos;ll review your listing and get it live within 1 to 2 business days. You&apos;ll receive an email confirmation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="business_name" className="block text-sm font-medium text-stone-700 mb-1">Business Name *</label>
          <input type="text" id="business_name" name="business_name" required className="input-field" placeholder="Austin Mobile Sauna Co." />
        </div>
        <div>
          <label htmlFor="contact_name" className="block text-sm font-medium text-stone-700 mb-1">Your Name *</label>
          <input type="text" id="contact_name" name="contact_name" required className="input-field" placeholder="Jane Smith" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vendor_email" className="block text-sm font-medium text-stone-700 mb-1">Email *</label>
          <input type="email" id="vendor_email" name="email" required className="input-field" placeholder="jane@yourbusiness.com" />
        </div>
        <div>
          <label htmlFor="vendor_phone" className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
          <input type="tel" id="vendor_phone" name="phone" className="input-field" placeholder="(555) 123-4567" />
        </div>
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-stone-700 mb-1">Website</label>
        <input type="url" id="website" name="website" className="input-field" placeholder="https://yourbusiness.com" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vendor_city" className="block text-sm font-medium text-stone-700 mb-1">City *</label>
          <input type="text" id="vendor_city" name="city" required className="input-field" placeholder="Austin" />
        </div>
        <div>
          <label htmlFor="vendor_state" className="block text-sm font-medium text-stone-700 mb-1">State *</label>
          <input type="text" id="vendor_state" name="state" required className="input-field" placeholder="Texas" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">Services Offered *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => toggleCategory(cat.name)}
              className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                selectedCategories.includes(cat.name)
                  ? 'bg-stone-50 border-stone-400 text-stone-700'
                  : 'bg-white border-stone-300 text-stone-600 hover:border-stone-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-stone-700 mb-1">Business Description</label>
        <textarea id="description" name="description" rows={4} className="input-field resize-none" placeholder="Tell us about your business, what you offer, and what makes you unique..." />
      </div>

      {/* Photo upload */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Business Photo <span className="text-stone-400 font-normal">(optional)</span>
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={handleFileSelect}
        />

        {photoUrl ? (
          <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
            <img src={photoUrl} alt="Uploaded preview" className="w-full h-48 object-cover" />
            <button
              type="button"
              onClick={() => setPhotoUrl(null)}
              className="absolute top-3 right-3 bg-white/95 hover:bg-white text-stone-700 rounded-full p-1.5 shadow-sm transition-colors"
              aria-label="Remove photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              dragOver
                ? 'border-brand-400 bg-brand-50'
                : 'border-stone-300 bg-stone-50 hover:border-stone-400'
            }`}
          >
            {photoUploading ? (
              <>
                <Loader2 className="w-8 h-8 mx-auto mb-2 text-stone-400 animate-spin" />
                <p className="text-sm text-stone-500">Uploading...</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-stone-400" />
                <p className="text-sm text-stone-600 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-stone-400 mt-1">JPG, PNG, or WebP up to 5MB</p>
              </>
            )}
          </div>
        )}

        {photoError && (
          <p className="text-red-600 text-sm mt-2">{photoError}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
          {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full text-base">
        {status === 'submitting' ? (
          <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Submitting...</>
        ) : (
          <><Plus className="w-5 h-5 mr-2" /> Submit Your Listing</>
        )}
      </button>
    </form>
  )
}

export default VendorSubmitForm
