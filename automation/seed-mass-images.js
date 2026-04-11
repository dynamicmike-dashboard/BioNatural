const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://nueuzrkjwsbvnhsrosny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXV6cmtqd3Nidm5oc3Jvc255Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0OTY3MSwiZXhwIjoyMDkwNzI1NjcxfQ.lpZTwrwz76hH_RKyQzd46RVJn11NW4aPiLL4Qlj3LG4';
const supabase = createClient(supabaseUrl, supabaseKey);

const fixes = [
    { odoo_id: 'BN-002', name: 'Spirulina', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800', price: 450 },
    { odoo_id: 'BN-004', name: 'Magnesium', img: 'https://images.unsplash.com/photo-1584017947476-c3f131bb4704?auto=format&fit=crop&q=80&w=800', price: 320 },
    { odoo_id: 'BN-006', name: 'Melatonin', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800', price: 290 },
    { odoo_id: 'BN-001', name: 'Chlorophyll', img: 'https://images.unsplash.com/photo-1611073229767-172901a88481?auto=format&fit=crop&q=80&w=800', price: 380 },
    { odoo_id: 'BN-015', name: 'Bentonite Clay', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800', price: 180 },
    { odoo_id: 'BN-CBD-01', name: 'CBD Oil 1000mg', img: 'https://images.unsplash.com/photo-1588600036302-2dbe7642647c?auto=format&fit=crop&q=80&w=800', price: 1200 }
];

async function seedImagery() {
    console.log('🖼️ Seeding Mass Imagery & Prices...');
    for (const item of fixes) {
       const { error } = await supabase.from('master_inventory').update({ image_url: item.img, price: item.price }).eq('odoo_id', item.odoo_id);
       if (error) console.error(`Failed ${item.name}:`, error.message);
       else console.log(`✅ ${item.name} updated.`);
    }
}
seedImagery();
