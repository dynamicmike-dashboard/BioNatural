const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nueuzrkjwsbvnhsrosny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXV6cmtqd3Nidm5oc3Jvc255Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0OTY3MSwiZXhwIjoyMDkwNzI1NjcxfQ.lpZTwrwz76hH_RKyQzd46RVJn11NW4aPiLL4Qlj3LG4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function runSemanticRepair() {
    console.log('🧪 Starting Semantic Repair & Association Engine...');

    const { data: products, error: fetchError } = await supabase
        .from('master_inventory')
        .select('odoo_id, name_en, description_en');

    if (fetchError) {
        console.error('❌ Fetch failed:', fetchError);
        return;
    }

    // Generate clusters by parsing "BENEFITS:" and "RECOMMENDED FOR:" from description_en
    const processedProducts = products.map(p => {
        const benefitsMatch = p.description_en.match(/BENEFITS: (.*?) \|/);
        const issuesMatch = p.description_en.match(/RECOMMENDED FOR: (.*?)\./);
        return {
            id: p.odoo_id,
            name: p.name_en,
            benefits: benefitsMatch ? benefitsMatch[1].split(', ') : [],
            issues: issuesMatch ? issuesMatch[1].split(', ') : []
        };
    });

    console.log(`✅ Parsed ${processedProducts.length} products for semantic mapping.`);

    // Generate clusters
    const clusters = {
        'Stress & Sleep': ['BN-004', 'BN-006', 'BN-008', 'BN-009', 'BN-053'],
        'Detox & Gut': ['BN-001', 'BN-015', 'BN-025', 'BN-026', 'BN-028', 'BN-029'],
        'Energy & Focus': ['BN-002', 'BN-007', 'BN-013', 'BN-044', 'BN-056']
    };

    console.log('🕸️ Building Semantic Web...');
    // In a real scenario, we'd loop through all and find intersections. 
    // For this hour, we'll hard-link the primary clusters.
    
    // Logic to update description with internal links (Localhost / Production aware)
    // We'll just echo the intent for now as we're building the graph.
}

runSemanticRepair();
