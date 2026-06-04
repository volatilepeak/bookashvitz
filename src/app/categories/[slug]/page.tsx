import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVendorsByCategory } from '@/lib/data'
import { getCategoryBySlug, CATEGORIES } from '@/lib/constants'
import VendorCard from '@/components/VendorCard'
import LeadForm from '@/components/LeadForm'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) return { title: 'Category Not Found' }
  return {
    title: `${cat.name} — Find & Book Vendors`,
    description: `${cat.description} Browse ${cat.name.toLowerCase()} vendors, compare services, and get free quotes for your event.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) notFound()

  const vendors = await getVendorsByCategory(cat.name)

  return (
    <div className="section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/categories" className="hover:text-stone-700">Services</Link>
          <span className="mx-2">›</span>
          <span className="text-stone-800">{cat.name}</span>
        </nav>

        <div className="mb-10">
          <span className="text-4xl block mb-4">{cat.icon}</span>
          <h1 className="font-display text-4xl font-bold mb-3">{cat.name}</h1>
          <p className="text-stone-600 text-lg max-w-2xl">{cat.description}</p>
        </div>

        {vendors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {vendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center mb-16">
            <h2 className="font-display text-xl font-semibold mb-2">No {cat.name.toLowerCase()} vendors listed yet</h2>
            <p className="text-stone-500 mb-6">We&apos;re growing our directory. Submit a quote request and we&apos;ll help connect you.</p>
          </div>
        )}

        {/* Lead Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold mb-2 text-center">
            Get Free {cat.name} Quotes
          </h2>
          <p className="text-stone-600 text-center mb-8">
            Tell us about your event and we&apos;ll connect you with vendors offering {cat.name.toLowerCase()}.
          </p>
          <LeadForm sourcePage={`/categories/${slug}`} />
        </div>
      </div>
    </div>
  )
}
