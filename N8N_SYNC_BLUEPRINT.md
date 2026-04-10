# BioNatural n8n Blueprint: The Teable-to-Supabase Bridge

This workflow ensures your **Teable Tier 3** admin dashboard remains the "Single Source of Truth" for your 2,000+ products, syncing them to your production **Supabase** database every hour.

---

## 🏗️ Workflow Logic (JSON Model)

```json
{
  "name": "BioNatural: Teable to Supabase Sync (Hourly)",
  "nodes": [
    {
      "parameters": {
        "rule": "interval",
        "interval": 1,
        "unit": "hours"
      },
      "name": "Schedule Trigger (Hourly)",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "operation": "list",
        "baseId": "YOUR_TEABLE_BASE_ID",
        "tableId": "YOUR_TEABLE_TABLE_ID",
        "returnAll": true
      },
      "name": "Teable: Fetch Products",
      "type": "n8n-nodes-base.teable",
      "typeVersion": 1,
      "position": [450, 300],
      "credentials": { "teableApi": { "id": "YOUR_TEABLE_CRED_ID" } }
    },
    {
      "parameters": {
        "keepOnlySpecified": true,
        "values": {
          "string": [
            { "name": "Odoo_ID", "value": "={{ $json.fields.Odoo_ID }}" },
            { "name": "name_en", "value": "={{ $json.fields.Name_EN }}" },
            { "name": "name_es", "value": "={{ $json.fields.Name_ES }}" },
            { "name": "price", "value": "={{ $json.fields.Price }}" },
            { "name": "stock", "value": "={{ $json.fields.Stock }}" },
            { "name": "category", "value": "={{ $json.fields.Category }}" },
            { "name": "image_url", "value": "={{ $json.fields.Image_URL }}" }
          ]
        },
        "options": {}
      },
      "name": "Map Teable to Supabase",
      "type": "n8n-nodes-base.set",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://nueuzrkjwsbvnhsrosny.supabase.co/rest/v1/Master_Inventory",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ $json.all() }}",
        "headerParameters": {
          "parameters": [
            { "name": "apikey", "value": "YOUR_SUPABASE_SERVICE_ROLE_KEY" },
            { "name": "Authorization", "value": "Bearer YOUR_SUPABASE_SERVICE_ROLE_KEY" },
            { "name": "Content-Type", "value": "application/json" },
            { "name": "Prefer", "value": "resolution=merge-duplicates,on_conflict=Odoo_ID" }
          ]
        },
        "options": {}
      },
      "name": "Supabase: Safe Bulk Upsert",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [850, 300]
    }
  ],
  "connections": {
    "Schedule Trigger (Hourly)": { "main": [[{ "node": "Teable: Fetch Products", "type": "main", "index": 0 }]] },
    "Teable: Fetch Products": { "main": [[{ "node": "Map Teable to Supabase", "type": "main", "index": 0 }]] },
    "Map Teable to Supabase": { "main": [[{ "node": "Supabase: Safe Bulk Upsert", "type": "main", "index": 0 }]] }
  }
}
```

---

## 🛠️ Setup Instructions

1.  **Teable Node**: Replace `YOUR_TEABLE_BASE_ID` and `YOUR_TEABLE_TABLE_ID` with the IDs from your BioNatural inventory base.
2.  **Mapping Node**: Ensure the field names in Teable match the `fields.Name_EN` etc. pattern.
3.  **Supabase Node**: 
    -   The `Prefer` header is key. It uses the `Odoo_ID` to determine if it should **Update** or **Insert**.
    -   Replace `YOUR_SUPABASE_SERVICE_ROLE_KEY` with the Service Role key you provided earlier.
4.  **Frequency**: Currently set to **1 Hour**. You can shift this to "Instant" by adding a Teable Webhook trigger if you need real-time stock updates.

> [!IMPORTANT]
> Since you have 2,000+ items, the **HTTP Request** node is configured for a bulk sync. It uses Supabase's native REST API for ultra-fast ingestion.
