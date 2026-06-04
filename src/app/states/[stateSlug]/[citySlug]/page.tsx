import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCityInfo, getVendorsByCity } from '@/lib/data'
import VendorCard from '@/components/VendorCard'
import LeadForm from '@/components/LeadForm'
import type { Metadata } from 'next'

type Props = { params: Promise<{ stateSlug: string; citySlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug, citySlug } = await params
  const city = await getCityInfo(citySlug, stateSlug)
  if (!city) return { title: 'City Not Found' }
  return {
    title: `Mobile Sauna & Cold Plunge Rentals in ${city.city}, ${city.state_abbr}`,
    description: `Find ${city.vendor_count} mobile sauna rental, cold plunge, and contrast therapy vendors in ${city.city}, ${city.state}. Compare services and get free quotes for your event.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { stateSlug, citySlug } = await params
  const [city, vendors] = await Promise.all([
    getCityInfo(citySlug, stateSlug),
    getVendorsByCity(citySlug, stateSlug),
  ])

  if (!city) notFound()

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/states" className="hover:text-stone-700">All States</Link>
          <span className="mx-2">›</span>
          <Link href={`/states/${city.state_slug}`} className="hover:text-stone-700">{city.state}</Link>
          <span className="mx-2">›</span>
          <span className="text-stone-800">{city.city}</span>
        </nav>

        <h1 className="font-display text-4xl font-bold mb-4">
          Mobile Sauna & Cold Plunge Rentals in {city.city}, {city.state_abbr}
        </h1>
        <p className="text-stone-600 text-lg mb-10">
          Browse {city.vendor_count} vendor{Number(city.vendor_count) !== 1 ? 's' : ''} offering mobile saunas, cold plunges, and wellness rental services in {city.city}, {city.state}.
        </p>

        {vendors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {vendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center mb-16">
            <h2 className="font-display text-xl font-semibold mb-2">No vendors listed yet</h2>
            <p className="text-stone-500 mb-6">We&apos;re growing our {city.city} directory. Submit a quote request and we&apos;ll help connect you.</p>
          </div>
        )}

        {/* Lead Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold mb-2 text-center">
            Get Free Quotes in {city.city}
          </h2>
          <p className="text-stone-600 text-center mb-8">
            Tell us about your event and we&apos;ll connect you with the best local vendors.
          </p>
          <LeadForm defaultCity={city.city} defaultState={city.state} sourcePage={`/states/${stateSlug}/${citySlug}`} />
        </div>
      </div>
    </div>
  )
}
