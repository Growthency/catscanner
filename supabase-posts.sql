-- ============================================================
-- POSTS / ARTICLES table for the Admin > Pages content manager.
-- Run this once in your Supabase SQL editor.
-- ============================================================

CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  featured_image TEXT DEFAULT '',
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  tags TEXT DEFAULT '',
  category TEXT DEFAULT 'Guide',
  author_name TEXT DEFAULT 'CatScanner Team',
  access_type TEXT DEFAULT 'free',     -- 'free' | 'premium'
  status TEXT DEFAULT 'draft',         -- 'draft' | 'published'
  featured BOOLEAN DEFAULT false,      -- feature on homepage / blog hero
  read_time TEXT DEFAULT '5 min',
  publish_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Anyone may READ published posts (so they appear on the public site).
-- All writes happen server-side with the service-role key, which bypasses RLS.
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published posts" ON posts;
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (status = 'published');

CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);
CREATE INDEX IF NOT EXISTS posts_status_idx ON posts(status, publish_date DESC);
