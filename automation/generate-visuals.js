const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONTENT_FILE = 'apps/web/src/data/social_content_april.json';
const OUTPUT_DIR = 'apps/web/public/assets/social/april';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
const firstWeek = content.slice(0, 7);

console.log('🎨 Generating first 7 days of Japandi-style visual assets...');

firstWeek.forEach((day, index) => {
  const fileName = `day-${index + 1}-${day.product_focus.toLowerCase().replace(/\s+/g, '-')}.png`;
  const filePath = path.join(OUTPUT_DIR, fileName);
  
  if (fs.existsSync(filePath)) {
    console.log(`[Day ${index + 1}] ⏭️ Skipping (Already exists): ${day.product_focus}`);
    return;
  }

  console.log(`[Day ${index + 1}] 📸 Creating image for ${day.product_focus}...`);
  try {
    // Attempting generation via nano-banana CLI as requested
    execSync(`npx -y nano-banana generate "${day.image_prompt}" --output "${filePath}" --style japandi --quality high`);
    console.log(`   ✅ Generated: ${fileName}`);
  } catch (error) {
    console.error(`   ❌ Generation failed for ${day.product_focus}:`, error.message);
  }
});
console.log('🏁 Visual Factory Sprint Complete.');
