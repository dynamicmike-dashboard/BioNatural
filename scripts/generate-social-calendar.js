const fs = require('fs');

const products = [
  { name: "Chlorophyll", es: "Clorofila", benefit: "Deep internal detox and blood oxygenation.", issue: "Bloating / Digestion", keyword: "CHLOROPHYLL" },
  { name: "Spirulina", es: "Espirulina", benefit: "Superfood protein punch for cellular energy.", issue: "Fatigue / Low Energy", keyword: "SPIRULINA" },
  { name: "Vitamin C", es: "Vitamina C", benefit: "High-absorption immunity shield and collagen support.", issue: "Immunity / Skin Health", keyword: "VITAMIN" },
  { name: "GABA", es: "GABA", benefit: "Neural calm for deep restorative sleep.", issue: "Stress / Anxiety", keyword: "GABA" },
  { name: "Maca", es: "Maca", benefit: "Adaptogenic hormone balancer from the Andes.", issue: "Vitality / Mood", keyword: "MACA" },
  { name: "Ashwagandha", es: "Ashwagandha", benefit: "Cortisol-lowering master herb for modern stress.", issue: "Stress / Focus", keyword: "ASHWAGANDHA" },
  { name: "Lion's Mane", es: "Melena de León", benefit: "Neuroprotective focus for elite cognitive performance.", issue: "Brain Fog / Memory", keyword: "LION'S" },
  { name: "Magnesium Glycinate", es: "Glicinato de Magnesio", benefit: "High-bioavailability muscle recovery and relaxation.", issue: "Muscle Cramps / Sleep", keyword: "MAGNESIUM" },
  { name: "Reishi", es: "Reishi", benefit: "The mushroom of immortality for long-term longevity.", issue: "Immune Longevity", keyword: "REISHI" },
  { name: "Omega 3", es: "Omega 3", benefit: "Anti-inflammatory brain and heart essential fatty acids.", issue: "Joint Pain / inflammation", keyword: "OMEGA" }
];

const content = [];
const startDate = new Date('2026-04-13');

for (let i = 0; i < 30; i++) {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i);
  const product = products[i % products.length];
  
  content.push({
    date: date.toISOString().split('T')[0],
    product_focus: product.name,
    caption_en: `Elevate your state. Our ${product.name} is engineered for ${product.benefit} Stop struggling with ${product.issue}. Comment "${product.keyword}" to get the BioNatural Protocol. 🌿 #BioNatural #JapandiWellness #HighVibe`,
    caption_es: `Eleva tu bienestar. Nuestra ${product.es} está formulada para ${product.benefit} Deja atrás el ${product.issue}. Comenta "${product.keyword}" para recibir el protocolo BioNatural. 🌿 #BioNatural #BienestarConsciente #SaludIntegral`,
    image_prompt: `Hyper-realistic, soft-focus product photography of ${product.name} in a minimalist Japandi glass jar. Set against a backdrop of raw linen, shadows of Monstera leaves, and warm Tulum morning light. High-end lifestyle aesthetic.`,
    bot_keyword: product.keyword
  });
}

const outputPath = 'F:/Mike d drive/Mike Webs/Client Projects/BioNatural  - Meybell Glez/bionatural-github/apps/web/src/data/social_content_april.json';
fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
console.log('Generated 30 days of high-quality content.');
