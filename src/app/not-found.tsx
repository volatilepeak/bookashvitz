import Link from 'next/link'
import { Flame } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="max-w-lg mx-auto px-4 text-center">
        <Flame className="w-16 h-16 mx-auto mb-6 text-forest-300" />
        <h1 className="font-display text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-stone-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/states" className="btn-secondary">Browse Vendors</Link>
        </div>
      </div>
    </div>
  )
}
