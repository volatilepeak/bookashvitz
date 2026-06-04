import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin } from 'lucide-react'
import { getStateInfo, getCitiesByState, getVendorsByState } from '@/lib/data'
import VendorCard from '@/components/VendorCard'
import type { Metadata } from 'next'

type Props = { params: Promise<{ stateSlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug } = await params
  const state = await getStateInfo(stateSlug)
  if (!state) return { title: 'State Not Found' }
  return {
    title: `Mobile Sauna & Cold Plunge Rentals in ${state.state}`,
    description: `Find ${state.vendor_count} mobile sauna and cold plunge rental vendors across ${state.city_count} cities in ${state.state}. Browse vendors, compare services, and get free quotes.`,
  }
}

export default async function StatePage({ params }: Props) {
  const { stateSlug } = await params
  const [state, cities, vendors] = await Promise.all([
    getStateInfo(stateSlug),
    getCitiesByState(stateSlug),
    getVendorsByState(stateSlug),
  ])

  if (!state) notFound()

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/states" className="hover:text-stone-700">All States</Link>
          <span className="mx-2">›</span>
          <span className="text-stone-800">{state.state}</span>
        </nav>

        <h1 className="font-display text-4xl font-bold mb-4">
          Mobile Sauna & Cold Plunge Rentals in {state.state}
        </h1>
        <p className="text-stone-600 text-lg mb-10">
          Browse {state.vendor_count} vendor{Number(state.vendor_count) !== 1 ? 's' : ''} across {state.city_count} cit{Number(state.city_count) !== 1 ? 'ies' : 'y'} in {state.state}.
        </p>

        {/* Cities */}
        {cities.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-6">Cities in {state.state}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map(city => (
                <Link
                  key={city.city_slug}
                  href={`/states/${state.state_slug}/${city.city_slug}`}
                  className="card hover:border-stone-300 transition-colors p-4 flex items-center gap-3"
                >
                  <MapPin className="w-5 h-5 text-stone-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{city.city}</p>
                    <p className="text-sm text-stone-500">{city.vendor_count} vendor{Number(city.vendor_count) !== 1 ? 's' : ''}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Vendors in State */}
        {vendors.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-semibold mb-6">All Vendors in {state.state}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
