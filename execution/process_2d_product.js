import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Client, handle_file } from '@gradio/client';

/**
 * 2D Floating Architecture Pipeline
 * Layer 3 Execution Script for AGT Platform
 * 
 * Pipeline:
 * 1. AI Background Removal (BRIA AI RMBG-1.4 - Unlimited Free CPU Engine)
 * 2. High-Res Alpha Trimming & WebP Optimization (sharp)
 * 3. GSAP Zero-Gravity Animation & Physics Manifest Generation
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

// Custom GSAP physics tuning profiles based on product type/material
function getGsapProfile(category, name) {
  const cat = (category || '').toLowerCase();
  const n = (name || '').toLowerCase();

  if (cat.includes('drink') || n.includes('bottle') || n.includes('flask') || n.includes('kettle')) {
    // Slender cylindrical / metallic objects
    return {
      weightCategory: 'medium-dense',
      float: {
        amplitudeY: 18, // px up and down
        duration: 3.8, // seconds per half-cycle
        ease: 'sine.inOut',
        rotationDriftZ: 2.2, // degrees
        rotationDriftX: 3.5, // 3D tilt degrees
      },
      shadow: {
        baseBlur: 24, // px
        spread: -4,
        minOpacity: 0.22,
        maxOpacity: 0.52,
        scaleRange: [0.82, 1.0], // shadow contracts as bottle rises
      },
      hover: {
        liftY: -22, // px
        scale: 1.06,
        tiltSensitivity: 14, // max perspective tilt on mousemove
        duration: 0.45,
        ease: 'power2.out',
      },
    };
  }

  if (cat.includes('light') || n.includes('lamp') || n.includes('night') || cat.includes('silicone')) {
    // Lightweight / glowing items - more buoyant float
    return {
      weightCategory: 'light-buoyant',
      float: {
        amplitudeY: 24,
        duration: 4.4,
        ease: 'power1.inOut',
        rotationDriftZ: 4.0,
        rotationDriftX: 5.0,
      },
      shadow: {
        baseBlur: 32,
        spread: -6,
        minOpacity: 0.15,
        maxOpacity: 0.38,
        scaleRange: [0.75, 1.0],
      },
      hover: {
        liftY: -28,
        scale: 1.08,
        tiltSensitivity: 18,
        duration: 0.5,
        ease: 'elastic.out(1, 0.75)',
      },
    };
  }

  // Default balanced profile (electronics, boxes, tools)
  return {
    weightCategory: 'balanced',
    float: {
      amplitudeY: 16,
      duration: 3.5,
      ease: 'sine.inOut',
      rotationDriftZ: 2.5,
      rotationDriftX: 3.0,
    },
    shadow: {
      baseBlur: 20,
      spread: -3,
      minOpacity: 0.25,
      maxOpacity: 0.48,
      scaleRange: [0.85, 1.0],
    },
    hover: {
      liftY: -18,
      scale: 1.05,
      tiltSensitivity: 12,
      duration: 0.4,
      ease: 'power2.out',
    },
  };
}

async function run() {
  const args = process.argv.slice(2);
  const getArg = (flag, defaultVal) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultVal;
  };

  const inputPath = getArg('--input', path.resolve(__dirname, '../.tmp/stainless-bottle-300ml.jpeg'));
  const productId = getArg('--id', 'stainless-bottle-300ml');
  const productName = getArg('--name', 'Stainless Bottle 300ml');
  const category = getArg('--category', 'Drinkware');
  const serial = getArg('--serial', null);
  const bulkDiscount = getArg('--bulk-discount', '3-5% discount on higher quantity');
  const maxDimension = parseInt(getArg('--max-dim', '850'), 10);
  const quality = parseInt(getArg('--quality', '90'), 10);

  const outDir = path.resolve(__dirname, '../public/images/products');
  const dataDir = path.resolve(__dirname, '../public/data');
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(dataDir, { recursive: true });

  const outputWebp = path.join(outDir, `${productId}.webp`);
  const masterCatalogPath = path.join(dataDir, 'products.json');

  if (!fs.existsSync(inputPath)) {
    console.error(`[ERROR] Input image not found: ${inputPath}`);
    process.exit(1);
  }

  console.log('====================================================');
  console.log('AGT 2D FLOATING PIPELINE: AI BACKGROUND STRIPPER');
  console.log('====================================================');
  console.log(`Product ID:       ${productId}`);
  console.log(`Product Name:     ${productName}`);
  console.log(`Category:         ${category}`);
  console.log(`Input Image:      ${inputPath}`);
  console.log(`Output WebP:      ${outputWebp}`);
  console.log(`Max Dimension:    ${maxDimension}px`);
  console.log(`WebP Quality:     ${quality}%`);
  console.log('----------------------------------------------------');

  const startTime = Date.now();

  // STEP 1: AI Background Removal via BRIA RMBG-1.4
  console.log('[1/4] Connecting to BRIA AI RMBG-1.4 Space (Zero GPU Cost)...');
  const app = await Client.connect('briaai/BRIA-RMBG-1.4');

  console.log('[2/4] Stripping background with AI precision...');
  const bgRemoveRes = await app.predict('/run', {
    image: handle_file(inputPath),
  });

  const transparentFileObj = bgRemoveRes.data[1]; // PNG with transparent background
  const downloadUrl = transparentFileObj?.url;

  if (!downloadUrl) {
    throw new Error('No transparent image URL returned by background removal model.');
  }

  console.log(`[2/4] Background removed! Fetching alpha-masked PNG from: ${downloadUrl}`);
  const rawPngBuffer = await downloadBuffer(downloadUrl);

  // STEP 2: sharp Trimming, Normalizing & Converting to WebP
  console.log('[3/4] Trimming transparent whitespace & encoding ultra-optimized WebP...');
  const sharpInstance = sharp(rawPngBuffer);
  
  // Trim transparent pixels around product so bounding box is flush
  const trimmed = sharpInstance.trim();

  // Resize within maxDimension while keeping aspect ratio
  trimmed.resize({
    width: maxDimension,
    height: maxDimension,
    fit: 'inside',
    withoutEnlargement: true,
  });

  // Export as WebP
  const optimizedWebpBuffer = await trimmed
    .webp({
      quality: quality,
      effort: 6,
      alphaQuality: 100,
      lossless: false,
    })
    .toBuffer();

  fs.writeFileSync(outputWebp, optimizedWebpBuffer);

  // Read metadata of final WebP
  const finalMeta = await sharp(optimizedWebpBuffer).metadata();
  const webpSizeKb = (fs.statSync(outputWebp).size / 1024).toFixed(1);

  console.log(`[3/4] WebP exported: ${finalMeta.width}x${finalMeta.height}px (${webpSizeKb} KB)`);

  // STEP 3: Generate GSAP Zero-Gravity Animation Manifest
  console.log('[4/4] Generating GSAP Animation & Physics Manifest...');
  const gsapPhysics = getGsapProfile(category, productName);

  const manifest = {
    id: productId,
    name: productName,
    category: category,
    format: 'webp',
    image: {
      url: `/images/products/${productId}.webp`,
      width: finalMeta.width,
      height: finalMeta.height,
      aspectRatio: Number((finalMeta.width / finalMeta.height).toFixed(3)),
      sizeKb: `${webpSizeKb} KB`,
      hasAlpha: true,
    },
    animation: {
      engine: 'GSAP',
      zeroGravity: true,
      profile: gsapPhysics.weightCategory,
      floating: gsapPhysics.float,
      shadow: gsapPhysics.shadow,
      interaction: gsapPhysics.hover,
      cssPerspective: '1000px',
      transformOrigin: 'center center',
    },
    meta: {
      strippedWith: 'BRIA AI RMBG-1.4',
      optimizedWith: 'sharp libvips',
      createdAt: new Date().toISOString(),
    },
    ...(serial ? { serial } : {}),
    ...(bulkDiscount ? { bulkDiscount } : {}),
  };

  // Update master catalog products.json
  let masterCatalog = [];
  if (fs.existsSync(masterCatalogPath)) {
    try {
      masterCatalog = JSON.parse(fs.readFileSync(masterCatalogPath, 'utf-8'));
    } catch {
      masterCatalog = [];
    }
  }

  // Calculate serial if not provided: find max serial + 1
  let finalSerial = serial;
  if (!finalSerial) {
    let maxNum = 0;
    masterCatalog.forEach((p) => {
      const num = parseInt((p.serial || '').replace(/\D/g, ''), 10);
      if (num && num > maxNum) maxNum = num;
    });
    finalSerial = `AGT-${String(maxNum + 1).padStart(2, '0')}`;
  }

  manifest.serial = finalSerial;

  const existingIdx = masterCatalog.findIndex((p) => p.id === productId);
  if (existingIdx !== -1) {
    masterCatalog[existingIdx] = manifest;
  } else {
    // New products are ALWAYS prepended at the beginning (Z-A order)
    masterCatalog.unshift(manifest);
  }

  fs.writeFileSync(masterCatalogPath, JSON.stringify(masterCatalog, null, 2), 'utf-8');

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('====================================================');
  console.log(`SUCCESS: Processed in ${totalTime}s!`);
  console.log(`WebP Asset:   ${outputWebp} (${webpSizeKb} KB)`);
  console.log(`Catalog Entry:Added to ${masterCatalogPath}`);
  console.log('====================================================');
}

run().catch((err) => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
