# BookAShvitz — PROJECT_MEMORY.md

## Purpose
SEO-driven lead generation directory for mobile sauna rentals, cold plunge rentals, contrast therapy, and custom sauna/cold plunge builders. Monetization via featured vendor subscriptions ($49/mo founding, $99/mo standard) and lead routing.

## Architecture
- **Stack:** Next.js 14 (App Router), Neon PostgreSQL, Vercel, Resend, Tailwind CSS, TypeScript, lucide-react
- **Repo:** `volatilepeak/bookashvitz` on GitHub
- **Domain:** bookashvitz.com (www.bookashvitz.com). Redirects: bookaschvitz.com, bookasauna.co (not yet configured)
- **Vercel env vars:** DATABASE_URL (Neon), RESEND_API_KEY (needs separate free Resend account with bookashvitz.com verified — not yet done), NEXT_PUBLIC_SITE_URL=https://bookashvitz.com
- **Email:** Google Workspace alias domain on findcoffeecarts.com primary. hello@bookashvitz.com alias. Resend sends FROM hello@bookashvitz.com (currently failing — domain not verified in Resend yet). Lead notifications go TO hello@bookashvitz.com.

## Database (Neon)
- **Tables:** `vendors`, `leads`, `blog_posts`
- **Vendor columns:** name, slug (UNIQUE), description, phone, email, website, instagram, city, city_slug, state, state_slug, state_abbr, zip_code, categories (TEXT[]), photo_url, photos (TEXT[]), rating (DECIMAL 2,1), reviews (INT), price_range (VARCHAR 50), min_guests, max_guests, service_area, setup_types, is_featured, is_verified, is_premium, status
- **Lead columns:** name, email, phone, event_type, event_date, guest_count, city, state, service_type, message (duration/venue/budget appended here), source_page
- **Blog columns:** title, slug, excerpt, content (HTML), cover_image, author, status, published_at
- **~350 vendors** across rental and builder categories
- **~12 leads** generated to date
- **~9 blog posts** (template city posts were deleted to avoid AI content penalties)

