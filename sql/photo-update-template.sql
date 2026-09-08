-- ============================================================================
-- BookAShvitz — Photo update template
-- Use this to replace expired googleusercontent URLs with real vendor URLs.
-- ============================================================================
--
-- HOW TO USE:
-- 1. Find the vendor's photos from their website / Instagram / Google Business
--    Profile (right-click → "Copy image address" for each photo you want).
-- 2. Use a WebP-optimized URL if available; JPGs/PNGs are fine too.
-- 3. Paste the URLs into the arrays below and run in Neon SQL editor.
-- 4. photo_url = the main hero photo (single URL)
-- 5. photos = the gallery (array of up to 5 URLs — thumbnails render on vendor
--    detail pages via the VendorPhotoGallery component).
--
-- Vendor slugs are the URL slug (e.g. /vendors/cold-plunge-florida → 'cold-plunge-florida').
-- Look them up with: SELECT slug FROM vendors WHERE name ILIKE '%name%';
--
-- ============================================================================

-- ─── EXAMPLE: Cold Plunge Florida ──
UPDATE vendors SET
  photo_url = 'https://REPLACE_ME_HERO_URL.jpg',
  photos = ARRAY[
    'https://REPLACE_ME_PHOTO_2.jpg',
    'https://REPLACE_ME_PHOTO_3.jpg',
    'https://REPLACE_ME_PHOTO_4.jpg',
    'https://REPLACE_ME_PHOTO_5.jpg'
  ]
WHERE slug = 'cold-plunge-florida';


-- ─── EXAMPLE: Bywater Sauna ──
UPDATE vendors SET
  photo_url = 'https://REPLACE_ME.jpg',
  photos = ARRAY[
    'https://REPLACE_ME.jpg',
    'https://REPLACE_ME.jpg'
  ]
WHERE slug = 'bywater-sauna';


-- ─── EXAMPLE: Saunable ──
UPDATE vendors SET
  photo_url = 'https://REPLACE_ME.jpg',
  photos = ARRAY[
    'https://REPLACE_ME.jpg',
    'https://REPLACE_ME.jpg'
  ]
WHERE slug = 'saunable';


-- ─── EXAMPLE: Elevated Embers ──
UPDATE vendors SET
  photo_url = 'https://REPLACE_ME.jpg',
  photos = ARRAY[
    'https://REPLACE_ME.jpg',
    'https://REPLACE_ME.jpg'
  ]
WHERE slug = 'elevated-embers';


-- ============================================================================
-- BULK: Find every vendor that still has expired googleusercontent URLs
-- ============================================================================

-- List all vendors with expired photos so you can work through them:
--
-- SELECT slug, name, city, state_abbr, photo_url
-- FROM vendors
-- WHERE status = 'active'
--   AND (photo_url LIKE '%googleusercontent%' OR photo_url LIKE '%maps.google%')
-- ORDER BY (COALESCE(rating,0) * COALESCE(reviews,0)) DESC NULLS LAST;

-- Or clear ALL expired googleusercontent photos in one shot
-- (falls back to the 🔥 gradient placeholder on cards):
--
-- UPDATE vendors SET photo_url = NULL
-- WHERE photo_url LIKE '%googleusercontent%' OR photo_url LIKE '%maps.google%';
