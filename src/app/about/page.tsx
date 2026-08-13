import Link from 'next/link'
import { Flame } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About BookAShvitz',
  description: 'BookAShvitz is a free directory for mobile sauna and cold plunge rental vendors. Learn how we work, how listings are created, and how to update or remove your business.',
}

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto px-4">
        <Flame className="w-10 h-10 text-brand-400 mb-4" />
        <h1 className="font-display text-4xl font-bold mb-8">About BookAShvitz</h1>

        <div className="prose prose-stone max-w-none">
          <h2 className="font-display">What Is BookAShvitz?</h2>
          <p>
            BookAShvitz is a free online directory that helps people find mobile sauna rentals, cold plunge tubs, contrast therapy, and custom sauna builders in their area. We connect customers with vendors — we are not a booking service, event planner, or vendor ourselves.
          </p>

          <h2 className="font-display">How It Works</h2>
          <p>
            Customers visit our site, browse vendors by city or service type, and submit a free quote request with their event details. We forward those qualified leads to vendors in their area. Vendors contact the customer directly, handle the booking, and keep 100% of the revenue. We never charge customers.
          </p>

          <h2 className="font-display">How Listings Are Created</h2>
          <p>
            Vendor listings on BookAShvitz are created using publicly available business information, similar to how directories like Yelp, Google Maps, Thumbtack, The Knot, and other platforms list businesses. Information may include your business name, city, phone number, website, and publicly posted reviews or ratings.
          </p>
          <p>
            We do not represent ourselves as any listed business. Each listing clearly identifies the vendor by name and links to their own website. BookAShvitz is a directory — not a competitor to any vendor listed on the platform.
          </p>

          <h2 className="font-display">For Vendors: Claim, Update, or Remove Your Listing</h2>
          <p>
            If your business is listed on BookAShvitz, you can:
          </p>
          <ul>
            <li><strong>Claim your listing</strong> — update your photos, description, pricing, and services at no cost</li>
            <li><strong>Become a Featured Vendor</strong> — get priority placement and lead routing in your area</li>
            <li><strong>Request removal</strong> — if you prefer not to be listed, we will remove your listing promptly, no questions asked</li>
          </ul>
          <p>
            For any of the above, email us at <a href="mailto:hello@bookashvitz.com">hello@bookashvitz.com</a>.
          </p>

          <h2 className="font-display">Our Goal</h2>
          <p>
            The mobile sauna and cold plunge industry is growing fast, but it can be hard for customers to find vendors in their area. Our goal is to make that easier — and to help great vendors get discovered by customers who are actively looking for their services.
          </p>
          <p>
            We believe that connecting customers with the right vendor benefits everyone. Customers find what they need, and vendors get in front of people who are ready to book.
          </p>

          <h2 className="font-display">Contact</h2>
          <p>
            Questions, concerns, or removal requests: <a href="mailto:hello@bookashvitz.com">hello@bookashvitz.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
