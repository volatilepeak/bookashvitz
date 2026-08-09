import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Hammer, Flame, Droplets, Home, CheckCircle } from 'lucide-react'
import { TOP_CITIES } from '@/lib/constants'
import BuildLeadForm from '@/components/BuildLeadForm'
import type { Metadata } from 'next'

type Props = { params: Promise<{ citySlug: string }> }

const cityContent: Record<string, { hook: string; detail: string }> = {
  'austin': {
    hook: "Austin's backyard culture and year-round warmth make it one of the best cities in the country for a custom sauna or cold plunge build.",
    detail: "Whether you're adding a cedar barrel sauna to your East Austin backyard, building a cold plunge setup for your Hill Country ranch, or installing contrast therapy at your Airbnb near Lake Travis, Austin builders can make it happen."
  },
  'nashville': {
    hook: "Nashville's booming real estate market means homeowners and Airbnb hosts are adding saunas and cold plunges to stand out from the competition.",
    detail: "From custom builds in the Nashville suburbs to installations at cabin rentals in the Smoky Mountain foothills, local builders are experienced with both residential and rental property projects."
  },
  'denver': {
    hook: "Denver's mountain lifestyle and wellness culture make custom saunas and cold plunges one of the most popular home upgrades along the Front Range.",
    detail: "Mountain homes in Evergreen, backyards in Highlands and RiNo, and rental properties near the ski resorts — Denver-area builders handle everything from simple barrel sauna installs to full contrast therapy suites."
  },
  'seattle': {
    hook: "Seattle's Nordic influence and year-round outdoor culture have made it one of the strongest markets in the country for custom sauna builds.",
    detail: "Puget Sound waterfront properties, Ballard backyards, and island cabins on the San Juans — Pacific Northwest builders specialize in weather-resistant outdoor saunas built for the PNW climate."
  },
  'portland': {
    hook: "Portland's deep sauna culture and DIY ethos make it a hotbed for custom builds, from backyard barrel saunas to full wellness installations.",
    detail: "Local builders serve the Portland metro and beyond, including Mt. Hood cabins, wine country properties, and coastal homes along the Oregon coast."
  },
  'los-angeles': {
    hook: "LA homeowners and Airbnb hosts are adding saunas and cold plunges as must-have wellness amenities in one of the most competitive real estate markets in the country.",
    detail: "From Malibu beach houses to Hollywood Hills estates to Ojai retreats, LA builders create stunning custom installations that match the aesthetic standards of the market."
  },
  'miami': {
    hook: "Miami's luxury real estate market and wellness-obsessed population are driving huge demand for residential cold plunge and sauna installations.",
    detail: "Waterfront properties in Miami Beach, estates in Coral Gables, and new developments in Brickell — Miami builders specialize in both indoor and outdoor installations designed for the South Florida climate."
  },
  'scottsdale': {
    hook: "Scottsdale's resort culture and luxury home market make it a natural fit for custom sauna and cold plunge installations.",
    detail: "Desert estates in North Scottsdale, wellness-focused properties in Paradise Valley, and rental homes near Camelback — local builders design installations that complement the desert landscape."
  },
  'chicago': {
    hook: "Chicago's brutal winters make a home sauna not just a luxury but a lifestyle essential. Custom builds are booming across the Chicagoland area.",
    detail: "Basement sauna conversions in Lincoln Park, backyard builds in the North Shore suburbs, and commercial installations for CrossFit gyms and wellness centers — Chicago builders know how to handle cold-climate installations."
  },
  'new-york': {
    hook: "Space is premium in New York, which is why custom sauna builders here specialize in creative, compact installations that maximize every square foot.",
    detail: "Brooklyn brownstone basements, Hamptons estate properties, Hudson Valley weekend homes, and commercial wellness spaces in Manhattan — NYC-area builders handle projects ranging from tight urban installs to sprawling estate builds."
  },
  'atlanta': {
    hook: "Atlanta's growing wellness scene and spacious suburban properties make it an ideal market for backyard sauna and cold plunge installations.",
    detail: "Backyards in Buckhead and Decatur, lake houses on Lanier, mountain properties in North Georgia — Atlanta builders serve the full metro and beyond."
  },
  'dallas': {
    hook: "Dallas homeowners are adding saunas and cold plunges to their properties at a rapid clip, driven by the city's wellness trend and large lot sizes.",
    detail: "Highland Park estates, Plano and Frisco new builds, ranch properties in the DFW exurbs — Texas builders design installations that handle the heat and look great year-round."
  },
  'san-diego': {
    hook: "San Diego's outdoor lifestyle and year-round perfect weather make it one of the best cities in America for an outdoor sauna or cold plunge build.",
    detail: "Beach-adjacent properties in La Jolla, backyards in North Park, and Encinitas surf compounds — San Diego builders create outdoor installations that blend seamlessly with the coastal lifestyle."
  },
  'salt-lake-city': {
    hook: "The Wasatch Front's ski culture and growing wellness scene are fueling demand for home saunas and cold plunges across the Salt Lake City metro.",
    detail: "Mountain homes near the ski resorts, Sugar House backyards, Park City investment properties — Utah builders specialize in installations built for the mountain climate."
  },
  'charlotte': {
    hook: "Charlotte's booming housing market and growing wellness culture make it an emerging hotspot for custom sauna and cold plunge installations.",
    detail: "Myers Park estates, Lake Norman waterfront properties, and mountain cabins near Asheville — Charlotte-area builders handle both residential and rental property projects."
  },
  'minneapolis': {
    hook: "Minneapolis might have more saunas per capita than any city in America. The Twin Cities' Scandinavian roots mean custom sauna building is practically a local tradition.",
    detail: "South Minneapolis backyards, lake cabins across the Chain of Lakes, St. Croix Valley retreats — Twin Cities builders carry on the Finnish sauna tradition with modern custom builds designed for Minnesota winters."
  },
  'topeka': {
    hook: "Topeka homeowners are catching on to the backyard sauna trend, and Kansas builders are stepping up to meet the demand.",
    detail: "Spacious Kansas lots, affordable construction costs, and four-season weather that makes a sauna useful year-round — Topeka is a great market for custom sauna and cold plunge builds. Local contractors serve the greater Topeka area including Lawrence, Manhattan, and the Kansas City metro."
  },
  'tampa': {
    hook: "Tampa Bay's booming wellness scene and year-round outdoor lifestyle make it one of Florida's hottest markets for mobile saunas, cold plunges, and custom builds.",
    detail: "From waterfront properties in South Tampa to backyards in Wesley Chapel and Brandon, Tampa Bay builders and rental vendors serve the full metro area including St. Petersburg, Clearwater, and Sarasota."
  },
  'plano': {
    hook: "Plano and the North Dallas suburbs are seeing a surge in demand for custom cold plunge installations and backyard sauna builds.",
    detail: "Large lots, new construction homes, and a wellness-focused population make Plano and the surrounding Frisco, Allen, and McKinney areas ideal for residential sauna and cold plunge installations. Local contractors serve the entire North Texas corridor."
  },
  'st-louis-park': {
    hook: "St. Louis Park and the western Twin Cities suburbs have deep Scandinavian roots and a strong tradition of home sauna builds.",
    detail: "From St. Louis Park to Minnetonka, Edina, and Hopkins, western metro builders specialize in custom saunas designed for Minnesota's extreme climate. Backyard barrel saunas, basement conversions, and lakeside builds are all popular in the area."
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params
  const city = TOP_CITIES.find(c => c.citySlug === citySlug)
  if (!city) return { title: 'Not Found' }
  return {
    title: `Custom Sauna & Cold Plunge Builders in ${city.city}, ${city.stateAbbr} — Free Quotes`,
    description: `Find qualified sauna builders and cold plunge installation contractors in ${city.city}, ${city.state}. Custom backyard saunas, indoor builds, cold plunge installations. Get free quotes from local builders.`,
  }
}

export async function generateStaticParams() {
  return TOP_CITIES.map(c => ({ citySlug: c.citySlug }))
}

export default async function CustomBuildsCityPage({ params }: Props) {
  const { citySlug } = await params
  const city = TOP_CITIES.find(c => c.citySlug === citySlug)
  if (!city) notFound()

  const content = cityContent[citySlug] || {
    hook: `${city.city} homeowners and property investors are discovering the value of custom sauna and cold plunge installations.`,
    detail: `Local builders in the ${city.city}, ${city.state} area specialize in residential and commercial sauna and cold plunge installations built to your specifications.`,
  }

  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/custom-builds" className="hover:text-stone-900">Custom Builds</Link>
          <span className="mx-2">›</span>
          <span className="text-stone-800">{city.city}, {city.stateAbbr}</span>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Custom Sauna & Cold Plunge Builders in {city.city}, {city.stateAbbr}
        </h1>
        <p className="text-stone-500 text-lg mb-10">{content.hook}</p>

        {/* What Builders Offer */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            { icon: Flame, label: 'Outdoor Saunas', range: '$5K–$25K+' },
            { icon: Home, label: 'Indoor Saunas', range: '$3K–$15K' },
            { icon: Droplets, label: 'Cold Plunge Tubs', range: '$3K–$15K' },
            { icon: Hammer, label: 'Full Contrast Therapy', range: '$8K–$40K+' },
          ].map((item, i) => (
            <div key={i} className="card p-4 flex items-center gap-4">
              <item.icon className="w-6 h-6 text-brand-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm text-stone-400">{item.range}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Content */}
        <div className="prose prose-stone max-w-none mb-12">
          <h2 className="font-display">Sauna & Cold Plunge Installation in {city.city}</h2>
          <p>{content.detail}</p>

          <p>
            A custom-built sauna or cold plunge is one of the highest-ROI home improvements you can make right now. Homeowners typically see $10,000-30,000+ in added property value, and Airbnb hosts report 20-40% increases in booking rates after adding a sauna or cold plunge to their property.
          </p>

          <h2 className="font-display">What to Expect from {city.city} Builders</h2>
          <p>
            Most custom sauna projects in {city.city} take 2-6 weeks from design to completion, depending on the complexity. Cold plunge installations are often faster — 1-3 weeks for a standard setup with a chiller system. Full contrast therapy builds (sauna + cold plunge) typically run 4-8 weeks.
          </p>
          <p>
            Local builders will visit your property, assess the space, discuss your preferences for materials and features, and provide a detailed quote. Most offer financing options for larger projects.
          </p>

          <h2 className="font-display">Popular Build Types in {city.city}</h2>
          <ul>
            <li><strong>Backyard barrel saunas</strong> — the most popular residential option, typically $5,000-12,000 installed</li>
            <li><strong>Custom cabin-style saunas</strong> — larger builds with changing rooms and covered areas, $10,000-25,000+</li>
            <li><strong>Indoor sauna conversions</strong> — basement, bathroom, or garage builds, $3,000-15,000</li>
            <li><strong>Cold plunge tubs with chillers</strong> — above-ground or in-ground, $3,000-15,000</li>
            <li><strong>Infrared sauna rooms</strong> — popular for indoor installations, $2,000-8,000</li>
          </ul>

          <p>
            Ready to get started? <a href="#get-quotes" className="text-brand-600 hover:text-brand-700">Get free quotes from {city.city} builders below</a> — it takes under 2 minutes and there&apos;s no obligation.
          </p>
        </div>

        {/* Why Build */}
        <div className="bg-stone-50 rounded-xl p-8 mb-12">
          <h3 className="font-display text-xl font-semibold mb-4">Why {city.city} Homeowners Are Building Saunas</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Daily wellness without a gym membership',
              'Significant property value increase',
              'Airbnb listing competitive advantage',
              'Built exactly for your space and style',
              'Health benefits: recovery, sleep, stress relief',
              'Entertaining and hosting friends year-round',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <p className="text-stone-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Form */}
        <div id="get-quotes">
          <h2 className="font-display text-2xl font-semibold text-center mb-2">
            Get Free Builder Quotes in {city.city}
          </h2>
          <p className="text-stone-500 text-center mb-8">
            Tell us about your project and we&apos;ll connect you with qualified local contractors.
          </p>
          <BuildLeadForm
            defaultCity={city.city}
            defaultState={city.state}
            sourcePage={`/custom-builds/${citySlug}`}
          />
        </div>

        {/* Cross-link to rentals */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-stone-500 mb-2">Not ready to build? Try renting first.</p>
          <Link href={`/states/${city.stateSlug}/${city.citySlug}`} className="text-brand-600 hover:text-brand-700 font-medium">
            Browse mobile sauna rentals in {city.city} →
          </Link>
        </div>
      </div>
    </div>
  )
}
