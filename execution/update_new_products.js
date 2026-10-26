import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogPath = path.resolve(__dirname, '../public/data/products.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const updates = {
  'magnetic-dartboard': {
    price: 840,
    serial: 'AGT-79',
    bulkDiscount: '3-5% discount on higher quantity',
    name: 'Magnetic Roll-Up Dartboard Game Set'
  },
  'portable-vacuum-flask-450': {
    price: 450,
    serial: 'AGT-80',
    bulkDiscount: '3-5% discount on higher quantity',
    name: 'Portable Stainless Vacuum Flask with Loop Lid'
  },
  'titan-7-badminton-net': {
    price: 420,
    serial: 'AGT-81',
    bulkDiscount: '3-5% discount on higher quantity',
    name: "Titan 7 Badminton Net (4' x 22')"
  },
  'foster-clarks-pineapple': {
    price: 840,
    serial: 'AGT-82',
    bulkDiscount: '3-5% discount on higher quantity',
    name: "Foster Clark's Pineapple Drink Powder (6L)"
  },
  'foster-clarks-mango': {
    price: 840,
    serial: 'AGT-83',
    bulkDiscount: '3-5% discount on higher quantity',
    name: "Foster Clark's Mango Drink Powder (6L)"
  }
};

for (const p of catalog) {
  if (updates[p.id]) {
    Object.assign(p, updates[p.id]);
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log('Successfully updated catalog and manifests for all 5 products!');
