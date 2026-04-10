const https = require('https');
const fs = require('fs');

const FIRECRAWL_API_KEY = 'fc-6fa2b1091485402b82396b30722d9c00';
const TARGET_URL = 'https://bio-natural.mx/en/';

const extractionPrompt = `
Extract the first 50 products from the shop/store section. 
For each product, provide:
- Name (English & Spanish)
- Category
- Price (MXN)
- Description (English & Spanish if available)
- Image URL
- Original Price (if on sale)
`;

const postData = JSON.stringify({
  url: TARGET_URL,
  formats: ['extract'],
  extract: {
    prompt: extractionPrompt,
    schema: {
      type: "object",
      properties: {
        products: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name_en: { type: "string" },
              name_es: { type: "string" },
              category: { type: "string" },
              price: { type: "number" },
              description_en: { type: "string" },
              description_es: { type: "string" },
              image_url: { type: "string" }
            }
          }
        }
      }
    }
  }
});

const options = {
  hostname: 'api.firecrawl.dev',
  port: 443,
  path: '/v1/scrape',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log(`🔍 Starting "Ground Truth" extraction for: ${TARGET_URL}`);

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      if (response.success && response.data && response.data.extract) {
        const products = response.data.extract.products;
        console.log(`✅ Extracted ${products.length} products.`);

        const dataPath = './automation/data/initial_extraction.json';
        fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
        console.log(`💾 Data saved to ${dataPath}`);
      } else {
        console.error('❌ API returned error or no data:', body);
      }
    } catch (e) {
      console.error('❌ Failed to parse response:', body);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Ingestion failed: ${e.message}`);
});

req.write(postData);
req.end();
