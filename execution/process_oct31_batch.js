import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Client, handle_file } from '@gradio/client';

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

  if (cat.includes('food') || cat.includes('beverage') || n.includes('snack') || n.includes('candy') || n.includes('wafer') || n.includes('chocolate')) {
    return {
      weightCategory: 'light-packaged',
      float: {
        amplitudeY: 15,
        duration: 3.2,
        ease: 'sine.inOut',
        rotationDriftZ: 2.0,
        rotationDriftX: 2.5,
      },
      shadow: {
        baseBlur: 20,
        spread: -4,
        minOpacity: 0.20,
        maxOpacity: 0.45,
        scaleRange: [0.85, 1.0],
      },
      hover: {
        liftY: -16,
        scale: 1.05,
        tiltSensitivity: 10,
        duration: 0.4,
        ease: 'power2.out',
      },
    };
  }

  if (cat.includes('drink') || n.includes('bottle') || n.includes('flask') || n.includes('kettle')) {
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

const ITEMS_TO_PROCESS = [
  {
    serial: 'AGT-89',
    id: 'wooden-desk-organizer-calendar',
    name: 'Wooden Desk Organizer with 2027 Calendar & Pen Stand',
    category: 'Home & Lifestyle',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.48.08 PM/WhatsApp Image 2026-10-31 at 4.47.16 PM.jpeg'
  },
  {
    serial: 'AGT-90',
    id: '4-qul-islamic-golden-frame',
    name: '4 Qul Surah Islamic Calligraphy Golden Wall Art Frame',
    category: 'Home & Lifestyle',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.48.08 PM/WhatsApp Image 2026-10-31 at 4.47.17 PM.jpeg'
  },
  {
    serial: 'AGT-91',
    id: 'kokola-majorico-white-chocolate',
    name: 'Kokola Majorico White Chocolate Wafer Roll (Tub)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.48.08 PM/WhatsApp Image 2026-10-31 at 4.47.18 PM.jpeg'
  },
  {
    serial: 'AGT-92',
    id: 'avena-oat-milk-snack-bar',
    name: 'Avena Oat Milk High-Fibre Snack Bar (120g)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.37 PM.jpeg'
  },
  {
    serial: 'AGT-93',
    id: 'erko-mallow-world-marshmallows',
    name: 'Erko Mallow World Pink & White Marshmallows (150g)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.37 PM (1).jpeg'
  },
  {
    serial: 'AGT-94',
    id: 'kokola-majorico-chocolate-wafer',
    name: 'Kokola Majorico Chocolate Cream Wafer Roll (120g Tub)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.37 PM (2).jpeg'
  },
  {
    serial: 'AGT-95',
    id: 'mazzex-oat-snack-party-mix',
    name: 'Mazzex Oat Snack Party Mix - Original & Chocolate (400g)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.38 PM.jpeg'
  },
  {
    serial: 'AGT-96',
    id: 'mazzex-oat-snack-no-sugar',
    name: 'Mazzex Oat Snack - No Added Sugar (120g)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.38 PM (1).jpeg'
  },
  {
    serial: 'AGT-97',
    id: 'mazzex-oat-snack-original-400g',
    name: 'Mazzex Oat Snack Favorite Original Value Pack (400g)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.39 PM.jpeg'
  },
  {
    serial: 'AGT-98',
    id: 'mazzex-oat-snack-strawberry',
    name: 'Mazzex Oat Snack Strawberry - No Added Sugar (120g)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.39 PM (1).jpeg'
  },
  {
    serial: 'AGT-99',
    id: 'sweet-sour-candy-grape-tin',
    name: 'Sweet & Sour Soft & Fruity Candy - Grape (128g Tin)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.39 PM (2).jpeg'
  },
  {
    serial: 'AGT-100',
    id: 'sweet-sour-candy-peach-tin',
    name: 'Sweet & Sour Soft & Fruity Candy - Peach (128g Tin)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/WhatsApp Unknown 2026-10-31 at 4.49.46 PM/WhatsApp Image 2026-10-31 at 4.48.40 PM.jpeg'
  },
  {
    serial: 'AGT-101',
    id: '4in1-travel-pump-bottle',
    name: '4-in-1 TSA Travel Dispenser Pump Bottle Set',
    category: 'Health & Personal Care',
    inputPath: 'C:/Users/Hi/Downloads/,/WhatsApp Image 2026-10-31 at 4.49.19 PM.jpeg'
  },
  {
    serial: 'AGT-102',
    id: 'cococraft-date-chocolate-box',
    name: 'Cococraft Luxury Date Chocolate Box (16 Pcs / 240g)',
    category: 'Food & Beverages',
    inputPath: 'C:/Users/Hi/Downloads/,/WhatsApp Image 2026-10-31 at 4.49.21 PM.jpeg'
  },
  {
    serial: 'AGT-103',
    id: 'smart-electric-scalp-massager',
    name: 'Smart Electric Cordless Scalp & Head Massager',
    category: 'Health & Personal Care',
    inputPath: 'C:/Users/Hi/Downloads/,/WhatsApp Image 2026-10-31 at 4.50.11 PM.jpeg'
  }
];

async function main() {
  const outDir = path.resolve(__dirname, '../public/images/products');
  const masterCatalogPath = path.resolve(__dirname, '../public/data/products.json');

  let masterCatalog = JSON.parse(fs.readFileSync(masterCatalogPath, 'utf-8'));

  console.log(`Connecting to BRIA AI RMBG-1.4 Space...`);
  const app = await Client.connect('briaai/BRIA-RMBG-1.4');
  console.log(`Connected! Starting batch of ${ITEMS_TO_PROCESS.length} items.\n`);

  for (let i = 0; i < ITEMS_TO_PROCESS.length; i++) {
    const item = ITEMS_TO_PROCESS[i];
    const indexStr = `[${i + 1}/${ITEMS_TO_PROCESS.length}]`;
    console.log(`${indexStr} Processing ${item.serial} (${item.id}): ${item.name}...`);

    if (!fs.existsSync(item.inputPath)) {
      console.error(`  [ERROR] File not found: ${item.inputPath}`);
      continue;
    }

    const startTime = Date.now();
    try {
      // Step 1: Remove background
      const bgRes = await app.predict('/run', {
        image: handle_file(item.inputPath),
      });

      const transparentObj = bgRes.data[1];
      if (!transparentObj?.url) {
        throw new Error('No URL returned from RMBG-1.4');
      }

      const pngBuf = await downloadBuffer(transparentObj.url);

      // Step 2: Trim and convert to WebP max 850px
      const outputWebp = path.join(outDir, `${item.id}.webp`);
      const trimmed = sharp(pngBuf).trim();
      trimmed.resize({
        width: 850,
        height: 850,
        fit: 'inside',
        withoutEnlargement: true,
      });

      const webpBuf = await trimmed
        .webp({
          quality: 90,
          effort: 6,
          alphaQuality: 100,
          lossless: false,
        })
        .toBuffer();

      fs.writeFileSync(outputWebp, webpBuf);

      const finalMeta = await sharp(webpBuf).metadata();
      const webpSizeKb = (fs.statSync(outputWebp).size / 1024).toFixed(1);

      // Step 3: GSAP Manifest
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
        serial: item.serial,
        bulkDiscount: '3-5% discount on higher quantity',
      };

      // Add to masterCatalog
      const existingIdx = masterCatalog.findIndex((p) => p.id === item.id);
      if (existingIdx !== -1) {
        masterCatalog[existingIdx] = manifest;
      } else {
        masterCatalog.push(manifest);
      }

      // Save catalog after every item for persistence
      fs.writeFileSync(masterCatalogPath, JSON.stringify(masterCatalog, null, 2), 'utf-8');

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  -> OK! Exported ${finalMeta.width}x${finalMeta.height} (${webpSizeKb} KB) in ${elapsed}s.`);
    } catch (err) {
      console.error(`  [FAILED] ${item.id}:`, err.message);
    }
  }

  console.log('\n====================================================');
  console.log(`BATCH COMPLETE. Total products in catalog: ${masterCatalog.length}`);
  console.log('====================================================');
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});

