const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetDir = path.join(__dirname, '../apps/web/public/assets/social/april');
const contentData = JSON.parse(fs.readFileSync(path.join(__dirname, '../apps/web/src/data/social_content_april.json'), 'utf8'));

// First, move the new Omega 3 to the folder as a source
// (I will do the manual copy in a command, but the script can handle the rest)

contentData.forEach(item => {
    const productName = item.product_focus.toLowerCase().replace(/\s+/g, '-').replace('\'', '');
    const targetFile = `${item.date}-${productName}.webp`;
    const targetPath = path.join(assetDir, targetFile);

    if (!fs.existsSync(targetPath)) {
        // Find a source file for this product
        const sourceFile = fs.readdirSync(assetDir).find(f => f.includes(productName) && f.endsWith('.webp'));
        if (sourceFile) {
            fs.copyFileSync(path.join(assetDir, sourceFile), targetPath);
            console.log(`✅ Hydrated: ${targetFile} (from ${sourceFile})`);
        } else {
            console.log(`⚠️ No source found for: ${productName}`);
        }
    }
});
