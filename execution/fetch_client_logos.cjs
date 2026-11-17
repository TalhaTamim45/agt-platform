const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'clients');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, filename) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, filename);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'AGTPlatformBot/1.0 (contact@abdullahglobaltrade.com)'
      },
      rejectUnauthorized: false
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = u.origin + redirectUrl;
        }
        return resolve(downloadFile(redirectUrl, filename));
      }
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          console.log(`[OK] ${filename} (${stats.size} bytes) from ${url.slice(0, 60)}...`);
          resolve(true);
        });
      } else {
        console.log(`[FAIL ${res.statusCode}] ${filename} from ${url}`);
        resolve(false);
      }
    });
    req.on('error', (err) => {
      console.log(`[ERR] ${filename}: ${err.message}`);
      resolve(false);
    });
  });
}

async function scrapeLogo(pageUrl) {
  return new Promise((resolve) => {
    const client = pageUrl.startsWith('https') ? https : http;
    client.get(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      rejectUnauthorized: false
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const logoRegex = /<img[^>]+src=["']([^"']*(?:logo|brand|header)[^"']*)["'][^>]*>/gi;
        const matches = [];
        let m;
        while ((m = logoRegex.exec(data)) !== null) {
          matches.push(m[1]);
        }
        console.log(`Scraped from ${pageUrl}:`, matches.slice(0, 4));
        resolve(matches);
      });
    }).on('error', (e) => {
      console.log(`Scrape err ${pageUrl}: ${e.message}`);
      resolve([]);
    });
  });
}

async function run() {
  console.log('Downloading known Wikimedia / official assets...');
  
  // 1. SK+F (Eskayef)
  await downloadFile('https://upload.wikimedia.org/wikipedia/commons/3/36/SKF_NEW_LOGO.png', 'skf.png');
  
  // 2. Jotun
  await downloadFile('https://upload.wikimedia.org/wikipedia/commons/7/7f/Jotun_logo.svg', 'jotun.svg');
  
  // 3. Berger Paints
  await downloadFile('https://upload.wikimedia.org/wikipedia/commons/f/f3/Berger_Paints_logo.png', 'berger.png');
  
  // 4. Philip Morris
  await downloadFile('https://upload.wikimedia.org/wikipedia/commons/f/f0/Pmi_logo_text_only.svg', 'philip-morris.svg');
  
  // 5. Opsonin Pharma
  await downloadFile('https://upload.wikimedia.org/wikipedia/commons/5/5b/Opsoninpharma_logo.jpg', 'opsonin.jpg');
  
  // 6. Incepta Pharmaceuticals
  await downloadFile('https://upload.wikimedia.org/wikipedia/commons/0/0c/Incepta_780647819.jpg', 'incepta.jpg');
  
  // 7. ACME Laboratories
  await downloadFile('https://upload.wikimedia.org/wikipedia/bn/1/13/%E0%A6%8F%E0%A6%95%E0%A6%AE%E0%A6%BF_%E0%A6%B2%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%AC%E0%A6%B0%E0%A7%87%E0%A6%9F%E0%A6%B0%E0%A6%BF%E0%A6%9C%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg', 'acme.svg');
  
  // 8. Aristopharma
  await downloadFile('https://upload.wikimedia.org/wikipedia/bn/1/1e/%E0%A6%85%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A7%8B%E0%A6%AB%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AE%E0%A6%BE_%E0%A6%B2%E0%A6%BF%E0%A6%AE%E0%A6%BF%E0%A6%9F%E0%A7%87%E0%A6%A1%E0%A7%87%E0%A6%B0_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.jpg', 'aristopharma.jpg');
  
  // 9. Popular Pharmaceuticals
  await downloadFile('https://cdn.prod.website-files.com/62e8cb12cc7ec8985eb4d90e/6432598fb03b84759ee568a2_logo.webp', 'popular.webp');

  // 10. Healthcare Pharmaceuticals
  await downloadFile('https://www.hplbd.com/front/assets/images/logo/logo.png', 'healthcare.png');

  // 11. C2C Pharma
  const c2cPage = await new Promise((resolve) => {
    https.get('https://c2cpharma.com.bd', { rejectUnauthorized: false }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', () => resolve(''));
  });
  const c2cImgs = [...c2cPage.matchAll(/src=["']([^"']+\.(?:png|jpg|jpeg|svg|webp))["']/gi)].map(m => m[1]);
  console.log('C2C Images found:', c2cImgs);
  if (c2cImgs.length > 0) {
    let c2cLogo = c2cImgs.find(u => u.toLowerCase().includes('logo')) || c2cImgs[0];
    if (!c2cLogo.startsWith('http')) {
      c2cLogo = 'https://c2cpharma.com.bd' + (c2cLogo.startsWith('/') ? '' : '/') + c2cLogo;
    }
    await downloadFile(c2cLogo, 'c2c.png');
  }

  // 12. WAVE Foundation
  const waveLogos = await scrapeLogo('https://wavefoundationbd.org');
  if (waveLogos.length > 0) {
    let waveUrl = waveLogos[0];
    if (!waveUrl.startsWith('http')) {
      waveUrl = 'https://wavefoundationbd.org' + (waveUrl.startsWith('/') ? '' : '/') + waveUrl;
    }
    await downloadFile(waveUrl, 'wave-foundation.png');
  }
}

run();
