import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Browse mobile sauna rentals, cold plunge tubs, contrast therapy, infrared saunas, ice baths, and wellness event packages.',
}

export default function CategoriesPage() {
  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-display text-4xl font-bold mb-4">Services</h1>
        <p className="text-stone-600 text-lg mb-10 max-w-2xl">
          Browse our directory by service type to find exactly what you need for your event.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="card hover:border-forest-300 transition-colors p-8"
            >
              <span className="text-4xl block mb-4">{cat.icon}</span>
              <h2 className="font-display text-xl font-semibold mb-2">{cat.name}</h2>
              <p className="text-stone-600">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
