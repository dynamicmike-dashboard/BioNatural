-- BioNatural Extended Schema: Blog & Provider Surveys

-- 1. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_es TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_es TEXT NOT NULL,
    excerpt_en TEXT,
    excerpt_es TEXT,
    featured_image TEXT,
    author_id UUID REFERENCES auth.users(id),
    category TEXT,
    tags TEXT[],
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Provider Surveys Table
CREATE TABLE IF NOT EXISTS provider_surveys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    rfc TEXT NOT NULL,
    product_types TEXT[], -- Array of: Orgánico, Agro-ecológico, Gluten free, Saludable
    characteristics TEXT NOT NULL,
    certifications TEXT,
    sold_in_pdc BOOLEAN DEFAULT FALSE,
    sold_where TEXT,
    time_in_market TEXT,
    reason_to_join TEXT,
    credit_capacity BOOLEAN DEFAULT FALSE,
    catalog_url TEXT,
    price_list_url TEXT,
    representative_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, reviewed, accepted, rejected
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_surveys ENABLE ROW LEVEL SECURITY;

-- 4. Policies
-- Public can read published posts
CREATE POLICY "Public can read published posts" ON blog_posts
    FOR SELECT USING (is_published = true);

-- Authenticated users (admin) can do everything on blog
CREATE POLICY "Admins can manage blog" ON blog_posts
    FOR ALL USING (auth.role() = 'service_role');

-- Public can insert surveys
CREATE POLICY "Public can submit surveys" ON provider_surveys
    FOR INSERT WITH CHECK (true);

-- Admins can read surveys
CREATE POLICY "Admins can view surveys" ON provider_surveys
    FOR SELECT USING (auth.role() = 'service_role');
