const fs = require('fs');

function finalizeRedirects() {
    console.log('🔗 Generating Vercel Redirect Shield...');
    const mapData = JSON.parse(fs.readFileSync('./migration/wp_url_map.json'));
    const links = mapData.data?.links || [];
    
    if (links.length === 0) {
        console.log('⚠️ No links found in map.');
        return;
    }

    const redirects = [];

    links.forEach(entry => {
        try {
            const url = new URL(entry.url || entry);
            const path = url.pathname;
            const cleanPath = path.replace(/\/+$/, '') || '/';
            if (cleanPath === '/') return;

            let destination = '/';

            if (cleanPath.startsWith('/en/')) {
                 destination = `/?lang=en&from=${cleanPath}`;
            } else if (cleanPath.includes('/menu-item/')) {
                 destination = '/restaurante';
            } else if (cleanPath.includes('/productos/')) {
                 destination = '/tienda';
            } else if (cleanPath.includes('/product-tag/') || cleanPath.includes('/product-category/')) {
                 destination = '/tienda';
            } else if (cleanPath.split('/').length === 2 && !cleanPath.includes('.')) {
                 // Likely a blog post or page (e.g. /sabias-que-si-tomas-colageno...)
                 destination = '/blog' ;
            }

            redirects.push({
                "source": cleanPath,
                "destination": destination,
                "permanent": true
            });
        } catch (e) {}
    });

    // Add Manual Master Routes
    const masterRoutes = [
        { "source": "/nuevos-proveedores", "destination": "/proveedores", "permanent": true },
        { "source": "/franquicia", "destination": "/franquicia", "permanent": true },
        { "source": "/menu", "destination": "/restaurante", "permanent": true },
        { "source": "/contacto", "destination": "/contacto", "permanent": true }
    ];

    const vercelConfig = {
        "redirects": [...masterRoutes, ...redirects]
    };

    fs.writeFileSync('./vercel.json', JSON.stringify(vercelConfig, null, 2));
    console.log(`✅ vercel.json generated with ${vercelConfig.redirects.length} redirects.`);
}

finalizeRedirects();
