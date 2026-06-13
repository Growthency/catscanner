-- ============================================================
-- Tracked keywords for the Admin > Rank Tracker.
-- Run once in your Supabase SQL editor.
-- ============================================================

CREATE TABLE IF NOT EXISTS tracked_keywords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  position INT,            -- latest Google position (NULL = not in top 100)
  url TEXT,                -- the ranking URL on your site
  checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reads and writes happen server-side with the service-role key (bypasses RLS).
ALTER TABLE tracked_keywords ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS tracked_keywords_created_idx ON tracked_keywords(created_at DESC);
