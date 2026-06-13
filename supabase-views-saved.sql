-- ============================================================
-- Post view counts + Saved Articles (bookmarks). Run once.
-- ============================================================

-- View counter on posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS views INT DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void LANGUAGE sql AS $$
  UPDATE posts SET views = views + 1 WHERE slug = post_slug;
$$;

-- Saved / bookmarked articles per user
CREATE TABLE IF NOT EXISTS saved_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT,
  excerpt TEXT,
  image TEXT,
  category TEXT,
  href TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, slug)
);
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own saved articles" ON saved_articles;
CREATE POLICY "Users manage own saved articles" ON saved_articles FOR ALL USING (auth.uid() = user_id);
