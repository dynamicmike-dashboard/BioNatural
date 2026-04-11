const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nueuzrkjwsbvnhsrosny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXV6cmtqd3Nidm5oc3Jvc255Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0OTY3MSwiZXhwIjoyMDkwNzI1NjcxfQ.lpZTwrwz76hH_RKyQzd46RVJn11NW4aPiLL4Qlj3LG4';
const supabase = createClient(supabaseUrl, supabaseKey);

const blogPosts = [
    {
        slug: "receta-smoothie-organico",
        title_en: "The Ultimate Organic Green Smoothie Recipe",
        title_es: "La Receta Definitiva del Smoothie Verde Orgánico",
        category: "Recipes",
        excerpt_en: "Fuel your day with our signature blend of local greens, pineapple, and organic superfoods.",
        excerpt_es: "Potencia tu día con nuestra mezcla insignia de vegetales locales, piña y superalimentos orgánicos.",
        content_en: "<h2>Health in a Glass</h2><p>Start your morning with chlorophyll-rich greens. Ingredients: 1 cup Spinach, 1/2 cup Pineapple, 1 tsp Spirulina, and 1 cup Coconut Water.</p>",
        content_es: "<h2>Salud en un Vaso</h2><p>Comienza tu mañana con vegetales ricos en clorofila. Ingredientes: 1 taza de Espinaca, 1/2 taza de Piña, 1 cdta de Espirulina y 1 taza de Agua de Coco.</p>",
        image_url: "https://images.unsplash.com/photo-1543362906-acfc16c623a2?auto=format&fit=crop&q=80&w=800"
    },
    {
        slug: "beneficios-espirulina",
        title_en: "Spirulina: The Blue-Green Miracle of the Tropics",
        title_es: "Espirulina: El Milagro Verde-Azul del Trópico",
        category: "Nutrition",
        excerpt_en: "Discover why this ancient superfood is essential for living in Playa del Carmen's humid climate.",
        excerpt_es: "Descubre por qué este superalimento ancestral es esencial para vivir en el clima húmedo de Playa del Carmen.",
        content_en: "<h2>Ancient Vitality</h2><p>Spirulina is one of the most nutrient-dense foods on the planet, offering a high concentration of plant-based protein and B vitamins.</p>",
        content_es: "<h2>Vitalidad Ancestral</h2><p>La espirulina es uno de los alimentos más densos en nutrientes del planeta, ofreciendo una alta concentración de proteína vegetal y vitaminas del complejo B.</p>",
        image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"
    }
];

async function seedBlog() {
    console.log('📖 Re-seeding Blog Posts for SEO...');
    // Delete old ones to ensure fresh start
    await supabase.from('blog_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const { error } = await supabase.from('blog_posts').insert(blogPosts);
    if (error) console.error('❌ Blog Seed Failed:', error.message);
    else console.log('✅ Blog Posts Refreshed.');
}

seedBlog();
