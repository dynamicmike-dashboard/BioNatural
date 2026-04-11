const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://nueuzrkjwsbvnhsrosny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXV6cmtqd3Nidm5oc3Jvc255Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0OTY3MSwiZXhwIjoyMDkwNzI1NjcxfQ.lpZTwrwz76hH_RKyQzd46RVJn11NW4aPiLL4Qlj3LG4';
const supabase = createClient(supabaseUrl, supabaseKey);

const additions = [
    // JUICE BAR
    {
        odoo_id: 'REST-JUICE-DETO',
        name_en: 'Detox Juice',
        name_es: 'Jugo Detox',
        description_en: 'Refreshing green juice with apple, celery, cucumber, and ginger.',
        description_es: 'Refrescante jugo verde con manzana, apio, pepino y jengibre.',
        price: 95,
        category: 'Juice Bar',
        is_restaurant_item: true,
        image_url: 'https://images.unsplash.com/photo-1610970882739-a69c1693c730?auto=format&fit=crop&q=80&w=800'
    },
    {
        odoo_id: 'REST-JUICE-ENER',
        name_en: 'Energy Surge',
        name_es: 'Impulso de Energía',
        description_en: 'Orange, carrot, and turmeric for a morning boost.',
        description_es: 'Naranja, zanahoria y cúrcuma para un impulso matutino.',
        price: 95,
        category: 'Juice Bar',
        is_restaurant_item: true,
        image_url: 'https://images.unsplash.com/photo-1595981267035-21045a8629f8?auto=format&fit=crop&q=80&w=800'
    },
    // BOWLS
    {
        odoo_id: 'REST-BOWL-QUIN',
        name_en: 'Quinoa Goddess Bowl',
        name_es: 'Bowl Diosa de Quinoa',
        description_en: 'Tricolor quinoa, avocado, chickpeas, and tahini dressing.',
        description_es: 'Quinoa tricolor, aguacate, garbanzos y aderezo de tahini.',
        price: 185,
        category: 'Bowls',
        is_restaurant_item: true,
        image_url: 'https://images.unsplash.com/photo-1543362906-acfc16c623a2?auto=format&fit=crop&q=80&w=800'
    },
    // HERO SHOP ITEMS (Updating existing ones)
    {
        odoo_id: 'BN-002', // Spirulina
        name_en: 'Premium Organic Spirulina',
        price: 450,
        image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        is_restaurant_item: false
    },
    {
        odoo_id: 'BN-CHLORO-01', // I'll assume an ID or create one
        name_en: 'Liquid Chlorophyll Drops',
        name_es: 'Clorofila Líquida',
        price: 380,
        image_url: 'https://images.unsplash.com/photo-1611073229767-172901a88481?auto=format&fit=crop&q=80&w=800',
        is_restaurant_item: false,
        category: 'Suplementos'
    }
];

async function seedAdditions() {
    console.log('🚀 Seeding Additions (Juices, Bowls, Shop Heroes)...');
    const { error } = await supabase.from('master_inventory').upsert(additions, { onConflict: 'odoo_id' });
    if (error) console.error('❌ Failed:', error.message);
    else console.log('✅ Success.');
}

seedAdditions();
