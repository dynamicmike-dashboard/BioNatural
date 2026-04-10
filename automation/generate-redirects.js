const fs = require('fs');

function generateRedirects() {
    const legacyMap = JSON.parse(fs.readFileSync('./REPORTS/LEGACY_URL_MAP.json'));
    const redirects = [];

    // Basic mapping logic
    legacyMap.links.forEach(link => {
        const url = new URL(link);
        const path = url.pathname;

        if (path.includes('/productos/')) {
            // Map product pages
            const slug = path.split('/').pop();
            redirects.push({
                source: path,
                destination: `/tienda/producto/${slug}`, // Assuming slug matches Odoo_ID or similar logic
                permanent: true
            });
        } else if (path.includes('/blog-post-')) {
            // Map blog posts
            const slug = path.split('/').pop();
             redirects.push({
                source: path,
                destination: `/blog/${slug}`,
                permanent: true
            });
        }
        // Add more specific mappings here
    });

    // Add manual mappings for critical pages
    const manualMappings = [
        { source: '/menu', destination: '/restaurante', permanent: true },
        { source: '/quienes-somos', destination: '/nosotros', permanent: true },
        { source: '/franquicia', destination: '/franquicia', permanent: true },
        { source: '/nuevos-proveedores', destination: '/proveedores', permanent: true }
    ];

    const finalRedirects = [...redirects, ...manualMappings];
    fs.writeFileSync('./redirects.json', JSON.stringify(finalRedirects, null, 2));
    console.log(`✅ Generated ${finalRedirects.length} redirects in redirects.json`);
}

generateRedirects();
