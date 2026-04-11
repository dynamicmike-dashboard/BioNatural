const https = require('https');
const fs = require('fs');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const BASE_ID = 'bse7mZjwbFQlNeB5UXU';

const tableData = JSON.stringify({
  name: "Content Calendar",
  fields: [
    { name: "Publish_Date", type: "date" },
    { name: "Product_Focus", type: "singleLineText" },
    { name: "Caption_EN", type: "longText" },
    { name: "Caption_ES", type: "longText" },
    { name: "Image_Prompt", type: "longText" },
    { name: "Bot_Keyword", type: "singleLineText" },
    { name: "Status", type: "singleSelect", options: { 
        choices: [
            { name: "Draft", color: "gray" }, 
            { name: "Approved", color: "green" }, 
            { name: "Posted", color: "blue" }
        ] 
    }}
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

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const response = JSON.parse(body);
    if (res.statusCode === 201 || res.statusCode === 200) {
      console.log(`✅ Table Created! Table ID: ${response.id}`);
      seedCalendar(response.id);
    } else {
      console.error('❌ Failed:', body);
    }
  });
});

req.write(tableData);
req.end();

function seedCalendar(tableId) {
  const rawData = fs.readFileSync('F:/Mike d drive/Mike Webs/Client Projects/BioNatural  - Meybell Glez/bionatural-github/apps/web/src/data/social_content_april.json', 'utf8');
  const items = JSON.parse(rawData);
  
  const records = {
    records: items.map(item => ({
      fields: {
        "Publish_Date": item.date,
        "Product_Focus": item.product_focus,
        "Caption_EN": item.caption_en,
        "Caption_ES": item.caption_es,
        "Image_Prompt": item.image_prompt,
        "Bot_Keyword": item.bot_keyword,
        "Status": "Draft"
      }
    }))
  };

  const seedData = JSON.stringify(records);

  const seedOptions = {
    hostname: 'app.teable.ai',
    port: 443,
    path: `/api/base/${BASE_ID}/table/${tableId}/record`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(seedData)
    }
  };

  const seedReq = https.request(seedOptions, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('✅ Seeding complete!');
    });
  });
  seedReq.write(seedData);
  seedReq.end();
}
