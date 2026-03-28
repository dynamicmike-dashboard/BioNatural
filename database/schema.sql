-- BioNatural Supabase Schema: 'Top 200 Products'
-- Designed for high-fidelity product data with integrated health benefits and multi-language support.

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name JSONB NOT NULL, -- { "en": "Botanicals", "es": "Botánicos" }
  slug TEXT UNIQUE NOT NULL
);

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  sku TEXT UNIQUE NOT NULL,
  
  -- Core Content (JSONB for 50/50 Bilingual Logic)
  name JSONB NOT NULL, -- { "en": "Heirloom Carrots", "es": "Zanahorias de Herencia" }
  description JSONB,   -- { "en": "...", "es": "..." }
  ingredients JSONB,   -- { "en": ["Carrot"], "es": ["Zanahoria"] }
  health_benefits JSONB, -- { "en": ["Vision", "Skin"], "es": ["Visión", "Piel"] }
  
  -- Metadata & Logistics
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  direct_url TEXT, -- Odoo/Shopify direct link
  image_url TEXT,
  keywords TEXT[], -- For automation triggers (e.g., ['MENU', 'SHOP'])
  
  -- Categories
  category_id UUID REFERENCES categories(id)
);

-- Indexing for Performance
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_keywords ON products USING GIN (keywords);
