import Link from 'next/link'
import { Check, Award, TrendingUp, Users, MessageSquare, Zap, Crown, Search, Layers, MousePointerClick, PhoneCall, LineChart } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vendor Pricing — Get Listed on BookAShvitz',
  description: 'Free listings for mobile sauna and cold plunge vendors. Upgrade to Premium to top every city and category page, get the gold-ring treatment, and unlock priority lead routing. Founding pricing: $49/mo (normally $99/mo).',
  alternates: { canonical: '/pricing' },
}

const PREMIUM_PERKS = [
  {
    icon: Crown,
    title: 'Top placement, everywhere',
    body: 'Your listing sorts to the top of every city page, state page, and category page you appear on. When someone searches "mobile sauna rental Miami" or "cold plunge for corporate events," they see you first — not buried under free listings.',
  },
  {
    icon: Award,
    title: 'The gold-ring treatment',
    body: "Amber ring around your card, gold Premium Vendor banner at the top of your listing, verified checkmark. You look different — professionally built, hand-picked. Visitors trust you before they even click through.",
  },
  {
    icon: Search,
    title: 'Rich snippets in Google',
    body: "Your vendor-written 6-question FAQ renders as FAQ schema markup — the exact format Google turns into rich snippets in search results. More screen real estate, higher click-through, more inbound leads. This alone is why some vendors upgrade.",
  },
  {
    icon: PhoneCall,
    title: 'Lead routing',
    body: "Every quote request that matches your city and services gets routed to you directly. Premium vendors are the vendors in our routing system — Free listings are directory presence only. If you're the only Premium in your market, you're getting every matched lead.",
  },
  {
    icon: Layers,
    title: 'Vendor-written page, not templated',
    body: 'You send us your description, your service area, your pricing tiers, your FAQ answers — we build the whole page around your actual business. No boilerplate. No auto-generated fallback. Your Premium page reads like your website, not like a directory listing.',
  },
  {
    icon: MousePointerClick,
    title: '10-photo gallery',
    body: 'Send us up to 10 photos — real setup shots, event photos, cold plunge in action. Renders as a clickable thumbnail gallery on your page. Free listings get one photo. Yours tells the whole story.',
  },
  {
    icon: LineChart,
    title: 'Monthly performance report',
    body: 'Every month, we send you a plain-English breakdown of your page: how many visitors, where they came from, how many contact clicks, and how many leads were routed to you. Know exactly what you\'re paying for.',
  },
  {
    icon: MessageSquare,
    title: 'Direct support',
    body: "Email or text James directly for anything — content updates, photo swaps, service area changes, pricing tweaks. Most changes go live within 24 hours. No support ticket queue, no chatbot.",
  },
]

const WHY_LIST = [
  {
    icon: TrendingUp,
    title: 'Built for search',
    body: 'Every vendor page ships with LocalBusiness schema, FAQ schema, canonical URLs, and a genuinely unique city-page above the vendor cards. We do the SEO work so Google actually sends traffic your way.',
  },
  {
    icon: Users,
    title: 'Real buying intent',
    body: 'Our visitors search "mobile sauna for wedding" or "cold plunge rental corporate event." They\'re planning something specific and they\'re ready to book. Premium vendors are the ones we connect them with.',
  },
  {
    icon: MessageSquare,
    title: 'You own the customer',
    body: "No booking fee. No commission. No middleman on the transaction. When a Premium vendor closes a lead we routed, whatever they close is 100% theirs.",
  },
  {
    icon: Zap,
    title: 'Cancel anytime',
    body: 'Premium is monthly. No annual contract, no cancellation fee. If it\'s not producing leads, downgrade to Free and keep your listing running for nothing.',
  },
]

