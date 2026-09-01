import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Globe, Mail, Instagram, Users, DollarSign, CheckCircle, Star } from 'lucide-react'
import { getVendorBySlug, getRelatedVendors } from '@/lib/data'
import VendorImage from '@/components/VendorImage'
import VendorCard from '@/components/VendorCard'
import LeadForm from '@/components/LeadForm'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const vendor = await getVendorBySlug(slug)
  if (!vendor) return { title: 'Vendor Not Found' }
  const cats = vendor.categories?.join(', ') || 'Mobile Sauna & Cold Plunge'
  return {
    title: `${vendor.name} — ${cats} in ${vendor.city}, ${vendor.state_abbr} | Pricing & Reviews`,
    description: vendor.description ? vendor.description.slice(0, 160) : `Book ${vendor.name} for ${cats.toLowerCase()} in ${vendor.city}, ${vendor.state}. Get a free quote.`,
  }
}

export default async function VendorPage({ params }: Props) {
  const { slug } = await params
  const vendor = await getVendorBySlug(slug)
  if (!vendor) notFound()

  const allPhotos = [vendor.photo_url, ...(vendor.photos || [])].filter(Boolean) as string[]
  const related = await getRelatedVendors(vendor.id, vendor.city_slug, vendor.state_slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: vendor.name,
    description: vendor.description || `${vendor.name} offers mobile sauna and cold plunge rental services in ${vendor.city}, ${vendor.state}.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: vendor.city,
      addressRegion: vendor.state_abbr,
      postalCode: vendor.zip_code || undefined,
      addressCountry: 'US',
    },
    ...(vendor.phone && { telephone: vendor.phone }),
    ...(vendor.website && { url: vendor.website }),
    ...(vendor.photo_url && { image: vendor.photo_url }),
    ...(vendor.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: vendor.rating,
        bestRating: 5,
        ...(vendor.reviews && { reviewCount: vendor.reviews }),
      },
    }),
  }

  const hasDetails = vendor.price_range || vendor.min_guests || vendor.max_guests || vendor.service_area || vendor.setup_types
  const hasContact = vendor.phone || vendor.email || vendor.website || vendor.instagram

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-sm text-stone-500 mb-6">
            <Link href="/states" className="hover:text-stone-900">All States</Link>
            <span className="mx-2">›</span>
            <Link href={`/states/${vendor.state_slug}`} className="hover:text-stone-900">{vendor.state}</Link>
            <span className="mx-2">›</span>
            <Link href={`/states/${vendor.state_slug}/${vendor.city_slug}`} className="hover:text-stone-900">{vendor.city}</Link>
            <span className="mx-2">›</span>
            <span className="text-stone-800">{vendor.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Photo */}
              {allPhotos.length > 0 && (
                <div className="mb-8">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100">
                    <VendorImage src={allPhotos[0]} alt={vendor.name} className="w-full h-full object-cover" fallbackName={vendor.name} />
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {vendor.is_featured && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full">
                      <Star className="w-3 h-3" /> Featured
                    </span>
                  )}
                  {vendor.is_verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                  {vendor.categories && vendor.categories.map(cat => (
                    <span key={cat} className="text-xs font-medium bg-stone-50 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200">
                      {cat}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{vendor.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <p className="text-stone-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {vendor.city}, {vendor.state}
                  </p>
                  {vendor.rating && (
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-brand-400 text-brand-400" />
                      <span className="font-semibold text-brand-600">{vendor.rating}</span>
                      {vendor.reviews && (
                        <span className="text-stone-500 text-sm">({vendor.reviews} review{vendor.reviews !== 1 ? 's' : ''})</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description - only if exists */}
              {vendor.description && (
                <div className="mb-8">
                  <p className="text-stone-700 leading-relaxed whitespace-pre-line">{vendor.description}</p>
                </div>
              )}

              {/* Details - only if we have real data */}
              {hasDetails && (
                <div className="mb-8">
                  <h2 className="font-display text-xl font-semibold mb-3">Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {vendor.price_range && (
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-stone-500" />
                        <div>
                          <p className="text-sm text-stone-500">Price Range</p>
                          <p className="font-medium">{vendor.price_range}</p>
                        </div>
                      </div>
                    )}
                    {(vendor.min_guests || vendor.max_guests) && (
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-stone-500" />
                        <div>
                          <p className="text-sm text-stone-500">Guest Capacity</p>
                          <p className="font-medium">
                            {vendor.min_guests && vendor.max_guests
                              ? `${vendor.min_guests}–${vendor.max_guests} guests`
                              : vendor.max_guests
                                ? `Up to ${vendor.max_guests} guests`
                                : `${vendor.min_guests}+ guests`}
                          </p>
                        </div>
                      </div>
                    )}
                    {vendor.service_area && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-stone-500" />
                        <div>
                          <p className="text-sm text-stone-500">Service Area</p>
                          <p className="font-medium">{vendor.service_area}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-stone-900 rounded-xl p-6 md:p-8 text-white mb-10">
                <h3 className="font-display text-xl font-bold mb-2">Interested in {vendor.name}?</h3>
                <p className="text-stone-400 mb-4">Request a quote and we&apos;ll connect you. Free, no obligation.</p>
                <Link href="/get-quotes" className="btn-primary">Get a Free Quote</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                {hasContact && (
                  <>
                    <h3 className="font-display text-lg font-semibold mb-4">Contact</h3>
                    <div className="space-y-3 mb-6">
                      {vendor.phone && (
                        <a href={`tel:${vendor.phone}`} className="flex items-center gap-3 text-stone-700 hover:text-brand-600 transition-colors">
                          <Phone className="w-5 h-5 text-brand-500" /> {vendor.phone}
                        </a>
                      )}
                      {vendor.email && (
                        <a href={`mailto:${vendor.email}`} className="flex items-center gap-3 text-stone-700 hover:text-brand-600 transition-colors">
                          <Mail className="w-5 h-5 text-brand-500" /> {vendor.email}
                        </a>
                      )}
                      {vendor.website && (
                        <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-700 hover:text-brand-600 transition-colors">
                          <Globe className="w-5 h-5 text-brand-500" /> Visit Website
                        </a>
                      )}
                      {vendor.instagram && (
                        <a href={`https://instagram.com/${vendor.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-700 hover:text-brand-600 transition-colors">
                          <Instagram className="w-5 h-5 text-brand-500" /> {vendor.instagram}
                        </a>
                      )}
                    </div>
                  </>
                )}

                <div className={hasContact ? "border-t border-stone-200 pt-6" : ""}>
                  <h4 className="font-semibold mb-3">Request a Quote</h4>
                  <LeadForm
                    defaultCity={vendor.city}
                    defaultState={vendor.state}
                    sourcePage={`/vendors/${vendor.slug}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Related Vendors */}
          {related.length > 0 && (
            <div className="mt-16 border-t border-stone-200 pt-12">
              <h2 className="font-display text-2xl font-semibold mb-6">
                More Vendors in {vendor.city}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(v => (
                  <VendorCard key={v.id} vendor={v} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
