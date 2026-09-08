-- ============================================================================
-- BookAShvitz — Top 50 photo hit list
-- Vendors that need real photos, ranked by impact (rating × reviews).
-- Missing OR expired googleusercontent URLs count as "needs photo."
-- ============================================================================

-- Copy-paste this into Neon SQL editor and run.
-- Output columns: slug (for the SQL update), name, city, state, website
-- (to visit), current_photo_status, review_count, quality_score

SELECT
  slug,
  name,
  city,
  state_abbr AS state,
  COALESCE(website, '(no website)') AS website,
  COALESCE(instagram, '(no ig)') AS instagram,
  CASE
    WHEN photo_url IS NULL OR photo_url = '' THEN 'MISSING'
    WHEN photo_url LIKE '%googleusercontent%' OR photo_url LIKE '%maps.google%' THEN 'EXPIRED'
    ELSE 'HAS_PHOTO'
  END AS current_photo_status,
  COALESCE(reviews, 0) AS review_count,
  ROUND((COALESCE(rating,0) * COALESCE(reviews,0))::numeric, 1) AS quality_score
FROM vendors
WHERE status = 'active'
  AND (
    photo_url IS NULL
    OR photo_url = ''
    OR photo_url LIKE '%googleusercontent%'
    OR photo_url LIKE '%maps.google%'
  )
ORDER BY (COALESCE(rating,0) * COALESCE(reviews,0)) DESC NULLS LAST
LIMIT 50;

-- ─── After you have photos for a vendor, use this template ──
--
-- UPDATE vendors SET
--   photo_url = 'https://REAL_HERO_URL.jpg',
--   photos = ARRAY[
--     'https://REAL_PHOTO_2.jpg',
--     'https://REAL_PHOTO_3.jpg',
--     'https://REAL_PHOTO_4.jpg',
--     'https://REAL_PHOTO_5.jpg'
--   ]
-- WHERE slug = 'their-slug-here';
--
-- Tip: right-click any image on the vendor's website or Instagram post →
-- "Copy image address." Instagram post URLs (the /p/ format) don't work
-- directly — grab the underlying image URL from the CDN.
