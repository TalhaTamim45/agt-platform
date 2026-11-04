import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Client, handle_file } from '@gradio/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOWNLOAD_DIR = 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-11-04 at 10.36.56 AM';
const OUT_DIR = path.resolve(__dirname, '../public/images/products');
const DATA_DIR = path.resolve(__dirname, '../public/data');
const MASTER_CATALOG_PATH = path.join(DATA_DIR, 'products.json');

const PRODUCTS = [
  {
    serial: 'AGT-104',
    id: 'eye-anatomy-desk-organizer',
    name: 'Eye Anatomy Medical Desk Organizer & Memo Stand',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.20 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-105',
    id: 'desktop-organizer-dual-drawers',
    name: 'Multi-Compartment Desktop Organizer with 2 Mini Drawers',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.21 AM (1).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-106',
    id: 'transparent-multigrid-storage-box',
    name: 'Multi-Grid Transparent Hardware & Craft Storage Box',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.21 AM (2).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-107',
    id: 'wall-mounted-eyewear-holder',
    name: 'Wall-Mounted Eyewear & Sunglasses Storage Holder',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.21 AM (3).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-108',
    id: 'bangladesh-map-maze-puzzle',
    name: 'Bangladesh Map Steel Ball Balance Maze Puzzle Game',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.21 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-109',
    id: 'standard-magnetic-chess-board',
    name: 'Standard Magnetic Folding Chess Board & Mat',
    category: 'Sports & Fitness',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.22 AM (1).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-110',
    id: '2in1-wall-charging-eyewear-holder',
    name: '2-in-1 Wall-Mounted Phone Charger & Eyewear Organizer',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.22 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-111',
    id: 'joyfeel-soap-pump-sponge-caddy',
    name: 'Joyfeel 2-in-1 Soap Pump Dispenser & Sponge Caddy',
    category: 'Kitchen & Appliances',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.23 AM (1).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-112',
    id: 'cochunsen-wall-soap-dish',
    name: 'COCHUNSEN Luxury Wall-Mounted Soap Dish Holder',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.23 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-113',
    id: 'sticky-note-index-tabs-dispenser',
    name: 'Multi-Color Sticky Note Index Tabs & Memo Dispenser',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.24 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-114',
    id: 'cochunsen-wall-soap-dish-pack',
    name: 'COCHUNSEN Wall-Mounted Soap Dish (Retail Pack)',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.25 AM (1).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-115',
    id: 'dental-anatomy-tooth-pen-stand',
    name: 'Dental Anatomy "Structure of Tooth" Rotating Desk Pen Stand',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.25 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-116',
    id: 'automatic-popup-toothpick-dispenser',
    name: 'Automatic Pop-Up Press Toothpick Dispenser',
    category: 'Kitchen & Appliances',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.26 AM (1).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-117',
    id: 'modular-stackable-mini-drawers',
    name: 'Modular Stackable Desktop Mini Drawer Storage Set',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.26 AM.jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-118',
    id: 'stationery-organizer-2027-calendar',
    name: 'Office Desk Stationery Organizer with 2027 Flip Calendar',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.28 AM (1).jpeg',
    bulkDiscount: '3-5% discount on bulk orders',
  },
  {
    serial: 'AGT-119',
    id: '4compartment-stationery-clips-box',
    name: '4-Compartment Office Stationery Box with Clips & Push Pins',
    category: 'Home & Lifestyle',
    filename: 'WhatsApp Image 2026-11-04 at 10.32.28 AM.jpeg',
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

  if (cat.includes('kitchen') || n.includes('pump') || n.includes('dispenser') || n.includes('bottle')) {
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

  if (n.includes('chess') || n.includes('box') || n.includes('storage') || n.includes('tray')) {
    return {
      weightCategory: 'balanced',
      float: {
        amplitudeY: 15,
        duration: 3.6,
        ease: 'sine.inOut',
        rotationDriftZ: 2.0,
        rotationDriftX: 2.8,
      },
      shadow: {
        baseBlur: 22,
        spread: -3,
        minOpacity: 0.24,
        maxOpacity: 0.46,
        scaleRange: [0.86, 1.0],
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

  return {
    weightCategory: 'light-buoyant',
    float: {
      amplitudeY: 20,
      duration: 4.2,
      ease: 'power1.inOut',
      rotationDriftZ: 3.0,
      rotationDriftX: 4.0,
    },
    shadow: {
      baseBlur: 28,
      spread: -5,
      minOpacity: 0.18,
      maxOpacity: 0.42,
      scaleRange: [0.78, 1.0],
    },
    hover: {
      liftY: -24,
      scale: 1.07,
      tiltSensitivity: 16,
      duration: 0.48,
      ease: 'power2.out',
    },
  };
}

async function run() {
  console.log('====================================================');
  console.log('AGT BATCH PIPELINE: 16 PRODUCTS INGESTION (NOV 04)');
  console.log('====================================================');

  const startTime = Date.now();
  console.log('Connecting to BRIA AI RMBG-1.4...');
  let app = await Client.connect('briaai/BRIA-RMBG-1.4');
  console.log('Connected to BRIA space successfully!\n');

  const newManifests = [];

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    const inputPath = path.join(DOWNLOAD_DIR, p.filename);
    const outputWebp = path.join(OUT_DIR, `${p.id}.webp`);
    console.log(`[${i + 1}/${PRODUCTS.length}] Starting ${p.serial}: ${p.name}`);

    if (!fs.existsSync(inputPath)) {
      throw new Error(`File not found: ${inputPath}`);
    }

    let success = false;
    let attempts = 0;
    while (!success && attempts < 3) {
      attempts++;
      try {
        console.log(`  -> Stripping background (attempt ${attempts})...`);
        const bgRes = await app.predict('/run', { image: handle_file(inputPath) });
        const transparentFileObj = bgRes.data[1];
        const downloadUrl = transparentFileObj?.url;

        if (!downloadUrl) throw new Error('No URL returned by background removal model');

        console.log(`  -> Downloading transparent image...`);
        const rawPngBuffer = await downloadBuffer(downloadUrl);

        console.log(`  -> Trimming alpha edges and encoding WebP...`);
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
            strippedWith: 'BRIA AI RMBG-1.4',
            optimizedWith: 'sharp libvips',
            createdAt: new Date().toISOString(),
          },
          serial: p.serial,
          bulkDiscount: p.bulkDiscount,
        };

        newManifests.push(manifest);
        console.log(`  ✓ Completed: ${finalMeta.width}x${finalMeta.height}px, ${webpSizeKb} KB\n`);
        success = true;
      } catch (err) {
        console.warn(`  ! Attempt ${attempts} failed: ${err.message}`);
        if (attempts >= 3) throw err;
        console.log('  Reconnecting to BRIA...');
        app = await Client.connect('briaai/BRIA-RMBG-1.4');
      }
    }
  }

  // Update Master Catalog
  console.log('Updating public/data/products.json...');
  let masterCatalog = JSON.parse(fs.readFileSync(MASTER_CATALOG_PATH, 'utf-8'));

  // Remove existing entries with same ID if any
  const newIds = new Set(newManifests.map((m) => m.id));
  masterCatalog = masterCatalog.filter((m) => !newIds.has(m.id));

  // The user rule: "notun products always first e add hobe, last e hobe na" and "Z-A kore daw"
  // newManifests has AGT-104 to AGT-119.
  // In Z-A order, AGT-119 is highest and comes first, down to AGT-104, then AGT-103, ... AGT-01
  const sortedNew = [...newManifests].sort((a, b) => {
    const numA = parseInt(a.serial.replace(/\D/g, ''), 10);
    const numB = parseInt(b.serial.replace(/\D/g, ''), 10);
    return numB - numA;
  });

  const updatedCatalog = [...sortedNew, ...masterCatalog];

  fs.writeFileSync(MASTER_CATALOG_PATH, JSON.stringify(updatedCatalog, null, 2), 'utf-8');

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
