-- ============================================================
-- Tables for Header Scripts + External Links admin tools.
-- Run once in your Supabase SQL editor.
-- ============================================================

CREATE TABLE IF NOT EXISTS header_scripts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE header_scripts ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS external_link_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL,
  nofollow BOOLEAN DEFAULT true,
  sponsored BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE external_link_rules ENABLE ROW LEVEL SECURITY;

-- Both tables are read/written server-side with the service-role key (bypasses RLS).
