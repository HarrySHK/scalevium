-- Run in Supabase Dashboard → SQL Editor (or via CLI migrate)

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  company text not null,
  email text not null,
  phone text,
  interest text not null,
  budget text,
  timeline text,
  message text not null
);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

alter table public.contact_inquiries enable row level security;

-- No public SELECT/UPDATE/DELETE policies — read via dashboard or service role only.

comment on table public.contact_inquiries is 'Contact form submissions from scalevium.com';
