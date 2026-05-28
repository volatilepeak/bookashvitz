import { Flame } from 'lucide-react'
import LeadForm from '@/components/LeadForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Free Quotes',
  description: 'Request free quotes from mobile sauna rental and cold plunge vendors for your event. Tell us your needs and we\'ll connect you with the best local providers.',
}

export default function GetQuotesPage() {
  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <Flame className="w-12 h-12 mx-auto mb-4 text-forest-600" />
          <h1 className="font-display text-4xl font-bold mb-4">Get Free Quotes</h1>
          <p className="text-stone-600 text-lg">
            Tell us about your event and we&apos;ll connect you with mobile sauna and cold plunge vendors in your area. It&apos;s free and takes under a minute.
          </p>
        </div>
        <LeadForm sourcePage="/get-quotes" />
      </div>
    </div>
  )
}
