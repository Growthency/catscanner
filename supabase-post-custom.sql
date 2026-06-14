-- Per-post Custom CSS and Custom Schema (JSON-LD).
-- Run once in the Supabase SQL editor (Dashboard → SQL).
alter table posts add column if not exists custom_css text default '';
alter table posts add column if not exists custom_schema text default '';
