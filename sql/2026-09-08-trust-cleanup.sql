-- ============================================================================
-- BookAShvitz — Trust & content cleanup migration
-- Run this in Neon SQL editor, ideally as one block.
-- Safe to re-run. All destructive changes are UPDATEs, not DELETEs.
-- ============================================================================

BEGIN;

-- ─── 1. Add faq column for vendor-specific FAQ overrides ──
-- If null, vendor page auto-generates unique FAQs per vendor.
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS faq JSONB;

-- ─── 2. Cull 61 brick-and-mortar vendors ──
-- Walk-in day spas, gyms (Equinox), franchise infrared sauna studios (SweatHouz,
-- beem, Glow, Perspire, Pure Sweat, Sauna House), luxury bathhouses (AIRE, QC,
-- Bathhouse Flatiron, Great Jones, Woodhouse), and hot-tub-only retailers.
-- These vendors damage trust — users searching for mobile sauna rentals bounce
-- immediately when served a walk-in bathhouse.

UPDATE vendors SET status = 'inactive' WHERE id IN (
  '64ea9022-d8cc-4ad1-9f33-29891405acfc', -- AIRE Ancient Baths Chicago
  '4a947183-331b-4c2b-af22-37cab2b591cb', -- Bathhouse Flatiron
  'a8e15250-484e-4ae1-8907-ff14b573bd22', -- QC Spa New York
  '56ec597d-6450-4c48-8045-6a60f7e44f80', -- AIRE Ancient Baths NY Tribeca
  '2799fa5b-ea9d-45f4-b47c-dd1d3c2f7973', -- Sui Yoga & Spa Thermae
  'e830f4d9-b45d-430f-ace5-cf2aa0434301', -- Wall Street Bath & Spa 88
  '3a94a5b8-1066-413c-ad74-72475664fbc7', -- Great Jones Spa
  '4f0a8aaf-8952-4810-872b-e0ee96f86c4a', -- Glow Sauna Studios Mockingbird
  '4e84c8a2-c5a3-48b1-8b2f-527c34171df8', -- Joanna Vargas - New York
  'dc20cf5d-0a3f-47d3-81b8-68bf8338051e', -- Sauna House Charlotte
  '26b747a6-5e74-4c0b-b460-eb4c4cb53fec', -- SweatHouz - Vinings
  'f1816b54-16b0-473a-a3bb-d13c86c8b470', -- Tribeca Spa of Tranquility
  '2a3c4d7e-f3be-4ac7-acf5-ee39198e7c94', -- Woodhouse Spa - Hoboken
  '1b7ee6f5-7830-49a9-a198-42b0ccc3a071', -- KUR Health Spa
  '06cf9280-7d8b-47da-b867-26d4b5c89a63', -- Glow Sauna Studios Prestonwood
  '57197601-fd80-4a1f-b1f8-ef45f14afb74', -- SweatHouz Infrared Sauna Allen
  '8756289c-b98d-4fef-bd5a-c90de1e52a50', -- Rytual Recovery
  '98dfb79c-e562-4299-bc52-f3f0bf17aca1', -- SWTHZ West Village
  'c5de20f3-ce5d-4bfd-aa25-58db30ec6568', -- Hothouse Spa & Sauna
  '16fe5b14-1e62-41ae-8e0b-cbc054b9b089', -- Altered States Wellness
  '2f1bdda5-c3f8-4cfd-b39c-291ce9597dc7', -- SweatHouz Infrared Sauna Atlanta
  '3cbffe0e-1111-483a-8268-7243be4a29c7', -- Pure Sweat Sauna Studio 12 South
  '4fc20c2a-de85-44b5-8df2-70df09186594', -- Equinox Sports Club NY
  'fedd8cb3-f11b-4010-8888-def954231bbb', -- Space BAR Wellness West Seattle
  '2eec8b2b-b9a3-4838-bdc1-ba05d0299dd8', -- Conscious Body Recovery
  '35c5a666-d17a-45e2-86e0-f19cae6154f6', -- om.life Wellness Modern Recovery
  'f74beb63-0655-4bdb-a5f1-aeeff7aa7eb8', -- beem Light Sauna - Southend
  '104fc09d-c938-40b7-bb3e-b495734a1fc2', -- 111SKIN SPA/CLINIC
  '22115666-439b-480d-9a33-017f911300e6', -- Perspire Sauna Studio Austin
  '8223177b-1b43-4bc8-a253-ea17436191af', -- Equinox Greenwich Avenue
  'c0e9966c-0fe6-4a7b-a65b-573c0b59ebbb', -- Planted Living & Wellness
  '306c8bc9-c593-46d1-9e7c-d3c2ce8f204a', -- Bamford Wellness Spa
  'fcdd9037-2939-4853-ac61-1be7273fc26c', -- Spring Vitality Spa
  'b494d877-a282-4847-aa33-a54345169638', -- SweatHouz Infrared Sauna Atlanta
  '2e9d35ef-910d-40f4-9f9d-4d96d31506cd', -- Equinox Bond Street
  '2f733b1e-a180-4e54-84da-9c35e2c83691', -- Equinox Brookfield Place
  'e708222e-d062-463e-b474-7f3e448a359d', -- Equinox High Line
  'e8a6eb9b-4af3-42d7-950f-2d6821d69c6a', -- SWTHZ Preston Royal
  '64f326a5-b1ed-48a9-be73-85b5e0e88f0a', -- beem Light Sauna St. Louis Park
  'a5895e1f-ee9e-44d1-bae9-8af58cfcf521', -- Sauna House North Loop
  '23d1d7fe-991a-4f13-be40-82e850f39ecc', -- S W E A T L A N D
  '237f56cf-0dc3-41b9-bb85-35efb11b897c', -- Pure Infrared Sauna Studio SD
  '10db2e55-878d-4ab9-a33d-093338d98754', -- SweatHouz Salt River
  'e0dc5922-b185-4684-81ce-6c20bab2dc3c', -- Sauna House Recovery Studio Dallas
  'ecf43341-3ec5-4817-9f01-79ae5cb6c06d', -- SweatHouz One Paseo
  'bd316bbe-9f11-42f6-920f-7ab40a26ff1d', -- beem Light Sauna N Scottsdale
  '8558e814-5f8f-4465-a33e-6d9d782a06c3', -- Plungie USA
  '60b36344-2995-4fde-babe-30ed1a7c789c', -- InVita Wellness
  '76a77c69-2d9f-412e-9b48-18d92a3ecd60', -- beem Light Sauna Austin W 6th
  '021e10a4-8217-43e0-989b-8bcf6773bca4', -- beem Light Sauna Downtown Mpls
  '243f5946-a02b-4a3e-a88a-2793eeadb990', -- Synergy Skin Care & Mobile Spa
  'f851c911-af58-4a82-98cf-feb10771f4c4', -- 2GoSpa San Diego Mobile Day Spa
  '6206dd88-5dcd-4a5f-959a-cf8539e7b4f5', -- King Spa & Sauna
  '2e089e26-d791-495b-9ce5-995316ae50b8', -- Imagine Backyard Living
  '62907a23-44dd-4927-a872-103a233d97e8', -- cityWell brooklyn
  '2956c538-65cf-4852-aa98-faf56a8c3ad5', -- DFW Hot Tub Services
  'b20023ff-61cc-4c8f-9443-b53da563f805', -- Oregon Hot Tub - Portland
  'd6f64448-13bf-4c6f-bc36-dc8e0f84cbb9', -- Pacific Spas & Sauna
  '9b0ecb15-0dcf-46f9-9f36-51b13a30ec9c', -- Hot Tub Republic
  'ae7b3575-4d7a-4d4d-b1ca-0668c5285337', -- Bahzi Soaking Tubs
  '3cf16793-f961-4c14-9b16-a70068cfff6d'  -- Supreme Pools & Saunas
);

