-- BioNatural Social Media Calendar Table

CREATE TABLE IF NOT EXISTS social_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publish_date DATE NOT NULL,
    product_id TEXT REFERENCES Master_Inventory(Odoo_ID),
    caption_en TEXT,
    caption_es TEXT,
    image_prompt TEXT,
    status TEXT DEFAULT 'draft', -- draft, approved, posted
    platform TEXT DEFAULT 'instagram',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE social_calendar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage social calendar" ON social_calendar
    USING (auth.role() = 'service_role');
