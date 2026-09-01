import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Flame } from 'lucide-react'
import { getCityInfo, getVendorsByCity } from '@/lib/data'
import { getTopCity } from '@/lib/constants'
import VendorCard from '@/components/VendorCard'
import LeadForm from '@/components/LeadForm'
import type { Metadata } from 'next'

type Props = { params: Promise<{ stateSlug: string; citySlug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug, citySlug } = await params
  const city = await getCityInfo(citySlug, stateSlug)
  const topCity = getTopCity(citySlug, stateSlug)
  const name = city?.city || topCity?.city
  const stAbbr = city?.state_abbr || topCity?.stateAbbr
  const stName = city?.state || topCity?.state
  if (!name) return { title: 'City Not Found' }
  return {
    title: `Best Mobile Sauna & Cold Plunge Rentals in ${name}, ${stAbbr} (2025)`,
    description: `Compare the top mobile sauna and cold plunge rental vendors in ${name}, ${stName}. See prices, ratings, and reviews. Get free quotes for your event in under 60 seconds.`,
  }
}

export async function generateStaticParams() {
  const { TOP_CITIES } = await import('@/lib/constants')
  return TOP_CITIES.map(c => ({ stateSlug: c.stateSlug, citySlug: c.citySlug }))
}

export default async function CityPage({ params }: Props) {
  const { stateSlug, citySlug } = await params
  const [city, vendors] = await Promise.all([
    getCityInfo(citySlug, stateSlug),
    getVendorsByCity(citySlug, stateSlug),
  ])

  const topCity = getTopCity(citySlug, stateSlug)
  const cityName = city?.city || topCity?.city
  const stateName = city?.state || topCity?.state
  const stateAbbr = city?.state_abbr || topCity?.stateAbbr

  if (!cityName) notFound()

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/states" className="hover:text-stone-900">All States</Link>
          <span className="mx-2">›</span>
          <Link href={`/states/${stateSlug}`} className="hover:text-stone-900">{stateName}</Link>
          <span className="mx-2">›</span>
          <span className="text-stone-800">{cityName}</span>
        </nav>

        <h1 className="font-display text-4xl font-bold mb-4">
          Mobile Sauna & Cold Plunge Rentals in {cityName}, {stateAbbr}
        </h1>

        {vendors.length > 0 ? (
          <>
            <p className="text-stone-500 text-lg mb-10">
              {vendors.length} vendor{vendors.length !== 1 ? 's' : ''} in {cityName}.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {vendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </>
        ) : (
          <div className="card p-10 text-center mb-16 mt-6">
            <Flame className="w-10 h-10 text-brand-400 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">No vendors listed in {cityName} yet</h2>
            <p className="text-stone-500 max-w-md mx-auto">
              Request a quote and we&apos;ll connect you with vendors who serve the {cityName} area.
            </p>
          </div>
        )}

        {/* Lead Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold mb-2 text-center">
            Get Quotes in {cityName}
          </h2>
          <p className="text-stone-500 text-center mb-8">
            Tell us about your event and we&apos;ll match you with local vendors.
          </p>
          <LeadForm defaultCity={cityName} defaultState={stateName || ''} sourcePage={`/states/${stateSlug}/${citySlug}`} />
        </div>
      </div>
    </div>
  )
}
