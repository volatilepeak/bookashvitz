'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Flame } from 'lucide-react'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Flame className="w-7 h-7 text-brand-500 group-hover:text-brand-600 transition-colors" />
            <span className="text-xl font-display font-bold text-stone-900">
              Book<span className="text-brand-500">A</span>Shvitz
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/states" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
              Browse by State
            </Link>
            <Link href="/categories" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
              Services
            </Link>
            <Link href="/blog" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
              Blog
            </Link>
            <Link href="/get-quotes" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
              Get Quotes
            </Link>
            <Link href="/add-your-listing" className="btn-primary text-sm !py-2 !px-4">
              Add Your Listing
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-stone-200">
            <div className="flex flex-col gap-3">
              <Link href="/states" onClick={() => setMobileOpen(false)} className="py-2 text-stone-700 hover:text-stone-900 font-medium">
                Browse by State
              </Link>
              <Link href="/categories" onClick={() => setMobileOpen(false)} className="py-2 text-stone-700 hover:text-stone-900 font-medium">
                Services
              </Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className="py-2 text-stone-700 hover:text-stone-900 font-medium">
                Blog
              </Link>
              <Link href="/get-quotes" onClick={() => setMobileOpen(false)} className="py-2 text-stone-700 hover:text-stone-900 font-medium">
                Get Quotes
              </Link>
              <Link href="/add-your-listing" onClick={() => setMobileOpen(false)} className="btn-primary text-sm text-center mt-2">
                Add Your Listing
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
