import Link from 'next/link'
import { Flame, MapPin, Users, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { getFeaturedVendors, getPopularCities, getVendorCount, getCityCount } from '@/lib/data'
import { CATEGORIES, SITE_NAME } from '@/lib/constants'
import VendorCard from '@/components/VendorCard'

export default async function HomePage() {
  const [featured, cities, vendorCount, cityCount] = await Promise.all([
    getFeaturedVendors(),
    getPopularCities(12),
    getVendorCount(),
    getCityCount(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 opacity-90" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Book a Mobile Sauna<br className="hidden md:block" /> or Cold Plunge
          </h1>
          <p className="text-lg md:text-xl text-forest-100 max-w-2xl mx-auto mb-10">
            Find and book mobile sauna rentals, cold plunge tubs, and contrast therapy setups for weddings, parties, corporate events, and private retreats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quotes" className="btn-primary text-lg px-8 py-4">
              Get Free Quotes
            </Link>
            <Link href="/states" className="btn-outline border-white text-white hover:bg-white hover:text-forest-900 text-lg px-8 py-4">
              Browse by City
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest-50 border-y border-forest-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-forest-800">{vendorCount}+</p>
              <p className="text-stone-600 text-sm mt-1">Vendors Listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-forest-800">{cityCount}+</p>
              <p className="text-stone-600 text-sm mt-1">Cities Covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-forest-800">{CATEGORIES.length}</p>
              <p className="text-stone-600 text-sm mt-1">Service Types</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-forest-800">100%</p>
              <p className="text-stone-600 text-sm mt-1">Free to Use</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: 'Find Local Vendors', desc: 'Browse mobile sauna and cold plunge vendors in your city. Filter by service type and event.' },
              { icon: Users, title: 'Request Quotes', desc: 'Submit your event details once and get personalized quotes from top local providers.' },
              { icon: CheckCircle, title: 'Book & Enjoy', desc: 'Compare options, choose your favorite, and book directly. Your wellness event is set.' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-forest-700" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-stone-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      {featured.length > 0 && (
        <section className="section-padding bg-warm-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl font-bold">Featured Vendors</h2>
              <Link href="/states" className="text-forest-700 hover:text-forest-800 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-4">Browse by Service</h2>
          <p className="text-stone-600 text-center mb-10 max-w-2xl mx-auto">
            From traditional barrel saunas to ice bath tubs and full wellness packages — find exactly what you need.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="card hover:border-forest-300 transition-colors p-6 flex items-start gap-4"
              >
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-lg">{cat.name}</h3>
                  <p className="text-stone-600 text-sm mt-1">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      {cities.length > 0 && (
        <section className="section-padding bg-forest-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-center mb-4">Popular Cities</h2>
            <p className="text-stone-600 text-center mb-10">
              Explore mobile sauna and cold plunge vendors near you.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map(city => (
                <Link
                  key={`${city.city_slug}-${city.state_slug}`}
                  href={`/states/${city.state_slug}/${city.city_slug}`}
                  className="card hover:border-forest-300 transition-colors p-5"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-forest-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">{city.city}, {city.state_abbr}</p>
                      <p className="text-sm text-stone-500">{city.vendor_count} vendor{Number(city.vendor_count) !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/states" className="btn-secondary">
                View All States
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-forest-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Flame className="w-12 h-12 mx-auto mb-6 text-forest-300" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Schvitz?
          </h2>
          <p className="text-forest-100 text-lg mb-8">
            Tell us about your event and we&apos;ll connect you with the best local vendors. It&apos;s free and takes under a minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quotes" className="btn-primary text-lg px-8 py-4">
              Get Free Quotes
            </Link>
            <Link href="/add-your-listing" className="btn-outline border-white text-white hover:bg-white hover:text-forest-900 text-lg px-8 py-4">
              List Your Business
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
