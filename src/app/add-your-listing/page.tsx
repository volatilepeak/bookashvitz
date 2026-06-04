import { Store } from 'lucide-react'
import VendorSubmitForm from '@/components/VendorSubmitForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Your Listing',
  description: 'List your mobile sauna, cold plunge, or wellness rental business on BookAShvitz. Reach customers looking for sauna and cold plunge rentals for events.',
}

export default function AddYourListingPage() {
  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <Store className="w-12 h-12 mx-auto mb-4 text-stone-600" />
          <h1 className="font-display text-4xl font-bold mb-4">Add Your Listing</h1>
          <p className="text-stone-600 text-lg">
            List your mobile sauna, cold plunge, or wellness rental business on BookAShvitz and get in front of customers looking for vendors in their area.
          </p>
        </div>

        <div className="card p-6 mb-8 bg-stone-50 border-stone-200">
          <h2 className="font-display font-semibold text-lg mb-2">Why List on BookAShvitz?</h2>
          <p className="text-stone-700 text-sm leading-relaxed">
            We connect you with customers actively searching for mobile sauna and cold plunge rentals for weddings, corporate events, bachelorette parties, private retreats, and more. Your listing is free to start and gets your business in front of the right audience.
          </p>
        </div>

        <VendorSubmitForm />
      </div>
    </div>
  )
}
