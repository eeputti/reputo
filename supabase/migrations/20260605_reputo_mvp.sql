create extension if not exists pgcrypto;

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  google_review_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  full_name text,
  role text not null default 'owner',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.review_requests (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  customer_name text not null,
  customer_phone text not null,
  message text,
  status text not null default 'sent',
  sent_at timestamptz,
  clicked_at timestamptz,
  review_left_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists profiles_business_id_idx on public.profiles (business_id);
create index if not exists review_requests_business_id_idx on public.review_requests (business_id);
create index if not exists review_requests_created_at_idx on public.review_requests (created_at desc);

alter table public.businesses enable row level security;
alter table public.profiles enable row level security;
alter table public.review_requests enable row level security;

create policy "Businesses are viewable by their members"
on public.businesses
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.business_id = businesses.id
  )
);

create policy "Businesses can be created by authenticated users"
on public.businesses
for insert
to authenticated
with check (true);

create policy "Businesses can be updated by their members"
on public.businesses
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.business_id = businesses.id
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.business_id = businesses.id
  )
);

create policy "Profiles are viewable by the owner"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "Profiles can be inserted by the owner"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

create policy "Profiles can be updated by the owner"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Review requests are viewable by business members"
on public.review_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.business_id = review_requests.business_id
  )
);

create policy "Review requests can be inserted by business members"
on public.review_requests
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.business_id = review_requests.business_id
  )
);

create policy "Review requests can be updated by business members"
on public.review_requests
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.business_id = review_requests.business_id
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.business_id = review_requests.business_id
  )
);
