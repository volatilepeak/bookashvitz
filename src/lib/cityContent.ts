// Unique per-city intro paragraphs + city FAQ
// Deterministic based on city+state+vendors so same city always renders same content
// (avoids Google seeing the same city page with different content across crawls)

import type { Vendor } from './db'
import type { FAQ } from './vendorContent'

// Regional flavor by state (rough climate/culture hooks — keeps intros unique)
const REGION_HOOK: Record<string, string> = {
  MN: 'the state that put mobile sauna culture on the American map',
  WI: 'Wisconsin\'s deep Nordic and Finnish sauna traditions',
  FL: 'year-round warm-weather event season',
  CA: 'a mix of coastal wellness culture and year-round outdoor event weather',
  TX: 'the state\'s enormous event and wellness market',
  CO: 'Colorado\'s mountain recovery and outdoor athlete culture',
  UT: 'Utah\'s emerging cold plunge and mountain wellness scene',
  WA: 'the Pacific Northwest\'s deep sauna and cold water culture',
  OR: 'Oregon\'s outdoor wellness and cold plunge community',
  NY: 'the country\'s largest event and hospitality market',
  IL: 'the Midwest\'s biggest event and wellness hub',
  TN: 'Nashville and Tennessee\'s booming events and wellness scene',
  GA: 'Atlanta\'s year-round event and corporate wellness demand',
  NC: 'the Carolinas\' growing wellness and recovery culture',
  AZ: 'the desert Southwest\'s year-round outdoor event weather',
  NJ: 'the New York metro area\'s wellness and events market',
  RI: 'New England\'s coastal wellness scene',
}

const CAT_NOUN: Record<string, string> = {
  'Mobile Sauna Rental': 'mobile sauna rentals',
  'Cold Plunge Rental': 'cold plunge rentals',
  'Contrast Therapy': 'contrast therapy setups',
  'Wellness Event Packages': 'wellness event packages',
  'Infrared Sauna': 'infrared sauna experiences',
  'Custom Sauna Builder': 'custom sauna builds',
  'Cold Plunge Installation': 'cold plunge installations',
  'Steam Room Installation': 'steam room installs',
}

/**
 * Unique intro paragraph for a city page.
 * Varies structure based on vendor count and category mix.
 */
export function generateCityIntro(
  city: string,
  state: string,
  stateAbbr: string,
  vendors: Vendor[],
): string {
  const regionHook = REGION_HOOK[stateAbbr] || `the ${state} wellness and events market`
  const count = vendors.length

  // Collect distinct categories across vendors
  const catSet = new Set<string>()
  vendors.forEach(v => (v.categories || []).forEach(c => catSet.add(c)))
  const catList = Array.from(catSet)
    .map(c => CAT_NOUN[c] || c.toLowerCase())
    .slice(0, 4)
  const catPhrase =
    catList.length === 0
      ? 'mobile sauna and cold plunge services'
      : catList.length === 1
        ? catList[0]
        : catList.length === 2
          ? `${catList[0]} and ${catList[1]}`
          : `${catList.slice(0, -1).join(', ')}, and ${catList[catList.length - 1]}`

  if (count === 0) {
    return `We're actively building out our directory of mobile sauna and cold plunge vendors serving ${city}, ${state}. If you're planning an event, wedding, retreat, or backyard gathering in the ${city} area, request a quote below and we'll connect you with vendors from ${regionHook} who service the region — even if they haven't listed here yet.`
  }

  if (count === 1) {
    const v = vendors[0]
    return `${city}, ${state} has one vendor currently listed on BookAShvitz: ${v.name}. ${v.name} offers ${(v.categories || ['mobile sauna services']).map(c => (CAT_NOUN[c] || c).toLowerCase()).slice(0, 3).join(', ')} to clients in the ${city} area. Whether you're planning a wedding, corporate wellness event, retreat, or private gathering, tap through to see photos, pricing details, and request a quote — or use the form below and we'll help match you to the right fit.`
  }

  if (count <= 3) {
    return `${city} has ${count} mobile sauna and wellness vendors listed on BookAShvitz, drawing on ${regionHook}. Between them, ${city}-area clients can book ${catPhrase} for weddings, corporate events, retreats, athlete recovery sessions, and private backyard gatherings. Compare vendors below, check pricing details on their profiles, or request a group quote through the form and we'll match you with the best fit for your date, location, and group size.`
  }

  // 4+ vendors — more competitive market
  return `${city}, ${state} is one of the strongest markets in our directory, with ${count} vendors offering ${catPhrase}. The ${city} scene benefits from ${regionHook}, and vendors here handle everything from intimate backyard cold plunge sessions to large-scale wellness activations and corporate recovery days. Browse profiles below to compare pricing, capacity, and services, or use the quote form to send one request to multiple vendors at once.`
}

/**
 * City-specific FAQ (5 questions per city, deterministic content).
 */
export function generateCityFAQ(
  city: string,
  state: string,
  stateAbbr: string,
  vendors: Vendor[],
): FAQ[] {
  const count = vendors.length
  const priceRanges = vendors.map(v => v.price_range).filter(Boolean)
  const priceHint =
    priceRanges.length > 0
      ? `In ${city} specifically, listed vendors show ranges around ${priceRanges.slice(0, 2).join(' and ')}.`
      : ''

  return [
    {
      q: `How much does it cost to rent a mobile sauna in ${city}?`,
      a: `Mobile sauna rental pricing in ${city} generally starts around $400–$700 for a short session and climbs to $1,500+ for full-day or event-scale bookings with cold plunge or contrast therapy add-ons. Distance from the vendor's home base, group size, duration, and attendant time all factor in. ${priceHint} Request a quote through the form on this page to get real numbers for your date.`,
    },
    {
      q: `Do vendors in ${city} bring cold plunges too?`,
      a: `Many do. Contrast therapy — hot sauna followed by a cold plunge — is one of the fastest-growing formats, and most ${city} vendors on our directory offer a combined setup. Look for vendors listed under both "Mobile Sauna Rental" and "Cold Plunge Rental" or the "Contrast Therapy" category, or ask specifically when you request a quote.`,
    },
    {
      q: `How much notice do ${city} vendors need?`,
      a: `Peak season in ${state} — summer weekends, holidays, and event weeks — books out 4 to 8 weeks in advance. Off-season and weekday bookings can often be arranged with 1 to 2 weeks' notice. The earlier you request quotes, the more options you'll have.`,
    },
    {
      q: `What kind of space do I need in ${city} for a mobile sauna?`,
      a: `Most mobile setups need a flat, accessible area roughly 10 by 20 feet or larger — enough for the trailer or unit to be positioned safely. Vendors will need to know the address in ${city}, confirm access, and check whether power is available on site (some units run on a standard outlet, others need a generator or 240V). Send your event address when you request a quote and the vendor will confirm.`,
    },
    {
      q: `Can I book for a private event or wedding in ${city}?`,
      a: `Yes — private events are one of the most common bookings. ${count > 0 ? `${city} vendors regularly work weddings, corporate wellness days, birthdays, and retreats.` : 'Vendors serving the region regularly work weddings, corporate wellness days, birthdays, and retreats.'} Request a quote with your event date, location in ${city}, expected guest count, and how long you'd like the sauna running.`,
    },
  ]
}
