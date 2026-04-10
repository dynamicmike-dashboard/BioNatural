const https = require('https');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const BASE_ID = 'bse7mZjwbFQlNeB5UXU';

const tableData = JSON.stringify({
  name: "Master Inventory",
  fields: [
    { name: "Odoo_ID", type: "singleLineText" },
    { name: "Name_EN", type: "singleLineText" },
    { name: "Name_ES", type: "singleLineText" },
    { name: "Category", type: "singleLineText" },
    { name: "Price", type: "number" },
    { name: "Direct_URL", type: "singleLineText" },
    { name: "Health_Benefits", type: "longText" },
    { name: "Keyword_Trigger", type: "singleLineText" }
  ]
});

const options = {
  hostname: 'app.teable.ai',
  port: 443,
  path: `/api/base/${BASE_ID}/table`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(tableData)
  }
};

console.log(`🚀 Initializing Teable Master Inventory in Base: ${BASE_ID}`);

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      if (res.statusCode === 201 || res.statusCode === 200) {
        console.log(`✅ Table Created Successfully! Table ID: ${response.id}`);
        seedInitialTriggers(response.id);
      } else {
        console.error('❌ Failed to create table:', body);
      }
    } catch (e) {
      console.error('❌ Failed to parse response:', body);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Request failed: ${e.message}`);
});

req.write(tableData);
req.end();

function seedInitialTriggers(tableId) {
  const records = JSON.stringify({
    records: [
      {
        fields: {
          "Keyword_Trigger": "MAGNESIUM",
          "Name_EN": "High-Potency Magnesium",
          "Health_Benefits": "Essential for relaxation, muscle recovery, and sleep quality in the tropical heat.",
          "Direct_URL": "https://bio-natural.mx/tienda/suplementos/magnesium"
        }
      },
      {
        fields: {
          "Keyword_Trigger": "CBD",
          "Name_EN": "Nano-Cbd Oil",
          "Health_Benefits": "Supports stress relief and localized inflammation management.",
          "Direct_URL": "https://bio-natural.mx/tienda/suplementos/cbd"
        }
      },
      {
        fields: {
          "Keyword_Trigger": "MENU",
          "Name_EN": "BioNatural Restaurant Menu",
          "Health_Benefits": "Gourmet health kitchen featuring vegan staples and superfood bowls.",
          "Direct_URL": "https://bio-natural.mx/restaurante"
        }
      },
      {
        fields: {
          "Keyword_Trigger": "KAPPA",
          "Name_EN": "Hard Kombucha",
          "Health_Benefits": "Probiotic-rich alcoholic alternative with organic ferments.",
          "Direct_URL": "https://bio-natural.mx/restaurante/jugos"
        }
      },
      {
        fields: {
          "Keyword_Trigger": "STAMP",
          "Name_EN": "Bio-Family Loyalty Card",
          "Health_Benefits": "Digital rewards program for the conscious community.",
          "Direct_URL": "https://app.welcomeback.io/business/32LLGAUM49gT5GSK7gjGUD/download-card/bio_members_gifts_2"
        }
      }
    ]
  });

  const seedOptions = {
    hostname: 'app.teable.ai',
    port: 443,
    path: `/api/base/${BASE_ID}/table/${tableId}/record`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(records)
    }
  };

  console.log('🌱 Seeding initial BotCommerce keyword triggers...');
  const seedReq = https.request(seedOptions, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('✅ Seeding complete!');
    });
  });
  seedReq.write(records);
  seedReq.end();
}
