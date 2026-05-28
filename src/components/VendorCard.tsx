import Link from 'next/link'
import { MapPin, Phone, Globe, Star, Users, Verified } from 'lucide-react'
import { Vendor } from '@/lib/db'

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link href={`/vendors/${vendor.slug}`} className="card overflow-hidden group">
      {/* Photo */}
      <div className="relative h-48 bg-warm-100 overflow-hidden">
        {vendor.photo_url ? (
          <img
            src={vendor.photo_url}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-warm-200 to-ember-100">
            <span className="text-4xl">🔥</span>
          </div>
        )}
        {vendor.is_featured && (
          <div className="absolute top-3 left-3 bg-ember-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" /> Featured
          </div>
        )}
        {vendor.is_verified && (
          <div className="absolute top-3 right-3 bg-white/90 text-forest-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Verified className="w-3 h-3" /> Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-forest-800 group-hover:text-ember-600 transition-colors mb-1">
          {vendor.name}
        </h3>
        <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{vendor.city}, {vendor.state_abbr}</span>
          {vendor.rating && (
            <>
              <span className="text-warm-300">·</span>
              <span className="text-ember-500 font-medium flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-ember-400 text-ember-400" />
                {vendor.rating}
              </span>
              {vendor.reviews && (
                <span className="text-stone-400">({vendor.reviews})</span>
              )}
            </>
          )}
          {vendor.price_range && (
            <>
              <span className="text-warm-300">·</span>
              <span className="text-forest-600 font-medium">{vendor.price_range}</span>
            </>
          )}
        </div>

        {vendor.description && (
          <p className="text-stone-600 text-sm leading-relaxed mb-3 line-clamp-2">
            {vendor.description}
          </p>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {vendor.categories.slice(0, 3).map(cat => (
            <span key={cat} className="text-xs bg-forest-50 text-forest-600 px-2 py-0.5 rounded-full border border-forest-100">
              {cat}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-stone-500 pt-3 border-t border-warm-100">
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
