import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Flame, HelpCircle } from 'lucide-react'
import { getCityInfo, getVendorsByCity } from '@/lib/data'
import { getTopCity } from '@/lib/constants'
import { generateCityIntro, generateCityFAQ } from '@/lib/cityContent'
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
    description: `Compare vetted mobile sauna and cold plunge vendors serving ${name}, ${stName}. See services, pricing, and request free quotes for events, weddings, retreats, and private gatherings.`,
    alternates: { canonical: `/states/${stateSlug}/${citySlug}` },
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

  if (!cityName || !stateName || !stateAbbr) notFound()

  const intro = generateCityIntro(cityName, stateName, stateAbbr, vendors)
  const faqs = generateCityFAQ(cityName, stateName, stateAbbr, vendors)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            Mobile Sauna &amp; Cold Plunge Rentals in {cityName}, {stateAbbr}
          </h1>

          {/* Unique intro paragraph — varies by vendor count + categories */}
          <div className="max-w-3xl mb-10">
            <p className="text-stone-600 leading-relaxed text-lg">{intro}</p>
          </div>

          {vendors.length > 0 ? (
            <>
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold">
                  Vendors serving {cityName}
                </h2>
                <span className="text-sm text-stone-500">
                  {vendors.length} listed
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {vendors.map(vendor => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            </>
          ) : (
            <div className="card p-10 text-center mb-16 mt-6">
              <Flame className="w-10 h-10 text-brand-400 mx-auto mb-4" />
              <h2 className="font-display text-xl font-semibold mb-2">Directory is still growing in {cityName}</h2>
              <p className="text-stone-500 max-w-md mx-auto">
                Request a quote below and we&apos;ll connect you with vendors serving the {cityName} area.
              </p>
            </div>
          )}

          {/* City-specific FAQ */}
          <div className="mb-16 border-t border-stone-200 pt-12">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-brand-500" />
              <h2 className="font-display text-2xl font-semibold">
                {cityName} Mobile Sauna &amp; Cold Plunge FAQ
              </h2>
            </div>
            <div className="max-w-3xl space-y-6">
              {faqs.map((f, i) => (
                <div key={i} className="border-b border-stone-100 pb-6 last:border-0">
                  <h3 className="font-semibold text-stone-900 mb-2">{f.q}</h3>
                  <p className="text-stone-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-semibold mb-2 text-center">
              Get Quotes in {cityName}
            </h2>
            <p className="text-stone-500 text-center mb-8">
              Tell us about your event and we&apos;ll match you with local vendors.
            </p>
            <LeadForm defaultCity={cityName} defaultState={stateName} sourcePage={`/states/${stateSlug}/${citySlug}`} />
          </div>
        </div>
      </div>
    </>
  )
}
