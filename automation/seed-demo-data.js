const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './apps/web/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const demoProducts = [
  {
    Odoo_ID: 'BN-VID-COL',
    sku: 'VID-001',
    name_en: 'Vidanat Collagen Powder',
    name_es: 'Colágeno Vidanat en Polvo',
    description_en: 'Premium hydrolyzed collagen for skin and joint health.',
    description_es: 'Colágeno hidrolizado premium para la salud de la piel y las articulaciones.',
    price: 450,
    category: 'Suplementos',
    image_url: 'https://images.unsplash.com/photo-1626202346584-c77aa97a9508?auto=format&fit=crop&q=80&w=400',
    location_id: '1',
    is_restaurant_item: false
  },
  {
    Odoo_ID: 'BN-BRG-ACV',
    sku: 'BRG-002',
    name_en: "Bragg's Apple Cider Vinegar",
    name_es: 'Vinagre de Sidra de Manzana Braggs',
    description_en: 'Organic, raw, unfiltered ACV with the Mother.',
    description_es: 'Vinagre de sidra de manzana orgánico, crudo y sin filtrar con la madre.',
    price: 280,
    category: 'Especialidades',
    image_url: 'https://images.unsplash.com/photo-1612450702157-124b6f790c88?auto=format&fit=crop&q=80&w=400',
    location_id: '1',
    is_restaurant_item: false
  },
  {
    Odoo_ID: 'BN-BDM-PRO',
    sku: 'BDM-003',
    name_en: 'Birdman Falcon Protein',
    name_es: 'Proteína Birdman Falcon',
    description_en: 'Plant-based organic protein powder vanilla flavor.',
    description_es: 'Proteína orgánica a base de plantas sabor vainilla.',
    price: 890,
    category: 'Suplementos',
    image_url: 'https://images.unsplash.com/photo-1593095191070-9a483b1c5fd7?auto=format&fit=crop&q=80&w=400',
    location_id: '1',
    is_restaurant_item: false
  },
  {
    Odoo_ID: 'BN-RES-TCO',
    sku: 'MENU-001',
    name_en: 'Legendary Vegan Tacos',
    name_es: 'Tacos Veganos Legendarios',
    description_en: 'Playa del Carmen\'s famous soy-free tacos with homemade tortillas.',
    description_es: 'Los famosos tacos de Playa sin soya con tortillas hechas a mano.',
    price: 180,
    category: 'Tacos Veganos',
    image_url: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=400',
    location_id: '1',
    is_restaurant_item: true
  }
];

async function seed() {
  console.log('🌱 Seeding demo data into Master_Inventory...');
  
  const { data, error } = await supabase
    .from('Master_Inventory')
    .upsert(demoProducts, { onConflict: 'Odoo_ID' });

  if (error) {
    console.error('❌ Error seeding data:', error.message);
  } else {
    console.log('✅ Successfully seeded demo products!');
  }
}

seed();
