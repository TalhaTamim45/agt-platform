import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Client, handle_file } from '@gradio/client';

/**
 * AGT Wave 7-16 Batch Pipeline
 * Processes 49 new WhatsApp product images:
 *   1. Copy & rename from WhatsApp folder → .tmp/
 *   2. AI Background Removal via BRIA RMBG-1.4
 *   3. Sharp HQ optimization (trim, resize, WebP quality 92)
 *   4. GSAP physics manifest generation
 *   5. Master catalog update with full specs
 *
 * Usage:
 *   node --experimental-modules execution/batch_process_wave7_16.js --wave 7
 *   node --experimental-modules execution/batch_process_wave7_16.js --wave all
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Source folder ───────────────────────────────────────────────────
const SOURCE_DIR = path.resolve(
  __dirname,
  '../public/WhatsApp Unknown 2026-10-18 at 10.53.11 AM'
);

// ─── Helpers ─────────────────────────────────────────────────────────
async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── GSAP Physics Profiles ──────────────────────────────────────────
function getGsapProfile(category, name) {
  const cat = (category || '').toLowerCase();
  const n = (name || '').toLowerCase();

  // Medical / Health — heavier, steadier floats
  if (cat.includes('medical') || n.includes('blood pressure') || n.includes('nebulizer') || n.includes('oxygen') || n.includes('glucose')) {
    return {
      weightCategory: 'medical-equipment',
      float: { amplitudeY: 12, duration: 4.2, ease: 'sine.inOut', rotationDriftZ: 1.2, rotationDriftX: 1.8 },
      shadow: { baseBlur: 22, spread: -3, minOpacity: 0.28, maxOpacity: 0.55, scaleRange: [0.88, 1.0] },
      hover: { liftY: -16, scale: 1.04, tiltSensitivity: 10, duration: 0.4, ease: 'power2.out' },
    };
  }

  // Appliances — dense heavy items
  if (cat.includes('appliance') || n.includes('heater') || n.includes('cooler') || n.includes('cooker') || n.includes('panci')) {
    return {
      weightCategory: 'heavy-appliance',
      float: { amplitudeY: 10, duration: 4.5, ease: 'sine.inOut', rotationDriftZ: 1.0, rotationDriftX: 1.5 },
      shadow: { baseBlur: 26, spread: -5, minOpacity: 0.30, maxOpacity: 0.58, scaleRange: [0.90, 1.0] },
      hover: { liftY: -14, scale: 1.03, tiltSensitivity: 8, duration: 0.45, ease: 'power3.out' },
    };
  }

  // Food, Pickles, Condiments — pantry goods
  if (cat.includes('food') || cat.includes('pickle') || cat.includes('condiment') || cat.includes('beverage') || n.includes('honey') || n.includes('tea') || n.includes('pickle') || n.includes('sauce') || n.includes('mayo') || n.includes('lemon')) {
    return {
      weightCategory: 'pantry-goods',
      float: { amplitudeY: 15, duration: 3.6, ease: 'sine.inOut', rotationDriftZ: 1.8, rotationDriftX: 2.8 },
      shadow: { baseBlur: 22, spread: -4, minOpacity: 0.22, maxOpacity: 0.50, scaleRange: [0.84, 1.0] },
      hover: { liftY: -18, scale: 1.05, tiltSensitivity: 13, duration: 0.42, ease: 'power2.out' },
    };
  }

  // Kitchen Gadgets — medium
  if (cat.includes('kitchen') || n.includes('knife') || n.includes('slicer') || n.includes('chipper') || n.includes('sharpener') || n.includes('lunch box') || n.includes('napkin')) {
    return {
      weightCategory: 'medium-dense',
      float: { amplitudeY: 16, duration: 3.8, ease: 'sine.inOut', rotationDriftZ: 2.0, rotationDriftX: 3.0 },
      shadow: { baseBlur: 24, spread: -4, minOpacity: 0.22, maxOpacity: 0.52, scaleRange: [0.82, 1.0] },
      hover: { liftY: -20, scale: 1.06, tiltSensitivity: 14, duration: 0.45, ease: 'power2.out' },
    };
  }

  // Personal Care — light
  if (cat.includes('personal') || n.includes('soap') || n.includes('scrub') || n.includes('hair remover') || n.includes('nail trimmer')) {
    return {
      weightCategory: 'light-buoyant',
      float: { amplitudeY: 22, duration: 4.2, ease: 'power1.inOut', rotationDriftZ: 3.5, rotationDriftX: 4.5 },
      shadow: { baseBlur: 30, spread: -5, minOpacity: 0.16, maxOpacity: 0.40, scaleRange: [0.76, 1.0] },
      hover: { liftY: -26, scale: 1.07, tiltSensitivity: 16, duration: 0.48, ease: 'elastic.out(1, 0.75)' },
    };
  }

  // Sports & Fitness — bouncy
  if (cat.includes('sport') || cat.includes('fitness') || n.includes('exerciser') || n.includes('shuttlecock') || n.includes('shoes') || n.includes('badminton')) {
    return {
      weightCategory: 'sports-bouncy',
      float: { amplitudeY: 20, duration: 3.4, ease: 'sine.inOut', rotationDriftZ: 3.0, rotationDriftX: 4.0 },
      shadow: { baseBlur: 28, spread: -5, minOpacity: 0.18, maxOpacity: 0.45, scaleRange: [0.78, 1.0] },
      hover: { liftY: -24, scale: 1.08, tiltSensitivity: 16, duration: 0.4, ease: 'back.out(1.5)' },
    };
  }

  // Home Décor, Gifts — elegant drift
  if (cat.includes('décor') || cat.includes('gift') || cat.includes('corporate') || cat.includes('cultural') || n.includes('vase') || n.includes('clock') || n.includes('tissue')) {
    return {
      weightCategory: 'decorative-elegant',
      float: { amplitudeY: 14, duration: 4.0, ease: 'sine.inOut', rotationDriftZ: 2.0, rotationDriftX: 2.5 },
      shadow: { baseBlur: 22, spread: -4, minOpacity: 0.24, maxOpacity: 0.50, scaleRange: [0.85, 1.0] },
      hover: { liftY: -18, scale: 1.05, tiltSensitivity: 12, duration: 0.44, ease: 'power2.out' },
    };
  }

  // Lighting
  if (cat.includes('light') || n.includes('lamp') || n.includes('night light')) {
    return {
      weightCategory: 'light-buoyant',
      float: { amplitudeY: 24, duration: 4.4, ease: 'power1.inOut', rotationDriftZ: 4.0, rotationDriftX: 5.0 },
      shadow: { baseBlur: 32, spread: -6, minOpacity: 0.15, maxOpacity: 0.38, scaleRange: [0.75, 1.0] },
      hover: { liftY: -28, scale: 1.08, tiltSensitivity: 18, duration: 0.5, ease: 'elastic.out(1, 0.75)' },
    };
  }

  // Default balanced
  return {
    weightCategory: 'balanced',
    float: { amplitudeY: 16, duration: 3.5, ease: 'sine.inOut', rotationDriftZ: 2.5, rotationDriftX: 3.0 },
    shadow: { baseBlur: 20, spread: -3, minOpacity: 0.25, maxOpacity: 0.48, scaleRange: [0.85, 1.0] },
    hover: { liftY: -18, scale: 1.05, tiltSensitivity: 12, duration: 0.4, ease: 'power2.out' },
  };
}

// ─── Product Specification Generator ─────────────────────────────────
function getProductSpecs(id, name, category, priceTag) {
  const specs = {};

  // B2B Price & Bulk Discount
  if (priceTag) {
    specs.price = priceTag;
    specs.bulkDiscount = priceTag >= 1000 ? '5-8% discount on bulk orders' : '3-5% discount on higher quantity';
  } else {
    specs.price = null;
    specs.bulkDiscount = 'Contact for bulk pricing';
  }

  // Category-specific specs
  const cat = (category || '').toLowerCase();
  const n = (name || '').toLowerCase();

  if (cat.includes('medical') || cat.includes('health')) {
    specs.warranty = '1 year manufacturer warranty';
    specs.certification = 'CE / FDA Approved';
    specs.material = 'Medical-grade materials';
  } else if (cat.includes('food') || cat.includes('pickle') || cat.includes('condiment') || cat.includes('beverage')) {
    specs.shelfLife = '6-12 months';
    specs.storage = 'Cool & dry place';
    specs.certification = 'BSTI Approved';
  } else if (cat.includes('kitchen') || cat.includes('dining')) {
    specs.material = 'Stainless Steel / Food-grade Plastic';
    specs.warranty = '6 months quality guarantee';
  } else if (cat.includes('personal care')) {
    specs.skinType = 'All skin types';
    specs.certification = 'Dermatologically tested';
  } else if (cat.includes('appliance')) {
    specs.warranty = '1 year manufacturer warranty';
    specs.powerSource = 'Electric (220V-240V)';
  } else if (cat.includes('sport') || cat.includes('fitness')) {
    specs.material = 'Premium quality materials';
    specs.warranty = '3 months quality guarantee';
  } else {
    specs.warranty = '3-6 months quality guarantee';
  }

  specs.origin = 'Imported';
  specs.availability = 'In Stock';
  specs.moq = cat.includes('food') ? '50 pcs' : '20 pcs';

  return specs;
}

// ─── Complete Product Map (49 unique products) ──────────────────────
const ALL_PRODUCTS = [
  { id: 'total-body-exerciser-wheel', name: 'Total Body Exerciser AB Wheel', category: 'Fitness & Sports', price: 950, src: 'WhatsApp Image 2026-10-18 at 10.26.01 AM.jpeg' },
  { id: 'laliga-air-freshener-lemon', name: 'LaLiga 3-in-1 Air Freshener (Lemon)', category: 'Home & Fragrance', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.35 AM.jpeg' },
  { id: 'gacotouch-neem-soap', name: 'Gacotouch Triple Action Neem Soap 100g', category: 'Personal Care', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.36 AM (1).jpeg' },
  { id: 'gacotouch-flower-soap', name: 'Gacotouch Triple Action Toilet Soap (Flower) 100g', category: 'Personal Care', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.36 AM.jpeg' },
  { id: 'yonex-court-fita', name: 'Yonex Court Fita Badminton Shoes', category: 'Sports & Footwear', price: 520, src: 'WhatsApp Image 2026-10-18 at 10.47.37 AM (1).jpeg' },
  { id: 'gacotouch-apricot-scrub', name: 'Gacotouch Apricot Facial Scrub 200g', category: 'Personal Care', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.37 AM.jpeg' },
  { id: 'banglaixing-led-night-light', name: 'Banglaixing LED Mushroom Night Light 0.2W', category: 'Lighting & Torches', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.38 AM (1).jpeg' },
  { id: 'seylon-green-tea', name: 'Seylon Naturally Smooth Green Tea (25 bags)', category: 'Beverages', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.38 AM.jpeg' },
  { id: 'sti-sphygmomanometer', name: 'STI Aneroid Sphygmomanometer (BP Machine)', category: 'Medical & Health', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.39 AM.jpeg' },
  { id: 'doctor-care-glucose-meter', name: 'Doctor Care Blood Glucose Meter', category: 'Medical & Health', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.40 AM.jpeg' },
  { id: 'marble-serving-tray-gold', name: 'Premium Marble Glass Serving Tray (Gold Trim)', category: 'Home & Décor', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.41 AM.jpeg' },
  { id: 'finale-tulsi-tea', name: 'Finale Tulsi Tea (তুলসী টি) 50g, 25 bags', category: 'Beverages', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.46 AM.jpeg' },
  { id: 'honeygo-honey-sticks', name: 'Honey Go মধু Sticks (280g, 40 pcs)', category: 'Food & Pantry', price: 330, src: 'WhatsApp Image 2026-10-18 at 10.47.47 AM (1).jpeg' },
  { id: 'honeygo-mustard-honey', name: 'Honey Go Mustard Flower Honey 200g (Family Pack)', category: 'Food & Pantry', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.47 AM.jpeg' },
  { id: 'akhlaq-tamarind-sauce', name: 'Akhlaq Tamarind Sauce (তেঁতুলের সস) 350g', category: 'Food & Condiments', price: null, src: 'WhatsApp Image 2026-10-18 at 10.47.48 AM.jpeg' },
  { id: 'toktalk-beef-pickle', name: 'Toktalk Beef Pickle (গরুর মাংসের আচার) 200g', category: 'Food & Pickles', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.11 AM (1).jpeg' },
  { id: 'toktalk-amra-pickle', name: 'Toktalk Hog Plum Pickle (আমড়ার আচার) 200g', category: 'Food & Pickles', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.11 AM (2).jpeg' },
  { id: 'toktalk-garlic-pickle', name: 'Toktalk Garlic Pickle (এক কোয়া রসুনের আচার) 200g', category: 'Food & Pickles', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.11 AM.jpeg' },
  { id: 'toktalk-naga-mayo', name: 'Toktalk Naga Mayo (নাগা মেয়ো) 300g', category: 'Food & Condiments', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.12 AM (1).jpeg' },
  { id: 'toktalk-tamarind-pickle', name: 'Toktalk Tamarind Pickle (তেঁতুলের আচার) 200g', category: 'Food & Pickles', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.12 AM (2).jpeg' },
  { id: 'toktalk-garlic-mayo', name: 'Toktalk Garlic Mayo (গার্লিক মেয়ো) 200g', category: 'Food & Condiments', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.12 AM.jpeg' },
  { id: 'wooden-tissue-box', name: 'Laser-Engraved Wooden Tissue Box', category: 'Home & Décor', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.13 AM (1).jpeg' },
  { id: 'toktalk-tamarind-pickle-100g', name: 'Toktalk Tamarind Pickle 100g (Small)', category: 'Food & Pickles', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.13 AM.jpeg' },
  { id: 'dental-clock-pen-holder', name: 'Dental Tooth Clock & Pen Holder (Wooden)', category: 'Corporate Gifts', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.14 AM (1).jpeg' },
  { id: 'stainless-napkin-holder', name: 'Stainless Steel Spoon & Fork Napkin Holder', category: 'Kitchen & Dining', price: 210, src: 'WhatsApp Image 2026-10-18 at 10.48.14 AM (2).jpeg' },
  { id: 'mini-damaru-drum', name: 'Traditional Mini Damaru Drum (Handcrafted)', category: 'Gifts & Cultural', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.14 AM.jpeg' },
  { id: 'sokany-electric-heater', name: 'Sokany Electric Room Heater SK-1655 2000W', category: 'Appliances', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.15 AM (1).jpeg' },
  { id: 'samurai-mosquito-swatter', name: 'Samurai Electric Mosquito Swatter (USB-C)', category: 'Home & Tools', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.15 AM.jpeg' },
  { id: 'procare-hot-cold-pack', name: 'Procare Med-Therm Hot & Cold Therapy Pack', category: 'Medical & Health', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.16 AM (1).jpeg' },
  { id: 'clock-shape-mobile-holder', name: 'Clock Shape Mobile Holder (Wall Mount) AP-2026', category: 'Tech Accessories', price: 210, src: 'WhatsApp Image 2026-10-18 at 10.48.16 AM.jpeg' },
  { id: 'smart-warm-palace-belt', name: 'Smart Warm Palace Belt (Menstrual Heating Pad)', category: 'Lifestyle & Wellness', price: 540, src: 'WhatsApp Image 2026-10-18 at 10.48.17 AM (1).jpeg' },
  { id: 'sensa-light-hair-remover', name: 'Sensa-Light Rechargeable Hair Remover', category: 'Personal Care', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.17 AM.jpeg' },
  { id: 'mesh-nebulizer', name: 'Portable Mesh Nebulizer JSL-W302', category: 'Medical & Health', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.18 AM (1).jpeg' },
  { id: 'doctor-care-bp-kit', name: 'Doctor Care Aneroid Blood Pressure Kit MC-50B', category: 'Medical & Health', price: 1250, src: 'WhatsApp Image 2026-10-18 at 10.48.18 AM.jpeg' },
  { id: 'ornate-clock-pen-holder', name: 'Ornate Black & Gold Clock with Pen Holder', category: 'Corporate Gifts', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.19 AM (1).jpeg' },
  { id: 'sti-oxygen-flow-meter', name: 'STI Medical Oxygen Flow Meter', category: 'Medical & Health', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.19 AM.jpeg' },
  { id: 'aswei-ice-cube-maker', name: 'Aswei Compact Ice Cube Maker', category: 'Kitchen Gadgets', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.20 AM (1).jpeg' },
  { id: 'baby-nail-trimmer', name: 'Baby Electric Nail Trimmer (6 Heads, LED)', category: 'Baby & Kids', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.20 AM.jpeg' },
  { id: 'dried-lemon-slices', name: 'Dried Lemon Slices (Natural, Jar)', category: 'Food & Beverages', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.21 AM (1).jpeg' },
  { id: 'decoupage-donut-vase', name: 'Sunflower Decoupage Donut Vase (Handpainted)', category: 'Home & Décor', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.21 AM.jpeg' },
  { id: '3-stage-knife-sharpener', name: '3-Stage Knife Sharpener', category: 'Kitchen Gadgets', price: 130, src: 'WhatsApp Image 2026-10-18 at 10.48.22 AM (1).jpeg' },
  { id: 'yonex-shuttlecock-m10p', name: 'Yonex Shuttlecock M-10P (½ Doz.)', category: 'Sports & Fitness', price: 460, src: 'WhatsApp Image 2026-10-18 at 10.48.22 AM.jpeg' },
  { id: 'potato-chipper', name: 'Stainless Steel Potato Chipper / French Fry Cutter', category: 'Kitchen Gadgets', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.23 AM (1).jpeg' },
  { id: 'protect-fresh-box-5pcs', name: 'Protect Fresh Box Stainless Steel (5 pcs Set)', category: 'Kitchen & Dining', price: 520, src: 'WhatsApp Image 2026-10-18 at 10.48.23 AM (2).jpeg' },
  { id: 'veggie-slicer-16pcs', name: '16-in-1 Veggie Slicer / Dicer Set', category: 'Kitchen Gadgets', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.23 AM.jpeg' },
  { id: 'arctic-air-ultra-cooler', name: 'Arctic Air Ultra Portable Air Cooler', category: 'Appliances', price: 1080, src: 'WhatsApp Image 2026-10-18 at 10.48.24 AM (1).jpeg' },
  { id: 'zepter-knife-set-6pcs', name: 'Zepter International 6-Pcs Kitchen Knife Set', category: 'Kitchen & Dining', price: 500, src: 'WhatsApp Image 2026-10-18 at 10.48.24 AM.jpeg' },
  { id: 'stainless-steel-lunch-box', name: 'Stainless Steel Lunch Box (11cm, 2-Tier)', category: 'Kitchen & Dining', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.25 AM (1).jpeg' },
  { id: 'electric-panci-cooker', name: 'Electric Panci Multi-Cooker 20cm', category: 'Appliances', price: null, src: 'WhatsApp Image 2026-10-18 at 10.48.25 AM.jpeg' },
];

// ─── Waves (6-8 products each for API stability) ────────────────────
const WAVES = {};
const WAVE_SIZE = 6;
for (let i = 0; i < ALL_PRODUCTS.length; i += WAVE_SIZE) {
  const waveNum = Math.floor(i / WAVE_SIZE) + 7; // start at wave 7
  WAVES[waveNum] = ALL_PRODUCTS.slice(i, i + WAVE_SIZE);
}

// ─── Main Pipeline ──────────────────────────────────────────────────
async function run() {
  const args = process.argv.slice(2);
  const getArg = (flag, defaultVal) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultVal;
  };

  const waveArg = getArg('--wave', 'all');
  const waveNums =
    waveArg === 'all' ? Object.keys(WAVES).map(Number) : [parseInt(waveArg, 10)];

  const tmpDir = path.resolve(__dirname, '../.tmp');
  const outDir = path.resolve(__dirname, '../public/images/products');
  const originalsDir = path.resolve(__dirname, '../public/images/originals');
  const dataDir = path.resolve(__dirname, '../public/data');
  const masterCatalogPath = path.join(dataDir, 'products.json');

  fs.mkdirSync(tmpDir, { recursive: true });
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(originalsDir, { recursive: true });
  fs.mkdirSync(dataDir, { recursive: true });

  // Load existing catalog
  let masterCatalog = [];
  if (fs.existsSync(masterCatalogPath)) {
    try {
      masterCatalog = JSON.parse(fs.readFileSync(masterCatalogPath, 'utf-8'));
    } catch {
      masterCatalog = [];
    }
  }

  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  AGT HIGH-QUALITY BATCH PIPELINE — WAVE 7-16       ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  Processing Waves: ${waveArg === 'all' ? 'ALL (7-15)' : `Wave ${waveArg}`}`);
  console.log(`║  Total Products: ${waveNums.reduce((s, w) => s + (WAVES[w]?.length || 0), 0)}`);
  console.log(`║  Quality: WebP 92 | Max 1600×1600 | Alpha 100      ║`);
  console.log('╚══════════════════════════════════════════════════════╝\n');

  // Connect to BRIA AI
  console.log('[INIT] Connecting to BRIA AI RMBG-1.4 (Background Removal)...');
  let app;
  let retries = 3;
  while (retries > 0) {
    try {
      app = await Client.connect('briaai/BRIA-RMBG-1.4');
      console.log('[INIT] ✅ Connected to BRIA AI successfully!\n');
      break;
    } catch (err) {
      retries--;
      console.warn(`[INIT] Connection failed, ${retries} retries left...`);
      if (retries === 0) throw err;
      await sleep(3000);
    }
  }

  let totalProcessed = 0;
  let totalFailed = 0;

  for (const waveNum of waveNums) {
    const products = WAVES[waveNum];
    if (!products) {
      console.warn(`[SKIP] Wave ${waveNum} does not exist.`);
      continue;
    }

    console.log(`\n━━━━━━━━ WAVE ${waveNum} (${products.length} products) ━━━━━━━━`);

    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      const globalIdx = ALL_PRODUCTS.indexOf(item) + 1;
      const indexStr = `[${globalIdx}/${ALL_PRODUCTS.length}]`;

      console.log(`\n────────────────────────────────────────────────────`);
      console.log(`${indexStr} 📦 ${item.name}`);
      console.log(`     ID: ${item.id} | Category: ${item.category}`);

      // Step 0: Copy source image to .tmp/
      const srcPath = path.join(SOURCE_DIR, item.src);
      const tmpPath = path.join(tmpDir, `${item.id}.jpeg`);

      if (!fs.existsSync(srcPath)) {
        console.error(`  ❌ Source not found: ${srcPath}`);
        totalFailed++;
        continue;
      }

      fs.copyFileSync(srcPath, tmpPath);
      console.log(`  📋 Copied to .tmp/${item.id}.jpeg`);

      // Save original to public/images/originals/
      const originalDest = path.join(originalsDir, `${item.id}.jpeg`);
      fs.copyFileSync(srcPath, originalDest);

      const outputWebp = path.join(outDir, `${item.id}.webp`);
      const outputManifest = path.join(outDir, `${item.id}.json`);

      if (fs.existsSync(outputWebp) && fs.existsSync(outputManifest)) {
        console.log(`  ⏩ Already processed: ${item.id}.webp (skipping)`);
        totalProcessed++;
        continue;
      }

      const itemStart = Date.now();

      try {
        // Step 1: AI Background Removal
        console.log(`  🤖 Step 1: AI Background Removal (BRIA RMBG-1.4)...`);
        const bgRes = await app.predict('/run', {
          image: handle_file(tmpPath),
        });

        const transparentFileObj = bgRes.data[1];
        const downloadUrl = transparentFileObj?.url;
        if (!downloadUrl) {
          console.error(`  ❌ No transparent output for ${item.id}`);
          totalFailed++;
          continue;
        }

        const rawPngBuffer = await downloadBuffer(downloadUrl);
        console.log(`     ✓ Background removed (${(rawPngBuffer.length / 1024).toFixed(0)} KB PNG)`);

        // Step 2: High-Quality Sharp Optimization
        console.log(`  🔧 Step 2: Sharp HQ Optimization (trim + resize + WebP 92)...`);

        const trimmed = sharp(rawPngBuffer).trim();
        trimmed.resize({
          width: 1600,
          height: 1600,
          fit: 'inside',
          withoutEnlargement: true,
        });

        // HIGH QUALITY WebP settings
        const optimizedWebpBuffer = await trimmed
          .webp({
            quality: 92,         // ← higher quality than default 90
            effort: 6,           // max compression effort
            alphaQuality: 100,   // perfect alpha channel
            lossless: false,
            smartSubsample: true,
            nearLossless: false,
          })
          .toBuffer();

        fs.writeFileSync(outputWebp, optimizedWebpBuffer);

        const finalMeta = await sharp(optimizedWebpBuffer).metadata();
        const webpSizeKb = (fs.statSync(outputWebp).size / 1024).toFixed(1);

        console.log(`     ✓ ${finalMeta.width}×${finalMeta.height}px | ${webpSizeKb} KB`);

        // Step 3: GSAP Physics Manifest
        console.log(`  🎮 Step 3: GSAP Physics Manifest...`);
        const gsapPhysics = getGsapProfile(item.category, item.name);
        const specs = getProductSpecs(item.id, item.name, item.category, item.price);

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
          ...specs,
        };

        fs.writeFileSync(outputManifest, JSON.stringify(manifest, null, 2), 'utf-8');

        // Update master catalog (upsert)
        const existingIdx = masterCatalog.findIndex((p) => p.id === item.id);
        if (existingIdx !== -1) {
          masterCatalog[existingIdx] = manifest;
        } else {
          masterCatalog.push(manifest);
        }

        const elapsed = ((Date.now() - itemStart) / 1000).toFixed(1);
        console.log(`  ✅ DONE in ${elapsed}s → ${item.id}.webp`);
        totalProcessed++;

        // Small delay between API calls
        await sleep(500);
      } catch (err) {
        console.error(`  ❌ FAILED: ${err.message}`);
        totalFailed++;
        // Retry logic: wait and continue
        await sleep(2000);
      }
    }

    // Save catalog after each wave
    fs.writeFileSync(masterCatalogPath, JSON.stringify(masterCatalog, null, 2), 'utf-8');
    console.log(`\n  💾 Catalog saved after wave ${waveNum} (${masterCatalog.length} total)`);
  }

  // Final save
  fs.writeFileSync(masterCatalogPath, JSON.stringify(masterCatalog, null, 2), 'utf-8');

  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🎉 ALL WAVES COMPLETED!                           ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  Processed: ${totalProcessed} products`);
  console.log(`║  Failed: ${totalFailed} products`);
  console.log(`║  Total in Catalog: ${masterCatalog.length} products`);
  console.log(`║  Catalog: ${masterCatalogPath}`);
  console.log('╚══════════════════════════════════════════════════════╝');
}

run().catch((err) => {
  console.error('\n[FATAL ERROR]', err);
  process.exit(1);
});
