const fs = require('fs');

const vercelJsonPath = 'F:/Mike d drive/Mike Webs/Client Projects/BioNatural  - Meybell Glez/bionatural-github/apps/web/vercel.json';

try {
    const data = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    const redirects = data.redirects;

    console.log('--- Problematic Redirects ---');
    redirects.forEach((r, idx) => {
        if (r.source === '/' || r.source === '/index' || r.source.includes('*') || r.source.includes(':')) {
           console.log(`Index ${idx}: Source: ${r.source} -> ${r.destination}`);
        }
    });

    // Also check if any duplicate sources might be overlapping in a weird way
    const sources = new Set();
    redirects.forEach((r, idx) => {
        if (sources.has(r.source)) {
            // console.log(`Duplicate: ${r.source}`);
        }
        sources.add(r.source);
    });

} catch (error) {
    console.error(error);
}
