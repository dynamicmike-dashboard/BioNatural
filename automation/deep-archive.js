const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const API_KEY = "fc-6fa2b1091485402b82396b30722d9c00";
const MAP_FILE = 'migration/wp_url_map.json';
const OUTPUT_DIR = 'migration/legacy_archive';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const mapData = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
// Filter for high-value content paths (data.links is the actual array)
const links = mapData.data?.links || [];
const urls = links.filter(link => {
  const url = link.url || link;
  // Exclude obviously technical/utility pages
  const excludes = [
    '/menu', '/product-tag', '/product-category', '/attachment', '/screenshot', '/img_', 'jpg', 'png', 'gif',
    '/en/', '/bolsa-de-trabajo', '/contacto', '/reservas', '/bolsa-de-trabajo', '/politica-de-privacidad'
  ];
  if (excludes.some(ex => url.includes(ex))) return false;
  
  // High-value content: Root level articles, /blog, /productos (not category)
  return url.length > 30 || url.includes('/blog');
});

console.log(`🚀 Starting Deep Archive for ${urls.length} high-value URLs...`);

urls.forEach((link, index) => {
  const url = link.url || link;
  let fileName = url.split('/').filter(Boolean).pop() + '.md';
  if (fileName === '.md') fileName = `index-${index}.md`;
  const filePath = path.join(OUTPUT_DIR, fileName);
  
  if (fs.existsSync(filePath)) {
    console.log(`[${index + 1}/${urls.length}] ⏭️ Skipping (Already exists): ${url}`);
    return;
  }

  console.log(`[${index + 1}/${urls.length}] 📥 Scraping: ${url}`);
  try {
    // Using firecrawl-cli scrape command as requested
    execSync(`npx -y firecrawl-cli scrape ${url} --api-key ${API_KEY} --only-main-content -o "${filePath}"`);
    console.log(`   ✅ Saved: ${fileName}`);
  } catch (error) {
    console.error(`   ❌ Failed: ${url}`);
  }
});
console.log('🏁 Deep Archive Complete.');
