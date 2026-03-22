-- Run these in your Supabase SQL editor

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  credits INT DEFAULT 0,
  total_scans INT DEFAULT 0,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own profile" ON profiles FOR ALL USING (auth.uid() = id);

CREATE TABLE scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address TEXT,
  image_hash TEXT,
  result JSONB NOT NULL,
  credits_used INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON scans(image_hash);
CREATE INDEX ON scans(user_id);
CREATE INDEX ON scans(ip_address, created_at);
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own scans" ON scans FOR ALL USING (auth.uid() = user_id);

CREATE TABLE ip_usage (
  ip_address TEXT PRIMARY KEY,
  count INT DEFAULT 0,
  reset_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  stripe_payment_id TEXT,
  credits_added INT,
  amount_paid NUMERIC,
  pack_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Helper functions for credit management
CREATE OR REPLACE FUNCTION decrement_credits(user_id UUID, amount INT)
RETURNS void LANGUAGE sql AS $$
  UPDATE profiles SET credits = credits - amount WHERE id = user_id AND credits >= amount;
$$;

CREATE OR REPLACE FUNCTION add_credits(user_id UUID, amount INT)
RETURNS void LANGUAGE sql AS $$
  UPDATE profiles SET credits = credits + amount WHERE id = user_id;
$$;

CREATE OR REPLACE FUNCTION increment_scans(user_id UUID)
RETURNS void LANGUAGE sql AS $$
  UPDATE profiles SET total_scans = total_scans + 1 WHERE id = user_id;
$$;
