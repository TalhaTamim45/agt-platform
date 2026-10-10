import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Client, handle_file } from '@gradio/client';

/**
 * High-Speed Batch 2D Floating Architecture Pipeline
 * Layer 3 Execution Script for AGT Platform
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function getGsapProfile(category, name) {
  const cat = (category || '').toLowerCase();
  const n = (name || '').toLowerCase();

  if (cat.includes('drink') || n.includes('bottle') || n.includes('flask') || n.includes('kettle') || n.includes('grinder') || n.includes('vacuum') || cat.includes('appliance')) {
    return {
      weightCategory: 'medium-dense',
      float: {
        amplitudeY: 18,
        duration: 3.8,
        ease: 'sine.inOut',
        rotationDriftZ: 2.2,
        rotationDriftX: 3.5,
      },
      shadow: {
        baseBlur: 24,
        spread: -4,
        minOpacity: 0.22,
        maxOpacity: 0.52,
        scaleRange: [0.82, 1.0],
      },
      hover: {
        liftY: -22,
        scale: 1.06,
        tiltSensitivity: 14,
        duration: 0.45,
        ease: 'power2.out',
      },
    };
  }

  if (cat.includes('light') || n.includes('lamp') || n.includes('night') || cat.includes('silicone') || n.includes('flashlight')) {
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

  if (cat.includes('food') || cat.includes('spice') || n.includes('jam') || n.includes('masala') || n.includes('tea') || n.includes('sugar') || n.includes('pickle')) {
    return {
      weightCategory: 'pantry-goods',
      float: {
        amplitudeY: 15,
        duration: 3.6,
        ease: 'sine.inOut',
        rotationDriftZ: 1.8,
        rotationDriftX: 2.8,
      },
      shadow: {
        baseBlur: 22,
        spread: -4,
        minOpacity: 0.22,
        maxOpacity: 0.50,
        scaleRange: [0.84, 1.0],
      },
      hover: {
        liftY: -18,
        scale: 1.05,
        tiltSensitivity: 13,
        duration: 0.42,
        ease: 'power2.out',
      },
    };
  }

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

const WAVES = {
  1: [
    {
      id: 'stainless-bottle-300ml',
      name: 'Stainless Bottle 300ml',
      category: 'Drinkware',
      input: path.resolve(__dirname, '../.tmp/stainless-bottle-300ml.jpeg'),
    },
    {
      id: 'smiley-night-light',
      name: 'Smiley Night Light',
      category: 'Lighting',
      input: path.resolve(__dirname, '../.tmp/smiley-night-light.jpeg'),
    },
    {
      id: 'niyama-electric-kettle',
      name: 'Niyama Electric Kettle',
      category: 'Appliances',
      input: path.resolve(__dirname, '../.tmp/niyama-electric-kettle.jpeg'),
    },
    {
      id: 'prestige-vacuum-flask',
      name: 'Prestige Vacuum Flask',
      category: 'Drinkware',
      input: path.resolve(__dirname, '../.tmp/prestige-vacuum-flask.jpeg'),
    },
  ],
  2: [
    {
      id: 'ruilang-flashlight-orange',
      name: 'Ruilang LED Flashlight (Orange)',
      category: 'Tools & Lighting',
      input: path.resolve(__dirname, '../.tmp/ruilang-flashlight-orange.jpeg'),
    },
    {
      id: 'lsaga-doorbell-white',
      name: 'Lsaga Smart Wireless Doorbell',
      category: 'Electronics',
      input: path.resolve(__dirname, '../.tmp/lsaga-doorbell-white.jpeg'),
    },
    {
      id: 'bulb-humidifier',
      name: 'Glass Bulb Ultrasonic Humidifier',
      category: 'Home & Lifestyle',
      input: path.resolve(__dirname, '../.tmp/bulb-humidifier.jpeg'),
    },
    {
      id: 'multifunctional-cleaning-brush',
      name: 'Multifunctional Cleaning Brush',
      category: 'Home & Tools',
      input: path.resolve(__dirname, '../.tmp/multifunctional-cleaning-brush.jpeg'),
    },
  ],
  3: [
    {
      id: 'toktalk-dragon-fruit-jam',
      name: 'Toktalk Dragon Fruit Jam',
      category: 'Food & Pantry',
      input: path.resolve(__dirname, '../.tmp/toktalk-dragon-fruit-jam.jpeg'),
    },
    {
      id: 'khas-dawat-meat-masala',
      name: 'Khas Dawat Meat Masala',
      category: 'Food & Spices',
      input: path.resolve(__dirname, '../.tmp/khas-dawat-meat-masala.jpeg'),
    },
    {
      id: 'khas-dawat-chicken-masala',
      name: 'Khas Dawat Chicken Masala',
      category: 'Food & Spices',
      input: path.resolve(__dirname, '../.tmp/khas-dawat-chicken-masala.jpeg'),
    },
    {
      id: 'fresh-green-tea',
      name: 'Fresh Premium Green Tea',
      category: 'Beverages',
      input: path.resolve(__dirname, '../.tmp/fresh-green-tea.jpeg'),
    },
  ],
  4: [
    {
      id: 'travel-portable-stand',
      name: 'Travel Portable Stand',
      category: 'Tech Accessories',
      input: path.resolve(__dirname, '../.tmp/travel-portable-stand.jpeg'),
    },
    {
      id: 'rechargeable-zoom-flashlight-blue',
      name: 'Rechargeable Zoom LED Flashlight (Blue)',
      category: 'Tools & Lighting',
      input: path.resolve(__dirname, '../.tmp/rechargeable-zoom-flashlight-blue.jpeg'),
    },
    {
      id: 'solar-wall-lamp',
      name: 'Solar Interaction Wall Lamp',
      category: 'Lighting',
      input: path.resolve(__dirname, '../.tmp/solar-wall-lamp.jpeg'),
    },
    {
      id: 'seed-paper-calendar',
      name: 'Grow Green 2027 Seed Paper Calendar',
      category: 'Stationery & Gifts',
      input: path.resolve(__dirname, '../.tmp/seed-paper-calendar.jpeg'),
    },
    {
      id: 'prestige-electric-kettle-1l',
      name: 'Prestige Electric Kettle 1.0L (White)',
      category: 'Appliances',
      input: path.resolve(__dirname, '../.tmp/prestige-electric-kettle-1l.jpeg'),
    },
  ],
  5: [
    {
      id: 'high-power-flashlight-pink',
      name: 'High Power Flashlight (Pink)',
      category: 'Tools & Lighting',
      input: path.resolve(__dirname, '../.tmp/high-power-flashlight-pink.jpeg'),
    },
    {
      id: 'ruilang-flashlight-pink',
      name: 'Ruilang LED Flashlight (Pink)',
      category: 'Tools & Lighting',
      input: path.resolve(__dirname, '../.tmp/ruilang-flashlight-pink.jpeg'),
    },
    {
      id: '3in1-vacuum-cleaner',
      name: '3-in-1 Mini Vacuum Cleaner',
      category: 'Appliances',
      input: path.resolve(__dirname, '../.tmp/3in1-vacuum-cleaner.jpeg'),
    },
    {
      id: 'lsaga-doorbell-black',
      name: 'LSAGA Wireless Doorbell (Black)',
      category: 'Electronics',
      input: path.resolve(__dirname, '../.tmp/lsaga-doorbell-black.jpeg'),
    },
    {
      id: 'uteki-toothbrush-cup',
      name: 'UTEKI Simple Toothbrush Cup Holder',
      category: 'Home & Living',
      input: path.resolve(__dirname, '../.tmp/uteki-toothbrush-cup.jpeg'),
    },
    {
      id: 'warm-handbag',
      name: 'AGT Warm Handbag (Graphene Heated)',
      category: 'Lifestyle & Wellness',
      input: path.resolve(__dirname, '../.tmp/warm-handbag.jpeg'),
    },
  ],
  6: [
    {
      id: 'silver-crest-food-grinder',
      name: 'Silver Crest Electric Food Grinder',
      category: 'Appliances',
      input: path.resolve(__dirname, '../.tmp/silver-crest-food-grinder.jpeg'),
    },
    {
      id: 'prestige-electric-kettle-2l',
      name: 'Prestige Electric Kettle 2.0L',
      category: 'Appliances',
      input: path.resolve(__dirname, '../.tmp/prestige-electric-kettle-2l.jpeg'),
    },
    {
      id: 'toktalk-pickles-combo',
      name: 'Toktalk Gourmet Pickles Combo',
      category: 'Food & Pantry',
      input: path.resolve(__dirname, '../.tmp/toktalk-pickles-combo.jpeg'),
    },
    {
      id: 'fresh-refined-sugar',
      name: 'Fresh Refined Sugar 1kg',
      category: 'Food & Pantry',
      input: path.resolve(__dirname, '../.tmp/fresh-refined-sugar.jpeg'),
    },
    {
      id: 'smart-bag-sealer',
      name: 'Smart Bag Sealer',
      category: 'Kitchen Gadgets',
      input: path.resolve(__dirname, '../.tmp/smart-bag-sealer.jpeg'),
    },
    {
      id: 'khas-dawat-biryani-masala',
      name: 'Khas Dawat Biryani Masala',
      category: 'Food & Spices',
      input: path.resolve(__dirname, '../.tmp/khas-dawat-biryani-masala.jpeg'),
    },
  ],
};

async function run() {
  const args = process.argv.slice(2);
  const getArg = (flag, defaultVal) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultVal;
  };

  const waveNum = parseInt(getArg('--wave', '2'), 10);
  const productsToProcess = WAVES[waveNum] || WAVES[2];

  const outDir = path.resolve(__dirname, '../public/images/products');
  const originalsDir = path.resolve(__dirname, '../public/images/originals');
  const dataDir = path.resolve(__dirname, '../public/data');
  const masterCatalogPath = path.join(dataDir, 'products.json');

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(originalsDir, { recursive: true });
  fs.mkdirSync(dataDir, { recursive: true });

  console.log('====================================================');
  console.log(`AGT 2D BATCH PIPELINE: PROCESSING WAVE ${waveNum}`);
  console.log(`Total Products to Process: ${productsToProcess.length}`);
  console.log('====================================================');

  console.log('[INIT] Connecting to BRIA AI RMBG-1.4 (Unlimited CPU Engine)...');
  const app = await Client.connect('briaai/BRIA-RMBG-1.4');
  console.log('[INIT] Connected successfully.\n');

  let masterCatalog = [];
  if (fs.existsSync(masterCatalogPath)) {
    try {
      masterCatalog = JSON.parse(fs.readFileSync(masterCatalogPath, 'utf-8'));
    } catch {
      masterCatalog = [];
    }
  }

  for (let i = 0; i < productsToProcess.length; i++) {
    const item = productsToProcess[i];
    const indexStr = `[${i + 1}/${productsToProcess.length}]`;
    console.log(`----------------------------------------------------`);
    console.log(`${indexStr} Processing: ${item.name} (${item.id})`);

    if (!fs.existsSync(item.input)) {
      console.warn(`[SKIP] Source image not found: ${item.input}`);
      continue;
    }

    // Copy to public/images/originals
    const originalDest = path.join(originalsDir, `${item.id}.jpeg`);
    fs.copyFileSync(item.input, originalDest);

    const itemStart = Date.now();

    // Step 1: AI Background Removal
    console.log(`  1. Removing background via RMBG-1.4...`);
    const bgRes = await app.predict('/run', {
      image: handle_file(item.input),
    });

    const transparentFileObj = bgRes.data[1];
    const downloadUrl = transparentFileObj?.url;
    if (!downloadUrl) {
      console.error(`  [ERROR] No transparent file returned for ${item.id}`);
      continue;
    }

    const rawPngBuffer = await downloadBuffer(downloadUrl);

    // Step 2: sharp Trimming and WebP conversion
    console.log(`  2. Trimming alpha margins & encoding WebP...`);
    const outputWebp = path.join(outDir, `${item.id}.webp`);
    const outputManifest = path.join(outDir, `${item.id}.json`);

    const trimmed = sharp(rawPngBuffer).trim();
    trimmed.resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    });

    const optimizedWebpBuffer = await trimmed
      .webp({
        quality: 90,
        effort: 6,
        alphaQuality: 100,
        lossless: false,
      })
      .toBuffer();

    fs.writeFileSync(outputWebp, optimizedWebpBuffer);

    const finalMeta = await sharp(optimizedWebpBuffer).metadata();
    const webpSizeKb = (fs.statSync(outputWebp).size / 1024).toFixed(1);

    // Step 3: GSAP Manifest
    console.log(`  3. Generating GSAP physics manifest...`);
    const gsapPhysics = getGsapProfile(item.category, item.name);

    const manifest = {
      id: item.id,
      name: item.name,
      category: item.category,
      format: 'webp',
      image: {
        url: `/images/products/${item.id}.webp`,
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
    };

    fs.writeFileSync(outputManifest, JSON.stringify(manifest, null, 2), 'utf-8');

    // Update master catalog
    const existingIdx = masterCatalog.findIndex((p) => p.id === item.id);
    if (existingIdx !== -1) {
      masterCatalog[existingIdx] = manifest;
    } else {
      masterCatalog.push(manifest);
    }

    const elapsed = ((Date.now() - itemStart) / 1000).toFixed(1);
    console.log(`  ✅ Done in ${elapsed}s -> ${outputWebp} (${finalMeta.width}x${finalMeta.height}px, ${webpSizeKb} KB)`);
  }

  fs.writeFileSync(masterCatalogPath, JSON.stringify(masterCatalog, null, 2), 'utf-8');

  console.log('\n====================================================');
  console.log(`ALL PRODUCTS COMPLETED!`);
  console.log(`Master Catalog updated: ${masterCatalogPath} (${masterCatalog.length} products total)`);
  console.log('====================================================');
}

run().catch((err) => {
  console.error('[FATAL BATCH ERROR]', err);
  process.exit(1);
});
