const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nueuzrkjwsbvnhsrosny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXV6cmtqd3Nidm5oc3Jvc255Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0OTY3MSwiZXhwIjoyMDkwNzI1NjcxfQ.lpZTwrwz76hH_RKyQzd46RVJn11NW4aPiLL4Qlj3LG4';
const supabase = createClient(supabaseUrl, supabaseKey);

const blogPosts = [
    {
        slug: "receta-smoothie-organico",
        title_en: "Recipe: Organic Green Smoothie",
        title_es: "Receta: Smoothie Verde Orgánico",
        category: "Recipes",
        excerpt_en: "Learn how to make the signature BioNatural green smoothie at home for a morning energy boost.",
        excerpt_es: "Aprende a preparar el smoothie verde insignia de BioNatural en casa para un impulso de energía por la mañana.",
        content_en: "<h1>Organic Green Smoothie</h1><p>Our signature smoothie is packed with chlorophyll and superfoods. Ingredients: Spinach, Kale, Pineapple, Ginger, and Chlorophyll drops.</p>",
        content_es: "<h1>Smoothie Verde Orgánico</h1><p>Nuestro smoothie insignia está cargado de clorofila y superalimentos. Ingredientes: Espinaca, Kale, Piña, Jengibre y gotas de Clorofila.</p>",
        image_url: "https://images.unsplash.com/photo-1610970882739-a69c1693c730?auto=format&fit=crop&q=80&w=800"
    },
    {
        slug: "beneficios-espirulina",
        title_en: "The Benefits of Spirulina",
        title_es: "Beneficios de la Espirulina",
        category: "Nutrition",
        excerpt_en: "Discover why this blue-green algae is considered one of the most nutrient-dense foods on Earth.",
        excerpt_es: "Descubre por qué esta alga verde-azul es considerada uno de los alimentos más densos en nutrientes de la Tierra.",
        content_en: "<h2>Energy and Detox</h2><p>Spirulina provides sustainable energy without the crash. It is rich in protein and B vitamins.</p>",
        content_es: "<h2>Energía y Detox</h2><p>La espirulina proporciona energía sostenible sin bajones. Es rica en proteínas y vitaminas del grupo B.</p>",
        image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"
    }
];

async function seedBlog() {
    console.log('📖 Seeding Blog Posts...');
    const { error } = await supabase.from('blog_posts').upsert(blogPosts, { onConflict: 'slug' });
    if (error) console.error('❌ Blog Seed Failed:', error.message);
    else console.log('✅ Blog Posts Ready.');
}

seedBlog();
