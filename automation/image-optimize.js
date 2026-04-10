const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(process.cwd(), 'apps', 'web', 'public', 'img');

if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

async function optimizeImages() {
  const dir = IMG_DIR;
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const fileName = path.parse(file).name;
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, `${fileName}.webp`);
      
      if (!fs.existsSync(outputPath)) {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`✅ Optimized ${file} -> ${fileName}.webp`);
      }
    }
  }
}

optimizeImages().catch(err => console.error('🔴 Image optimization failed:', err));
