const https = require('https');
const fs = require('fs');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const BASE_ID = 'bse7mZjwbFQlNeB5UXU';
const TABLE_ID = 'tblCLPch6m0IC3D3y43';

async function syncImages() {
  console.log('🖼️ Correlating extracted images with Teable records...');
  
  const rawExtraction = fs.readFileSync('./automation/data/initial_extraction.json');
  const extractedProducts = JSON.parse(rawExtraction);

  // 1. Fetch current Teable records
  const records = await fetchTeableRecords();
  console.log(`📑 Found ${records.length} records in Teable.`);

  const updates = [];
  
  for (const extProd of extractedProducts) {
    // Basic fuzzy match by name
    const match = records.find(r => 
      r.fields.Name_EN?.toLowerCase() === extProd.name_en?.toLowerCase() ||
      r.fields.Name_ES?.toLowerCase() === extProd.name_es?.toLowerCase()
    );

    if (match) {
      updates.push({
        id: match.id,
        fields: {
          "Odoo_ID": extProd.odoo_id || match.fields.Odoo_ID,
          "Direct_URL": extProd.image_url // Temporary storage or map to image field if existing
        }
      });
    }
  }

  if (updates.length > 0) {
    console.log(`🔄 Updating ${updates.length} records in Teable...`);
    await bulkUpdateTeable(updates);
  } else {
    console.log('⚠️ No matches found for image correlation.');
  }
}

async function fetchTeableRecords() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'app.teable.ai',
      port: 443,
      path: `/api/table/${TABLE_ID}/record?pageSize=100`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${TEABLE_API_TOKEN}` }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        const response = JSON.parse(body);
        if (response.records) {
          resolve(response.records);
        } else {
          console.error('❌ Teable API Error:', body);
          resolve([]);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function bulkUpdateTeable(records) {
  const postData = JSON.stringify({ records });
  const options = {
    hostname: 'app.teable.ai',
    port: 443,
    path: `/api/table/${TABLE_ID}/record`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log('✅ Bulk update complete!');
        resolve();
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

syncImages();
