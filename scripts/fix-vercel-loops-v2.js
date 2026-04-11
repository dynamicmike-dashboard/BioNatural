const fs = require('fs');

const vercelJsonPath = 'F:/Mike d drive/Mike Webs/Client Projects/BioNatural  - Meybell Glez/bionatural-github/apps/web/vercel.json';

try {
    const data = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    const redirects = data.redirects;
    
    // Simple filter for direct loops (A -> A)
    const initialCount = redirects.length;
    let filtered = redirects.filter(r => {
        const src = r.source.replace(/\/$/, '') || '/';
        const dest = r.destination.replace(/\/$/, '') || '/';
        return src !== dest;
    });

    // Check for circular loops (A -> B, B -> A)
    const routes = {};
    filtered.forEach(r => {
        routes[r.source] = r.destination;
    });

    const finalFiltered = filtered.filter(r => {
        const dest = r.destination;
        if (routes[dest] === r.source) {
            console.log(`Circular Loop Detected: ${r.source} <-> ${dest}`);
            return false;
        }
        return true;
    });

    data.redirects = finalFiltered;
    
    const finalCount = data.redirects.length;
    console.log(`Original: ${initialCount}, Final: ${finalCount}`);
    console.log(`Removed ${initialCount - finalCount} loops.`);
    
    fs.writeFileSync(vercelJsonPath, JSON.stringify(data, null, 2));
} catch (error) {
    console.error(error);
}
