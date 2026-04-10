const https = require('https');

const TEABLE_API_TOKEN = 'teable_acchP4Hm8Z4MJCQkmrR_YlbPxji2yRC+bOIV8Wr5Rn+l+oevsoy26OxI6HKd43U=';
const TABLE_ID = 'tblCLPch6m0IC3D3y43';

async function addSEOField() {
  console.log('🏗️ Adding SEO_Stealth_Tag field to Teable schema...');
  
  const postData = JSON.stringify({
    name: "SEO_Stealth_Tag",
    type: "singleLineText",
    description: "High-intent SEO optimized keywords for wellness authority."
  });

  const options = {
    hostname: 'app.teable.ai',
    port: 443,
    path: `/api/table/${TABLE_ID}/field`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TEABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('✅ SEO Field added/verified!');
      console.log(body);
    });
  });

  req.on('error', (e) => console.error(e));
  req.write(postData);
  req.end();
}

addSEOField();
