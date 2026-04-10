const https = require('https');
const fs = require('fs');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const TABLE_ID = 'tblCLPch6m0IC3D3y43';

async function updateSEOTags() {
  console.log('🔍 Generating SEO Stealth Tags for top products...');
  
  // 1. Fetch current Teable records
  const records = await fetchTeableRecords();
  console.log(`📑 Found ${records.length} records to optimize.`);

  const updates = [];
  
  // Define mapping for top 50 (or similar)
  const seoPatterns = {
    "magnesium": "Best Magnesium Supplement for Playa del Carmen Locals - Tropical Wellness & Sleep",
    "cbd": "Premium Organic CBD Oil Playa del Carmen - Expat Recovery & Stress Relief",
    "spirulina": "Tropical Energy Spirulina Mexico - Superfood for Active Playa Lifestyle",
    "chlorophyll": "Natural Detox Chlorophyll Playa del Carmen - Hydration for Tropical Heat",
    "ashwagandha": "Pure Ashwagandha Root Mexico - Cortisol Control for Digital Nomads",
    "turmeric": "Anti-Inflammatory Turmeric Curcumin - Joints & Recovery for Playa Athletes",
    "keto": "Healthy Keto Food Playa del Carmen - Low Carb Wellness Menu & Delivery",
    "vegan": "Top Rated Vegan Restaurant Playa del Carmen - Sustainable Plant-Based Dining",
    "muffin": "Organic Gluten-Free Muffins Playa - Healthy Bakery & Artisan Treats",
    "enchilada": "Traditional Vegan Enchiladas Playa del Carmen - Authentic Mexican Wellness",
    "omega": "Premium Omega-3 Fish Oil Mexico - Heart Health for Conscious Expats",
    "protein": "Clean Plant-Based Protein Playa - Organic Fitness Fuel for Nomads"
  };

  for (const record of records) {
    const name = (record.fields.Name_EN || "").toLowerCase();
    let stealthTag = "";

    for (const [key, tag] of Object.entries(seoPatterns)) {
      if (name.includes(key.toLowerCase())) {
        stealthTag = tag;
        break;
      }
    }

    if (stealthTag) {
      updates.push({
        id: record.id,
        fields: {
          "SEO_Stealth_Tag": stealthTag // We'll add this field or put it in description
        }
      });
    }
  }

  if (updates.length > 0) {
    console.log(`🔄 Applying ${updates.length} SEO optimizations to Teable...`);
    await bulkUpdateTeable(updates);
  } else {
    console.log('⚠️ No products matched the SEO patterns.');
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
      res.on('end', () => resolve(JSON.parse(body).records || []));
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
        console.log('✅ SEO Tags updated!');
        resolve();
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

updateSEOTags();
