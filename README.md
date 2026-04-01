# BioNatural Logic Architect

This project implements a full-stack Next.js-style backend (using Express + Vite) for BioNatural, a multi-location shop in Mexico.

## Supabase Schema Requirements

To use this application, ensure your Supabase project has the following tables:

### 1. `Master_Inventory`
- `Odoo_ID`: text (PK) - Unique identifier from Odoo
- `sku`: text
- `name_en`: text
- `name_es`: text
- `description_en`: text
- `description_es`: text
- `price`: numeric
- `image_url`: text
- `category`: text
- `location_id`: text (e.g., "1" or "2")

## Bilingual Sync (AI Fallback)
The system includes an AI-driven fallback. If a product has a Spanish description but is missing an English one, the backend uses **Gemini 3 Flash** to generate a professional English translation on-the-fly for the frontend.

### 2. `reservations`
- `id`: uuid (PK)
- `date`: date
- `time`: time
- `party_size`: int
- `customer_name`: text
- `customer_phone`: text
- `location`: text
- `status`: text

### 3. `current_capacity`
- `location`: text (PK)
- `date`: date (PK)
- `time`: time (PK)
- `max_capacity`: int
- `current_occupancy`: int

## API Endpoints

### `GET /api/products`
Fetches products from Supabase. Prioritizes content based on the `locale` cookie (ES/EN).

### `POST /api/inventory-sync`
Webhook for n8n/Google Sheets.
**Payload Example:**
```json
[
  {
    "odoo_id": "101",
    "sku": "BN-HON-01",
    "name_en": "Wildflower Honey",
    "name_es": "Miel de Flores Silvestres",
    "price": 340
  }
]
```

### `POST /api/reservations`
Handles table bookings.
- Checks `current_capacity` before confirming.
- Triggers a Tinytalk WhatsApp notification to the manager.

## Environment Variables
Configure these in the AI Studio Secrets panel:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `TINYTALK_API_KEY`
- `TINYTALK_WHATSAPP_NUMBER`
- `MANAGER_WHATSAPP_NUMBER`
