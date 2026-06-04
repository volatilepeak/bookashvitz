import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Globe, Mail, Instagram, Users, DollarSign, CheckCircle, Star, Flame, Clock, Truck, Droplets, Calendar, PartyPopper } from 'lucide-react'
import { getVendorBySlug, getRelatedVendors } from '@/lib/data'
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
    title: `${vendor.name} — ${cats} in ${vendor.city}, ${vendor.state_abbr}`,
    description: vendor.description || `${vendor.name} offers ${cats.toLowerCase()} services in ${vendor.city}, ${vendor.state}. Get a free quote today.`,
  }
}

function getWhatToExpect(categories: string[]) {
  const items: { icon: typeof Flame; title: string; text: string }[] = []
  const cats = (categories || []).map(c => c.toLowerCase())

  if (cats.some(c => c.includes('sauna') && !c.includes('infrared'))) {
    items.push(
      { icon: Truck, title: 'Delivered to You', text: 'The sauna arrives on a trailer and is set up at your location. Most setups take 30-60 minutes.' },
      { icon: Flame, title: 'Heat & Steam', text: 'Temperatures typically reach 150-190°F. Sessions last 15-20 minutes with breaks between rounds.' },
      { icon: Clock, title: '3-4 Hour Rental', text: 'Most rentals are 3-4 hours — enough for your whole group to rotate through multiple sessions.' },
    )
  }
  if (cats.some(c => c.includes('cold plunge') || c.includes('ice bath'))) {
    items.push(
      { icon: Droplets, title: 'Cold Immersion', text: 'Water is chilled to 38-45°F. Most people stay in 1-3 minutes — the euphoria after is worth it.' },
    )
  }
  if (cats.some(c => c.includes('contrast'))) {
    items.push(
      { icon: Flame, title: 'Hot-Cold Cycle', text: 'Alternate between sauna and cold plunge for a powerful endorphin release. The contrast is where the magic happens.' },
    )
  }
  if (cats.some(c => c.includes('infrared'))) {
    items.push(
      { icon: Flame, title: 'Infrared Heat', text: 'Lower temperatures than traditional saunas (120-150°F) but deep-penetrating heat. Gentle and accessible for everyone.' },
    )
  }
  if (items.length === 0) {
    items.push(
      { icon: Truck, title: 'Mobile Setup', text: 'Everything is delivered to your location and set up by the vendor. You just show up and enjoy.' },
      { icon: Clock, title: 'Flexible Scheduling', text: 'Most vendors offer half-day and full-day options to fit your event schedule.' },
    )
  }
  items.push(
    { icon: Users, title: 'Groups Welcome', text: 'Perfect for groups of all sizes. People rotate in and out naturally — no scheduling needed.' },
  )
  return items
}

const EVENT_TYPES = [
  { icon: PartyPopper, label: 'Birthday Parties' },
  { icon: Calendar, label: 'Bachelorette Weekends' },
  { icon: Users, label: 'Corporate Team Events' },
  { icon: Flame, label: 'Private Retreats' },
  { icon: Star, label: 'Weddings & Receptions' },
  { icon: Droplets, label: 'Athletic Recovery' },
]

export default async function VendorPage({ params }: Props) {
  const { slug } = await params
  const vendor = await getVendorBySlug(slug)
  if (!vendor) notFound()

  const allPhotos = [vendor.photo_url, ...(vendor.photos || [])].filter(Boolean) as string[]
  const related = await getRelatedVendors(vendor.id, vendor.city_slug, vendor.state_slug)
  const whatToExpect = getWhatToExpect(vendor.categories || [])

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
    areaServed: {
      '@type': 'City',
      name: vendor.city,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/states" className="hover:text-stone-700">All States</Link>
          <span className="mx-2">›</span>
          <Link href={`/states/${vendor.state_slug}`} className="hover:text-stone-700">{vendor.state}</Link>
          <span className="mx-2">›</span>
          <Link href={`/states/${vendor.state_slug}/${vendor.city_slug}`} className="hover:text-stone-700">{vendor.city}</Link>
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
                  <Image
                    src={allPhotos[0]}
                    alt={vendor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                {allPhotos.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {allPhotos.slice(1, 5).map((photo, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-stone-100">
                        <Image src={photo} alt={`${vendor.name} photo ${i + 2}`} fill className="object-cover" sizes="25vw" />
                      </div>
                    ))}
                  </div>
                )}
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
                  <span key={cat} className="text-xs font-medium bg-stone-50 text-stone-700 px-2.5 py-1 rounded-full">
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

            {/* Description */}
            {vendor.description && (
              <div className="mb-10">
                <h2 className="font-display text-xl font-semibold mb-3">About {vendor.name}</h2>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">{vendor.description}</p>
              </div>
            )}

            {/* What to Expect */}
            <div className="mb-10">
              <h2 className="font-display text-xl font-semibold mb-4">What to Expect</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {whatToExpect.map((item, i) => (
                  <div key={i} className="bg-warm-50 border border-stone-200 rounded-lg p-4 flex gap-3">
                    <item.icon className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-stone-800">{item.title}</p>
                      <p className="text-stone-600 text-sm mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfect For */}
            <div className="mb-10">
              <h2 className="font-display text-xl font-semibold mb-4">Perfect For</h2>
              <div className="flex flex-wrap gap-3">
                {EVENT_TYPES.map((event, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-2">
                    <event.icon className="w-4 h-4 text-brand-500" />
                    <span className="text-sm font-medium text-stone-700">{event.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details (only show if we have data) */}
            {(vendor.price_range || vendor.min_guests || vendor.max_guests || vendor.service_area || vendor.setup_types) && (
              <div className="mb-10">
                <h2 className="font-display text-xl font-semibold mb-3">Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {vendor.price_range && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-stone-600" />
                      <div>
                        <p className="text-sm text-stone-500">Price Range</p>
                        <p className="font-medium">{vendor.price_range}</p>
                      </div>
                    </div>
                  )}
                  {(vendor.min_guests || vendor.max_guests) && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-stone-600" />
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
                      <MapPin className="w-5 h-5 text-stone-600" />
                      <div>
                        <p className="text-sm text-stone-500">Service Area</p>
                        <p className="font-medium">{vendor.service_area}</p>
                      </div>
                    </div>
                  )}
                  {vendor.setup_types && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-stone-600" />
                      <div>
                        <p className="text-sm text-stone-500">Setup Types</p>
                        <p className="font-medium">{vendor.setup_types}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Banner */}
            <div className="bg-stone-800 rounded-xl p-6 md:p-8 text-white mb-10">
              <h3 className="font-display text-xl font-bold mb-2">Interested in booking {vendor.name}?</h3>
              <p className="text-stone-200 mb-4">Send a quick quote request and we&apos;ll connect you. It&apos;s free and takes 30 seconds.</p>
              <Link href="/get-quotes" className="btn-primary">Get a Free Quote</Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-display text-lg font-semibold mb-4">Contact {vendor.name}</h3>
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

              {/* Quick Info */}
              <div className="border-t border-stone-200 pt-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Location</span>
                  <span className="font-medium">{vendor.city}, {vendor.state_abbr}</span>
                </div>
                {vendor.rating && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Rating</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-brand-400 text-brand-400" /> {vendor.rating}/5
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Services</span>
                  <span className="font-medium">{vendor.categories?.length || 1} type{(vendor.categories?.length || 1) !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-6">
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
              More Vendors in {vendor.city}, {vendor.state_abbr}
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
