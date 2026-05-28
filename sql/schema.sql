-- BookAShvitz Database Schema for Neon PostgreSQL
-- Run this in your Neon SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  instagram VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  city_slug VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  state_slug VARCHAR(100) NOT NULL,
  state_abbr VARCHAR(2) NOT NULL,
  zip_code VARCHAR(10),
  service_area TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  categories TEXT[] DEFAULT '{}',
  price_range VARCHAR(10),
  min_guests INTEGER,
  max_guests INTEGER,
  setup_types TEXT,
  photo_url VARCHAR(500),
  photos TEXT[] DEFAULT '{}',
  is_premium BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  listing_tier VARCHAR(20) DEFAULT 'free',
  claimed BOOLEAN DEFAULT FALSE,
  claimed_by_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  event_type VARCHAR(100),
  event_date DATE,
  guest_count INTEGER,
  city VARCHAR(100),
  state VARCHAR(100),
  service_type VARCHAR(100),
  message TEXT,
  source_page VARCHAR(500)
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image VARCHAR(500),
  author VARCHAR(100) DEFAULT 'BookAShvitz Team',
  status VARCHAR(20) DEFAULT 'published',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_vendors_city_slug ON vendors(city_slug);
CREATE INDEX IF NOT EXISTS idx_vendors_state_slug ON vendors(state_slug);
CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status);
CREATE INDEX IF NOT EXISTS idx_vendors_categories ON vendors USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_vendors_is_featured ON vendors(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Seed some sample vendors for the top cities
INSERT INTO vendors (name, slug, description, phone, email, website, city, city_slug, state, state_slug, state_abbr, categories, price_range, min_guests, max_guests, setup_types, is_featured, status) VALUES
('Austin Mobile Sauna Co.', 'austin-mobile-sauna-co', 'Premium mobile Finnish sauna experiences for events, parties, and wellness retreats across the Austin metro area. Our wood-fired saunas seat up to 12 guests and come with a dedicated attendant.', '(512) 555-0101', 'info@austinmobilesauna.com', 'https://austinmobilesauna.com', 'Austin', 'austin', 'Texas', 'texas', 'TX', ARRAY['Mobile Sauna Rental', 'Wellness Event Packages'], '$$', 4, 30, 'Backyard, Venue, Lakeside', TRUE, 'active'),

('Nashville Contrast Therapy', 'nashville-contrast-therapy', 'Full contrast therapy setups for Nashville events — hot sauna plus cold plunge combos that your guests will never forget. Perfect for bachelorette parties and corporate wellness days.', '(615) 555-0202', 'hello@nashvillecontrast.com', 'https://nashvillecontrast.com', 'Nashville', 'nashville', 'Tennessee', 'tennessee', 'TN', ARRAY['Contrast Therapy', 'Cold Plunge Rental', 'Mobile Sauna Rental'], '$$$', 6, 50, 'Backyard, Hotel, Venue', TRUE, 'active'),

('Denver Cold Plunge Rentals', 'denver-cold-plunge-rentals', 'Ice bath and cold plunge tub rentals for the Denver Front Range. We deliver, set up, and handle everything. Popular for fitness events, recovery sessions, and wellness retreats.', '(303) 555-0303', 'book@denvercoldplunge.com', 'https://denvercoldplunge.com', 'Denver', 'denver', 'Colorado', 'colorado', 'CO', ARRAY['Cold Plunge Rental', 'Ice Bath / Tub Rental'], '$$', 2, 20, 'Gym, Backyard, Studio', TRUE, 'active'),

('Seattle Sauna Social', 'seattle-sauna-social', 'Community-driven mobile sauna experiences in the Pacific Northwest. Wood-fired barrel saunas available for private events, team building, and weekend retreats around Seattle.', '(206) 555-0404', 'hey@seattlesaunasocial.com', 'https://seattlesaunasocial.com', 'Seattle', 'seattle', 'Washington', 'washington', 'WA', ARRAY['Mobile Sauna Rental', 'Wellness Event Packages'], '$$', 4, 25, 'Backyard, Waterfront, Park', FALSE, 'active'),

('Portland Steam Works', 'portland-steam-works', 'Artisan-crafted mobile saunas and infrared sauna rentals in Portland. Eco-friendly, locally built, and designed for unforgettable group wellness experiences.', '(503) 555-0505', 'info@portlandsteamworks.com', 'https://portlandsteamworks.com', 'Portland', 'portland', 'Oregon', 'oregon', 'OR', ARRAY['Mobile Sauna Rental', 'Infrared Sauna'], '$$', 2, 15, 'Backyard, Farm, Venue', FALSE, 'active'),

('LA Ice Bath Co.', 'la-ice-bath-co', 'Premium cold plunge and ice bath experiences delivered to your door in Los Angeles. Popular with fitness influencers, production sets, and luxury wellness events.', '(310) 555-0606', 'book@laicebath.com', 'https://laicebath.com', 'Los Angeles', 'los-angeles', 'California', 'california', 'CA', ARRAY['Cold Plunge Rental', 'Ice Bath / Tub Rental', 'Wellness Event Packages'], '$$$', 1, 40, 'Backyard, Rooftop, Studio, Set', TRUE, 'active'),

('Miami Heat & Chill', 'miami-heat-and-chill', 'Contrast therapy and infrared sauna rentals for Miami events. From South Beach bachelorette parties to Brickell corporate wellness, we bring the heat (and the chill).', '(305) 555-0707', 'party@miamiheatandchill.com', 'https://miamiheatandchill.com', 'Miami', 'miami', 'Florida', 'florida', 'FL', ARRAY['Contrast Therapy', 'Infrared Sauna', 'Cold Plunge Rental'], '$$$', 4, 35, 'Backyard, Rooftop, Beachside, Venue', TRUE, 'active'),

('Scottsdale Sweat Lodge', 'scottsdale-sweat-lodge', 'Luxury mobile sauna rentals in Scottsdale and the greater Phoenix area. Specializing in resort-style wellness experiences for weddings, retreats, and private parties.', '(480) 555-0808', 'concierge@scottsdalesweat.com', 'https://scottsdalesweat.com', 'Scottsdale', 'scottsdale', 'Arizona', 'arizona', 'AZ', ARRAY['Mobile Sauna Rental', 'Wellness Event Packages', 'Infrared Sauna'], '$$$$', 8, 60, 'Resort, Backyard, Desert Venue', TRUE, 'active'),

('Chicago Barrel Sauna Co.', 'chicago-barrel-sauna-co', 'Authentic Finnish barrel sauna rentals for Chicago and the suburbs. We roll up, fire up, and create an unforgettable sauna experience at your event — rain, snow, or shine.', '(312) 555-0909', 'book@chicagobarrelsauna.com', 'https://chicagobarrelsauna.com', 'Chicago', 'chicago', 'Illinois', 'illinois', 'IL', ARRAY['Mobile Sauna Rental', 'Contrast Therapy'], '$$', 4, 20, 'Backyard, Venue, Lakeside', FALSE, 'active'),

('NYC Cold Plunge Club', 'nyc-cold-plunge-club', 'On-demand cold plunge and ice bath rentals across all five boroughs. From Brooklyn rooftops to Manhattan lofts, we make wellness accessible anywhere in New York City.', '(212) 555-1010', 'plunge@nyccoldplunge.com', 'https://nyccoldplunge.com', 'New York', 'new-york', 'New York', 'new-york', 'NY', ARRAY['Cold Plunge Rental', 'Ice Bath / Tub Rental'], '$$$', 1, 30, 'Rooftop, Loft, Studio, Venue', TRUE, 'active'),

('ATL Sauna Vibes', 'atl-sauna-vibes', 'Mobile sauna and wellness event packages for the Atlanta area. We specialize in creating memorable group sauna experiences for birthdays, reunions, and team-building events.', '(404) 555-1111', 'vibes@atlsauna.com', 'https://atlsauna.com', 'Atlanta', 'atlanta', 'Georgia', 'georgia', 'GA', ARRAY['Mobile Sauna Rental', 'Wellness Event Packages'], '$$', 4, 25, 'Backyard, Venue, Park', FALSE, 'active'),

('Dallas Infrared Wellness', 'dallas-infrared-wellness', 'Portable infrared sauna rentals for Dallas–Fort Worth events. Our modern infrared units offer a premium wellness experience without the smoke — perfect for indoor venues.', '(214) 555-1212', 'hello@dallasinfrared.com', 'https://dallasinfrared.com', 'Dallas', 'dallas', 'Texas', 'texas', 'TX', ARRAY['Infrared Sauna', 'Wellness Event Packages'], '$$', 2, 20, 'Indoor Venue, Office, Backyard', FALSE, 'active'),

('San Diego Plunge Co.', 'san-diego-plunge-co', 'Cold plunge tub rentals and contrast therapy setups for San Diego. Whether it is a beachside event in La Jolla or a gym recovery session in North Park, we have got you covered.', '(619) 555-1313', 'book@sdplunge.com', 'https://sdplunge.com', 'San Diego', 'san-diego', 'California', 'california', 'CA', ARRAY['Cold Plunge Rental', 'Contrast Therapy', 'Ice Bath / Tub Rental'], '$$', 2, 30, 'Beachside, Gym, Backyard, Venue', FALSE, 'active'),

('SLC Mountain Sauna', 'slc-mountain-sauna', 'Wood-fired mobile sauna rentals in Salt Lake City and Park City. Take your ski trip, mountain retreat, or backyard party to the next level with a real Finnish sauna experience.', '(801) 555-1414', 'book@slcmountainsauna.com', 'https://slcmountainsauna.com', 'Salt Lake City', 'salt-lake-city', 'Utah', 'utah', 'UT', ARRAY['Mobile Sauna Rental', 'Contrast Therapy'], '$$', 4, 20, 'Backyard, Mountain Lodge, Ski Resort', FALSE, 'active'),

('Charlotte Wellness Collective', 'charlotte-wellness-collective', 'Full-service mobile sauna and cold plunge rentals for the Charlotte metro. We create custom wellness experiences for weddings, corporate events, and private parties.', '(704) 555-1515', 'events@cltwellness.com', 'https://cltwellness.com', 'Charlotte', 'charlotte', 'North Carolina', 'north-carolina', 'NC', ARRAY['Mobile Sauna Rental', 'Cold Plunge Rental', 'Wellness Event Packages'], '$$', 4, 35, 'Backyard, Venue, Brewery', FALSE, 'active');

-- Seed a couple blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, status) VALUES
('The Complete Guide to Renting a Mobile Sauna for Your Event', 'complete-guide-renting-mobile-sauna-event', 'Everything you need to know about booking a mobile sauna rental — from choosing the right type to planning logistics for your next event.', E'# The Complete Guide to Renting a Mobile Sauna for Your Event\n\nMobile saunas have exploded in popularity over the past few years, and for good reason. They bring an unforgettable wellness experience directly to your event — whether that is a backyard birthday party, a lakeside bachelorette weekend, or a corporate team-building retreat.\n\nBut if you have never rented one before, you probably have questions. How much does it cost? What types are available? How much space do you need? Let us break it all down.\n\n## Types of Mobile Saunas\n\n### Traditional Wood-Fired Saunas\nThese are the classic Finnish-style saunas, typically housed in a barrel or custom trailer. They use a wood-burning stove to heat rocks, and you can throw water on the rocks for steam (called löyly). Wood-fired saunas reach temperatures of 170–200°F and offer the most authentic sauna experience.\n\n### Infrared Saunas\nInfrared saunas use infrared light panels to heat your body directly rather than heating the air. They operate at lower temperatures (120–150°F) and are often preferred for indoor events since they produce no smoke. They are also easier to set up in smaller spaces.\n\n### Barrel Saunas\nA subset of wood-fired saunas, barrel saunas are cylindrical and incredibly photogenic. They are the Instagram favorite and a great conversation starter at any event.\n\n## How Much Does a Mobile Sauna Rental Cost?\n\nPrices vary widely by market, but here are general ranges:\n\n- **Basic rental (4 hours):** $300–$600\n- **Full-day rental (8 hours):** $500–$1,000\n- **Premium/luxury setups:** $800–$2,000+\n- **Contrast therapy packages (sauna + cold plunge):** $600–$1,500\n\nFactors that affect pricing include your location, the type of sauna, the number of guests, setup complexity, and whether you add extras like cold plunges, towels, robes, or an attendant.\n\n## Planning Your Mobile Sauna Event\n\n### Space Requirements\nMost mobile saunas need a flat area of at least 15x15 feet, plus clearance from structures and trees. Wood-fired saunas need extra ventilation clearance. Your rental company will do a site assessment.\n\n### Guest Capacity\nA typical mobile sauna seats 6–12 people at a time. For larger events, guests rotate in and out — which actually creates a great social dynamic. Plan for about 20–30 minutes per session.\n\n### What to Tell Your Guests\nLet guests know to bring swimsuits, flip-flops, and a towel. Remind them to hydrate well before and after. Most rental companies provide basic amenities, but confirm what is included.\n\n## Best Events for Mobile Saunas\n\n- **Weddings & rehearsal dinners** — A unique pre-wedding bonding experience\n- **Bachelorette/bachelor parties** — Way more memorable than another bar crawl\n- **Corporate wellness days** — Show employees you care about their wellbeing\n- **Birthday parties** — An unexpected, elevated experience\n- **Fitness events** — Perfect post-workout recovery\n- **Holiday parties** — Nothing beats a hot sauna on a cold winter night\n\n## How to Book\n\nBrowse vendors in your city on BookAShvitz, compare options, and request quotes directly. Most vendors recommend booking 2–4 weeks in advance, and popular dates (summer weekends, holidays) book up fast.\n\nReady to find a mobile sauna near you? [Browse vendors by city](/states) or [get a free quote](/get-quotes).', 'BookAShvitz Team', 'published'),

