const https = require('https');
const fs = require('fs');

const FIRECRAWL_API_KEY = 'fc-6fa2b1091485402b82396b30722d9c00';

async function scrapeContent() {
    if (!fs.existsSync('./migration/wp_url_map.json')) {
        console.log('⚠️ wp_url_map.json not found. Wait for the map command to finish.');
        return;
    }

    const mapData = JSON.parse(fs.readFileSync('./migration/wp_url_map.json'));
    const urlsToScrape = (mapData.data?.links || []).slice(0, 10); // Batching first 10 for safety/demo

    console.log(`🔎 Starting archival scrape for ${urlsToScrape.length} pages...`);

    for (const entry of urlsToScrape) {
        const urlString = entry.url || entry;
        console.log(`🌐 Scraping: ${urlString}`);
        await scrapeUrl(urlString);
    }
}

async function scrapeUrl(targetUrl) {
    const postData = JSON.stringify({
        url: targetUrl,
        formats: ['markdown']
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

    return new Promise((resolve) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                const response = JSON.parse(body);
                if (response.success) {
                    const slug = new URL(targetUrl).pathname.replace(/\//g, '_') || 'index';
                    const dir = './migration/legacy_archive';
                    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                    fs.writeFileSync(`${dir}/${slug}.md`, response.data.markdown);
                    console.log(`✅ Archived: ${slug}.md`);
                }
                resolve();
            });
        });
        req.write(postData);
        req.end();
    });
}

scrapeContent();
