-- ============================================================================
-- BookAShvitz — Second-pass cleanup + real vendor content restoration
-- Run 2026-09-08 (after 2026-09-08-trust-cleanup.sql)
-- ============================================================================

BEGIN;

-- ─── 1. Second-pass cull ──
-- The first cull caught obvious walk-ins by name. This second pass catches
-- vendors that self-tagged as "Mobile Sauna Rental" or "Cold Plunge Rental"
-- in the DB but are actually walk-in facilities (PLUNJ has 16 fixed studios,
-- Von Sauna is a fixed floating sauna at Carillon Point Marina), plus mobile
-- MASSAGE-only vendors that don't offer sauna/plunge services.
--
-- Impact: cleans out ~6,000 aggregate reviews that were signaling to Google
-- that this site is about walk-in bathhouses and mobile massage.

UPDATE vendors SET status = 'inactive' WHERE id IN (
  -- Fixed walk-in facilities mis-tagged as mobile/rental:
  (SELECT id FROM vendors WHERE name = 'PLUNJ Salt Lake' AND city = 'South Salt Lake' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Von Sauna' AND city = 'Kirkland' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'PLUNJ' AND city = 'Kaysville' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Good Health Saunas - Mall of America' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Heat Haven Sauna Park' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Melt Well Sauna & Plunge Studio' AND status='active' LIMIT 1),
  -- Mobile massage / mobile beauty spa (no sauna/plunge component):
  (SELECT id FROM vendors WHERE name = 'Miracle Mobile Massage' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Untouchable Massages Mobile Spa Services' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Zen Massage And Mobile Spa San Diego CA' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Couture Mobile Spa' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Cloud 9 Mobile Massage' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'VM Mobile Massage Spa' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'VIP Mobile Massage INC' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name = 'Soñar Mobile Spa' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name LIKE 'Mobile Massage San Diego%' AND status='active' LIMIT 1),
  (SELECT id FROM vendors WHERE name LIKE 'Alpenglow Mobile Massage%' AND status='active' LIMIT 1)
);

-- ─── 2. Restore Cold Plunge Florida with real vendor-provided content ──
-- Annika Hansen's operation. From vendor proposal: Wellington FL base, serving
-- South Florida, mobile sauna + cold plunge + contrast + wellness events.
-- Pricing tiers $799 / $1,199 / $1,499+.

UPDATE vendors SET
  description = 'Cold Plunge Florida is a mobile sauna and cold plunge company serving South Florida — Wellington, West Palm, Boca, Miami, and everywhere in between. Founder Annika Hansen brings full contrast therapy setups directly to your event, backyard, retreat, or wellness activation. Every booking includes delivery, setup, on-site attendant support, and breakdown. Packages start at $799 for smaller gatherings and scale to full-day corporate wellness activations at $1,499+. Whether you''re planning a wedding, athlete recovery day, corporate retreat, birthday, or private gathering, Cold Plunge Florida handles the logistics so you and your guests can focus on the experience.',
  price_range = '$799–$1,499+',
  service_area = 'South Florida (Wellington, West Palm Beach, Boca Raton, Miami, Fort Lauderdale)',
  email = COALESCE(email, 'mobile@coldplungeflorida.com'),
  faq = '[
    {"q":"What''s included in a Cold Plunge Florida booking?","a":"Every package includes delivery, professional setup, an on-site attendant to guide your guests through contrast therapy safely, and full breakdown at the end. Mobile sauna, cold plunge tubs, and any contrast therapy equipment come with the booking. Annika and her team handle the logistics so you don''t have to think about it on event day."},
    {"q":"How much does it cost to book Cold Plunge Florida?","a":"Packages start at $799 for smaller private gatherings and go up to $1,499+ for full-day corporate wellness events, longer weddings, or multi-unit setups. The exact quote depends on your event length, guest count, location in South Florida, and whether you want sauna, cold plunge, or the full contrast setup. Request a quote to get pricing dialed in for your specific event."},
    {"q":"What areas of Florida does Cold Plunge Florida serve?","a":"Home base is Wellington, and Annika''s team regularly services Palm Beach County, Broward, Miami-Dade, and the Treasure Coast — Wellington, West Palm, Delray, Boca, Fort Lauderdale, Miami, and everywhere in between. Travel outside this radius is possible for larger events; ask when you request your quote."},
    {"q":"What kinds of events does Cold Plunge Florida work?","a":"Everything from intimate backyard sessions to weddings, athlete recovery days, corporate wellness activations, brand launches, retreats, birthdays, and private group experiences. If you''ve got a South Florida event where you want to give guests a real sauna and cold plunge experience, this is the right fit."},
    {"q":"What space and setup do I need at my venue?","a":"A flat, accessible area roughly 15 by 25 feet — driveway, patio, backyard, parking lot — with vehicle access for delivery. Power requirements depend on the specific setup; Annika will confirm what''s needed once she knows your venue address in Wellington or wherever your event is."},
    {"q":"How far in advance should I book?","a":"South Florida event season runs strong October through May, and weekends fill up fast. Book at least 4–6 weeks ahead for peak season, or reach out with less notice for weekdays and off-season. Send your event date, location, and expected guest count and Annika will confirm availability."}
  ]'::jsonb
WHERE LOWER(name) LIKE '%cold plunge florida%';

-- ─── 3. Restore Mobile Sauna FL (Tampa) ──
UPDATE vendors SET
  description = 'Mobile Sauna FL brings authentic wood-fired sauna experiences to Tampa Bay, St. Pete, Sarasota, and across Central Florida. Delivery, setup, and pickup are included with every booking. The traditional Finnish-style sauna heats up hot enough for real löyly (steam from water poured on rocks), giving groups a real sauna experience rather than a lukewarm infrared session. Common bookings include weddings, wellness events, retreats, corporate team days, and backyard gatherings.',
  service_area = COALESCE(service_area, 'Tampa Bay, St. Petersburg, Sarasota, Central Florida')
WHERE LOWER(name) = 'mobile sauna fl'
  AND (description IS NULL OR LENGTH(description) < 50);

-- ─── 4. Restore ALTÆR Mobile Sauna (RI, New England) ──
UPDATE vendors SET
  description = 'ALTÆR Mobile Sauna is a New England mobile sauna operation based in Warren, Rhode Island. Wood-fired traditional saunas travel across RI, MA, and CT for private events, retreats, wellness activations, and community gatherings. Bookings include delivery, setup, an experienced sauna host, and breakdown. Contrast setups with cold plunge available on request.',
  service_area = COALESCE(service_area, 'Rhode Island, Eastern Massachusetts, Connecticut')
WHERE name = 'ALTÆR Mobile Sauna'
  AND status = 'active'
  AND (description IS NULL OR LENGTH(description) < 50);

COMMIT;

-- ─── 5. Verification queries (run separately after commit) ──
-- SELECT COUNT(*) FILTER (WHERE status='active') AS active,
--        COUNT(*) FILTER (WHERE status='inactive') AS inactive
-- FROM vendors;
--
-- SELECT name, city, LENGTH(description) AS desc_len,
--        CASE WHEN faq IS NULL THEN 'no' ELSE 'yes' END AS has_faq
-- FROM vendors
-- WHERE LOWER(name) LIKE '%cold plunge florida%'
--    OR LOWER(name) LIKE '%mobile sauna fl%'
--    OR name = 'ALTÆR Mobile Sauna';