## Key Design Decisions
- **Color palette:** Clean modern — near-black/charcoal, warm whites, stone neutrals, terracotta brand accent (#d4603e). No green.
- **Brand:** `brand-50` through `brand-900` in tailwind config. Font: Georgia display + system-ui body.
- **VendorCard and VendorImage** are `'use client'` components (needed for onError image fallback handling). Most pages are server components.
- **CategoryIcon** component maps category slugs to lucide icons (no emojis).
- **TOP_CITIES** in constants.ts drives target city pages, custom builds pages, and sitemap entries. Cities show even without vendors.
- **Custom builds** section at `/custom-builds` and `/custom-builds/[citySlug]` — separate lead form (`BuildLeadForm`) and API route (`/api/build-leads`).
- **JSON-LD** structured data on all vendor pages (LocalBusiness schema with AggregateRating).
- **About/disclaimer page** at `/about` + footer disclaimer explaining directory model and vendor removal rights.
- **Vendor photos:** Google Maps URLs from Outscraper expire. Prefer vendor's own website URLs or uploaded photos. VendorImage component has onError fallback to branded placeholder.

## Current TOP_CITIES
Austin TX, Nashville TN, Denver CO, Seattle WA, Portland OR, Los Angeles CA, Miami FL, Scottsdale AZ, Chicago IL, New York NY, Atlanta GA, Dallas TX, San Diego CA, Salt Lake City UT, Charlotte NC, Minneapolis MN, Topeka KS, Tampa FL, Plano TX, St. Louis Park MN

## Vendor Categories (constants.ts)
Mobile Sauna Rental, Cold Plunge Rental, Contrast Therapy, Infrared Sauna, Ice Bath Rental, Wellness Event Packages. Builder categories: Custom Sauna Builder, Cold Plunge Installation.

## Lead Form Fields
Name*, email*, phone, service type, event type, event date, duration (2-3hrs / half day / full day / 24hr / multi-day), guest count, venue type, budget range, city*, state, message. Duration/venue/budget are appended to the message field (no DB schema change needed).

## Known Issues
- **Resend not working:** bookashvitz.com not verified as domain in Resend. Need separate free Resend account (free plan = 1 domain). Emails from hello@bookashvitz.com fail with 403.
- **Vendor photos broken:** Many lh3.googleusercontent.com URLs from Outscraper have expired. Need to re-scrape or replace with vendor website URLs.
- **"bathtub rental" rankings:** Cleaned "tub" references from code but may still appear in vendor descriptions in the database.
- **Template vendor descriptions:** ~100 vendors have descriptions generated from 4 templates with city names swapped. Should be rewritten or replaced with real vendor-provided content.
- **Domain redirects:** bookaschvitz.com and bookasauna.co redirects not yet configured in Vercel.

## SEO Status (as of Sept 2026)
- ~3K impressions/month, ~33 clicks/month, 10-12 leads total
- #1 for "sauna rental near me"
- Position 8 for "sauna rental topeka"
- Best performing pages: Miami (pos 45), Scottsdale (pos 28), LA (pos 40), Hudson Valley Sauna vendor (pos 8)
- Main bottleneck is domain authority (need backlinks from vendor outreach)

## Monetization
- **Founding rate:** $49/mo featured vendor placement. Stripe price ID: `price_1U3MqtHfK6PpyQBGjxG9jRgc`
- **Cold Plunge Florida (Annika Hansen):** First vendor to express interest in membership. Wellington FL. Has full proposal deck with pricing ($799-$1,499+). Email: mobile@coldplungeflorida.com
- **Westside Sweat Club:** Requested removal + sent cease and desist. Set to status='inactive'. Do not re-list.

## 2026-09-08 Trust & Content Cleanup
Major diagnosis: site was polluted with 61 brick-and-mortar vendors (walk-in day spas, luxury bathhouses, Equinox gyms, SweatHouz/beem/Glow franchise infrared studios, hot-tub-only retailers) that mismatched the "book a mobile sauna" positioning. Google was crushing rankings due to query/product mismatch AND ~100 vendors sharing 4 duplicate description templates.

**Shipped in one push:**
- `sql/2026-09-08-trust-cleanup.sql` — cull 61 vendors to inactive, NULL out all template descriptions (any opener shared by 3+ vendors), dedupe ALTÆR Mobile Sauna, add `faq JSONB` column to vendors table
- `src/lib/vendorContent.ts` — `generateVendorFAQ(v)` produces 5–6 vendor-specific Q&As from name+city+categories+capacity, `generateFallbackDescription(v)` produces unique paragraph when description is NULL. Different output for builders vs mobile vendors.
- `src/lib/cityContent.ts` — `generateCityIntro(city, state, stateAbbr, vendors)` produces unique intro varying by vendor count (0/1/2-3/4+) and category mix, using REGION_HOOK for state-specific flavor. `generateCityFAQ()` produces 5 city-specific Q&As.
- `src/app/vendors/[slug]/page.tsx` — full rewrite. New: `VendorPhotoGallery` (thumbnail strip using photos[] array — was previously ignored), FAQ section, dual JSON-LD schemas (LocalBusiness + FAQPage), fallback description when null, canonical URL.
- `src/app/states/[stateSlug]/[citySlug]/page.tsx` — full rewrite. New: unique intro paragraph, city FAQ block, FAQPage JSON-LD, canonical URL, better empty-state.
- `src/components/VendorPhotoGallery.tsx` — client component with clickable thumbnail strip.
- `src/lib/db.ts` — added `faq: { q, a }[] | null` to Vendor type.

**Impact expected:** vendor page word count roughly triples (description + FAQ + details). City pages now genuinely unique per city — no more 20+ near-identical templates. FAQ schema on every vendor + city page → eligible for rich snippets in SERP. Real product/query alignment after cull.

## 2026-09-08 (third pass) Bywater / Saunable / Elevated Embers enriched, 3 more walk-ins culled
Culled 3 more mis-tagged vendors: The Cove Sauna and Cold Plunge (1361 S Broadway Denver — walk-in with 5 infrared saunas + 3 cold plunges + gym), Avanto Cold Plunge & Sauna (Kimball Junction Park City — walk-in spa with M-F 6am-10pm hours), Utah Lake Sauna (4400 W Center St Provo — walk-in medical spa). Total culled to date: 80 of original 257 = ~177 active.

Enriched with real vendor-specific content (description + FAQ JSONB) after verifying via web search:
- **Bywater Sauna** (Seattle) — Nate Garberich's MN-built barrel saunas that travel between Alki/Golden Gardens/Lincoln Park/Leschi Marina. 16-person capacity per barrel. $35-40 drop-in.
- **Saunable** (Eagan MN) — Ed & Colleen Kranz's wood-fired mobile sauna, 185°F. AP/ABC News featured. Twin Cities metro + greater Minnesota.
- **Elevated Embers** (Tampa) — Nate & Kelly Hammond's Finnish-style Canadian cedar mobile sauna. 25x10x11 ft, seats 6. Three packages: Essential Embers, Embers + Ice, Elevated Experience.

## 2026-09-08 (fourth pass) Premium tier display activated + Cold Plunge Florida promoted
**Shipped:**
- `src/components/VendorCard.tsx` — premium vendor cards get amber-400 ring, gold "Premium Vendor" banner at top of card, amber-tinted verified badge, amber-tinted category pills, amber hover state on name. Non-premium featured vendors still get the brand-orange featured pill.
- `src/app/vendors/[slug]/page.tsx` — premium vendors get a gold gradient banner section at the top of the vendor detail page ("Premium Vendor — Verified and hand-picked by the BookAShvitz team"), plus amber-tinted verified badge.
- `src/lib/data.ts` — updated `ORDER BY` on all vendor list queries to sort `is_premium DESC, is_featured DESC, ...` so premium vendors show at the top of every city, state, and category page.
- `sql/2026-09-08d-premium-tier-activation.sql` — sets Cold Plunge Florida as `is_premium=true, is_featured=true, is_verified=true, listing_tier='premium'`. Also marks Bywater Sauna, Saunable, Elevated Embers as featured+verified (not premium — non-paying) so the richest-content vendors get top placement in their respective cities.
- Also culls "The Plunge and Sauna Method" (walk-in facility in Deerfield Beach with 1000+ reviews at 1574 SE 3rd Ct).

**Monetization model:**
- Free tier: standard listing, no ring, no top-of-page placement.
- Featured (comped for now): brand-orange "Featured" pill, sorts above free vendors, no ring.
- Premium (paid): gold ring around card, "Premium Vendor" banner at top of card, gold banner on detail page, top-of-page placement everywhere. Cold Plunge Florida is the first premium vendor — pricing target from PROJECT_MEMORY is $49/mo founding, $99/mo standard.

## Vendors still needing enrichment (next pass)
Verify mobile vs walk-in and enrich if legit: Sauna Strong (Minneapolis), Embrace North (Minneapolis), The Plunge and Sauna Method (Miami). Plus continue down the KEEP_MOBILE list by review count.

**Other TODO:**
1. Fix Resend (new account, verify bookashvitz.com domain) — still blocking lead notifications
2. Vendor outreach for backlinks (biggest remaining SEO lever)
3. Replace expired googleusercontent photo URLs with real vendor URLs
4. Close Cold Plunge Florida as first paying vendor
5. Configure bookaschvitz.com and bookasauna.co redirects in Vercel

## 2026-09-08 (later) Second-pass cull + Cold Plunge Florida enrichment
Discovered category contamination on the KEEP_MOBILE survivors: PLUNJ (16-location walk-in chain), Von Sauna (fixed floating sauna at Carillon Point Marina Kirkland), Heat Haven Sauna Park, Melt Well Sauna & Plunge Studio, Good Health Saunas Mall of America (retail showroom) had all self-tagged as "Mobile Sauna Rental" or "Cold Plunge Rental" in DB but are fixed walk-in facilities. Additionally, 10 mobile MASSAGE-only vendors with no sauna/plunge component were tagged "Wellness Event Packages" and appearing on the site.

**Shipped in `sql/2026-09-08b-second-cull-and-enrichment.sql`:**
- Culled 16 more vendors to inactive (6 fixed walk-in facilities + 10 mobile massage-only). Total culled to date: 77 of original 257 = ~180 active.
- Restored Cold Plunge Florida with real vendor-provided content: full description ($799–$1,499+ pricing tiers, service area, contact), 6 vendor-specific FAQ entries in the new faq JSONB column, service_area, price_range fields populated.
- Also enriched Mobile Sauna FL and ALTÆR Mobile Sauna with vendor-specific descriptions from vendor site research.

## Git Push Auth
GitHub PAT with Contents read/write on volatilepeak/bookashvitz. Set remote URL with token for pushes. Git config: deploy@volatilepeak.com / "Volatile Peak".
