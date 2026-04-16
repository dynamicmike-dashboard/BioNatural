const https = require('https');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const BASE_ID = 'bse7mZjwbFQlNeB5UXU';
const INVENTORY_TABLE_ID = 'tblCLPch6m0IC3D3y43';
const CALENDAR_TABLE_ID = 'tblUz4P5EgMygtQlBL8';

async function fetchInventory() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'app.teable.ai',
      port: 443,
      path: `/api/table/${INVENTORY_TABLE_ID}/record?take=30`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TEABLE_API_TOKEN}`
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).records);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function createCalendarRecords(records) {
  const postData = JSON.stringify({ records });
  const options = {
    hostname: 'app.teable.ai',
    port: 443,
    path: `/api/table/${CALENDAR_TABLE_ID}/record`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed with status ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  try {
    console.log('🗓️ Fetching top 30 products from Teable Master Inventory...');
    const products = await fetchInventory();

    if (!products || products.length === 0) {
      console.log('❌ No products found in Master Inventory.');
      return;
    }

    console.log(`📡 Found ${products.length} products. Generating 30-Day Social Calendar...`);

    const calendarEntries = products.map((product, index) => {
      const publishDate = new Date();
      publishDate.setDate(publishDate.getDate() + index + 1);

      const fields = product.fields;
      const nameEn = fields.Name_EN || '';
      const nameEs = fields.Name_ES || nameEn;
      const category = fields.Category || 'wellness';
      const odooId = fields.Odoo_ID || `BN-00${index + 1}`;

      return {
        fields: {
          "Publish_Date": publishDate.toISOString(),
          "Product_Focus": odooId,
          "Caption_EN": `🌿 Discover the power of ${nameEn}! \n\nTraditionally recommended for its incredible natural properties, this may support your wellness journey. It is known to help with ${category}. \n\n🛒 Shop local, shop organic.`,
          "Caption_ES": `🌿 ¡Descubre el poder de ${nameEs}! \n\nTradicionalmente recomendado por sus increíbles propiedades naturales, este producto puede apoyar tu camino al bienestar. Conocido por ayudar en ${category}. \n\n🛒 Compra local, compra orgánico.`,
          "Image_Prompt": `Professional lifestyle photography of ${nameEn} in a bright, organic wellness setting in Playa del Carmen, soft tropical lighting, high-end commercial feel.`,
          "Bot_Keyword": odooId,
          "Status": "Draft"
        }
      };
    });

    console.log(`📦 Upserting ${calendarEntries.length} entries to Content Calendar Table...`);
    await createCalendarRecords(calendarEntries);
    console.log('✅ Successfully generated 30 days of content in Teable Content Calendar!');
  } catch (err) {
    console.error('❌ Error generating calendar:', err);
  }
}

run();
