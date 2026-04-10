const axios = require('axios');
require('dotenv').config({ path: './apps/web/.env.local' });

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

const competitors = [
  'https://www.woolismarket.com',
  'https://dharmadeli.com',
  'https://bio-organicos.ola.click' // example, to be refined
];

const extractionPrompt = `
Extract the following data from every page:
1. Meta Title & Meta Description (To see their keyword strategy).
2. Image Alt Text (To see how they optimize for image search).
3. H1 and H2 Tags (To see their content hierarchy).
4. Bilingual Status: Note if the page has a language switcher or if content is mixed.
`;

async function crawlCompetitor(url) {
  console.log(`🚀 Starting Firecrawl for: ${url}`);
  try {
    const response = await axios.post('https://api.firecrawl.dev/v1/crawl', {
      url: url,
      limit: 10,
      scrapeOptions: {
        formats: ['markdown'],
        extract: {
          prompt: extractionPrompt,
          schema: {
            type: "object",
            properties: {
              meta_title: { type: "string" },
              meta_description: { type: "string" },
              h1_tags: { type: "array", items: { type: "string" } },
              h2_tags: { type: "array", items: { type: "string" } },
              image_alts: { type: "array", items: { type: "string" } },
              bilingual_status: { type: "string" }
            }
          }
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Crawl initiated for ${url}. Job ID: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.error(`❌ Firecrawl failed for ${url}:`, error.response?.data || error.message);
  }
}

// Example usage
// competitors.forEach(url => crawlCompetitor(url));
