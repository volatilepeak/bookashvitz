import Link from 'next/link'
import { Check, X, Award, Star, Flame, TrendingUp, Users, MessageSquare, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vendor Pricing — Get Listed on BookAShvitz',
  description: 'Free listings for mobile sauna and cold plunge vendors. Upgrade to Featured or Premium to top city and category pages, get verified badges, and unlock priority lead routing.',
  alternates: { canonical: '/pricing' },
}

const TIERS = [
  {
    id: 'free',
    name: 'Free Listing',
    price: '$0',
    priceLabel: 'forever',
    tagline: 'Get your business on the map.',
    cta: { label: 'Add Your Free Listing', href: '/add-your-listing' },
    highlight: false,
    features: [
      { included: true, text: 'Listed in your city, state, and category pages' },
      { included: true, text: 'Direct phone / website / Instagram links' },
      { included: true, text: 'Vendor-specific FAQ block (auto-generated)' },
      { included: true, text: 'Google-optimized listing page with schema' },
      { included: true, text: 'Leads forwarded when we match your area' },
      { included: false, text: 'Featured or Premium badge' },
      { included: false, text: 'Top placement in your city / category' },
      { included: false, text: 'Vendor-written custom FAQ' },
      { included: false, text: 'Priority lead routing' },
    ],
  },
  {
    id: 'featured',
    name: 'Featured',
    price: '$29',
    priceLabel: '/ month',
    tagline: 'Stand out from the pack.',
    cta: { label: 'Get Featured', href: '/add-your-listing?tier=featured' },
    highlight: false,
    features: [
      { included: true, text: 'Everything in Free' },
      { included: true, text: 'Brand-color "Featured" badge on your card' },
      { included: true, text: 'Verified vendor checkmark' },
      { included: true, text: 'Ranked above free listings on city / category pages' },
      { included: true, text: 'Photo gallery (up to 5 photos)' },
      { included: true, text: 'Vendor-written description (500+ words)' },
      { included: false, text: 'Gold ring / Premium banner' },
      { included: false, text: 'Top-of-page placement' },
      { included: false, text: 'Priority lead routing' },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$49',
    priceLabel: '/ month',
    tagline: 'Own your market.',
    subtitle: 'Founding vendor pricing — limited to the first 25 vendors nationwide.',
    normalPrice: 'Standard $99/mo',
    cta: { label: 'Claim Founding Pricing', href: '/add-your-listing?tier=premium' },
    highlight: true,
    features: [
      { included: true, text: 'Everything in Featured' },
      { included: true, text: 'Gold ring around your card everywhere it appears' },
      { included: true, text: 'Full-width "Premium Vendor" banner on your page' },
      { included: true, text: 'Top-of-page placement on every city, state, and category page' },
      { included: true, text: 'Photo gallery (up to 10 photos)' },
      { included: true, text: 'Vendor-written 6-question FAQ (renders as FAQ rich snippet)' },
      { included: true, text: 'Priority lead routing (you get matched leads first)' },
      { included: true, text: 'Monthly performance report' },
      { included: true, text: 'Direct email + phone support' },
    ],
  },
]

const WHY_LIST = [
  {
    icon: TrendingUp,
    title: 'Built for search',
    body: 'Every vendor page ships with schema markup, JSON-LD FAQ blocks, and canonical URLs. We put in the SEO work so Google actually sends you traffic.',
  },
  {
    icon: Users,
    title: 'Genuine lead intent',
    body: 'Our visitors are searching "mobile sauna rental for wedding" or "cold plunge for corporate event" — not tire-kickers looking for a walk-in spa. When they contact you, they\'re ready.',
  },
  {
    icon: MessageSquare,
    title: 'You own the customer',
    body: 'We don\'t take a booking fee. We route the lead to you and step aside. Whatever you close is yours.',
  },
  {
    icon: Zap,
    title: 'No long-term contract',
    body: 'Featured and Premium are monthly. Cancel anytime. No annual lock-in, no hidden fees.',
  },
]

const FAQS = [
  {
    q: 'How does the free tier actually work — is it a real listing?',
    a: "Yes. Free listings show up in your city, state, and category pages just like paid ones, with all the same schema markup and lead-form integration. The differences are placement (Featured and Premium sort higher), custom content (Featured and Premium get vendor-written copy), and visual treatment (Premium gets the gold ring)."
  },
  {
    q: 'Can I upgrade or downgrade later?',
    a: "Anytime. Start free, upgrade to Featured or Premium when you're seeing results and want more placement. Downgrade or cancel with one email — no phone tree, no cancellation fee."
  },
  {
    q: 'Do you charge a commission on bookings?',
    a: "No. We're a listing directory, not a marketplace. We route leads to you and step aside — whatever you close is 100% yours. That's why the monthly pricing exists instead of a per-booking fee."
  },
  {
    q: 'How many leads should I expect?',
    a: "Depends on your city, category, and tier. High-demand markets like Florida, Minnesota, and Texas produce more inquiries; niche categories like Contrast Therapy see steady but lower volume. We don't guarantee lead counts — what we guarantee is a well-optimized page that gets you in front of buyers actively searching for your service."
  },
  {
    q: 'Why is Premium capped at 25 vendors nationwide?',
    a: "Founding-vendor pricing at $49/mo is a launch offer to fill our first Premium tier. After that fills, standard pricing is $99/mo. Locking in the founding rate keeps your monthly cost at $49 for as long as your subscription stays active."
  },
  {
    q: "What if you don't have vendors in my area yet?",
    a: "That's actually the best time to list. Being one of the first vendors in your city or state means you catch inbound leads without competition, and your page has time to build search authority. Add your listing free — we\'ll route any leads from your area to you as they come in."
  },
]

export default function PricingPage() {
  return (
    <div className="section-padding bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Flame className="w-4 h-4" />
            For mobile sauna &amp; cold plunge vendors
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Simple pricing. Real leads.
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            List for free. Upgrade when you&apos;re ready to own your market. No commissions on bookings — ever.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {TIERS.map(tier => (
            <div
              key={tier.id}
              className={`rounded-xl bg-white overflow-hidden flex flex-col relative ${
                tier.highlight
                  ? 'ring-2 ring-amber-400 shadow-xl'
                  : 'border border-stone-200 shadow-sm'
              }`}
            >
              {tier.highlight && (
                <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-amber-950 text-xs font-bold uppercase tracking-wider px-3 py-2 flex items-center justify-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Founding Vendor Pricing
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-bold mb-1">{tier.name}</h3>
                <p className="text-stone-500 text-sm mb-6">{tier.tagline}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold ${tier.highlight ? 'text-amber-700' : 'text-stone-900'}`}>
                      {tier.price}
                    </span>
                    <span className="text-stone-500 text-sm">{tier.priceLabel}</span>
                  </div>
                  {tier.normalPrice && (
                    <p className="text-xs text-stone-500 mt-1">
                      <span className="line-through">{tier.normalPrice}</span>
                      {tier.subtitle && <span className="text-amber-700 font-medium ml-2">{tier.subtitle}</span>}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      {f.included ? (
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-amber-600' : 'text-brand-500'}`} />
                      ) : (
                        <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-stone-300" />
                      )}
                      <span className={f.included ? 'text-stone-700' : 'text-stone-400'}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.cta.href}
                  className={`block text-center font-semibold py-3 px-5 rounded-lg transition-colors ${
                    tier.highlight
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : tier.id === 'featured'
                        ? 'bg-brand-500 text-white hover:bg-brand-600'
                        : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                  }`}
                >
                  {tier.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Why List */}
        <div className="mb-20">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Why list on BookAShvitz?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {WHY_LIST.map(item => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-stone-200">
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison teaser */}
        <div className="bg-stone-900 text-white rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Star className="w-3 h-3" /> What Premium looks like
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">
              See a real Premium listing in action.
            </h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              Cold Plunge Florida is one of our first Premium vendors. Check out their listing to see the gold ring, banner treatment, vendor-written FAQ, and full detail page — the exact treatment your listing gets when you upgrade.
            </p>
            <Link
              href="/vendors/cold-plunge-florida"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Cold Plunge Florida listing →
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="font-display text-3xl font-bold text-center mb-10">
            Vendor pricing questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-stone-200">
                <h3 className="font-semibold text-stone-900 mb-2">{f.q}</h3>
                <p className="text-stone-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to get listed?
          </h2>
          <p className="text-stone-600 mb-8 max-w-xl mx-auto">
            Start with a free listing. Upgrade to Featured or Premium once you&apos;re getting leads and want to scale.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/add-your-listing" className="btn-primary">
              Add Free Listing
            </Link>
            <Link href="/add-your-listing?tier=premium" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              <Award className="w-4 h-4" />
              Claim Founding Premium
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
