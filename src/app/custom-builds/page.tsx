import Link from 'next/link'
import { Hammer, Flame, Droplets, Home, Building2, MapPin, CheckCircle, ArrowRight } from 'lucide-react'
import { TOP_CITIES } from '@/lib/constants'
import BuildLeadForm from '@/components/BuildLeadForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Sauna & Cold Plunge Builders — Get Free Quotes',
  description: 'Find qualified sauna builders and cold plunge installation contractors near you. Custom backyard saunas, indoor saunas, cold plunge installations, and contrast therapy setups. Get free quotes from local builders.',
  keywords: ['custom sauna builder', 'sauna installation', 'cold plunge installation', 'backyard sauna', 'home sauna builder', 'sauna contractor near me', 'cold plunge contractor'],
}

export default function CustomBuildsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-brand-300 uppercase tracking-[0.2em] text-sm font-medium mb-4">Custom Builds & Installation</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build Your Own Sauna or Cold Plunge
            </h1>
            <p className="text-lg text-stone-300 mb-8 leading-relaxed">
              Connect with qualified contractors who build custom saunas, cold plunge installations, and contrast therapy setups for homes, Airbnbs, gyms, and commercial spaces. Get free quotes from local builders.
            </p>
            <a href="#get-quotes" className="btn-primary text-lg px-8 py-4">
              Get Free Builder Quotes
            </a>
          </div>
        </div>
      </section>

      {/* What We Help You Build */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-4">What We Help You Build</h2>
          <p className="text-stone-500 text-center mb-12 max-w-2xl mx-auto">
            Whether it&apos;s a backyard barrel sauna or a full commercial wellness installation, we connect you with builders who specialize in exactly what you need.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Flame, title: 'Custom Outdoor Saunas', desc: 'Barrel saunas, cabin saunas, and custom-designed outdoor builds. Wood-fired or electric. Built to your specs and your space.', price: '$5,000 – $25,000+' },
              { icon: Home, title: 'Indoor Home Saunas', desc: 'Basement, bathroom, or garage conversions. Traditional Finnish, infrared, or steam. Built into your existing space.', price: '$3,000 – $15,000' },
              { icon: Droplets, title: 'Cold Plunge Installation', desc: 'In-ground or above-ground cold plunge tubs with chiller systems. Residential and commercial.', price: '$3,000 – $15,000' },
              { icon: Hammer, title: 'Contrast Therapy Setups', desc: 'Full hot-cold installations — sauna + cold plunge built together with optimal layout for the contrast therapy flow.', price: '$8,000 – $40,000+' },
              { icon: Building2, title: 'Commercial Installations', desc: 'Saunas and cold plunges for gyms, wellness centers, spas, hotels, and fitness studios. Built to commercial code.', price: '$15,000 – $100,000+' },
              { icon: Home, title: 'Airbnb & Rental Properties', desc: 'Add a sauna or cold plunge to your rental property. One of the fastest-growing amenity upgrades for short-term rentals.', price: '$5,000 – $20,000' },
            ].map((item, i) => (
              <div key={i} className="card p-6">
                <item.icon className="w-8 h-8 text-brand-500 mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm mb-3">{item.desc}</p>
                <p className="text-sm font-semibold text-brand-600">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: '1', title: 'Tell Us Your Project', desc: 'Fill out the form with your build type, budget, timeline, and location. Takes under 2 minutes.' },
              { step: '2', title: 'Get Matched with Builders', desc: 'We connect you with qualified sauna and cold plunge contractors in your area. No cold calls, no spam.' },
              { step: '3', title: 'Compare & Build', desc: 'Review quotes, ask questions, and choose the builder that fits your vision and budget. We stay available if you need help.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Build */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-4">Why Build Your Own?</h2>
          <p className="text-stone-500 text-center mb-10 max-w-2xl mx-auto">
            A custom sauna or cold plunge pays for itself — in wellness, in property value, and in never having to book a rental again.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Use it daily — not just for special events',
              'Adds $10,000-30,000+ in property value',
              'Airbnb hosts see 20-40% booking rate increases',
              'Built exactly to your space and preferences',
              'Pays for itself in 1-2 years vs. spa memberships',
              'Health benefits: recovery, sleep, stress, circulation',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3">
                <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <p className="text-stone-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Links */}
      <section className="section-padding bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-4">Find Builders Near You</h2>
          <p className="text-stone-500 text-center mb-10">
            We connect you with sauna and cold plunge builders across the country.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TOP_CITIES.map(city => (
              <Link
                key={city.citySlug}
                href={`/custom-builds/${city.citySlug}`}
                className="card hover:border-brand-200 transition-colors p-4 flex items-center gap-3"
              >
                <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{city.city}, {city.stateAbbr}</p>
                  <p className="text-sm text-stone-400">View builders</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="get-quotes" className="section-padding">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-2">Get Free Builder Quotes</h2>
          <p className="text-stone-500 text-center mb-8">
            Tell us about your project and we&apos;ll connect you with qualified local contractors. Free, no obligation.
          </p>
          <BuildLeadForm sourcePage="/custom-builds" />
        </div>
      </section>
    </>
  )
}
