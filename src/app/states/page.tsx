import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { getAllStates } from '@/lib/data'
import { SITE_NAME } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse by State',
  description: 'Find mobile sauna rentals and cold plunge vendors by state. Browse our directory to find wellness rental providers near you.',
}

export default async function StatesPage() {
  const states = await getAllStates()

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-display text-4xl font-bold mb-4">Browse by State</h1>
        <p className="text-stone-600 text-lg mb-10 max-w-2xl">
          Find mobile sauna and cold plunge rental vendors across the United States.
        </p>

        {states.length === 0 ? (
          <div className="card p-12 text-center">
            <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">No listings yet</h2>
            <p className="text-stone-500 mb-6">We&apos;re building our directory. Check back soon or add your listing.</p>
            <Link href="/add-your-listing" className="btn-primary">Add Your Listing</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {states.map(state => (
              <Link
                key={state.state_slug}
                href={`/states/${state.state_slug}`}
                className="card hover:border-forest-300 transition-colors p-5"
              >
                <h2 className="font-display font-semibold text-lg">{state.state}</h2>
                <p className="text-sm text-stone-500 mt-1">
                  {state.vendor_count} vendor{Number(state.vendor_count) !== 1 ? 's' : ''} · {state.city_count} cit{Number(state.city_count) !== 1 ? 'ies' : 'y'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
