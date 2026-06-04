import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin } from 'lucide-react'
import { getStateInfo, getCitiesByState, getVendorsByState } from '@/lib/data'
import { TOP_CITIES } from '@/lib/constants'
import VendorCard from '@/components/VendorCard'
import LeadForm from '@/components/LeadForm'
import type { Metadata } from 'next'

type Props = { params: Promise<{ stateSlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug } = await params
  const state = await getStateInfo(stateSlug)
  const topCities = TOP_CITIES.filter(c => c.stateSlug === stateSlug)
  const stateName = state?.state || topCities[0]?.state
  if (!stateName) return { title: 'State Not Found' }
  return {
    title: `Mobile Sauna & Cold Plunge Rentals in ${stateName}`,
    description: `Find mobile sauna and cold plunge rental vendors across ${stateName}. Browse vendors, compare services, and get free quotes.`,
  }
}

export default async function StatePage({ params }: Props) {
  const { stateSlug } = await params
  const [state, cities, vendors] = await Promise.all([
    getStateInfo(stateSlug),
    getCitiesByState(stateSlug),
    getVendorsByState(stateSlug),
  ])

  const topCities = TOP_CITIES.filter(c => c.stateSlug === stateSlug)
  const stateName = state?.state || topCities[0]?.state

  if (!stateName) notFound()

  // Merge DB cities with target cities (dedup by slug)
  const dbCitySlugs = new Set(cities.map(c => c.city_slug))
  const extraTargetCities = topCities.filter(c => !dbCitySlugs.has(c.citySlug))

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/states" className="hover:text-stone-900">All States</Link>
          <span className="mx-2">›</span>
          <span className="text-stone-800">{stateName}</span>
        </nav>

        <h1 className="font-display text-4xl font-bold mb-4">
          Mobile Sauna & Cold Plunge Rentals in {stateName}
        </h1>
        <p className="text-stone-500 text-lg mb-10">
          {vendors.length > 0
            ? `Browse ${vendors.length} vendor${vendors.length !== 1 ? 's' : ''} across ${stateName}.`
            : `We're building our directory of mobile sauna and cold plunge vendors in ${stateName}. Check out the cities below or request a quote.`
          }
        </p>

        {/* Cities */}
        {(cities.length > 0 || extraTargetCities.length > 0) && (
          <div className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-6">Cities in {stateName}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map(city => (
                <Link
                  key={city.city_slug}
                  href={`/states/${stateSlug}/${city.city_slug}`}
                  className="card hover:border-brand-200 transition-colors p-4 flex items-center gap-3"
                >
                  <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{city.city}</p>
                    <p className="text-sm text-stone-500">{city.vendor_count} vendor{Number(city.vendor_count) !== 1 ? 's' : ''}</p>
                  </div>
                </Link>
              ))}
              {extraTargetCities.map(city => (
                <Link
                  key={city.citySlug}
                  href={`/states/${stateSlug}/${city.citySlug}`}
                  className="card hover:border-brand-200 transition-colors p-4 flex items-center gap-3"
                >
                  <MapPin className="w-5 h-5 text-stone-300 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{city.city}</p>
                    <p className="text-sm text-stone-400">Coming soon</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Vendors in State */}
        {vendors.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl font-semibold mb-6">All Vendors in {stateName}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        )}

        {/* Lead Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold mb-2 text-center">
            Get Free Quotes in {stateName}
          </h2>
          <p className="text-stone-500 text-center mb-8">
            Tell us about your event and we&apos;ll connect you with vendors near you.
          </p>
          <LeadForm defaultState={stateName} sourcePage={`/states/${stateSlug}`} />
        </div>
      </div>
    </div>
  )
}
