-- ============================================================================
-- BookAShvitz — Premium tier activation
-- Run 2026-09-08 after previous cleanup SQL blocks
-- ============================================================================

BEGIN;

-- ─── 1. Cull "The Plunge and Sauna Method" if it's a walk-in ──
-- (Deerfield Beach "The Plunge" at 1574 SE 3rd Ct is a walk-in with 1000+
-- reviews — infrared sauna, cold plunge, red light therapy on-site.)
UPDATE vendors SET status = 'inactive'
WHERE LOWER(name) LIKE '%plunge and sauna method%'
  AND status = 'active';

-- ─── 2. Activate Cold Plunge Florida as PREMIUM ──
-- First paying vendor. Gold ring on cards, premium banner on detail page,
-- sorts above all non-premium vendors on city/state/category pages.
UPDATE vendors SET
  is_premium = TRUE,
  is_featured = TRUE,
  is_verified = TRUE,
  listing_tier = 'premium'
WHERE LOWER(name) LIKE '%cold plunge florida%';

-- ─── 3. Also mark our other well-enriched flagship vendors as featured + verified ──
-- Not premium (they haven't paid), but featured to boost their placement so the
-- richest content is what visitors see first while we work on more vendors.
UPDATE vendors SET
  is_featured = TRUE,
  is_verified = TRUE
WHERE LOWER(name) IN ('bywater sauna', 'saunable', 'elevated embers')
  AND status = 'active';

COMMIT;

-- Verify after commit:
-- SELECT name, city, is_premium, is_featured, is_verified, listing_tier
-- FROM vendors
-- WHERE status='active' AND (is_premium OR is_featured OR is_verified)
-- ORDER BY is_premium DESC, is_featured DESC, name;
