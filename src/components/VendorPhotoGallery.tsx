'use client'

import { useState } from 'react'
import VendorImage from './VendorImage'

export default function VendorPhotoGallery({
  photos,
  vendorName,
}: {
  photos: string[]
  vendorName: string
}) {
  const [active, setActive] = useState(0)
  if (!photos.length) return null

  return (
    <div className="mb-8">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 mb-3">
        <VendorImage
          src={photos[active]}
          alt={`${vendorName} — photo ${active + 1}`}
          className="w-full h-full object-cover"
          fallbackName={vendorName}
        />
      </div>
      {photos.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {photos.slice(0, 5).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-lg overflow-hidden bg-stone-100 border-2 transition-all ${
                active === i ? 'border-brand-500' : 'border-transparent hover:border-stone-300'
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              <VendorImage
                src={src}
                alt={`${vendorName} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                fallbackName={vendorName}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
