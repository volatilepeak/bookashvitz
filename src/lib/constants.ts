export const SITE_NAME = 'BookAShvitz'
export const SITE_URL = 'https://bookashvitz.com'
export const SITE_DESCRIPTION = 'Find and book mobile sauna rentals, cold plunge tubs, and contrast therapy setups for your next event. Browse vendors by city and get free quotes.'

export const CATEGORIES = [
  { name: 'Mobile Sauna Rental', slug: 'mobile-sauna-rental', icon: '🔥', description: 'Traditional and barrel sauna trailers delivered to your event.' },
  { name: 'Cold Plunge Rental', slug: 'cold-plunge-rental', icon: '🧊', description: 'Portable cold plunge tubs for recovery and wellness events.' },
  { name: 'Contrast Therapy', slug: 'contrast-therapy', icon: '♨️', description: 'Hot sauna + cold plunge combos — the ultimate wellness experience.' },
  { name: 'Infrared Sauna', slug: 'infrared-sauna', icon: '🌡️', description: 'Modern infrared sauna rentals — smoke-free and indoor-friendly.' },
  { name: 'Ice Bath / Tub Rental', slug: 'ice-bath-tub-rental', icon: '❄️', description: 'Ice bath tubs for fitness events, recovery sessions, and parties.' },
  { name: 'Wellness Event Packages', slug: 'wellness-event-packages', icon: '✨', description: 'Full-service wellness packages with saunas, plunges, and more.' },
]

export const EVENT_TYPES = [
  'Wedding',
  'Bachelorette / Bachelor Party',
  'Corporate Wellness Day',
  'Private Retreat',
  'Birthday Party',
  'Fitness Event',
  'Team Building',
  'Holiday Party',
  'Other',
]

export const SERVICE_TYPES = CATEGORIES.map(c => c.name)

export const TOP_CITIES = [
  { city: 'Austin', state: 'Texas', stateAbbr: 'TX', citySlug: 'austin', stateSlug: 'texas' },
  { city: 'Nashville', state: 'Tennessee', stateAbbr: 'TN', citySlug: 'nashville', stateSlug: 'tennessee' },
  { city: 'Denver', state: 'Colorado', stateAbbr: 'CO', citySlug: 'denver', stateSlug: 'colorado' },
  { city: 'Seattle', state: 'Washington', stateAbbr: 'WA', citySlug: 'seattle', stateSlug: 'washington' },
  { city: 'Portland', state: 'Oregon', stateAbbr: 'OR', citySlug: 'portland', stateSlug: 'oregon' },
  { city: 'Los Angeles', state: 'California', stateAbbr: 'CA', citySlug: 'los-angeles', stateSlug: 'california' },
  { city: 'Miami', state: 'Florida', stateAbbr: 'FL', citySlug: 'miami', stateSlug: 'florida' },
  { city: 'Scottsdale', state: 'Arizona', stateAbbr: 'AZ', citySlug: 'scottsdale', stateSlug: 'arizona' },
  { city: 'Chicago', state: 'Illinois', stateAbbr: 'IL', citySlug: 'chicago', stateSlug: 'illinois' },
  { city: 'New York', state: 'New York', stateAbbr: 'NY', citySlug: 'new-york', stateSlug: 'new-york' },
  { city: 'Atlanta', state: 'Georgia', stateAbbr: 'GA', citySlug: 'atlanta', stateSlug: 'georgia' },
  { city: 'Dallas', state: 'Texas', stateAbbr: 'TX', citySlug: 'dallas', stateSlug: 'texas' },
  { city: 'San Diego', state: 'California', stateAbbr: 'CA', citySlug: 'san-diego', stateSlug: 'california' },
  { city: 'Salt Lake City', state: 'Utah', stateAbbr: 'UT', citySlug: 'salt-lake-city', stateSlug: 'utah' },
  { city: 'Charlotte', state: 'North Carolina', stateAbbr: 'NC', citySlug: 'charlotte', stateSlug: 'north-carolina' },
  { city: 'Minneapolis', state: 'Minnesota', stateAbbr: 'MN', citySlug: 'minneapolis', stateSlug: 'minnesota' },
]

export function getTopCity(citySlug: string, stateSlug: string) {
  return TOP_CITIES.find(c => c.citySlug === citySlug && c.stateSlug === stateSlug) || null
}

export function formatCategorySlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug) || null
}
