const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../apps/web/public/assets/social/april');

fs.readdirSync(directory).forEach(file => {
    if (file.endsWith('.png')) {
        const inputPath = path.join(directory, file);
        const outputPath = inputPath.replace('.png', '.webp');

        sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath)
            .then(() => {
                console.log(`✅ Converted: ${file} -> ${file.replace('.png', '.webp')}`);
                fs.unlinkSync(inputPath); // Remove original PNG
            })
            .catch(err => {
                console.error(`❌ Error converting ${file}:`, err);
            });
    }
});
