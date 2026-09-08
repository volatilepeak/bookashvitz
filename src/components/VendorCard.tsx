'use client'

import Link from 'next/link'
import { MapPin, Phone, Globe, Star, Users, Verified, Award } from 'lucide-react'
import { Vendor } from '@/lib/db'

export function VendorCard({ vendor }: { vendor: Vendor }) {
  const isPremium = vendor.is_premium || vendor.listing_tier === 'premium'

  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className={`card overflow-hidden group relative block transition-all ${
        isPremium
          ? 'ring-2 ring-amber-400 shadow-lg hover:shadow-xl hover:ring-amber-500'
          : 'hover:shadow-md'
      }`}
    >
      {/* Premium banner — sits at the very top of the card */}
      {isPremium && (
        <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-amber-950 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 flex items-center justify-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          Premium Vendor
        </div>
      )}

      {/* Photo */}
      <div className="relative h-48 bg-stone-100 overflow-hidden">
        {vendor.photo_url ? (
          <>
            <img
              src={vendor.photo_url}
              alt={vendor.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const fallback = target.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div className="w-full h-full items-center justify-center bg-gradient-to-br from-brand-50 to-stone-100 hidden">
              <div className="text-center">
                <span className="text-4xl block mb-1">🔥</span>
                <span className="text-xs text-stone-400 font-medium">{vendor.name}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-50 to-stone-100">
            <div className="text-center">
              <span className="text-4xl block mb-1">🔥</span>
              <span className="text-xs text-stone-400 font-medium">{vendor.name}</span>
            </div>
          </div>
        )}

        {/* Featured pill (top-left) */}
        {vendor.is_featured && !isPremium && (
          <div className="absolute top-3 left-3 bg-brand-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" /> Featured
          </div>
        )}

        {/* Verified pill (top-right) */}
        {vendor.is_verified && (
          <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
            isPremium ? 'bg-amber-500 text-white' : 'bg-white/90 text-stone-700'
          }`}>
            <Verified className="w-3 h-3" /> Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-display font-bold text-lg mb-1 transition-colors ${
          isPremium ? 'text-stone-900 group-hover:text-amber-700' : 'text-stone-900 group-hover:text-brand-600'
        }`}>
          {vendor.name}
        </h3>
        <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-3 flex-wrap">
          <MapPin className="w-3.5 h-3.5" />
          <span>{vendor.city}, {vendor.state_abbr}</span>
          {vendor.rating && (
            <>
              <span className="text-stone-300">·</span>
              <span className="text-stone-900 font-medium flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-brand-400 text-brand-400" />
                {vendor.rating}
              </span>
              {vendor.reviews && (
                <span className="text-stone-400">({vendor.reviews})</span>
              )}
            </>
          )}
          {vendor.price_range && (
            <>
              <span className="text-stone-300">·</span>
              <span className="text-stone-700 font-medium">{vendor.price_range}</span>
            </>
          )}
        </div>

        {vendor.description && (
          <p className="text-stone-500 text-sm leading-relaxed mb-3 line-clamp-2">
            {vendor.description}
          </p>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {vendor.categories.slice(0, 3).map(cat => (
            <span key={cat} className={`text-xs px-2 py-0.5 rounded-full border ${
              isPremium
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-stone-50 text-stone-600 border-stone-200'
            }`}>
              {cat}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-stone-400 pt-3 border-t border-stone-100">
          {vendor.max_guests && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Up to {vendor.max_guests} guests
            </span>
          )}
          {vendor.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              Contact available
            </span>
          )}
          {vendor.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              Website
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default VendorCard
