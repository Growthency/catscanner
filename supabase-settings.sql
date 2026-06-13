-- ============================================================
-- Editable site settings (e.g. homepage hero copy).
-- Run once in your Supabase SQL editor.
-- ============================================================

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Settings are public content (hero text etc.), so anyone may read them.
-- Writes happen server-side with the service-role key.
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read settings" ON site_settings;
CREATE POLICY "Public can read settings" ON site_settings FOR SELECT USING (true);
