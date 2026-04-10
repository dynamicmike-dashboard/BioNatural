-- Semantic Association Table for SEOLLM / AEO
CREATE TABLE IF NOT EXISTS product_associations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id TEXT REFERENCES Master_Inventory(Odoo_ID) ON DELETE CASCADE,
    target_id TEXT REFERENCES Master_Inventory(Odoo_ID) ON DELETE CASCADE,
    relationship_type TEXT DEFAULT 'semantic_companion', -- e.g., 'detox_stack', 'stress_relief'
    shared_benefit TEXT,
    shared_issue TEXT,
    strength FLOAT DEFAULT 1.0, -- Confidence score of relationship
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(source_id, target_id)
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_assoc_source ON product_associations(source_id);
CREATE INDEX IF NOT EXISTS idx_assoc_target ON product_associations(target_id);
