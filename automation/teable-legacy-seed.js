const https = require('https');
const fs = require('fs');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const BASE_ID = 'bse7mZjwbFQlNeB5UXU';
const TABLE_ID = 'tblCLPch6m0IC3D3y43';

async function seedLegacyProducts() {
  console.log('🚀 Seeding 35 legacy products from Firecrawl to Teable...');
  
  const rawData = fs.readFileSync('./automation/data/initial_extraction.json');
  const products = JSON.parse(rawData);

  const records = products.map((p, idx) => ({
    fields: {
      "Odoo_ID": p.odoo_id || `LEGACY-${idx}`,
      "Name_EN": p.name_en,
      "Name_ES": p.name_es,
      "Category": p.category,
      "Price": p.price,
      "Direct_URL": p.image_url, // Using Direct_URL for image storage for now as requested
      "Health_Benefits": p.description_en || "Legacy menu item extracted from WP."
    }
  }));

  const postData = JSON.stringify({ records });

  const options = {
    hostname: 'app.teable.ai',
    port: 443,
    path: `/api/table/${TABLE_ID}/record`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('✅ Legacy seeding complete!');
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Legacy seed failed: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

seedLegacyProducts();