('Cold Plunge Rentals: Why Everyone Is Adding Ice Baths to Their Events', 'cold-plunge-rentals-ice-baths-events', 'Cold plunge tubs are the hottest (or coldest) trend in event wellness. Here is why you should consider adding one to your next gathering.', E'# Cold Plunge Rentals: Why Everyone Is Adding Ice Baths to Their Events\n\nIf you have been anywhere near social media in the past couple years, you have seen it — people submerging themselves in freezing cold water and emerging looking like they just had a religious experience. Cold plunging has gone from a niche biohacker practice to a mainstream wellness phenomenon.\n\nAnd now, cold plunge rentals are becoming one of the most requested additions to events of all kinds.\n\n## What Is a Cold Plunge?\n\nA cold plunge (also called an ice bath) involves immersing your body in cold water, typically between 38–55°F, for 2–5 minutes. The practice has roots in Scandinavian and Japanese bathing traditions, and modern science backs up many of the claimed benefits.\n\n## Benefits of Cold Plunging\n\n- **Reduced inflammation** — Cold water constricts blood vessels and reduces swelling\n- **Improved circulation** — The contrast between cold and your body temperature boosts blood flow\n- **Mental clarity** — The cold triggers a rush of norepinephrine, improving focus and mood\n- **Stress resilience** — Regular cold exposure trains your nervous system to handle stress\n- **Recovery** — Athletes have used ice baths for decades to speed muscle recovery\n\n## Why Cold Plunges Work So Well at Events\n\nThere is something about the shared experience of doing something uncomfortable together that bonds people. A cold plunge at an event creates:\n\n- **Instant conversation** — Everyone wants to talk about it (and film it)\n- **Shared achievement** — Guests feel a sense of accomplishment\n- **Content moments** — Great for social media and event photography\n- **Energy boost** — Guests come out of the plunge buzzing with energy\n\n## Contrast Therapy: The Ultimate Combo\n\nThe real magic happens when you pair a cold plunge with a hot sauna. This is called contrast therapy, and it is the gold standard of wellness experiences. Guests alternate between the heat of a sauna (170–200°F) and the cold of a plunge (38–55°F), creating a powerful physiological response that leaves them feeling incredible.\n\nMany of our vendors on BookAShvitz offer contrast therapy packages that include both a mobile sauna and cold plunge setup.\n\n## What to Expect from a Cold Plunge Rental\n\n- **Setup:** Most cold plunge tubs are portable and can be set up in a backyard, patio, or even indoors. The rental company handles delivery, filling, and temperature management.\n- **Temperature:** Expect water temps between 38–55°F. Your rental company can adjust to your group is comfort level.\n- **Duration:** 2–5 minutes per plunge is typical. Some brave souls go longer.\n- **Cost:** Cold plunge rentals typically run $200–$500 for a half-day, or $400–$800 for a full day.\n\n## Ready to Book?\n\nBrowse cold plunge rental vendors in your city on BookAShvitz. [Find vendors near you](/states) or [request a quote](/get-quotes).', 'BookAShvitz Team', 'published');
