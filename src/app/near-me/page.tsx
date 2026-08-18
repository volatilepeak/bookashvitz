import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { TOP_CITIES } from '@/lib/constants'
import { getVendorCount, getCityCount } from '@/lib/data'
import LeadForm from '@/components/LeadForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobile Sauna & Cold Plunge Rentals Near Me — Find Local Vendors (2025)',
  description: 'Find mobile sauna rentals, cold plunge rentals, and contrast therapy vendors near you. Browse 100+ vendors in 60+ cities. Compare prices, read reviews, and get free quotes in under 60 seconds.',
  keywords: ['mobile sauna near me', 'sauna near me', 'sauna rental near me', 'cold plunge near me', 'mobile sauna for rent near me', 'cold plunge rental near me', 'sauna rentals near me', 'mobile cold plunge near me'],
}

export default async function NearMePage() {
  const [vendorCount, cityCount] = await Promise.all([getVendorCount(), getCityCount()])

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Mobile Sauna & Cold Plunge Rentals Near You
        </h1>
        <p className="text-stone-500 text-lg mb-6 max-w-3xl">
          Find mobile sauna rentals, cold plunge rentals, and contrast therapy vendors in your area. We have {vendorCount}+ vendors across {cityCount}+ cities nationwide. Select your city below or request quotes and we&apos;ll match you with local providers.
        </p>

        <div className="prose prose-stone max-w-none mb-12">
          <h2 className="font-display">How to Find a Mobile Sauna Near You</h2>
          <p>
            Mobile sauna and cold plunge rental vendors deliver directly to your location — your backyard, event venue, office parking lot, or Airbnb. You don&apos;t need to travel to a spa or wellness center. The sauna comes to you, fully equipped and ready to go.
          </p>
          <p>
            Most vendors serve a radius of 20-50 miles from their home base, so finding one near you depends on your city. The mobile sauna industry is growing fast, with vendors now operating in most major U.S. metros and many smaller markets.
          </p>
          <p>
            The fastest way to find vendors near you is to <Link href="/get-quotes" className="text-brand-600 hover:text-brand-700">submit a free quote request</Link> with your location and event details. We&apos;ll match you with available vendors in your area within 24-48 hours.
          </p>
        </div>

        <h2 className="font-display text-2xl font-semibold mb-6">Browse by City</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {TOP_CITIES.map(city => (
            <Link
              key={city.citySlug}
              href={`/states/${city.stateSlug}/${city.citySlug}`}
              className="card hover:border-brand-200 transition-colors p-4 flex items-center gap-3"
            >
              <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">{city.city}, {city.stateAbbr}</p>
                <p className="text-sm text-stone-400">View vendors</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="text-stone-500 mb-3">Don&apos;t see your city?</p>
          <Link href="/states" className="text-brand-600 hover:text-brand-700 font-medium flex items-center justify-center gap-1">
            Browse all states and cities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="prose prose-stone max-w-none mb-12">
          <h2 className="font-display">Mobile Sauna Rental Pricing Near You</h2>
          <p>
            Mobile sauna rental prices vary by city, but most markets fall in the $300-800 range for a 3-4 hour rental. Adding a cold plunge for contrast therapy typically brings the total to $500-1,500. Pricing depends on your location, the vendor&apos;s delivery radius, the type of sauna (barrel, cabin, trailer), and whether you want add-ons like towels, robes, or an attendant.
          </p>
          <p>
            For a detailed breakdown, check our <Link href="/blog/mobile-sauna-rental-cost-pricing-guide" className="text-brand-600 hover:text-brand-700">complete mobile sauna rental pricing guide</Link>.
          </p>

          <h2 className="font-display">Popular Services</h2>
          <p>
            The most popular mobile wellness services include <Link href="/categories/mobile-sauna-rental" className="text-brand-600">mobile sauna rentals</Link> for backyard parties and events, <Link href="/categories/cold-plunge-rental" className="text-brand-600">cold plunge rentals</Link> for athletic recovery and corporate wellness, and <Link href="/categories/contrast-therapy" className="text-brand-600">contrast therapy packages</Link> that combine hot and cold for the full experience.
          </p>
          <p>
            Looking to build your own instead of renting? Check out our <Link href="/custom-builds" className="text-brand-600">custom sauna and cold plunge builder directory</Link>.
          </p>
        </div>

        {/* Lead Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold mb-2 text-center">
            Get Free Quotes From Vendors Near You
          </h2>
          <p className="text-stone-500 text-center mb-8">
            Tell us your location and event details. We&apos;ll connect you with the best local vendors.
          </p>
          <LeadForm sourcePage="/near-me" />
        </div>
      </div>
    </div>
  )
}
