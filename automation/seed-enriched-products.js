const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: './apps/web/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedEnrichedProducts() {
  console.log('🚀 Loading Enriched Product Data...');
  const rawData = fs.readFileSync('./automation/data/enriched_products.json');
  const products = JSON.parse(rawData);

  console.log(`📦 Preparing to seed ${products.length} high-fidelity products...`);

  const { data, error } = await supabase
    .from('Master_Inventory')
    .upsert(products, { onConflict: 'Odoo_ID' });

  if (error) {
    console.error('❌ Error seeding enriched products:', error);
  } else {
    console.log('✅ Enriched products seeded successfully!');
    console.log('✨ Benefits and Diagnostic Issues mapped.');
  }
}

seedEnrichedProducts();
