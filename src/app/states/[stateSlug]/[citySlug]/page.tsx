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
    title: `Mobile Sauna & Cold Plunge Rentals in ${name}, ${stAbbr}`,
    description: `Find mobile sauna rental, cold plunge, and contrast therapy vendors in ${name}, ${stName}. Compare services and get free quotes for your event.`,
  }
}

export async function generateStaticParams() {
  // Pre-generate pages for all target cities
  const { TOP_CITIES } = await import('@/lib/constants')
  return TOP_CITIES.map(c => ({ stateSlug: c.stateSlug, citySlug: c.citySlug }))
}

export default async function CityPage({ params }: Props) {
  const { stateSlug, citySlug } = await params
  const [city, vendors] = await Promise.all([
    getCityInfo(citySlug, stateSlug),
    getVendorsByCity(citySlug, stateSlug),
  ])

  // Fall back to target city data if no vendors yet
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
        <p className="text-stone-500 text-lg mb-10">
          {vendors.length > 0
            ? `Browse ${vendors.length} vendor${vendors.length !== 1 ? 's' : ''} offering mobile saunas, cold plunges, and wellness rental services in ${cityName}, ${stateName}.`
            : `We're building our directory of mobile sauna and cold plunge vendors in ${cityName}. Submit a quote request below and we'll connect you with providers in the ${cityName} area.`
          }
        </p>

        {vendors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {vendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center mb-16">
            <Flame className="w-10 h-10 text-brand-400 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">Vendors coming soon to {cityName}</h2>
            <p className="text-stone-500 max-w-md mx-auto">
              We&apos;re actively adding mobile sauna and cold plunge vendors in the {cityName} area. Request a quote below and we&apos;ll reach out as soon as we have matches for you.
            </p>
          </div>
        )}

        {/* SEO Content Block */}
        <div className="prose prose-stone max-w-none mb-16">
          <h2 className="font-display">About Mobile Sauna Rentals in {cityName}</h2>
          <p>
            {cityName} is quickly becoming a hotspot for mobile sauna and cold plunge rentals. Whether you&apos;re planning a backyard birthday party, a bachelorette weekend, a corporate wellness event, or a private retreat, mobile sauna vendors in the {cityName}, {stateName} area can bring the experience directly to your location.
          </p>
          <p>
            Most mobile sauna rentals in {cityName} include delivery, setup, and takedown — you just pick a date and a flat spot in your yard, driveway, or event venue. Pricing typically ranges from $300-800 for a 3-4 hour rental, with contrast therapy packages (sauna + cold plunge) running $500-1500 depending on the setup.
          </p>
          <p>
            Popular events for mobile sauna bookings in {cityName} include weddings, bachelorette parties, team-building offsites, fitness recovery sessions, and weekend gatherings with friends. <Link href="/get-quotes" className="text-brand-600 hover:text-brand-700">Get free quotes from {cityName} vendors</Link> to see what&apos;s available for your event.
          </p>
        </div>

        {/* Lead Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold mb-2 text-center">
            Get Free Quotes in {cityName}
          </h2>
          <p className="text-stone-500 text-center mb-8">
            Tell us about your event and we&apos;ll connect you with the best local vendors.
          </p>
          <LeadForm defaultCity={cityName} defaultState={stateName || ''} sourcePage={`/states/${stateSlug}/${citySlug}`} />
        </div>
      </div>
    </div>
  )
}
