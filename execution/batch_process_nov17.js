import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Client, handle_file } from '@gradio/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOWNLOAD_DIR = 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-11-17 at 11.27.18 AM';
const OUT_DIR = path.resolve(__dirname, '../public/images/products');
const DATA_DIR = path.resolve(__dirname, '../public/data');
const MASTER_CATALOG_PATH = path.join(DATA_DIR, 'products.json');

const PRODUCTS = [
  {
    serial: 'AGT-120',
    id: 'anjani-2in1-vegetable-cutter',
    name: 'Anjani 2-in-1 Manual String Vegetable Cutter & Chopper',
    category: 'Kitchen & Appliances',
    filename: '1eee7d0e-08e8-4c46-a86f-2ab46cfaae3e.jpg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-121',
    id: 'brodu-bts2409-bluetooth-speaker',
    name: 'Brodu BTS-2409 Portable Wireless Bluetooth Speaker with RGB Light',
    category: 'Electronics & Gadgets',
    filename: 'f94f1c59-b8c3-41c0-b0f6-ad5bb6ffcb47.jpg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-122',
    id: 'medical-capsule-resin-desk-calendar',
    name: 'Medical Capsule Resin Desk Flip Calendar 2027',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-17 at 11.25.22 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-123',
    id: 'cocoa-lab-orange-dark-chocolate',
    name: 'Cocoa Lab Artisan Dark Chocolate with Orange Delight (Bar)',
    category: 'Food & Beverages',
    filename: 'WhatsApp Image 2026-11-17 at 11.25.25 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-124',
    id: 'cococraft-hazelnut-dark-chocolate',
    name: 'Cococraft Artisan Dark Chocolate & Hazelnut Cream (Bar)',
    category: 'Food & Beverages',
    filename: 'WhatsApp Image 2026-11-17 at 11.25.26 AM (1).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-125',
    id: 'cocoa-lab-almond-milk-chocolate',
    name: 'Cocoa Lab Artisan Milk Chocolate & Roasted Almond (Bar)',
    category: 'Food & Beverages',
    filename: 'WhatsApp Image 2026-11-17 at 11.25.26 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-126',
    id: 'cocoa-lab-gold-birthday-chocolate',
    name: 'Cocoa Lab "Happy Birthday" Luxury Embossed Gold Chocolate Bar',
    category: 'Food & Beverages',
    filename: 'WhatsApp Image 2026-11-17 at 11.25.27 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-127',
    id: 'cocoa-lab-spicy-dark-chocolate',
    name: 'Cocoa Lab Artisan Spicy Dark Chocolate (Bar)',
    category: 'Food & Beverages',
    filename: 'WhatsApp Image 2026-11-17 at 11.25.28 AM (1).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-128',
    id: 'cocoa-lab-coffee-dark-chocolate',
    name: 'Cocoa Lab Artisan Dark Chocolate & Coffee Cream (Bar)',
    category: 'Food & Beverages',
    filename: 'WhatsApp Image 2026-11-17 at 11.25.28 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-129',
    id: 'portable-folding-bbq-grill-stove',
    name: 'Portable Folding Charcoal BBQ Grill & Skewer Barbecue Stove',
    category: 'Kitchen & Appliances',
    filename: 'WhatsApp Image 2026-11-17 at 11.25.29 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
];

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function getGsapProfile(category, name) {
  const cat = (category || '').toLowerCase();
  const n = (name || '').toLowerCase();

  if (cat.includes('kitchen') || n.includes('grill') || n.includes('cutter') || n.includes('speaker') || cat.includes('electronics')) {
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

  if (cat.includes('food') || n.includes('chocolate') || n.includes('bar')) {
    return {
      weightCategory: 'light-buoyant',
      float: {
        amplitudeY: 22,
        duration: 4.4,
        ease: 'power1.inOut',
        rotationDriftZ: 3.2,
        rotationDriftX: 4.2,
      },
      shadow: {
        baseBlur: 28,
        spread: -5,
        minOpacity: 0.18,
        maxOpacity: 0.42,
        scaleRange: [0.78, 1.0],
      },
      hover: {
        liftY: -26,
        scale: 1.07,
        tiltSensitivity: 16,
        duration: 0.48,
        ease: 'power2.out',
      },
    };
  }

  return {
    weightCategory: 'balanced',
    float: {
      amplitudeY: 16,
      duration: 3.6,
      ease: 'sine.inOut',
      rotationDriftZ: 2.2,
      rotationDriftX: 3.0,
    },
    shadow: {
      baseBlur: 22,
      spread: -3,
      minOpacity: 0.22,
      maxOpacity: 0.46,
      scaleRange: [0.84, 1.0],
    },
    hover: {
      liftY: -20,
      scale: 1.05,
      tiltSensitivity: 12,
      duration: 0.42,
      ease: 'power2.out',
    },
  };
}

async function removeBackground(birefnetApp, briaApp, inputPath, isComplex = false) {
  // Use BiRefNet for complex scenes (with hands or table clutter), or as primary
  if (isComplex && birefnetApp) {
    try {
      const res = await birefnetApp.predict('/image', {
        images: handle_file(inputPath),
        resolution: '1024x1024',
        weights_file: 'General',
      });
      const downloadUrl = res.data[0][1]?.url;
      if (downloadUrl) return await downloadBuffer(downloadUrl);
    } catch (err) {
      console.warn(`    [BiRefNet Error] ${err.message}. Falling back to BRIA...`);
    }
  }

  // Fallback / standard with BRIA RMBG-1.4
  if (briaApp) {
    try {
      const res = await briaApp.predict('/run', { image: handle_file(inputPath) });
      const transparentFileObj = res.data[1];
      const downloadUrl = transparentFileObj?.url;
      if (downloadUrl) return await downloadBuffer(downloadUrl);
    } catch (err) {
      console.warn(`    [BRIA Error] ${err.message}`);
    }
  }

  // If still not returned and birefnetApp available, try BiRefNet
  if (birefnetApp) {
    const res = await birefnetApp.predict('/image', {
      images: handle_file(inputPath),
      resolution: '1024x1024',
      weights_file: 'General',
    });
    const downloadUrl = res.data[0][1]?.url;
    if (downloadUrl) return await downloadBuffer(downloadUrl);
  }

  throw new Error(`Failed to remove background for ${inputPath}`);
}

async function run() {
  console.log('====================================================');
  console.log('AGT BATCH PIPELINE: 10 NEW PRODUCTS (NOV 17 BATCH)');
  console.log('====================================================');

  const startTime = Date.now();

  console.log('Connecting to BiRefNet and BRIA spaces...');
  let birefnetApp = null;
  let briaApp = null;

  try {
    birefnetApp = await Client.connect('ZhengPeng7/BiRefNet_demo');
    console.log('  ✓ Connected to BiRefNet Space');
  } catch (e) {
    console.warn('  ! BiRefNet connect failed:', e.message);
  }

  try {
    briaApp = await Client.connect('briaai/BRIA-RMBG-1.4');
    console.log('  ✓ Connected to BRIA RMBG-1.4 Space');
  } catch (e) {
    console.warn('  ! BRIA connect failed:', e.message);
  }

  if (!birefnetApp && !briaApp) {
    throw new Error('Both background removal services failed to connect!');
  }

  const newManifests = [];

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    const inputPath = path.join(DOWNLOAD_DIR, p.filename);
    const outputWebp = path.join(OUT_DIR, `${p.id}.webp`);
    console.log(`\n[${i + 1}/${PRODUCTS.length}] Starting ${p.serial}: ${p.name}`);

    if (!fs.existsSync(inputPath)) {
      throw new Error(`File not found: ${inputPath}`);
    }

    const isComplex =
      p.id.includes('calendar') ||
      p.id.includes('gold-birthday') ||
      p.id.includes('bbq-grill');

    console.log(`  -> Removing background (isComplex: ${isComplex})...`);
    const rawPngBuffer = await removeBackground(birefnetApp, briaApp, inputPath, isComplex);

    console.log(`  -> Trimming alpha margins & encoding WebP...`);
    const trimmed = sharp(rawPngBuffer).trim();
    trimmed.resize({
      width: 850,
      height: 850,
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

    const gsapPhysics = getGsapProfile(p.category, p.name);

    const manifest = {
      id: p.id,
      name: p.name,
      category: p.category,
      format: 'webp',
      image: {
        url: `/images/products/${p.id}.webp`,
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
        strippedWith: isComplex ? 'BiRefNet General' : 'BRIA AI RMBG-1.4',
        optimizedWith: 'sharp libvips',
        createdAt: new Date().toISOString(),
      },
      serial: p.serial,
      bulkDiscount: p.bulkDiscount,
    };

    newManifests.push(manifest);
    console.log(`  ✓ Completed: ${finalMeta.width}x${finalMeta.height}px, ${webpSizeKb} KB`);
  }

  // Update Master Catalog
  console.log('\nUpdating public/data/products.json...');
  let masterCatalog = JSON.parse(fs.readFileSync(MASTER_CATALOG_PATH, 'utf-8'));

  // Remove existing entries with same ID if any
  const newIds = new Set(newManifests.map((m) => m.id));
  masterCatalog = masterCatalog.filter((m) => !newIds.has(m.id));

  // Sort descending (Z-A / newest first): AGT-129 down to AGT-120
  const sortedNew = [...newManifests].sort((a, b) => {
    const numA = parseInt(a.serial.replace(/\D/g, ''), 10);
    const numB = parseInt(b.serial.replace(/\D/g, ''), 10);
    return numB - numA;
  });

  const updatedCatalog = [...sortedNew, ...masterCatalog];
  fs.writeFileSync(MASTER_CATALOG_PATH, JSON.stringify(updatedCatalog, null, 2), 'utf-8');

  // Clean intermediate test files in .tmp
  if (fs.existsSync('.tmp')) {
    const tmpFiles = fs.readdirSync('.tmp');
    for (const f of tmpFiles) {
      try {
        fs.unlinkSync(path.join('.tmp', f));
      } catch {}
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('====================================================');
  console.log(`BATCH COMPLETE: Processed ${newManifests.length} products in ${duration}s!`);
  console.log(`Catalog updated: ${updatedCatalog.length} total products.`);
  console.log(`Top item: ${updatedCatalog[0].serial} - ${updatedCatalog[0].name}`);
  console.log('====================================================');
}

run().catch((err) => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
