'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, Upload, CheckCircle, AlertTriangle, X, Image as ImageIcon } from 'lucide-react'

interface Vendor {
  id: string
  name: string
  slug: string
  city: string
  state_abbr: string
  photo_url: string | null
}

type FilterTab = 'no-photo' | 'external' | 'all'

function getPhotoStatus(photo_url: string | null): 'none' | 'blob' | 'self' | 'external' {
  if (!photo_url) return 'none'
  if (photo_url.includes('blob.vercel-storage.com')) return 'blob'
  if (photo_url.startsWith('/vendors/')) return 'self'
  if (photo_url.startsWith('http')) return 'external'
  return 'external'
}

export default function AdminPhotosPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterTab>('no-photo')
  const [search, setSearch] = useState('')
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  useEffect(() => {
    loadVendors()
  }, [])

  async function loadVendors() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/photos')
      const data = await res.json()
      setVendors(data.vendors || [])
    } catch (err) {
      console.error('Failed to load vendors', err)
    }
    setLoading(false)
  }

  async function handleUpload(vendor: Vendor, file: File) {
    setUploadingId(vendor.id)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        const err = await uploadRes.json()
        throw new Error(err.error || 'Upload failed')
      }

      const { url } = await uploadRes.json()

      const updateRes = await fetch('/api/admin/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendor_id: vendor.id, photo_url: url }),
      })

      if (!updateRes.ok) throw new Error('Failed to update vendor')

      setVendors(prev =>
        prev.map(v => (v.id === vendor.id ? { ...v, photo_url: url } : v))
      )
    } catch (err: any) {
      setUploadError(`${vendor.name}: ${err.message || 'Upload failed'}`)
      setTimeout(() => setUploadError(null), 5000)
    }

    setUploadingId(null)
  }

  const filtered = vendors.filter(v => {
    // filter tab
    if (filter === 'no-photo') {
      if (v.photo_url && v.photo_url !== '') return false
    } else if (filter === 'external') {
      const status = getPhotoStatus(v.photo_url)
      if (status !== 'external') return false
    }
    // search
    if (search) {
      const q = search.toLowerCase()
      if (
        !v.name.toLowerCase().includes(q) &&
        !v.city.toLowerCase().includes(q) &&
        !v.state_abbr.toLowerCase().includes(q)
      ) return false
    }
    return true
  })

  const counts = {
    all: vendors.length,
    'no-photo': vendors.filter(v => !v.photo_url || v.photo_url === '').length,
    external: vendors.filter(v => getPhotoStatus(v.photo_url) === 'external').length,
  }

  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Photo Management</h1>
          <p className="text-stone-600">
            Upload photos directly to Vercel Blob storage. External URLs will break over time so replace them.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {([
            { key: 'no-photo', label: 'No Photo', count: counts['no-photo'] },
            { key: 'external', label: 'External URL', count: counts.external },
            { key: 'all', label: 'All', count: counts.all },
          ] as { key: FilterTab; label: string; count: number }[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === tab.key
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by vendor name, city, or state..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full input-field mb-6"
        />

        {uploadError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {uploadError}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-stone-400" />
            <p className="text-stone-500 mt-3">Loading vendors...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-stone-200">
            <ImageIcon className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500">No vendors match the current filter.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(vendor => (
              <VendorRow
                key={vendor.id}
                vendor={vendor}
                uploading={uploadingId === vendor.id}
                onUpload={file => handleUpload(vendor, file)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function VendorRow({
  vendor,
  uploading,
  onUpload,
}: {
  vendor: Vendor
  uploading: boolean
  onUpload: (file: File) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const status = getPhotoStatus(vendor.photo_url)

  const statusBadge = () => {
    if (status === 'none') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-stone-100 text-stone-600 px-2 py-1 rounded">
          No Photo
        </span>
      )
    }
    if (status === 'blob') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">
          <CheckCircle className="w-3 h-3" /> Blob
        </span>
      )
    }
    if (status === 'self') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
          Self-hosted
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded">
        <AlertTriangle className="w-3 h-3" /> External (will break)
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 flex items-center gap-4">
      {/* Thumbnail */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center">
        {vendor.photo_url ? (
          <img
            src={vendor.photo_url}
            alt={vendor.name}
            className="w-full h-full object-cover"
            onError={e => {
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML =
                '<div class="text-stone-300 text-xs text-center px-2">Failed to load</div>'
            }}
          />
        ) : (
          <ImageIcon className="w-8 h-8 text-stone-300" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-semibold text-stone-900 truncate">{vendor.name}</h3>
          {statusBadge()}
        </div>
        <p className="text-sm text-stone-500">
          {vendor.city}, {vendor.state_abbr} · <code className="text-xs">{vendor.slug}</code>
        </p>
        {vendor.photo_url && (
          <p className="text-xs text-stone-400 truncate mt-1" title={vendor.photo_url}>
            {vendor.photo_url}
          </p>
        )}
      </div>

      {/* Upload button */}
      <div className="flex-shrink-0">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) onUpload(file)
            e.target.value = ''
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> {vendor.photo_url ? 'Replace' : 'Upload'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
