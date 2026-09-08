// Vendor-specific FAQ generation
// Falls back gracefully when vendor.faq is null in DB

import type { Vendor } from './db'

export type FAQ = { q: string; a: string }

const CAT_LABELS: Record<string, string> = {
  'Mobile Sauna Rental': 'mobile sauna',
  'Cold Plunge Rental': 'cold plunge',
  'Contrast Therapy': 'contrast therapy experience',
  'Wellness Event Packages': 'wellness event package',
  'Infrared Sauna': 'infrared sauna session',
  'Custom Sauna Builder': 'custom sauna build',
  'Cold Plunge Installation': 'cold plunge installation',
  'Steam Room Installation': 'steam room installation',
  'Hot Tub & Spa': 'hot tub or spa',
}

const isBuilder = (cats: string[]) =>
  cats.some(c => c.toLowerCase().includes('builder') || c.toLowerCase().includes('installation'))

/**
 * Generate vendor-specific FAQ from name + city + categories.
 * Every vendor gets a unique block — no two vendors get the exact same FAQ text.
 */
export function generateVendorFAQ(v: Vendor): FAQ[] {
  const name = v.name
  const city = v.city
  const state = v.state
  const cats = v.categories || []
  const primary = cats[0] || 'Mobile Sauna Rental'
  const primaryLabel = CAT_LABELS[primary] || 'service'
  const builder = isBuilder(cats)
  const svcArea = v.service_area || `the ${city} metro area`
  const capacity =
    v.min_guests && v.max_guests
      ? `${v.min_guests}–${v.max_guests} guests`
      : v.max_guests
        ? `up to ${v.max_guests} guests`
        : v.min_guests
          ? `${v.min_guests}+ guests`
          : cats.includes('Mobile Sauna Rental') ? '4–8 people at a time' : 'multiple guests'

  const faqs: FAQ[] = []

  if (builder) {
    faqs.push({
      q: `What does a project with ${name} typically look like?`,
      a: `${name} works with homeowners and businesses in ${city}, ${state} on ${cats.map(c => (CAT_LABELS[c] || c).toLowerCase()).join(', ')} projects. Most builds start with a site visit or virtual consultation to review your space, discuss materials and heat source, then move into design, permitting, and installation. Timelines vary by scope — a straightforward indoor sauna install is usually a few weeks, while a custom outdoor build or cold plunge integration can run longer.`,
    })
    faqs.push({
      q: `How much does a ${primaryLabel} cost in ${city}?`,
      a: `Pricing depends on size, materials, heat source, and site conditions. Most ${city}-area ${primaryLabel} projects fall in a wide range — small prefab options can start in the low thousands, while fully custom outdoor builds with premium wood, glass, and integrated cold plunge can run into the tens of thousands. ${name} can give you a real number after a quick review of your space and goals.`,
    })
    faqs.push({
      q: `Do you handle permits and site prep?`,
      a: `Every install is different, but ${name} works in ${svcArea} regularly and can walk you through what your municipality typically requires. Site prep — electrical, plumbing for cold plunge, foundation or pad, drainage — is either included in the scope or coordinated with your general contractor depending on the project.`,
    })
    faqs.push({
      q: `Indoor or outdoor — which is better?`,
      a: `Both work well; it comes down to how you'll use it, available space, and climate. Outdoor saunas in ${state} pair nicely with a cold plunge for contrast therapy and don't take space from your home, but require weatherproofing and a bit more site prep. Indoor installs are lower-maintenance and available year-round but need proper venting, waterproofing, and a suitable room. ${name} can walk through the tradeoffs based on your property.`,
    })
    faqs.push({
      q: `How do I request a quote from ${name}?`,
      a: `Use the quote form on this page or the vendor's direct contact info if listed. Share your location in ${city} or the surrounding area, the type of build you're considering (indoor/outdoor, sauna/cold plunge/both), rough size, and any timeline. ${name} will follow up to schedule a consultation.`,
    })
  } else {
    faqs.push({
      q: `What does ${name} include with a ${primaryLabel} rental?`,
      a: `A typical ${name} booking in ${city} includes delivery, setup, and pickup of the ${primaryLabel} plus any equipment needed to run it during your event. Depending on the package you choose, that can also include an attendant, towels, cold plunge or contrast setup, wellness event coordination, and instructions for guests. Confirm the exact inclusions when you request your quote — packages vary.`,
    })
    faqs.push({
      q: `How much does it cost to rent a ${primaryLabel} in ${city}?`,
      a: `${city}-area ${primaryLabel} rentals generally range from a few hundred dollars for a short pop-up session to well over a thousand for full-day or multi-vehicle event coverage. Pricing depends on duration, group size, distance from the vendor's home base, and add-ons like cold plunge or contrast therapy. ${name} will send an itemized quote once they know your event details.`,
    })
    faqs.push({
      q: `What kind of space do I need?`,
      a: `Most mobile setups need a level area roughly the size of a driveway or small backyard patch — typically 10 by 20 feet or larger — with room for the trailer or unit to be positioned. Electrical needs vary: some units run on a standard outlet, others need a generator or dedicated 240V. ${name} will confirm space, power, and access requirements when they scope your ${city} location.`,
    })
    faqs.push({
      q: `How many people can use it at once?`,
      a: `${name} accommodates roughly ${capacity}. For larger events, some vendors bring multiple units or run rotations so more guests can experience the ${primaryLabel} across the event. Ask about group capacity and rotation timing when you request a quote.`,
    })
    faqs.push({
      q: `How far in advance should I book?`,
      a: `For events in ${city} and ${state}, weekends and summer months book out fastest — 4 to 8 weeks ahead is a safe target for peak season. Weekday and off-season bookings can often be arranged with less notice. Request a quote from ${name} as early as you have a date and location.`,
    })
    faqs.push({
      q: `What kinds of events does ${name} do?`,
      a: `Mobile saunas and cold plunges show up at all kinds of events — weddings, corporate wellness days, birthday parties, retreats, athlete recovery sessions, brand activations, and private backyard gatherings. If you're planning something in ${svcArea}, ${name} can tell you whether it's a good fit and what they recommend for your group size and goals.`,
    })
  }

  return faqs
}

/**
 * Generate a unique "What to Expect" block for vendors without descriptions.
 * Uses vendor name, city, categories, capacity — no template.
 */
export function generateFallbackDescription(v: Vendor): string {
  const cats = v.categories || []
  const catList = cats.length
    ? cats.map(c => (CAT_LABELS[c] || c).toLowerCase()).join(', ')
    : 'mobile sauna and cold plunge services'
  const svcArea = v.service_area || `${v.city} and the surrounding ${v.state} area`
  const capacityBit =
    v.min_guests || v.max_guests
      ? ` Groups typically range from ${v.min_guests || 2} to ${v.max_guests || 12} guests per session.`
      : ''
  const builder = isBuilder(cats)

  if (builder) {
    return `${v.name} handles ${catList} for clients in ${svcArea}. Every project starts with a conversation about your space, goals, budget, and timeline — then moves into design, permitting, and installation. Use the quote form on this page to describe your project and ${v.name} will follow up to walk you through options.`
  }
  return `${v.name} brings ${catList} to events, retreats, and private gatherings in ${svcArea}.${capacityBit} Request a quote below with your date, location, and group size and ${v.name} will send back pricing and availability.`
}
