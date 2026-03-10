-- Motion Ventures — Affiliate / Commission System
-- Run against Supabase (PostgreSQL)

-- Affiliates: salespeople and referral partners
create table if not exists affiliates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  referral_code text unique not null,  -- e.g. "JOHN2026"
  commission_rate numeric(5,2) not null default 10.00,  -- percentage
  status text not null default 'active' check (status in ('active','paused','terminated')),
  payout_method text default 'bank_transfer' check (payout_method in ('bank_transfer','paypal','crypto','check')),
  payout_details jsonb default '{}',  -- bank info, paypal email, wallet address, etc.
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Referrals: tracked leads/accounts brought in by affiliates
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references affiliates(id),
  client_name text not null,
  client_email text,
  client_phone text,
  source text,  -- how they heard about us (link click, direct intro, etc.)
  status text not null default 'lead' check (status in ('lead','qualified','signed','active','churned')),
  deal_value numeric(10,2),  -- total contract value in USD
  service_type text,  -- e.g. 'foundation', 'premium_growth', 'ai_agent'
  signed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Commissions: calculated payouts per referral
create table if not exists commissions (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references affiliates(id),
  referral_id uuid not null references referrals(id),
  amount numeric(10,2) not null,  -- commission amount in USD
  rate_applied numeric(5,2) not null,  -- rate at time of calculation
  status text not null default 'pending' check (status in ('pending','approved','paid','voided')),
  approved_at timestamptz,
  paid_at timestamptz,
  payout_reference text,  -- check #, transaction ID, etc.
  notes text,
  created_at timestamptz not null default now()
);

-- Referral link clicks: track visits from referral links
create table if not exists referral_clicks (
  id uuid primary key default gen_random_uuid(),
  affiliate_id uuid not null references affiliates(id),
  referral_code text not null,
  page_url text,
  ip_hash text,  -- hashed for privacy
  user_agent text,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_referrals_affiliate on referrals(affiliate_id);
create index if not exists idx_commissions_affiliate on commissions(affiliate_id);
create index if not exists idx_referral_clicks_affiliate on referral_clicks(affiliate_id);
create index if not exists idx_referral_clicks_code on referral_clicks(referral_code);
create index if not exists idx_affiliates_code on affiliates(referral_code);

-- RLS policies (enable after setting up auth)
-- alter table affiliates enable row level security;
-- alter table referrals enable row level security;
-- alter table commissions enable row level security;
-- alter table referral_clicks enable row level security;

-- Helper function: calculate commission for a referral
create or replace function calculate_commission(p_referral_id uuid)
returns numeric as $$
declare
  v_deal_value numeric;
  v_rate numeric;
  v_affiliate_id uuid;
  v_commission numeric;
begin
  select r.deal_value, r.affiliate_id, a.commission_rate
  into v_deal_value, v_affiliate_id, v_rate
  from referrals r
  join affiliates a on a.id = r.affiliate_id
  where r.id = p_referral_id;

  if v_deal_value is null then
    return 0;
  end if;

  v_commission := v_deal_value * (v_rate / 100);

  insert into commissions (affiliate_id, referral_id, amount, rate_applied, status)
  values (v_affiliate_id, p_referral_id, v_commission, v_rate, 'pending')
  on conflict do nothing;

  return v_commission;
end;
$$ language plpgsql;
