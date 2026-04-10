const fs = require('fs');
const path = require('path');

const MAX_SIZE_MB = 10;
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

function checkFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      checkFiles(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (VIDEO_EXTENSIONS.includes(ext) && stats.size > MAX_SIZE_MB * 1024 * 1024) {
        console.error(`\x1b[31m%s\x1b[0m`, `🔴 HALT: Large video file detected at ${filePath}`);
        console.error(`\x1b[33m%s\x1b[0m`, `Rule: Video files > 10MB are not allowed in the repo.`);
        console.error(`Action: Please upload this to YouTube or Google Drive and provide the URL instead.`);
        process.exit(1);
      }
    }
  });
}

const targetDirs = ['./apps/web/public', './apps/web/src/assets'];
targetDirs.forEach(dir => checkFiles(path.resolve(__dirname, '..', dir)));
console.log('✅ Asset Halt Protocol passed: No large videos detected.');
