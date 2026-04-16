const https = require('https');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const CALENDAR_TABLE_ID = 'tblUz4P5EgMygtQlBL8';
const GEMINI_API_KEY = 'AIzaSyDfVdAMiHvHM6G19ruKvZqkCe9aVJAiUqw';

async function fetchCalendarRecords() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'app.teable.ai',
      port: 443,
      path: `/api/table/${CALENDAR_TABLE_ID}/record?take=30`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${TEABLE_API_TOKEN}` }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).records || []);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function updateTeableRecord(recordId, fields) {
  const postData = JSON.stringify({ record: { fields } });
  const options = {
    hostname: 'app.teable.ai',
    port: 443,
    path: `/api/table/${CALENDAR_TABLE_ID}/record/${recordId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Failed to update ${recordId}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function generateWithGemini(prompt) {
  const postData = JSON.stringify({
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json"
    }
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    port: 443,
    path: `/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const result = JSON.parse(data);
            const text = result.candidates[0].content.parts[0].text;
            resolve(text);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(`Gemini API Error: ${res.statusCode} - ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runEnrichment() {
  console.log('🌟 Initializing Gemini AI Calendar Enrichment (Native REST)...');
  
  try {
    const records = await fetchCalendarRecords();
    console.log(`📑 Found ${records.length} records in Teable Content Calendar...`);

    let enrichedCount = 0;
    // We'll process them in small batches or sequentially to ensure API limits are respected
    for (let i = 0; i < Math.min(records.length, 5); i++) { // Let's test with top 5
        const record = records[i];
        
        // Only enrich Drafts
        if (record.fields.Status !== 'Draft') {
            continue;
        }

        const productKeyword = record.fields.Bot_Keyword || record.fields.Product_Focus || "organic juice";
        console.log(`🤖 Modifying record ${i+1}/5 (${productKeyword})...`);
        
        const prompt = `You are a world-class social media manager for 'BioNatural', a premium organic wellness restaurant and store in Mexico.
Generate an engaging Instagram post payload for a product categorized under: "${productKeyword}".

Return a raw JSON object with exactly these 3 keys:
{
  "caption_en": "Your high-end English Instagram caption (include 2-4 emojis).",
  "caption_es": "Your flawless Spanish Instagram caption.",
  "image_prompt": "A prompt describing a beautiful professional lifestyle photo."
}`;

        try {
            const responseText = await generateWithGemini(prompt);
            const aiData = JSON.parse(responseText);

            if (aiData.caption_en && aiData.caption_es && aiData.image_prompt) {
                await updateTeableRecord(record.id, {
                    "Caption_EN": aiData.caption_en,
                    "Caption_ES": aiData.caption_es,
                    "Image_Prompt": aiData.image_prompt
                });
                console.log(`   ✅ Successfully updated!`);
                enrichedCount++;
            }
        } catch (genError) {
            console.error(`   ❌ Failed:`, genError.message);
        }
        
        // Gentle rate limiting pause
        await new Promise(r => setTimeout(r, 1500));
    }

    console.log(`✨ Enriched ${enrichedCount} test records using Gemini! Check the dashboard.`);
    
  } catch (error) {
    console.error('CRITICAL ERROR:', error);
  }
}

runEnrichment();
