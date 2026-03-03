-- TrashcanWrangler.com Database Schema

-- Enums
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'quoted', 'converted', 'lost');
CREATE TYPE job_status AS ENUM ('scheduled', 'in_progress', 'completed', 'skipped');
CREATE TYPE plan_type AS ENUM ('single', 'multi');
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday');

-- Customers
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Fort Worth',
  zip TEXT NOT NULL,
  neighborhood TEXT,
  can_count INTEGER NOT NULL DEFAULT 1,
  pickup_day day_of_week NOT NULL,
  plan plan_type NOT NULL DEFAULT 'single',
  notes TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  converted_from_lead UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Leads
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  zip TEXT,
  neighborhood TEXT,
  can_count INTEGER DEFAULT 1,
  message TEXT,
  source TEXT DEFAULT 'website',
  status lead_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Jobs
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  service_date DATE NOT NULL,
  status job_status NOT NULL DEFAULT 'scheduled',
  can_count INTEGER NOT NULL DEFAULT 1,
  completion_photo TEXT,
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pricing Plans
CREATE TABLE pricing_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type plan_type NOT NULL,
  price_per_can NUMERIC(5,2) NOT NULL,
  description TEXT,
  features TEXT[],
  popular BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Service Areas
CREATE TABLE service_areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  zip_codes TEXT[] NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_jobs_service_date ON jobs(service_date);
CREATE INDEX idx_jobs_customer ON jobs(customer_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_customers_zip ON customers(zip);
CREATE INDEX idx_customers_pickup_day ON customers(pickup_day);

-- Seed pricing plans
INSERT INTO pricing_plans (name, type, price_per_can, description, features, popular) VALUES
  ('Single Can', 'single', 3.49, 'Perfect for most homes', ARRAY['Weekly bin return', 'Same-day service', 'Text confirmation'], false),
  ('Multi-Can', 'multi', 2.99, 'Best value for 2+ cans', ARRAY['Weekly bin return', 'Same-day service', 'Text confirmation', 'Volume discount'], true);

-- Seed service areas (NW DFW)
INSERT INTO service_areas (name, zip_codes) VALUES
  ('Haslet', ARRAY['76052']),
  ('Trophy Club', ARRAY['76262']),
  ('Roanoke', ARRAY['76262']),
  ('Northlake', ARRAY['76247','76262']),
  ('Justin', ARRAY['76247']),
  ('Argyle', ARRAY['76226']),
  ('Keller', ARRAY['76244','76248']),
  ('Alliance / North Fort Worth', ARRAY['76177','76131']),
  ('Saginaw', ARRAY['76179','76131']);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read pricing" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Public can read service areas" ON service_areas FOR SELECT USING (true);
CREATE POLICY "Public can submit leads" ON leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access customers" ON customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access leads" ON leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access jobs" ON jobs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage pricing" ON pricing_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage service areas" ON service_areas FOR ALL USING (auth.role() = 'authenticated');