const FAQS = [
  {
    q: "What's the difference between Free and Premium, really?",
    a: "Free is a directory listing — you show up on your city and category pages with a basic page and stay findable in Google. Premium is a business channel — top placement everywhere, gold-ring treatment, fully vendor-written page with 10 photos and custom FAQ, and lead routing. Free gets you in the directory. Premium is how vendors actually get booked through us."
  },
  {
    q: "Why is founding pricing capped at 25 vendors?",
    a: "$49/mo is a launch offer to fill the first Premium tier and build case studies. After the first 25 Premium slots are filled, standard pricing is $99/mo for new signups. Founding vendors keep the $49 rate for as long as their subscription stays active — cancel and re-sign later, it's the standard $99."
  },
  {
    q: "Do you charge a commission on bookings?",
    a: "No. We're a listing directory, not a marketplace. We route leads to you and step aside. Whatever you close from a BookAShvitz lead is 100% yours — that's why the monthly pricing exists instead of a per-booking cut."
  },
  {
    q: "How many leads should I expect?",
    a: "Depends heavily on your city, category, and how well-enriched your page is. High-demand markets (Florida, Minnesota, Texas, Colorado) produce more inquiries. Niche categories (Contrast Therapy, Wellness Event Packages) see steady but lower volume. We don't guarantee lead counts — what we guarantee is a well-optimized page that puts you in front of buyers actively searching for your service."
  },
  {
    q: "Can I upgrade later?",
    a: "Yes — anytime. Start Free to test your listing content, upgrade to Premium when you're ready to unlock lead routing and top placement. Downgrade or cancel with one email. No lock-in."
  },
  {
    q: "What if you don't have vendors in my area yet?",
    a: "That's the best time to lock in Premium. Being the only Premium vendor in your city means every matched quote in your area comes to you, and your page has time to build search authority before other vendors show up. Founding pricing at $49/mo makes that lock-in cheap."
  },
]

export default function PricingPage() {
  return (
    <div className="section-padding bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Award className="w-4 h-4" />
            For mobile sauna &amp; cold plunge vendors
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            List free. Upgrade when you&apos;re ready to own your market.
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            No commission on bookings. No annual contract. Cancel anytime. Just a good listing that ranks and a Premium tier that actually differentiates.
          </p>
        </div>

        {/* Pricing Tiers - 2 columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-4xl mx-auto">
          {/* FREE TIER */}
          <div className="rounded-xl bg-white border border-stone-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="font-display text-2xl font-bold mb-1">Free Listing</h3>
              <p className="text-stone-500 text-sm mb-6">Get your business on the map.</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-stone-900">$0</span>
                  <span className="text-stone-500 text-sm">forever</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Listed on your city, state, and category pages',
                  'Direct phone / website / Instagram links',
                  'Auto-generated FAQ block (LocalBusiness + FAQ schema)',
                  'One photo',
                  'No expiration, no commission on bookings',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand-500" />
                    <span className="text-stone-700">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/add-your-listing"
                className="block text-center font-semibold py-3 px-5 rounded-lg bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors"
              >
                Add Free Listing
              </Link>
            </div>
          </div>

          {/* PREMIUM TIER */}
          <div className="rounded-xl bg-white ring-2 ring-amber-400 shadow-xl overflow-hidden flex flex-col relative">
            <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-amber-950 text-xs font-bold uppercase tracking-wider px-3 py-2 flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4" />
              Founding Vendor Pricing — First 25 Only
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="font-display text-2xl font-bold mb-1">Premium</h3>
              <p className="text-stone-500 text-sm mb-6">Own your market. Get the gold-ring treatment.</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-amber-700">$49</span>
                  <span className="text-stone-500 text-sm">/ month</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  <span className="line-through">Standard $99/mo</span>
                  <span className="text-amber-700 font-semibold ml-2">Locked in for life — cancel anytime</span>
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Top-of-page placement on every city, state, and category page',
                  'Gold ring around your card + Premium Vendor banner on your page',
                  'Vendor-written 500+ word description (not templated)',
                  'Vendor-written 6-question FAQ → renders as FAQ rich snippets in Google',
                  '10-photo gallery (thumbnail strip + full-view)',
                  'Lead routing — matched quotes come to you directly',
                  'Monthly performance report',
                  'Direct support (email or text — 24 hr response)',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span className="text-stone-700 font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/add-your-listing?tier=premium"
                className="block text-center font-semibold py-3 px-5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                Claim Founding Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* What Premium actually gets you — deeper perks */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3">
              What Premium actually gets you
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Premium isn&apos;t a badge — it&apos;s a completely different listing experience. Here&apos;s exactly what changes when you upgrade.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PREMIUM_PERKS.map(perk => (
              <div key={perk.title} className="bg-white rounded-xl p-6 border border-stone-200 hover:border-amber-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <perk.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{perk.title}</h3>
                <p className="text-stone-600 leading-relaxed text-sm">{perk.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* See a fully-built listing */}
        <div className="bg-stone-900 text-white rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Award className="w-3 h-3" /> See it in action
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">
              See what a fully-built vendor listing looks like.
            </h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              Cold Plunge Florida&apos;s page is built out the way every Premium listing is — vendor-written description, real service area, real pricing tiers, 6 vendor-specific FAQ questions. This is exactly what your page becomes when you upgrade.
            </p>
            <Link
              href="/vendors/cold-plunge-florida"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Cold Plunge Florida listing →
            </Link>
          </div>
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
            Start with a free listing to lock in your directory presence. Upgrade to Premium when you want top placement and matched leads.
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
