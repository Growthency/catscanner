-- Manual search-volume column for the Rank Tracker.
-- Run once in the Supabase SQL editor.
alter table tracked_keywords add column if not exists volume integer;
