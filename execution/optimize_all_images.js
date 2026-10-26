import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.resolve(__dirname, '../public/images/products');
const catalogPath = path.resolve(__dirname, '../public/data/products.json');
const backupDir = path.resolve(__dirname, '../.tmp/original_products_backup');

async function processProduct(product, backupDir, productsDir) {
  if (!product.image || !product.image.url) return null;

  const fileName = path.basename(product.image.url);
  const backupFilePath = path.join(backupDir, fileName);
  const targetFilePath = path.join(productsDir, fileName);

  const sourceFile = fs.existsSync(backupFilePath) ? backupFilePath : targetFilePath;
  if (!fs.existsSync(sourceFile)) return null;

  const origStats = fs.statSync(sourceFile);
  const meta = await sharp(sourceFile).metadata();

  const maxDim = 850; // Ultra crisp 3x Retina resolution
  let resizeOpts = {
    fit: 'inside',
    withoutEnlargement: true,
    kernel: sharp.kernel.lanczos3,
  };

  if (meta.width > maxDim || meta.height > maxDim) {
    resizeOpts.width = maxDim;
    resizeOpts.height = maxDim;
  }

  // High quality WebP with effort: 4 (fast + high quality) and micro-sharpening
  const optimizedBuffer = await sharp(sourceFile)
    .resize(resizeOpts)
    .sharpen({ sigma: 0.5, m1: 0.5, m2: 2.0 })
    .webp({ quality: 90, effort: 4, smartSubsample: true })
    .toBuffer();

  fs.writeFileSync(targetFilePath, optimizedBuffer);

  const newMeta = await sharp(optimizedBuffer).metadata();
  const newSizeKb = `${(optimizedBuffer.length / 1024).toFixed(1)} KB`;

  // Update product object
  product.image.width = newMeta.width;
  product.image.height = newMeta.height;
  product.image.aspectRatio = Number((newMeta.width / newMeta.height).toFixed(3));
  product.image.sizeKb = newSizeKb;

  return {
    origBytes: origStats.size,
    newBytes: optimizedBuffer.length,
    id: product.id,
  };
}

async function main() {
  console.log('====================================================');
  console.log('HIGH-FIDELITY RETINA IMAGE OPTIMIZATION (PARALLEL)');
  console.log('Target: Crisp, clean, diligent & ultra-fast');
  console.log('====================================================');

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  let totalOrig = 0;
  let totalNew = 0;
  let count = 0;

  // Process in chunks of 6 concurrent workers
  const chunkSize = 6;
  for (let i = 0; i < catalog.length; i += chunkSize) {
    const chunk = catalog.slice(i, i + chunkSize);
    const results = await Promise.all(
      chunk.map((p) => processProduct(p, backupDir, productsDir))
    );
    for (const r of results) {
      if (r) {
        totalOrig += r.origBytes;
        totalNew += r.newBytes;
        count++;
      }
    }
    console.log(`Processed ${count}/${catalog.length} images...`);
  }

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');

  const origMb = (totalOrig / (1024 * 1024)).toFixed(2);
  const newMb = (totalNew / (1024 * 1024)).toFixed(2);
  const savedPercent = (((totalOrig - totalNew) / totalOrig) * 100).toFixed(1);

  console.log('====================================================');
  console.log(`Successfully optimized ${count} products!`);
  console.log(`Original total size:  ${origMb} MB`);
  console.log(`Optimized total size: ${newMb} MB`);
  console.log(`Bandwidth saved:      ${savedPercent}%`);
  console.log('Quality standard:     100% Crisp 3x Retina (Lanczos3 + Micro-sharpened)');
  console.log('====================================================');
}

main().catch((err) => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
