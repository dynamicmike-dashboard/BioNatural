const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://nueuzrkjwsbvnhsrosny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXV6cmtqd3Nidm5oc3Jvc255Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0OTY3MSwiZXhwIjoyMDkwNzI1NjcxfQ.lpZTwrwz76hH_RKyQzd46RVJn11NW4aPiLL4Qlj3LG4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkShop() {
    const { data, count } = await supabase.from('master_inventory').select('*', { count: 'exact' }).eq('is_restaurant_item', false);
    console.log('Shop items count:', count);
    if (data && data.length > 0) console.log('Sample Shop item:', data[0]);
}
checkShop();
