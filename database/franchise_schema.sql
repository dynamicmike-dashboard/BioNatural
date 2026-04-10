-- BioNatural Franchise Applications Table

CREATE TABLE IF NOT EXISTS franchise_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    age INTEGER,
    birth_date DATE,
    education_level TEXT,
    institution TEXT,
    other_studies TEXT,
    experience_food_beverage TEXT,
    previous_franchise_owner TEXT,
    own_business_experience TEXT,
    current_company TEXT,
    sector TEXT,
    position TEXT,
    monthly_income TEXT,
    fiscal_regime TEXT,
    partner_count INTEGER,
    share_percentage TEXT,
    operator_role TEXT,
    how_did_you_hear TEXT,
    opinion_on_concept TEXT,
    reasons_to_join TEXT,
    target_city TEXT,
    location_type TEXT,
    location_address TEXT,
    liquidity_issues_history TEXT,
    available_capital TEXT,
    credit_check_authorized BOOLEAN DEFAULT FALSE,
    credit_cards TEXT, -- JSON or concatenated string of card info (careful with security)
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE franchise_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit franchise apps" ON franchise_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view franchise apps" ON franchise_applications
    FOR SELECT USING (auth.role() = 'service_role');
