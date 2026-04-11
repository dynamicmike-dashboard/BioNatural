const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://nueuzrkjwsbvnhsrosny.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXV6cmtqd3Nidm5oc3Jvc255Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0OTY3MSwiZXhwIjoyMDkwNzI1NjcxfQ.lpZTwrwz76hH_RKyQzd46RVJn11NW4aPiLL4Qlj3LG4';
const supabase = createClient(supabaseUrl, supabaseKey);

const products_72 = [
    { Odoo_ID: "BN-001", name_en: "Chlorophyll", name_es: "Clorofila", benefits_en: ["Supports natural detox", "May help with bad breath"], issues_en: ["Bloating", "Detox", "Bad Breath"], category: "Suplementos" },
    { Odoo_ID: "BN-002", name_en: "Spirulina", name_es: "Espirulina", benefits_en: ["Natural nutrient source", "Supports energy"], issues_en: ["Fatigue", "Energy", "Nutrition"], category: "Suplementos" },
    { Odoo_ID: "BN-003", name_en: "Vitamin C", name_es: "Vitamina C", benefits_en: ["Supports immune system", "Helps collagen"], issues_en: ["Immunity", "Recuperación", "Oxidative Stress"], category: "Suplementos" },
    { Odoo_ID: "BN-004", name_en: "GABA", name_es: "GABA", benefits_en: ["May promote relaxation", "Supports sleep quality"], issues_en: ["Stress", "Light Sleep", "Nervous Tension"], category: "Suplementos" },
    { Odoo_ID: "BN-005", name_en: "Maca", name_es: "Maca", benefits_en: ["Supports vitality", "Hormonal balance"], issues_en: ["Vitality", "Physical Stress", "Hormonal Imbalance"], category: "Superfoods" },
    { Odoo_ID: "BN-006", name_en: "Ashwagandha", name_es: "Ashwagandha", benefits_en: ["Adaptogen", "Stress management"], issues_en: ["Stress", "Burnout", "Anxiety"], category: "Suplementos" },
    { Odoo_ID: "BN-007", name_en: "Lion's Mane", name_es: "Melena de León", benefits_en: ["Supports focus", "Mental clarity"], issues_en: ["Brain Fog", "Focus", "Mental Fatigue"], category: "Suplementos" },
    { Odoo_ID: "BN-008", name_en: "Magnesium Glycinate", name_es: "Glicinato de Magnesio", benefits_en: ["Supports muscle relaxation", "Promotes better sleep"], issues_en: ["Muscle Cramps", "Sleep Issues", "Anxiety"], category: "Minerales" },
    { Odoo_ID: "BN-009", name_en: "Reishi", name_es: "Reishi", benefits_en: ["Immune support", "Promotes calm"], issues_en: ["Stress", "Immunity", "Sleep"], category: "Superfoods" },
    { Odoo_ID: "BN-010", name_en: "Omega 3", name_es: "Omega 3", benefits_en: ["Supports heart health", "Brain function"], issues_en: ["Inflammation", "Heart Health", "Mental Focus"], category: "Suplementos" },
    { Odoo_ID: "BN-011", name_en: "Menopause Support", name_es: "Apoyo Menopausia", benefits_en: ["Hormonal balance", "Hot flashes support"], issues_en: ["Hormonal Changes", "Hot Flashes", "Sleep"], category: "Salud Mujer" },
    { Odoo_ID: "BN-012", name_en: "Detox Clay", name_es: "Arcilla Detox", benefits_en: ["Skin health", "Deep cleansing"], issues_en: ["Skin Impurities", "Acne", "Detox"], category: "Cuidado Personal" },
    { Odoo_ID: "BN-013", name_en: "Wheatgrass", name_es: "Pasto de Trigo", benefits_en: ["Energy boost", "Chlorophyll source"], issues_en: ["Low Energy", "Detox", "Nutrient Deficiency"], category: "Superfoods" },
    { Odoo_ID: "BN-014", name_en: "Moringa", name_es: "Moringa", benefits_en: ["Rich in nutrients", "Antioxidant support"], issues_en: ["Malnutrition", "Energy", "Immunity"], category: "Superfoods" },
    { Odoo_ID: "BN-015", name_en: "Chlorella", name_es: "Chlorella", benefits_en: ["Heavy metal detox", "Source of iron"], issues_en: ["Detox", "Anemia", "Immunity"], category: "Superfoods" },
    { Odoo_ID: "BN-016", name_en: "Bee Pollen", name_es: "Polen de Abeja", benefits_en: ["Immune support", "Natural energy"], issues_en: ["Allergies", "Low Energy", "Immunity"], category: "Pantry" },
    { Odoo_ID: "BN-017", name_en: "Organic Honey", name_es: "Miel Orgánica", benefits_en: ["Sore throat relief", "Antibacterial properties"], issues_en: ["Cough", "Sore Throat", "Wound Care"], category: "Pantry" },
    { Odoo_ID: "BN-018", name_en: "Apple Cider Vinegar", name_es: "Vinagre de Sidra de Manzana", benefits_en: ["Supports digestion", "Blood sugar management"], issues_en: ["Bloating", "Acid Reflux", "Weight Management"], category: "Pantry" },
    { Odoo_ID: "BN-019", name_en: "Aloe Vera Gel", name_es: "Gel de Aloe Vera", benefits_en: ["Soothes skin", "Hydrating"], issues_en: ["Sunburn", "Dry Skin", "Inflammation"], category: "Cuidado Personal" },
    { Odoo_ID: "BN-020", name_en: "Ginger", name_es: "Jengibre", benefits_en: ["Nausea relief", "Anti-inflammatory"], issues_en: ["Nausea", "Digestión", "Inflammation"], category: "Pantry" },
    { Odoo_ID: "BN-021", name_en: "Turmeric Powder", name_es: "Cúrcuma en Polvo", benefits_en: ["Anti-inflammatory", "Joint support"], issues_en: ["Joint Pain", "Inflammation", "Digestion"], category: "Especia" },
    { Odoo_ID: "BN-022", name_en: "Curcumin", name_es: "Curcumina", benefits_en: ["Potent anti-inflammatory", "Antioxidant"], issues_en: ["Chronic Pain", "Inflammation", "Brain Health"], category: "Suplementos" },
    { Odoo_ID: "BN-023", name_en: "Methyl B-12", name_es: "B-12 Metilcobalamina", benefits_en: ["Energy levels", "Nervous system support"], issues_en: ["Fatigue", "Mood", "Anemia"], category: "Suplementos" },
    { Odoo_ID: "BN-024", name_en: "D3 + K2", name_es: "Vitamina D3 + K2", benefits_en: ["Bone health", "Immune support"], issues_en: ["Vitamin D Deficiency", "Bone Density", "Low Immunity"], category: "Suplementos" },
    { Odoo_ID: "BN-025", name_en: "Probiotics", name_es: "Probióticos", benefits_en: ["Gut health", "Immune system"], issues_en: ["Bloating", "Constipation", "Antibiotic Recovery"], category: "Suplementos" },
    { Odoo_ID: "BN-026", name_en: "Digestive Enzymes", name_es: "Enzimas Digestivas", benefits_en: ["Helps breakdown food", "Reduces gas"], issues_en: ["Bloating", "Indigestion", "Gas"], category: "Suplementos" },
    { Odoo_ID: "BN-027", name_en: "L-Glutamine", name_es: "L-Glutamina", benefits_en: ["Supports gut lining", "Muscle recovery"], issues_en: ["Leaky Gut", "Muscle Soreness", "Immunity"], category: "Suplementos" },
    { Odoo_ID: "BN-028", name_en: "Activated Charcoal", name_es: "Carbón Activado", benefits_en: ["Toxin removal", "Gas relief"], issues_en: ["Gas", "Bloating", "Detox"], category: "Suplementos" },
    { Odoo_ID: "BN-029", name_en: "Milk Thistle", name_es: "Cardo Mariano", benefits_en: ["Liver support", "Detoxification"], issues_en: ["Liver Health", "Alcohol Detox", "Skin Health"], category: "Suplementos" },
    { Odoo_ID: "BN-030", name_en: "Quercetin", name_es: "Quercetina", benefits_en: ["Natural antihistamine", "Antioxidant"], issues_en: ["Allergies", "Inflammation", "Immunity"], category: "Suplementos" },
    { Odoo_ID: "BN-031", name_en: "Elderberry", name_es: "Saúco", benefits_en: ["Fights cold/flu", "Immune boost"], issues_en: ["Cold", "Flu", "Immunity"], category: "Suplementos" },
    { Odoo_ID: "BN-032", name_en: "Zinc Picolinate", name_es: "Picolinato de Zinc", benefits_en: ["Immune system", "Skin health"], issues_en: ["Acne", "Immunity", "Wound Healing"], category: "Minerales" },
    { Odoo_ID: "BN-033", name_en: "Iron Bisglycinate", name_es: "Bisglicinato de Hierro", benefits_en: ["Non-constipating iron", "Energy levels"], issues_en: ["Anemia", "Fatigue", "Low Energy"], category: "Minerales" },
    { Odoo_ID: "BN-034", name_en: "Biotin", name_es: "Biotina", benefits_en: ["Hair and nail health", "Metabolism support"], issues_en: ["Hair Loss", "Brittle Nails", "Metabolism"], category: "Vitaminas" },
    { Odoo_ID: "BN-035", name_en: "Hyaluronic Acid", name_es: "Ácido Hialurónico", benefits_en: ["Skin hydration", "Joint lubrication"], issues_en: ["Dry Skin", "Joint Paid", "Anti-aging"], category: "Cuidado Personal" },
    { Odoo_ID: "BN-036", name_en: "Tea Tree Oil", name_es: "Aceite de Árbol de Té", benefits_en: ["Antiseptic", "Skin clearing"], issues_en: ["Acne", "Fungal Infections", "First Aid"], category: "Aceite Esencial" },
    { Odoo_ID: "BN-037", name_en: "Lavender Oil", name_es: "Aceite de Lavanda", benefits_en: ["Promotes relaxation", "Skin soothing"], issues_en: ["Stress", "Insomnia", "Minor Burns"], category: "Aceite Esencial" },
    { Odoo_ID: "BN-038", name_en: "Eucalyptus Oil", name_es: "Aceite de Eucalipto", benefits_en: ["Clears respiratory tract", "Refreshing"], issues_en: ["Congestion", "Cough", "Muscle Pain"], category: "Aceite Esencial" },
    { Odoo_ID: "BN-039", name_en: "Peppermint Oil", name_es: "Aceite de Menta", benefits_en: ["Headache relief", "Digestive support"], issues_en: ["Headache", "Nausea", "Focus"], category: "Aceite Esencial" },
    { Odoo_ID: "BN-040", name_en: "Extra Virgin Coconut Oil", name_es: "Aceite de Coco Extra Virgen", benefits_en: ["Healthy fats", "Skincare"], issues_en: ["Dry Skin", "Cooking", "Metabolism"], category: "Pantry" },
    { Odoo_ID: "BN-041", name_en: "Almond Flour", name_es: "Harina de Almendra", benefits_en: ["Low carb", "Gluten free"], issues_en: ["Weight Management", "Gluten Sensitivity", "Keto"], category: "Pantry" },
    { Odoo_ID: "BN-042", name_en: "Monk Fruit", name_es: "Fruta del Monje", benefits_en: ["Zero calorie sweetener", "Low glycemic"], issues_en: ["Diabetes", "Sugar Cravings", "Weight Loss"], category: "Pantry" },
    { Odoo_ID: "BN-043", name_en: "Stevia Drops", name_es: "Gotas de Stevia", benefits_en: ["Natural sweetener", "No calories"], issues_en: ["Sugar Intake", "Diabetes", "Keto"], category: "Pantry" },
    { Odoo_ID: "BN-044", name_en: "MCT Oil", name_es: "Aceite MCT", benefits_en: ["Cognitive support", "Quick energy"], issues_en: ["Brain Fog", "Low Energy", "Keto"], category: "Suplementos" },
    { Odoo_ID: "BN-045", name_en: "Ginseng Complex", name_es: "Complejo de Ginseng", benefits_en: ["Focus and energy", "Immune support"], issues_en: ["Fatigue", "Poor Focus", "Immunity"], category: "Suplementos" },
    { Odoo_ID: "BN-046", name_en: "Rhodiola Rosea", name_es: "Rhodiola Rosea", benefits_en: ["Adaptogen for stress", "Energy"], issues_en: ["Stress", "Burnout", "Physical Performance"], category: "Suplementos" },
    { Odoo_ID: "BN-047", name_en: "Holy Basil (Tulsi)", name_es: "Albahaca Sagrada", benefits_en: ["Stress relief", "Respiratory support"], issues_en: ["Stress", "Anxiety", "Immunity"], category: "Suplementos" },
    { Odoo_ID: "BN-048", name_en: "Bacopa Monnieri", name_es: "Bacopa Monnieri", benefits_en: ["Memory support", "Cognitive health"], issues_en: ["Poor Memory", "Focus", "Study Support"], category: "Suplementos" },
    { Odoo_ID: "BN-049", name_en: "Cordyceps Mushroom", name_es: "Hongo Cordyceps", benefits_en: ["Stamina and energy", "Lung health"], issues_en: ["Athletic Performance", "Fatigue", "Respiratory Support"], category: "Superfoods" },
    { Odoo_ID: "BN-050", name_en: "Turkey Tail", name_es: "Cola de Pavo", benefits_en: ["Potent immune support", "Gut health"], issues_en: ["Low Immunity", "Infection Recovery", "Digestive Health"], category: "Superfoods" },
    { Odoo_ID: "BN-051", name_en: "Shiitake Extract", name_es: "Extracto de Shiitake", benefits_en: ["Immune system", "Skin health"], issues_en: ["Immunity", "Inflammation", "Heart Health"], category: "Superfoods" },
    { Odoo_ID: "BN-052", name_en: "Maitake Mushroom", name_es: "Hongo Maitake", benefits_en: ["Blood sugar support", "Immunity"], issues_en: ["Diabetes", "Energy", "Immune Defense"], category: "Superfoods" },
    { Odoo_ID: "BN-053", name_en: "Valerian Root", name_es: "Raíz de Valeriana", benefits_en: ["Promotes deep sleep", "Relaxes muscles"], issues_en: ["Insomnia", "Muscle Tension", "Anxiety"], category: "Herbolaria" },
    { Odoo_ID: "BN-054", name_en: "Melatonin 3mg", name_es: "Melatonina 3mg", benefits_en: ["Sleep cycle regulator", "Restful sleep"], issues_en: ["Jet Lag", "Insomnia", "Sleep Cycles"], category: "Suplementos" },
    { Odoo_ID: "BN-055", name_en: "Passionflower", name_es: "Pasiflora", benefits_en: ["Calming effect", "Nervous system support"], issues_en: ["Anxiety", "Restlessness", "Stress"], category: "Herbolaria" },
    { Odoo_ID: "BN-056", name_en: "Lemon Balm", name_es: "Toronjil", benefits_en: ["Mood support", "Digestive calm"], issues_en: ["Stress", "Mild Depression", "Indigestion"], category: "Herbolaria" },
    { Odoo_ID: "BN-057", name_en: "Chamomile Tea", name_es: "Té de Manzanilla", benefits_en: ["Digestive aid", "Promotes sleep"], issues_en: ["Indigestion", "Stress", "Sleep Difficulty"], category: "Beverage" },
    { Odoo_ID: "BN-058", name_en: "Senna Leaves", name_es: "Hojas de Sen", benefits_en: ["Natural laxative", "Detox support"], issues_en: ["Constipation", "Detox", "Bloating"], category: "Herbolaria" },
    { Odoo_ID: "BN-059", name_en: "Psyllium Husk", name_es: "Cáscara de Psyllium", benefits_en: ["Fiber source", "Heart health"], issues_en: ["Constipation", "Digestive Regularity", "Cholesterol"], category: "Pantry" },
    { Odoo_ID: "BN-060", name_en: "Brewer's Yeast", name_es: "Levadura de Cerveza", benefits_en: ["B-vitamins", "Energy"], issues_en: ["Lactation Support", "Fatigue", "Skin/Hair"], category: "Pantry" },
    { Odoo_ID: "BN-061", name_en: "Camu Camu Powder", name_es: "Calmu Camu en Polvo", benefits_en: ["Extreme Vitamin C", "Immunity"], issues_en: ["Immunity", "Skin Glow", "Oxidative Stress"], category: "Superfoods" },
    { Odoo_ID: "BN-062", name_en: "Acerola Cherry", name_es: "Cereza Acerola", benefits_en: ["Natural Vitamin C", "Immune support"], issues_en: ["Cold/Flu", "Skin Vitality", "Immunity"], category: "Superfoods" },
    { Odoo_ID: "BN-063", name_en: "Nutritional Yeast", name_es: "Levadura Nutricional", benefits_en: ["Cheese alternative", "Vitamin B complex"], issues_en: ["Vegan Diet", "Low Energy", "Nervous System"], category: "Pantry" },
    { Odoo_ID: "BN-064", name_en: "Hemp Seeds", name_es: "Semillas de Hemp", benefits_en: ["Omega 3 and 6", "Plant protein"], issues_en: ["Inflammation", "Muscle Build", "Heart Health"], category: "Pantry" },
    { Odoo_ID: "BN-065", name_en: "Chia Seeds", name_es: "Semillas de Chía", benefits_en: ["High fiber", "Omega 3"], issues_en: ["Constipation", "Energy", "Heart Health"], category: "Pantry" },
    { Odoo_ID: "BN-066", name_en: "Golden Milk Mix", name_es: "Mezcla Leche Dorada", benefits_en: ["Anti-inflammatory", "Digestive support"], issues_en: ["Joint Pain", "Inflammation", "Nightly Routine"], category: "Beverage" },
    { Odoo_ID: "BN-067", name_en: "Matcha Tea Ceremonial", name_es: "Matcha Ceremonial", benefits_en: ["Calm alertness", "Metabolism boost"], issues_en: ["Focus", "Coffee Substitute", "Weight Management"], category: "Beverage" },
    { Odoo_ID: "BN-068", name_en: "Pau d'Arco", name_es: "Palo de Arco", benefits_en: ["Antifungal support", "Immunity"], issues_en: ["Candida", "Infection Defense", "Immunity"], category: "Herbolaria" },
    { Odoo_ID: "BN-069", name_en: "Garlic Extract", name_es: "Extracto de Ajo", benefits_en: ["Heart health", "Natural antibiotic"], issues_en: ["Cholesterol", "Immunity", "Blood Pressure"], category: "Suplementos" },
    { Odoo_ID: "BN-070", name_en: "Oregano Oil Capsules", name_es: "Aceite de Orégano", benefits_en: ["Potent antibacterial", "Immune boost"], issues_en: ["Bacterial Infection", "Immunity", "Gut Health"], category: "Suplementos" },
    { Odoo_ID: "BN-071", name_en: "Silica", name_es: "Sílice", benefits_en: ["Hair, skin, and nails", "Connective tissue"], issues_en: ["Brittle Hair", "Weak Nails", "Skin Aging"], category: "Minerales" },
    { Odoo_ID: "BN-072", name_en: "Ginkgo Biloba", name_es: "Ginkgo Biloba", benefits_en: ["Focus and circulation", "Memory Support"], issues_en: ["Memory", "Brain Focus", "Poor Circulation"], category: "Suplementos" }
];

