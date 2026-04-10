const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './apps/web/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const promotions = [
  {
    title_en: "Early Bird Breakfast",
    title_es: "Desayuno Early Bird",
    description_en: "Free coffee with your dish before 11 am Everyday",
    description_es: "Café gratis con tu platillo antes de las 11 am Todos los días",
    day_of_week: "Everyday",
    end_time: "11:00:00"
  },
  {
    title_en: "Dish of the Day",
    title_es: "Platillo del Día",
    description_en: "Drink included (Chef's choice of dish and house drink)",
    description_es: "Bebida incluida (Platillo y bebida de la casa a elección del chef)",
    day_of_week: "Everyday"
  },
  {
    title_en: "Rewards Program",
    title_es: "Programa de Recompensas",
    description_en: "Spend $180+ to get a digital stamp and special gifts",
    description_es: "Compra $180+ y obtén un sello digital y regalos especiales",
    terms_link: "https://app.welcomeback.io/business/32LLGAUM49gT5GSK7gjGUD/download-card/bio_members_gifts_2",
    day_of_week: "Everyday"
  },
  {
    title_en: "Wednesday Ice Cream",
    title_es: "Miércoles de Helado",
    description_en: "2 double scoops for a special price",
    description_es: "2 bolas dobles por un precio especial",
    day_of_week: "Wed"
  },
  {
    title_en: "Hard Kombucha Happy Hour",
    title_es: "Happy Hour de Hard Kombucha",
    description_en: "2 x 250 on Hard Kombucha cocktails from 5 pm to 10 pm",
    description_es: "2 x 250 en cocteles de Hard Kombucha de 5 pm a 10 pm",
    start_time: "17:00:00",
    end_time: "22:00:00",
    day_of_week: "Everyday"
  },
  {
    title_en: "Pure Essence Tuesday",
    title_es: "Martes de Pure Essence",
    description_en: "Buy 1 get 10% off, Buy 2 get 15%, Buy 3 get 20% on any Pure Essence product",
    description_es: "Compra 1 obtén 10% desc, Compra 2 obtén 15%, Compra 3 obtén 20% en cualquier producto Pure Essence",
    day_of_week: "Tue"
  }
];

async function seedPromotions() {
  console.log('🚀 Seeding BioNatural Promotions...');
  const { data, error } = await supabase
    .from('promotions')
    .upsert(promotions, { onConflict: 'title_en' });

  if (error) {
    console.error('❌ Error seeding promotions:', error);
  } else {
    console.log('✅ Promotions seeded successfully!');
  }
}

seedPromotions();
