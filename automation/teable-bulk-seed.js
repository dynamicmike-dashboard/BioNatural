const https = require('https');
const fs = require('fs');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const BASE_ID = 'bse7mZjwbFQlNeB5UXU';
const TABLE_ID = 'tblCLPch6m0IC3D3y43'; // From previous run

async function bulkSeedTeable() {
  console.log('🚀 Bulk Seeding Enriched Products to Teable...');
  
  const rawData = fs.readFileSync('./automation/data/enriched_products.json');
  const products = JSON.parse(rawData);

  const records = products.map(p => ({
    fields: {
      "Odoo_ID": p.Odoo_ID,
      "Name_EN": p.name_en,
      "Name_ES": p.name_es,
      "Category": p.category,
      "Health_Benefits": p.benefits_en.join('\n'),
      "Direct_URL": `https://bio-natural.mx/tienda?product=${p.Odoo_ID}`
    }
  }));

  const postData = JSON.stringify({ records });

  const options = {
    hostname: 'app.teable.ai',
    port: 443,
    path: `/api/base/${BASE_ID}/table/${TABLE_ID}/record`,
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
      console.log('✅ Bulk Seeding Complete!');
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Bulk seed failed: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

bulkSeedTeable();
