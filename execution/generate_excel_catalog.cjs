/**
 * AGT Product Catalogue Excel Generator
 * Layer 3 Execution Tool
 * 
 * Generates a polished, professional Microsoft Excel (.xlsx) workbook with:
 * - Frozen header row with AGT branding (deep navy / gold)
 * - Auto-filter enabled across all columns
 * - Embedded crisp high-res product thumbnail images (converted from WebP to PNG)
 * - Item Code, Product Name, Category populated
 * - Buying Price, Selling Price, Sourcing From columns formatted and blank for user input
 * - Proper row heights, column widths, and cell borders
 */

const ExcelJS = require('exceljs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateCatalog() {
  const startTime = Date.now();
  console.log('Starting AGT Excel Product Catalogue Generation...');

  const productsJsonPath = path.resolve(__dirname, '../public/data/products.json');
  if (!fs.existsSync(productsJsonPath)) {
    throw new Error(`products.json not found at ${productsJsonPath}`);
  }

  const rawProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
  console.log(`Loaded ${rawProducts.length} products from products.json`);

  // Sort products cleanly: AGT-01, AGT-02 ... up to AGT-133
  const sortedProducts = [...rawProducts].sort((a, b) => {
    const parseNum = (str) => {
      if (!str) return 9999;
      const match = str.match(/\d+/);
      return match ? parseInt(match[0], 10) : 9999;
    };
    const numA = parseNum(a.serial || a.id);
    const numB = parseNum(b.serial || b.id);
    return numA - numB;
  });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Abdullah Global Trade';
  workbook.lastModifiedBy = 'Abdullah Global Trade';
  workbook.created = new Date();
  workbook.modified = new Date();

  const sheet = workbook.addWorksheet('Product Catalogue', {
    views: [{ state: 'frozen', ySplit: 1, showGridLines: true }],
    properties: { defaultRowHeight: 20 }
  });

  // Define Columns
  sheet.columns = [
    { header: 'SL / Code', key: 'code', width: 14 },
    { header: 'Picture', key: 'picture', width: 15 },
    { header: 'Product Name', key: 'name', width: 48 },
    { header: 'Category', key: 'category', width: 22 },
    { header: 'Buying Price (BDT/USD)', key: 'buyingPrice', width: 22 },
    { header: 'Selling Price (BDT/USD)', key: 'sellingPrice', width: 22 },
    { header: 'Sourcing From', key: 'sourcingFrom', width: 26 },
  ];

  // Style Header Row
  const headerRow = sheet.getRow(1);
  headerRow.height = 34;
  headerRow.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF003E4A' } // AGT Petrol Teal Theme
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

  // Set borders for header
  headerRow.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF002B33' } },
      left: { style: 'thin', color: { argb: 'FF002B33' } },
      bottom: { style: 'medium', color: { argb: 'FFD4AF37' } }, // Gold Accent underline
      right: { style: 'thin', color: { argb: 'FF002B33' } }
    };
  });

  sheet.autoFilter = 'A1:G1';

  // Process rows and embed thumbnail images
  let rowIndex = 2; // Row 1 is header
  for (const product of sortedProducts) {
    const row = sheet.addRow({
      code: product.serial || product.id,
      picture: '', // Image will be anchored here
      name: product.name,
      category: product.category || 'General',
      buyingPrice: '',
      sellingPrice: '',
      sourcingFrom: ''
    });

    row.height = 70; // Room for 64px image + padding

    // Alternate row styling
    const isEven = rowIndex % 2 === 0;
    const rowBg = isEven ? 'FFFFFFFF' : 'FFF9FBFB';

    // Cell formatting
    row.getCell('code').alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell('code').font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF003E4A' } };

    row.getCell('name').alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    row.getCell('name').font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF0F172A' } };

    row.getCell('category').alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell('category').font = { name: 'Calibri', size: 9, color: { argb: 'FF475569' } };

    row.getCell('buyingPrice').alignment = { vertical: 'middle', horizontal: 'right' };
    row.getCell('sellingPrice').alignment = { vertical: 'middle', horizontal: 'right' };
    row.getCell('sourcingFrom').alignment = { vertical: 'middle', horizontal: 'left' };

    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: rowBg }
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    });

    // Embed Image
    const relImgUrl = product.image?.url;
    if (relImgUrl) {
      const localImgPath = path.resolve(__dirname, '../public', relImgUrl.replace(/^\//, ''));
      if (fs.existsSync(localImgPath)) {
        try {
          // Resize & convert WebP to crisp PNG thumbnail with transparent background
          const pngBuffer = await sharp(localImgPath)
            .resize(64, 64, {
              fit: 'contain',
              background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png()
            .toBuffer();

          const imageId = workbook.addImage({
            buffer: pngBuffer,
            extension: 'png',
          });

          // Anchor image centered in column B (index 1) of current row
          sheet.addImage(imageId, {
            tl: { col: 1.15, row: rowIndex - 1 + 0.08 },
            ext: { width: 64, height: 64 },
            editAs: 'oneCell'
          });
        } catch (imgErr) {
          console.warn(`Could not process image for ${product.serial}:`, imgErr.message);
        }
      }
    }

    rowIndex++;
  }

  // Save workbook to project root
  const outputPath = path.resolve(__dirname, '../AGT_Product_Catalogue.xlsx');
  await workbook.xlsx.writeFile(outputPath);

  // Also copy to Downloads if available for instant convenient access
  const downloadsPath = 'C:\\Users\\Hi\\Downloads\\AGT_Product_Catalogue.xlsx';
  try {
    fs.copyFileSync(outputPath, downloadsPath);
    console.log(`Copied also to user Downloads: ${downloadsPath}`);
  } catch (e) {
    // optional
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Successfully generated ${outputPath} with ${sortedProducts.length} products in ${duration}s!`);
}

generateCatalog().catch(err => {
  console.error('Failed to generate catalog:', err);
  process.exit(1);
});
