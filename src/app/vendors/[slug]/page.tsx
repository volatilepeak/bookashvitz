import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Globe, Mail, Instagram, Users, DollarSign, CheckCircle, Star } from 'lucide-react'
import { getVendorBySlug } from '@/lib/data'
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

export default async function VendorPage({ params }: Props) {
  const { slug } = await params
  const vendor = await getVendorBySlug(slug)
  if (!vendor) notFound()

  const allPhotos = [vendor.photo_url, ...(vendor.photos || [])].filter(Boolean) as string[]

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/states" className="hover:text-forest-700">All States</Link>
          <span className="mx-2">›</span>
          <Link href={`/states/${vendor.state_slug}`} className="hover:text-forest-700">{vendor.state}</Link>
          <span className="mx-2">›</span>
          <Link href={`/states/${vendor.state_slug}/${vendor.city_slug}`} className="hover:text-forest-700">{vendor.city}</Link>
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
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-forest-100 text-forest-800 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3" /> Featured
                  </span>
                )}
                {vendor.is_verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{vendor.name}</h1>
              <p className="text-stone-500 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {vendor.city}, {vendor.state} {vendor.zip_code || ''}
              </p>
              {vendor.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-ember-500">
                    <Star className="w-4 h-4 fill-ember-400 text-ember-400" />
                    <span className="font-semibold">{vendor.rating}</span>
                  </div>
                  {vendor.reviews && (
                    <span className="text-stone-500 text-sm">({vendor.reviews} review{vendor.reviews !== 1 ? 's' : ''})</span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {vendor.description && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold mb-3">About</h2>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">{vendor.description}</p>
              </div>
            )}

            {/* Categories */}
            {vendor.categories && vendor.categories.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold mb-3">Services</h2>
                <div className="flex flex-wrap gap-2">
                  {vendor.categories.map(cat => (
                    <span key={cat} className="bg-forest-50 text-forest-800 px-3 py-1.5 rounded-full text-sm font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-3">Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {vendor.price_range && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-forest-600" />
                    <div>
                      <p className="text-sm text-stone-500">Price Range</p>
                      <p className="font-medium">{vendor.price_range}</p>
                    </div>
                  </div>
                )}
                {(vendor.min_guests || vendor.max_guests) && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-forest-600" />
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
                    <MapPin className="w-5 h-5 text-forest-600" />
                    <div>
                      <p className="text-sm text-stone-500">Service Area</p>
                      <p className="font-medium">{vendor.service_area}</p>
                    </div>
                  </div>
                )}
                {vendor.setup_types && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-forest-600" />
                    <div>
                      <p className="text-sm text-stone-500">Setup Types</p>
                      <p className="font-medium">{vendor.setup_types}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="font-display text-lg font-semibold mb-4">Contact {vendor.name}</h3>
              <div className="space-y-3 mb-6">
                {vendor.phone && (
                  <a href={`tel:${vendor.phone}`} className="flex items-center gap-3 text-stone-700 hover:text-forest-700">
                    <Phone className="w-5 h-5 text-forest-600" /> {vendor.phone}
                  </a>
                )}
                {vendor.email && (
                  <a href={`mailto:${vendor.email}`} className="flex items-center gap-3 text-stone-700 hover:text-forest-700">
                    <Mail className="w-5 h-5 text-forest-600" /> {vendor.email}
                  </a>
                )}
                {vendor.website && (
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-700 hover:text-forest-700">
                    <Globe className="w-5 h-5 text-forest-600" /> Visit Website
                  </a>
                )}
                {vendor.instagram && (
                  <a href={`https://instagram.com/${vendor.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-700 hover:text-forest-700">
                    <Instagram className="w-5 h-5 text-forest-600" /> {vendor.instagram}
                  </a>
                )}
              </div>
              <div className="border-t pt-6">
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
      </div>
    </div>
  )
}