async function comprehensiveSync() {
    console.log('🚀 Starting COMPREHENSIVE BioNatural Data Sync...');

    // 1. Map 72 Hi-Fi Products (Deduplicated)
    const productRecords = products_72.map(p => ({
        odoo_id: p.Odoo_ID,
        name_en: p.name_en,
        name_es: p.name_es,
        description_en: `BENEFITS: ${p.benefits_en.join(', ')} | RECOMMENDED FOR: ${p.issues_en.join(', ')}.`,
        description_es: `BENEFICIOS: ${p.benefits_en.map(b => b + ' (en)').join(', ')} | RECOMENDADO PARA: ${p.issues_en.map(i => i + ' (en)').join(', ')}.`,
        price: 0,
        category: p.category,
        is_restaurant_item: false,
        updated_at: new Date()
    }));

    // 2. Map 480+ Menu Items (Deduplicated)
    const menuItems = JSON.parse(fs.readFileSync('./automation/data/menu_extraction.json', 'utf8'));
    const menuRecords = menuItems.map(m => {
        let category = 'Gourmet Selection';
        const name = m.name_en.toUpperCase();
        if (name.includes('HUEVO') || name.includes('CHILAQUILE') || name.includes('BREAKFAST') || name.includes('HOTCAKE') || name.includes('TOSTADA') || name.includes('BOWL')) {
            category = 'Desayunos';
        }
        if (name.includes('TACO') || name.includes('PASTOR') || name.includes('ENCHILADA') || name.includes('GRINGA')) {
            category = 'Tacos Veganos';
        }
        return {
            odoo_id: m.odoo_id,
            name_en: m.name_en,
            name_es: m.name_en,
            description_en: m.description_en,
            price: m.price || 0,
            category: category,
            is_restaurant_item: true,
            image_url: m.image_url || null,
            updated_at: new Date()
        };
    });

    // Deduplicate by odoo_id
    const allRecords = [...productRecords, ...menuRecords];
    const uniqueRecordsMap = new Map();
    allRecords.forEach(r => uniqueRecordsMap.set(r.odoo_id, r));
    const finalRecords = Array.from(uniqueRecordsMap.values());

    console.log(`📊 Ingesting total of ${finalRecords.length} unique records into master_inventory...`);

    const chunkSize = 50;
    for (let i = 0; i < finalRecords.length; i += chunkSize) {
        const chunk = finalRecords.slice(i, i + chunkSize);
        const { error } = await supabase
            .from('master_inventory')
            .upsert(chunk, { onConflict: 'odoo_id' });

        if (error) {
            console.error(`❌ Batch ${i/chunkSize + 1} failed:`, error.message);
        } else {
            console.log(`✅ Batch ${i/chunkSize + 1} (${chunk.length} items) synced.`);
        }
    }

    console.log('✨ Data Sync Sequence Complete.');
}

comprehensiveSync();
