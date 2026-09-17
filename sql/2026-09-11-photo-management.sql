-- ============================================================================
-- BookAShvitz — Photo management system migration
-- Run this in Neon SQL editor.
-- ============================================================================

BEGIN;

-- ─── 1. vendor_submissions table (stores form submissions with photo_url) ──
CREATE TABLE IF NOT EXISTS vendor_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  city TEXT,
  state TEXT,
  categories TEXT[],
  description TEXT,
  photo_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- If the table already existed without photo_url, this adds it:
ALTER TABLE vendor_submissions ADD COLUMN IF NOT EXISTS photo_url TEXT;

CREATE INDEX IF NOT EXISTS idx_vendor_submissions_status ON vendor_submissions(status);
CREATE INDEX IF NOT EXISTS idx_vendor_submissions_created ON vendor_submissions(created_at DESC);

COMMIT;

-- ============================================================================
-- Photo audit — every vendor with an external URL that will eventually break
-- Use the /admin/photos page to fix these one at a time.
-- Sorted by rating × reviews (impact first).
-- ============================================================================

SELECT
  id,
  slug,
  name,
  city,
  state_abbr,
  photo_url,
  COALESCE(reviews, 0) AS reviews,
  COALESCE(rating, 0) AS rating,
  ROUND((COALESCE(rating, 0) * COALESCE(reviews, 0))::numeric, 1) AS impact_score
FROM vendors
WHERE status = 'active'
  AND photo_url IS NOT NULL
  AND photo_url != ''
  AND photo_url NOT LIKE '%blob.vercel-storage.com%'
  AND photo_url NOT LIKE '/vendors/%'
ORDER BY (COALESCE(rating, 0) * COALESCE(reviews, 0)) DESC NULLS LAST;
