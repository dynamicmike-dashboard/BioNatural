const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './apps/web/.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function generateSocialCalendar() {
    console.log('🗓️ Starting 30-Day Social Media Factory...');
    
    // 1. Fetch top products
    const { data: products, error } = await supabase
        .from('Master_Inventory')
        .select('*')
        .limit(30);

    if (error) {
        console.error('❌ Error fetching products:', error);
        return;
    }

    console.log(`📡 Found ${products.length} products to generate content for.`);

    // 2. Map to social calendar format (Simulation of AI generation)
    const calendarEntries = products.map((product, index) => {
        const publishDate = new Date();
        publishDate.setDate(publishDate.getDate() + index + 1);

        return {
            publish_date: publishDate.toISOString().split('T')[0],
            product_id: product.Odoo_ID,
            caption_en: `🌿 Discover the power of ${product.name_en}! \n\nTraditionally recommended for its incredible natural properties, this may support your wellness journey. It is known to help with ${product.category}. \n\n🛒 Shop local, shop organic: ${product.image_url || 'https://bio-natural.mx/tienda'}`,
            caption_es: `🌿 ¡Descubre el poder de ${product.name_es || product.name_en}! \n\nTradicionalmente recomendado por sus increíbles propiedades naturales, este producto puede apoyar tu camino al bienestar. Conocido por ayudar en ${product.category}. \n\n🛒 Compra local, compra orgánico: ${product.image_url || 'https://bio-natural.mx/tienda'}`,
            image_prompt: `Professional lifestyle photography of ${product.name_en} in a bright, organic wellness setting in Playa del Carmen, soft tropical lighting, high-end commercial feel.`,
            status: 'draft',
            platform: 'instagram'
        };
    });

    // 3. Upsert into social_calendar
    const { error: upsertError } = await supabase
        .from('social_calendar')
        .upsert(calendarEntries, { onConflict: 'publish_date' });

    if (upsertError) {
        console.error('❌ Error saving calendar:', upsertError);
    } else {
        console.log(`✅ Successfully generated 30 days of content in social_calendar table!`);
    }
}

generateSocialCalendar();
