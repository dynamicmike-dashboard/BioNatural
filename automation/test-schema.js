const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const supabaseUrl = 'https://nueuzrkjwsbvnhsrosny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXV6cmtqd3Nidm5oc3Jvc255Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0OTY3MSwiZXhwIjoyMDkwNzI1NjcxfQ.lpZTwrwz76hH_RKyQzd46RVJn11NW4aPiLL4Qlj3LG4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSchema() {
    const { data: m, error: me } = await supabase.from('Master_Inventory').select('*').limit(1);
    const { data: l, error: le } = await supabase.from('master_inventory').select('*').limit(1);
    
    console.log('--- Case Sensitivity Test ---');
    console.log('Master_Inventory:', me ? me.message : 'OK');
    console.log('master_inventory:', le ? le.message : 'OK');
}
testSchema();
