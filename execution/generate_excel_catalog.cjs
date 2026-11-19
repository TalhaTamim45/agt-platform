/**
 * AGT Product Catalogue Excel Generator
 * Layer 3 Execution Tool
 * 
 * Generates a print-perfect, compact, color-free Microsoft Excel (.xlsx) workbook:
 * - Formatted specifically to fit 100% within 1 page width on standard A4 printing (fitToWidth: 1)
 * - Category column deleted as requested
 * - Zero decorative colors (pure white background and clean borders, ready for custom styling)
 * - Larger embedded images with snug cell fit (no wasted box space)
 * - Columns: SL / Code, Picture, Product Name, Buying Price, Selling Price, Sourcing From
 */

const ExcelJS = require('exceljs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateCatalog() {
  const startTime = Date.now();
  console.log('Starting AGT Excel Product Catalogue Generation (Print-Ready, Clean Fit)...');

  const productsJsonPath = path.resolve(__dirname, '../public/data/products.json');
  if (!fs.existsSync(productsJsonPath)) {
    throw new Error(`products.json not found at ${productsJsonPath}`);
  }

  const rawProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
  console.log(`Loaded ${rawProducts.length} products from products.json`);

  // Sort products cleanly: AGT-01 to AGT-133
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
    properties: { defaultRowHeight: 20 },
    pageSetup: {
      paperSize: 9, // Standard A4 Paper
      orientation: 'portrait',
      fitToPage: true,
      fitToWidth: 1, // Fit horizontally within 1 page wide
      fitToHeight: 0, // Let vertical pages flow naturally
      horizontalCentered: true,
      showGridLines: true,
      margins: {
        left: 0.25,
        right: 0.25,
        top: 0.35,
        bottom: 0.35,
        header: 0.1,
        footer: 0.1
      }
    }
  });

  // Explicitly ensure fitToPage flags are active
  sheet.pageSetup.fitToPage = true;
  sheet.pageSetup.fitToWidth = 1;
  sheet.pageSetup.fitToHeight = 0;

  // 6 Essential Columns (Category Deleted, Picture enlarged, Widths Optimized for 1-Page A4 Fit)
  sheet.columns = [
    { header: 'SL / Code', key: 'code', width: 10 },
    { header: 'Picture', key: 'picture', width: 16 },
    { header: 'Product Name', key: 'name', width: 27 },
    { header: 'Buying Price', key: 'buyingPrice', width: 12 },
    { header: 'Selling Price', key: 'sellingPrice', width: 12 },
    { header: 'Sourcing From', key: 'sourcingFrom', width: 14 },
  ];

  // Header Row - Clean, Uncolored, Standard Solid Borders
  const headerRow = sheet.getRow(1);
  headerRow.height = 28;
  headerRow.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF000000' } };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

  headerRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFFFF' } // Pure White - No background colors
    };
    cell.border = {
      top: { style: 'medium', color: { argb: 'FF000000' } },
      left: { style: 'thin', color: { argb: 'FF000000' } },
      bottom: { style: 'medium', color: { argb: 'FF000000' } },
      right: { style: 'thin', color: { argb: 'FF000000' } }
    };
  });

  sheet.autoFilter = 'A1:F1';

  // Process rows with larger snug pictures and zero background colors
  let rowIndex = 2; // Row 1 is header
  for (const product of sortedProducts) {
    const row = sheet.addRow({
      code: product.serial || product.id,
      picture: '',
      name: product.name,
      buyingPrice: '',
      sellingPrice: '',
      sourcingFrom: ''
    });

    row.height = 78; // Room for enlarged 90px image with snug borders

    // Cell formatting
    row.getCell('code').alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell('code').font = { name: 'Calibri', size: 9.5, bold: true, color: { argb: 'FF000000' } };

    row.getCell('name').alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    row.getCell('name').font = { name: 'Calibri', size: 9.5, bold: false, color: { argb: 'FF000000' } };

    row.getCell('buyingPrice').alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell('buyingPrice').font = { name: 'Calibri', size: 9.5, color: { argb: 'FF000000' } };

    row.getCell('sellingPrice').alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell('sellingPrice').font = { name: 'Calibri', size: 9.5, color: { argb: 'FF000000' } };

    row.getCell('sourcingFrom').alignment = { vertical: 'middle', horizontal: 'left' };
    row.getCell('sourcingFrom').font = { name: 'Calibri', size: 9.5, color: { argb: 'FF000000' } };

    // Set clean thin borders and white background on every cell
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' } // 100% clean white, zero color
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFB0B0B0' } },
        left: { style: 'thin', color: { argb: 'FFB0B0B0' } },
        bottom: { style: 'thin', color: { argb: 'FFB0B0B0' } },
        right: { style: 'thin', color: { argb: 'FFB0B0B0' } }
      };
    });

    // Embed Image - Enlarged to 90x90px to show rich product details clearly
    const relImgUrl = product.image?.url;
    if (relImgUrl) {
      const localImgPath = path.resolve(__dirname, '../public', relImgUrl.replace(/^\//, ''));
      if (fs.existsSync(localImgPath)) {
        try {
          const pngBuffer = await sharp(localImgPath)
            .resize(120, 120, {
              fit: 'contain',
              background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png()
            .toBuffer();

          const imageId = workbook.addImage({
            buffer: pngBuffer,
            extension: 'png',
          });

          // Anchor image centered and filling column B snugly
          sheet.addImage(imageId, {
            tl: { col: 1.06, row: rowIndex - 1 + 0.04 },
            ext: { width: 90, height: 90 },
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

  // Copy to Downloads folder paths
  const targets = [
    'C:\\Users\\Hi\\Downloads\\AGT_Product_Catalogue_Print_Ready.xlsx',
    'C:\\Users\\Hi\\Downloads\\AGT_Product_Catalogue.xlsx'
  ];

  for (const t of targets) {
    try {
      fs.copyFileSync(outputPath, t);
      console.log(`Updated file at: ${t}`);
    } catch (e) {
      console.log(`Could not overwrite ${path.basename(t)} (likely open in Excel): ${e.message}`);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Successfully generated print-fit ${outputPath} with ${sortedProducts.length} products in ${duration}s!`);
}

generateCatalog().catch(err => {
  console.error('Failed to generate catalog:', err);
  process.exit(1);
});
