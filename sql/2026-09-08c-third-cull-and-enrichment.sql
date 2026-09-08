-- ============================================================================
-- BookAShvitz — Third-pass cleanup + top mobile vendor enrichment
-- Run 2026-09-08 after 2026-09-08b-second-cull-and-enrichment.sql
-- ============================================================================

BEGIN;

-- ─── 1. Cull 3 more walk-in facilities that self-tagged as mobile ──
UPDATE vendors SET status = 'inactive' WHERE id IN (
  (SELECT id FROM vendors WHERE name = 'The Cove Sauna and Cold Plunge' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name LIKE 'Avanto%' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Utah Lake Sauna' AND status='active' LIMIT 1)
);

-- ─── 2. Enrich Bywater Sauna (Seattle) ──
-- Founder Nate Garberich, Minnesota-built barrel saunas that travel between
-- Alki, Golden Gardens, Lincoln Park, Leschi Marina. Grew out of Coldwater
-- Collective. 16-person capacity per sauna. Drop-in $35-40 or membership.
UPDATE vendors SET
  description = 'Bywater Sauna runs Minnesota-built barrel saunas that travel between Seattle beaches — Alki, Golden Gardens, Lincoln Park, and Leschi Marina — pairing wood-fired heat with direct access to Puget Sound cold plunges. Founder Nate Garberich started Bywater out of the Coldwater Collective community, and the barrel format holds 16 people comfortably so groups get a social sauna experience rather than a cramped one. Twin wood fires keep one end scorching for sauna veterans while the door end runs milder for newcomers. Drop-in sessions run $35-40 per person and memberships are available.',
  service_area = 'Seattle (Alki, Golden Gardens, Lincoln Park, Leschi Marina)',
  price_range = '$35–$40 per session',
  faq = '[
    {"q":"How does Bywater Sauna work — is it a walk-in or do you come to my event?","a":"Bywater operates a rotating schedule at Seattle beach locations — Alki, Golden Gardens, Lincoln Park, and Leschi Marina — where the barrel saunas are parked and open to the public. Guests book a session at whichever location Bywater is running that day. It''s a mobile operation in the sense that the saunas travel between locations, but individual bookings happen at Bywater''s parked location rather than at your address."},
    {"q":"How much does a Bywater Sauna session cost?","a":"A one-time drop-in pass runs $35 to $40 per person. Bywater also offers monthly memberships for regulars who plan to sauna often. Pricing includes the sauna session and access to the adjacent cold plunge — the whole point of the setup is the hot-cold contrast."},
    {"q":"How many people fit in a Bywater sauna?","a":"Each barrel sauna holds up to 16 people, though the round shape means it never feels crowded. Twin wood fires create a temperature gradient — the fire end runs hotter for experienced sauna-goers, the door end stays milder for beginners or anyone wanting a break from the heat."},
    {"q":"Where is the cold plunge?","a":"Puget Sound is the cold plunge — that''s the whole point of parking at beach locations. Depending on which Bywater location you visit (Alki, Golden Gardens, Lincoln Park, or Leschi Marina) you''ll step out of the sauna directly to the waterline. In winter, Sound temperatures run in the 40s Fahrenheit; summer sits in the low 50s."},
    {"q":"Do I need to book in advance?","a":"Yes — sessions fill up fast, especially in fall and winter which are peak sauna season in Seattle. Check Bywater''s current schedule and book online for the specific location and time slot you want."},
    {"q":"Can Bywater host private events or bring a sauna to my place?","a":"Bywater''s model is beach-location drop-in and membership rather than private event delivery to your address. If you''re looking for a mobile sauna to bring to your Seattle backyard, corporate event, or wedding, request a quote through BookAShvitz and we''ll match you with vendors that specifically do event delivery."}
  ]'::jsonb
WHERE LOWER(name) = 'bywater sauna' OR LOWER(name) LIKE '%bywater sauna%';

