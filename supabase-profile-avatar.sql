-- Avatar support for user profiles. Run once.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
