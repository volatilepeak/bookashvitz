import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Find & Book Mobile Sauna Rentals Near You`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Find mobile sauna rentals, cold plunge rentals, and contrast therapy near you. Compare 100+ vendors, see prices and reviews, and get free quotes in 60 seconds.',
  keywords: ['mobile sauna rental', 'mobile sauna rental near me', 'cold plunge rental', 'sauna for rent', 'mobile sauna for rent', 'sauna rental near me', 'contrast therapy rental', 'ice bath rental', 'mobile sauna service', 'cold plunge rental near me'],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Mobile Sauna & Cold Plunge Rentals for Events`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Mobile Sauna & Cold Plunge Rentals for Events`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