-- ─── 3. Enrich Saunable (Eagan MN) ──
-- Ed & Colleen Kranz, Eagan MN. Wood-fired mobile sauna, 185°F. Featured on
-- ABC News / AP for MN sauna culture piece at Lebanon Hills Regional Park.
UPDATE vendors SET
  description = 'Saunable is a wood-fired mobile sauna operation run by Ed and Colleen Kranz out of Eagan, Minnesota. The tagline says it best — "a wood-fired sauna experience on wheels" — and the setup travels across the Twin Cities metro and greater Minnesota for private events, lakeside cold plunge sessions, weddings, retreats, and community gatherings. The Kranzes'' sauna heats to 185°F (85°C), hot enough for real löyly, and they''ve been featured in AP and ABC News coverage of Minnesota''s sauna revival. Common bookings include Lebanon Hills-style cold plunge sessions in winter, backyard gatherings year-round, and event partnerships.',
  service_area = 'Twin Cities Metro (Eagan, Minneapolis, Saint Paul, western suburbs) and greater Minnesota',
  faq = '[
    {"q":"What''s included with a Saunable booking?","a":"Every Saunable session includes delivery of the wood-fired mobile sauna to your location, setup and firing, and pickup at the end. Ed and Colleen handle the logistics so you and your guests just focus on the experience. Cold plunge coordination — whether at a lake, in a tub, or via ice bath — can be added based on your setup."},
    {"q":"Where does Saunable travel to?","a":"Home base is Eagan, and Saunable regularly services the entire Twin Cities metro — Minneapolis, Saint Paul, the southern and western suburbs — and travels further into greater Minnesota for larger events, retreats, and lake sessions. Travel outside the metro is possible; ask when you request your quote."},
    {"q":"Can I use Saunable for a winter lake cold plunge session?","a":"Yes — that''s one of the classic Saunable experiences. The wood-fired sauna gets you to 185°F, and stepping out into a Minnesota winter (or through a hole cut in a frozen lake) for the cold plunge is exactly the kind of contrast therapy the setup was built for. Ed and Colleen have run sessions everywhere from Lebanon Hills Regional Park to private lake properties."},
    {"q":"How many people can use the sauna at once?","a":"Wood-fired mobile saunas of this type typically seat 6–8 comfortably. For larger groups, Ed and Colleen run rotations — some guests sweat while others cold plunge or warm up around the fire, then swap. Ask about your group size when you book."},
    {"q":"How far in advance should I book Saunable?","a":"Minnesota sauna season peaks from October through April, and weekends fill up fast. Book at least 3–4 weeks ahead for peak season; summer and weekday bookings can often be arranged with less notice."},
    {"q":"What space do I need at my location?","a":"A flat, accessible area roughly 20 by 20 feet for the sauna and trailer, with vehicle access for delivery. Ed and Colleen will confirm exact space and access requirements once they know your address."}
  ]'::jsonb
WHERE LOWER(name) = 'saunable';

-- ─── 4. Enrich Elevated Embers (Tampa) ──
-- Nate + Kelly Hammond. Finnish-style Canadian cedar wood-fired mobile sauna.
-- 25x10x11 ft, seats 6. Three packages: Essential Embers (sauna only),
-- Embers + Ice (sauna + cold plunge), Elevated Experience (private hourly).
UPDATE vendors SET
  description = 'Elevated Embers is Tampa''s premier mobile sauna company, run by Nate and Kelly Hammond. The Finnish-style sauna is built from 100% Canadian cedar with hand-crafted western red cedar seating benches and a panoramic tempered glass window, and it travels directly to your driveway, backyard, business, or event location. Wood-fired, seats up to 6 comfortably, dimensions 25 x 10 x 11 ft. Elevated Embers offers three tiers: Essential Embers (sauna only), Embers + Ice (sauna plus cold plunge for contrast therapy), and the Elevated Experience (private hourly rentals customized for bridal showers, yoga retreats, corporate wellness days, and celebrations).',
  service_area = 'Tampa Bay area — Tampa, St. Petersburg, Clearwater, and surrounding communities',
  min_guests = 2,
  max_guests = 6,
  faq = '[
    {"q":"What packages does Elevated Embers offer?","a":"Three tiers. Essential Embers gives you access to the wood-fired sauna only. Embers + Ice adds a cold plunge tub for the full contrast therapy experience. The Elevated Experience is a customizable private hourly rental — bridal showers, bachelorette parties, yoga retreats, corporate wellness days, birthdays. Nate and Kelly can also help coordinate catering, DJs, and other add-ons for the Elevated Experience tier."},
    {"q":"How much does it cost to rent Elevated Embers?","a":"Pricing varies by package, group size, location within Tampa, and any custom add-ons for the Elevated Experience tier. Reach out through the quote form on this page and Nate and Kelly will send back a tailored quote for your event."},
    {"q":"What kind of sauna is it?","a":"A traditional Finnish-style wood-fired sauna built from 100% Canadian cedar, with hand-crafted western red cedar bench seating on both sides and a panoramic tempered glass window for a spacious, view-friendly feel. Dimensions are 25 x 10 x 11 ft and it seats up to 6 comfortably. The wood fire delivers real, dry heat — not the lukewarm infrared experience you get at walk-in studios."},
    {"q":"Where does Elevated Embers deliver in Tampa?","a":"Nate and Kelly deliver across the Tampa Bay area — Tampa, St. Petersburg, Clearwater, and surrounding communities. They regularly set up at private residences, Airbnb rentals, corporate offices, event venues, and beach locations. Send your event address when you request a quote and they''ll confirm."},
    {"q":"What kind of events does Elevated Embers work best for?","a":"Bridal showers and bachelorette parties, birthdays, corporate wellness days, group retreats, friend recovery sessions after a night out, wedding-adjacent gatherings, and Airbnb group experiences. If it''s a small-to-medium private group looking for a memorable wellness experience without the walk-in-studio vibe, Elevated Embers is a strong fit."},
    {"q":"Do I need to prep anything before the sauna arrives?","a":"A flat, accessible area for the trailer with vehicle access, plus a bit of space around the sauna for guests to move between hot and cold. Nate and Kelly will confirm exact requirements — power access for the cold plunge with Embers + Ice, plus room to position the trailer safely — once they know your address."}
  ]'::jsonb
WHERE LOWER(name) = 'elevated embers';

COMMIT;