-- ─── 3. NULL out template descriptions ──
-- Any description shared by 3+ vendors (city name swapped) is duplicate content
-- and Google is penalizing. Setting to NULL triggers the new per-vendor
-- fallback description generator on the vendor page.

UPDATE vendors SET description = NULL
WHERE description IS NOT NULL
  AND LEFT(description, 60) IN (
    SELECT LEFT(description, 60)
    FROM vendors
    WHERE description IS NOT NULL AND description != ''
    GROUP BY LEFT(description, 60)
    HAVING COUNT(*) >= 3
  );

-- ─── 4. Dedupe ALTÆR Mobile Sauna (Warren RI has 2 identical rows) ──
-- Keeps the older row, sets the newer duplicate inactive.
UPDATE vendors SET status = 'inactive'
WHERE id IN (
  SELECT id FROM vendors
  WHERE name = 'ALTÆR Mobile Sauna' AND city = 'Warren'
  ORDER BY created_at DESC
  OFFSET 1
);

-- ─── 5. Verification ──
-- After running the block, run these SEPARATELY to check results:
--
-- SELECT COUNT(*) FILTER (WHERE status='active') AS active,
--        COUNT(*) FILTER (WHERE status='inactive') AS inactive
-- FROM vendors;
--
-- SELECT COUNT(*) FILTER (WHERE description IS NULL) AS null_desc,
--        COUNT(*) FILTER (WHERE description IS NOT NULL) AS has_desc
-- FROM vendors WHERE status='active';
--
-- SELECT LEFT(description, 60) opener, COUNT(*) uses
-- FROM vendors WHERE status='active' AND description IS NOT NULL
-- GROUP BY LEFT(description, 60) HAVING COUNT(*) >= 2 ORDER BY 2 DESC LIMIT 10;

COMMIT;
