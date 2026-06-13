-- Stores the latest SEO Health / Indexing Report scan so results survive page reloads. Run once.
CREATE TABLE IF NOT EXISTS scan_cache (
  key TEXT PRIMARY KEY,           -- 'seo-health' | 'indexing'
  data JSONB,
  scanned_at TIMESTAMPTZ DEFAULT now()
);
-- Read/written server-side with the service-role key only (no public policy).
ALTER TABLE scan_cache ENABLE ROW LEVEL SECURITY;
