-- BioNatural Universal Alpha Master Schema
-- Optimized for 2,000+ item directory and multi-location management

-- 1. Master Inventory Table
CREATE TABLE IF NOT EXISTS Master_Inventory (
    Odoo_ID TEXT PRIMARY KEY,
    sku TEXT,
    name_en TEXT NOT NULL,
    name_es TEXT NOT NULL,
    description_en TEXT,
    description_es TEXT,
    price NUMERIC(10,2) DEFAULT 0.00,
    image_url TEXT,
    category TEXT,
    location_id TEXT DEFAULT '1', -- 1: PDC, 2: Tulum, etc.
    stock_quantity INTEGER DEFAULT 0,
    is_restaurant_item BOOLEAN DEFAULT FALSE,
    currency TEXT DEFAULT 'MXN',
    -- Enriched Health Data
    benefits_en TEXT[],
    benefits_es TEXT[],
    issues_en TEXT[],
    issues_es TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    time TIME NOT NULL,
    party_size INTEGER NOT NULL DEFAULT 2,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    location_id TEXT DEFAULT '1',
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Current Capacity Table (For Reservation Logic)
CREATE TABLE IF NOT EXISTS current_capacity (
    location_id TEXT,
    date DATE,
    time TIME,
    max_capacity INTEGER DEFAULT 20,
    current_occupancy INTEGER DEFAULT 0,
    PRIMARY KEY (location_id, date, time)
);

-- Enable RLS (Optional, can be configured in Supabase UI)
ALTER TABLE Master_Inventory ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'master_inventory'
        AND policyname = 'Public Access'
    ) THEN
        CREATE POLICY "Public Access" ON Master_Inventory FOR SELECT USING (true);
    END IF;
END
$$;

-- 4. Promotions Table
CREATE TABLE IF NOT EXISTS promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_es TEXT NOT NULL,
    description_en TEXT,
    description_es TEXT,
    terms_link TEXT, -- Link to rewards program etc
    start_time TIME,
    end_time TIME,
    day_of_week TEXT, -- e.g., 'Wed', 'Tue', 'Everyday'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_master_inventory_category ON Master_Inventory(category);
CREATE INDEX IF NOT EXISTS idx_master_inventory_location ON Master_Inventory(location_id);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
