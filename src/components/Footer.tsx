import Link from 'next/link'
import { Flame } from 'lucide-react'
import { CATEGORIES, TOP_CITIES } from '@/lib/constants'

export function Footer() {
  const featuredCities = TOP_CITIES.slice(0, 8)

  return (
    <footer className="bg-stone-800 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-stone-300" />
              <span className="text-xl font-display font-bold text-warm-50">BookAShvitz</span>
            </Link>
            <p className="text-warm-400 text-sm leading-relaxed">
              The easiest way to find and book mobile sauna rentals, cold plunge tubs, and contrast therapy setups for your next event.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-warm-50 font-display font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {CATEGORIES.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-warm-400 hover:text-stone-50 text-sm transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-warm-50 font-display font-semibold text-lg mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              {featuredCities.map(c => (
                <li key={c.citySlug}>
                  <Link href={`/states/${c.stateSlug}/${c.citySlug}`} className="text-warm-400 hover:text-stone-50 text-sm transition-colors">
                    {c.city}, {c.stateAbbr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-warm-50 font-display font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/get-quotes" className="text-warm-400 hover:text-stone-50 text-sm transition-colors">Get Quotes</Link></li>
              <li><Link href="/add-your-listing" className="text-warm-400 hover:text-stone-50 text-sm transition-colors">Add Your Listing</Link></li>
              <li><Link href="/blog" className="text-warm-400 hover:text-stone-50 text-sm transition-colors">Blog</Link></li>
              <li><Link href="/states" className="text-warm-400 hover:text-stone-50 text-sm transition-colors">All States</Link></li>
              <li><a href="mailto:hello@bookashvitz.com" className="text-warm-400 hover:text-stone-50 text-sm transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-warm-500 text-sm">&copy; {new Date().getFullYear()} BookAShvitz. All rights reserved.</p>
          <p className="text-warm-500 text-sm">
            Also check out <a href="https://findcoffeecarts.com" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-stone-50 transition-colors">FindCoffeeCarts.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
