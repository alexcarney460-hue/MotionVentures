-- Motion Ventures CRM Schema
-- Matches Blue Label Wholesale CRM pattern

-- Companies (prospective clients)
CREATE TABLE companies (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  domain text,
  phone text,
  city text,
  state text,
  address text,
  industry text,
  employee_count text,
  website_age text, -- 'none', 'outdated', 'modern', 'unknown'
  website_notes text,
  rating numeric,
  review_count integer DEFAULT 0,
  source text DEFAULT 'brave_search',
  google_place_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contacts (owners, decision makers)
CREATE TABLE contacts (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_id bigint REFERENCES companies(id) ON DELETE SET NULL,
  firstname text,
  lastname text,
  email text,
  phone text,
  city text,
  state text,
  role text,
  source text DEFAULT 'brave_search',
  lead_status text DEFAULT 'NEW',
  lifecycle_stage text DEFAULT 'lead',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Deals
CREATE TABLE deals (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_id bigint REFERENCES companies(id) ON DELETE SET NULL,
  contact_id bigint REFERENCES contacts(id) ON DELETE SET NULL,
  name text NOT NULL,
  owner text,
  stage text DEFAULT 'discovery',
  amount numeric DEFAULT 0,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activities (calls, emails, meetings)
CREATE TABLE activities (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contact_id bigint REFERENCES contacts(id) ON DELETE SET NULL,
  company_id bigint REFERENCES companies(id) ON DELETE SET NULL,
  deal_id bigint REFERENCES deals(id) ON DELETE SET NULL,
  type text NOT NULL,
  note text,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Static contact lists
CREATE TABLE lists (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE list_contacts (
  list_id bigint REFERENCES lists(id) ON DELETE CASCADE,
  contact_id bigint REFERENCES contacts(id) ON DELETE CASCADE,
  PRIMARY KEY (list_id, contact_id)
);

-- Events (traffic analytics)
CREATE TABLE events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  event_type text NOT NULL,
  path text,
  referrer text,
  user_agent text,
  visitor_id text,
  session_id text,
  utm jsonb DEFAULT '{}'::jsonb,
  meta jsonb DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_companies_city ON companies(city);
CREATE INDEX idx_companies_source ON companies(source);
CREATE INDEX idx_companies_website_age ON companies(website_age);
CREATE INDEX idx_contacts_lead_status ON contacts(lead_status);
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
CREATE INDEX idx_events_created_at ON events(created_at);
CREATE INDEX idx_events_event_type ON events(event_type);
CREATE INDEX idx_events_path ON events(path);
CREATE INDEX idx_events_visitor_id ON events(visitor_id);

-- RLS: allow service role full access, block anon on CRM tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Service role bypass policies
CREATE POLICY "service_role_all" ON companies FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_all" ON contacts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_all" ON deals FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_all" ON activities FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_all" ON lists FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_all" ON list_contacts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_all" ON events FOR ALL USING (auth.role() = 'service_role');
