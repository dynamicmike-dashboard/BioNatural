const fs = require('fs');
const path = require('path');

const vercelJsonPath = 'F:/Mike d drive/Mike Webs/Client Projects/BioNatural  - Meybell Glez/bionatural-github/apps/web/vercel.json';

try {
    const data = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    const originalCount = data.redirects.length;
    
    // Filter out loops
    data.redirects = data.redirects.filter(r => {
        // Normalize slash for comparison
        const src = r.source.replace(/\/$/, '') || '/';
        const dest = r.destination.replace(/\/$/, '') || '/';
        return src !== dest;
    });
    
    const newCount = data.redirects.length;
    console.log(`Original redirects: ${originalCount}`);
    console.log(`Remaining redirects: ${newCount}`);
    console.log(`Removed ${originalCount - newCount} loops.`);
    
    fs.writeFileSync(vercelJsonPath, JSON.stringify(data, null, 2));
    console.log('Successfully updated vercel.json');
} catch (error) {
    console.error('Error processing vercel.json:', error);
    process.exit(1);
}
