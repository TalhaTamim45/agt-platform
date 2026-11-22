const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  console.log('Starting PPTX catalog population...');

  const extractedDir = path.resolve('.tmp/pptx_extracted');
  const productsPath = path.resolve('public/data/products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  // 1. Serials already present in existing slides (Slides 2 to 9)
  const alreadyPresentSerials = new Set([
    'AGT-78', 'AGT-60', 'AGT-63', 'AGT-38', 'AGT-58',
    'AGT-28', 'AGT-73', 'AGT-15', 'AGT-85', 'AGT-86',
    'AGT-87', 'AGT-24', 'AGT-84', 'AGT-83', 'AGT-79',
    'AGT-74', 'AGT-68', 'AGT-77', 'AGT-76', 'AGT-71',
    'AGT-59', 'AGT-05', 'AGT-14', 'AGT-18', 'AGT-19',
    'AGT-08', 'AGT-72', 'AGT-13', 'AGT-06', 'AGT-21',
    'AGT-122', 'AGT-124', 'AGT-125'
  ]);

  const toAdd = products.filter(p => !alreadyPresentSerials.has(p.serial));
  console.log(`Total catalog products: ${products.length}`);
  console.log(`Products to add: ${toAdd.length}`);

  // Sort logically by category then by serial number
  const categoryOrder = [
    'Food & Beverages',
    'Kitchen & Appliances',
    'Health & Personal Care',
    'Home & Lifestyle',
    'Electronics & Gadgets',
    'Sports & Fitness'
  ];

  toAdd.sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category);
    const catB = categoryOrder.indexOf(b.category);
    if (catA !== catB) return (catA === -1 ? 99 : catA) - (catB === -1 ? 99 : catB);
    const numA = parseInt(a.serial.replace('AGT-', ''), 10);
    const numB = parseInt(b.serial.replace('AGT-', ''), 10);
    return numA - numB;
  });

  // Chunk products into slides of 5
  const slideChunks = [];
  for (let i = 0; i < toAdd.length; i += 5) {
    slideChunks.push(toAdd.slice(i, i + 5));
  }
  console.log(`Prepared ${slideChunks.length} new slides (Slides 10 to ${9 + slideChunks.length})`);
  const finalClosingSlideNum = 10 + slideChunks.length; // e.g. Slide 30

  // 2. Move existing Slide 10 (closing slide) to finalClosingSlideNum
  console.log(`Moving closing slide 10 to slide ${finalClosingSlideNum}...`);
  const oldSlide10 = path.join(extractedDir, 'ppt/slides/slide10.xml');
  const oldSlide10Rels = path.join(extractedDir, 'ppt/slides/_rels/slide10.xml.rels');
  const newClosingSlide = path.join(extractedDir, `ppt/slides/slide${finalClosingSlideNum}.xml`);
  const newClosingSlideRels = path.join(extractedDir, `ppt/slides/_rels/slide${finalClosingSlideNum}.xml.rels`);

  if (fs.existsSync(oldSlide10)) {
    fs.copyFileSync(oldSlide10, newClosingSlide);
    fs.copyFileSync(oldSlide10Rels, newClosingSlideRels);
  }

  // 3. Clear all prices in existing slides 2 through 9
  console.log('Nulling all prices in existing slides 2 through 9...');
  for (let s = 2; s <= 9; s++) {
    const slidePath = path.join(extractedDir, `ppt/slides/slide${s}.xml`);
    if (fs.existsSync(slidePath)) {
      let content = fs.readFileSync(slidePath, 'utf8');
      // Replace text inside shapes that contain "Tk"
      const spRegex = /<p:sp>[\s\S]*?<\/p:sp>/g;
      content = content.replace(spRegex, (sp) => {
        const textMatches = sp.match(/<a:t>([\s\S]*?)<\/a:t>/g) || [];
        const fullText = textMatches.map(t => t.replace(/<\/?a:t>/g, '')).join('');
        if (fullText.includes('Tk')) {
          // Empty the price text run while preserving formatting
          return sp.replace(/<a:t>[\s\S]*?<\/a:t>/g, '<a:t></a:t>');
        }
        return sp;
      });
      fs.writeFileSync(slidePath, content, 'utf8');
      console.log(`  Slide ${s}: prices cleared`);
    }
  }

  // 4. Convert all product images to PNG and save to ppt/media/
  console.log('Converting product images to PNG and measuring dimensions...');
  const mediaDir = path.join(extractedDir, 'ppt/media');
  const imageMeta = {};

  for (const p of toAdd) {
    const imgUrl = typeof p.image === 'string' ? p.image : p.image?.url;
    const srcPath = path.resolve('public' + imgUrl);
    const destPath = path.join(mediaDir, `cat_img_${p.serial}.png`);

    if (!fs.existsSync(srcPath)) {
      console.error(`ERROR: Image missing for ${p.serial}: ${srcPath}`);
      continue;
    }

    // Convert WebP to PNG with max dimension 600 for sharp crisp presentation rendering
    const imgBuffer = await sharp(srcPath)
      .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 90, compressionLevel: 6 })
      .toBuffer();

    fs.writeFileSync(destPath, imgBuffer);

    // Read converted metadata
    const meta = await sharp(imgBuffer).metadata();
    imageMeta[p.serial] = {
      width: meta.width,
      height: meta.height
    };
  }
  console.log(`Converted ${Object.keys(imageMeta).length} images successfully.`);

  // 5. XML Helper functions
  function escapeXml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // 6. Generate slides 10 through (9 + slideChunks.length)
  let shapeIdCounter = 1000;

  for (let cIdx = 0; cIdx < slideChunks.length; cIdx++) {
    const slideNum = 10 + cIdx;
    const chunk = slideChunks[cIdx];
    const isFive = chunk.length === 5;

    console.log(`Generating Slide ${slideNum} with ${chunk.length} products...`);

    // Write relationship file
    let relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n`;
    relsXml += `  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>\n`;
    chunk.forEach((p, idx) => {
      relsXml += `  <Relationship Id="rId${idx + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/cat_img_${p.serial}.png"/>\n`;
    });
    relsXml += `</Relationships>`;

    const relsPath = path.join(extractedDir, `ppt/slides/_rels/slide${slideNum}.xml.rels`);
    fs.writeFileSync(relsPath, relsXml, 'utf8');

    // Build slide XML
    let slideXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
    slideXml += `<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:dgm="http://schemas.openxmlformats.org/drawingml/2006/diagram" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:pvml="urn:schemas-microsoft-com:office:powerpoint" xmlns:com="http://schemas.openxmlformats.org/drawingml/2006/compatibility" xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" xmlns:p15="http://schemas.microsoft.com/office/powerpoint/2012/main" xmlns:ahyp="http://schemas.microsoft.com/office/drawing/2018/hyperlinkcolor">\n`;
    slideXml += `  <p:cSld>\n`;
    slideXml += `    <p:bg><p:bgPr><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill></p:bgPr></p:bg>\n`;
    slideXml += `    <p:spTree>\n`;
    slideXml += `      <p:nvGrpSpPr><p:cNvPr id="${shapeIdCounter++}" name="Group Frame"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>\n`;
    slideXml += `      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>\n`;

    // Top-Right Badge Background
    slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Badge BG"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="9458325" y="609600"/><a:ext cx="2276475" cy="314325"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst><a:gd fmla="val 24242" name="adj"/></a:avLst></a:prstGeom><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="ctr" bIns="45700" lIns="91425" spcFirstLastPara="1" rIns="91425" wrap="square" tIns="45700"><a:noAutofit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="ctr"><a:buNone/></a:pPr><a:r><a:t></a:t></a:r></a:p></p:txBody></p:sp>\n`;

    // Top-Right Badge Text
    slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Badge Text"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="9591675" y="666750"/><a:ext cx="2105025" cy="200025"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="1050"><a:solidFill><a:srgbClr val="334155"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t> All Prices in BDT (VAT Applicable) </a:t></a:r></a:p></p:txBody></p:sp>\n`;

    // Category / Section Title
    slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Section Tag"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="457200" y="381000"/><a:ext cx="8179593" cy="171450"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="1050"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>PRODUCT SELECTION OVERVIEW</a:t></a:r></a:p></p:txBody></p:sp>\n`;

    // Slide Main Title
    const slideTitle = isFive
      ? 'Featured Corporate Gift Items (5-Product Lineup)'
      : 'Featured Corporate Gift Items (4-Product Lineup)';
    slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Main Title"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="457200" y="590550"/><a:ext cx="8588573" cy="333375"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="2100"><a:solidFill><a:srgbClr val="0F172A"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>${escapeXml(slideTitle)}</a:t></a:r></a:p></p:txBody></p:sp>\n`;

    // 1. Render Card Backgrounds
    for (let c = 0; c < chunk.length; c++) {
      let cardX, innerX;
      if (isFive) {
        cardX = Math.round(457200 + c * 2282130.25);
        innerX = Math.round(600075 + c * 2282130.25);
      } else {
        cardX = 1598415 + c * 2282130;
        innerX = cardX + 142875;
      }
      chunk[c]._coords = { cardX, innerX };

      slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Card BG ${c}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${cardX}" y="2125860"/><a:ext cx="2148780" cy="3377803"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst><a:gd fmla="val 6205" name="adj"/></a:avLst></a:prstGeom><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:ln cap="flat" cmpd="sng" w="9525"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:prstDash val="solid"/><a:round/><a:headEnd len="sm" w="sm" type="none"/><a:tailEnd len="sm" w="sm" type="none"/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="ctr" bIns="45700" lIns="91425" spcFirstLastPara="1" rIns="91425" wrap="square" tIns="45700"><a:noAutofit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="ctr"><a:buNone/></a:pPr><a:r><a:t></a:t></a:r></a:p></p:txBody></p:sp>\n`;
    }

    // 2. Render Price Pill Backgrounds
    for (let c = 0; c < chunk.length; c++) {
      const { innerX } = chunk[c]._coords;
      slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Price Pill BG ${c}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${innerX}" y="4970264"/><a:ext cx="1863030" cy="390525"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst><a:gd fmla="val 19512" name="adj"/></a:avLst></a:prstGeom><a:solidFill><a:srgbClr val="F0FDF4"/></a:solidFill><a:ln cap="flat" cmpd="sng" w="9525"><a:solidFill><a:srgbClr val="BBF7D0"/></a:solidFill><a:prstDash val="solid"/><a:round/><a:headEnd len="sm" w="sm" type="none"/><a:tailEnd len="sm" w="sm" type="none"/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="ctr" bIns="45700" lIns="91425" spcFirstLastPara="1" rIns="91425" wrap="square" tIns="45700"><a:noAutofit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="ctr"><a:buNone/></a:pPr><a:r><a:t></a:t></a:r></a:p></p:txBody></p:sp>\n`;
    }

    // 3. Render Product Images
    for (let c = 0; c < chunk.length; c++) {
      const p = chunk[c];
      const { innerX } = p._coords;
      const meta = imageMeta[p.serial] || { width: 500, height: 500 };
      const ar = meta.width / meta.height;

      const boxX = innerX;
      const boxY = 2268735;
      const boxW = 1863030;
      const boxH = 1714500;
      const boxAr = boxW / boxH;

      let imgW, imgH, imgX, imgY;
      if (ar > boxAr) {
        imgW = boxW;
        imgH = Math.round(boxW / ar);
        imgX = boxX;
        imgY = Math.round(boxY + (boxH - imgH) / 2);
      } else {
        imgH = boxH;
        imgW = Math.round(boxH * ar);
        imgY = boxY;
        imgX = Math.round(boxX + (boxW - imgW) / 2);
      }

      slideXml += `      <p:pic><p:nvPicPr><p:cNvPr id="${shapeIdCounter++}" name="Pic ${p.serial}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="rId${c + 2}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="${imgX}" y="${imgY}"/><a:ext cx="${imgW}" cy="${imgH}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>\n`;
    }

    // 4. Render Text Elements (Category, Name, Desc, Price Label, Price Value)
    for (let c = 0; c < chunk.length; c++) {
      const p = chunk[c];
      const { innerX } = p._coords;

      // Category Tag: Sky Blue bold
      const catText = `${(p.category || 'CORPORATE GIFT').toUpperCase()} • ${p.serial}`;
      slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Category ${p.serial}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${innerX}" y="4097535"/><a:ext cx="2100000" cy="152400"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="975"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>${escapeXml(catText)}</a:t></a:r></a:p></p:txBody></p:sp>\n`;

      // Title: Dark Slate bold
      const titleText = p.name;
      const titleSz = titleText.length > 32 ? '1100' : '1275';
      slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Title ${p.serial}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${innerX}" y="4268985"/><a:ext cx="1950000" cy="240000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:lnSpc><a:spcPct val="115000"/></a:lnSpc><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="${titleSz}"><a:solidFill><a:srgbClr val="0F172A"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>${escapeXml(titleText)}</a:t></a:r></a:p></p:txBody></p:sp>\n`;

      // Subtitle / Description: Slate-500 regular
      const descText = p.bulkDiscount || 'Custom corporate branding available.';
      slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Desc ${p.serial}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${innerX}" y="4540000"/><a:ext cx="1950000" cy="346471"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:lnSpc><a:spcPct val="120000"/></a:lnSpc><a:buNone/></a:pPr><a:r><a:rPr b="0" i="0" lang="en-US" sz="1000"><a:solidFill><a:srgbClr val="64748B"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>${escapeXml(descText)}</a:t></a:r></a:p></p:txBody></p:sp>\n`;

      // Unit Price Label
      slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="PriceLabel ${p.serial}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${innerX + 104775}" y="5089326"/><a:ext cx="847725" cy="152400"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="975"><a:solidFill><a:srgbClr val="166534"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>Unit Price</a:t></a:r></a:p></p:txBody></p:sp>\n`;

      // Price Value: Empty string (null price per user requirement)
      slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="PriceValue ${p.serial}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${innerX + 900000}" y="5055989"/><a:ext cx="847725" cy="219075"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="1350"><a:solidFill><a:srgbClr val="15803D"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t></a:t></a:r></a:p></p:txBody></p:sp>\n`;
    }

    slideXml += `    </p:spTree>\n`;
    slideXml += `  </p:cSld>\n`;
    slideXml += `  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>\n`;
    slideXml += `</p:sld>\n`;

    const slideFilePath = path.join(extractedDir, `ppt/slides/slide${slideNum}.xml`);
    fs.writeFileSync(slideFilePath, slideXml, 'utf8');
  }

  // 7. Update [Content_Types].xml
  console.log('Updating [Content_Types].xml...');
  const contentTypesPath = path.join(extractedDir, '[Content_Types].xml');
  let ctXml = fs.readFileSync(contentTypesPath, 'utf8');

  // Ensure default PNG is registered
  if (!ctXml.includes('Extension="png"')) {
    ctXml = ctXml.replace('<Types', '<Types><Default ContentType="image/png" Extension="png"/>');
  }

  // Add slide overrides for all slides 1 to finalClosingSlideNum
  for (let s = 1; s <= finalClosingSlideNum; s++) {
    const part = `/ppt/slides/slide${s}.xml`;
    if (!ctXml.includes(`PartName="${part}"`)) {
      ctXml = ctXml.replace('</Types>', `<Override ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml" PartName="${part}"/></Types>`);
    }
  }
  fs.writeFileSync(contentTypesPath, ctXml, 'utf8');

  // 8. Update ppt/_rels/presentation.xml.rels
  console.log('Updating ppt/_rels/presentation.xml.rels...');
  const presRelsPath = path.join(extractedDir, 'ppt/_rels/presentation.xml.rels');
  let presRels = fs.readFileSync(presRelsPath, 'utf8');

  // Remove existing slide relationships for slide 10 to rebuild cleanly
  presRels = presRels.replace(/<Relationship[^>]*Target="slides\/slide10\.xml"[^>]*\/>/g, '');

  // Add relationship for slide 10..finalClosingSlideNum
  // Note: slide 1..9 have rId6..rId14. Slide 10 gets rId15.
  // Next available IDs start at rId20 (since rId16..19 are embedded fonts!).
  let nextRId = 20;
  const slideRelMap = {};
  for (let s = 10; s <= finalClosingSlideNum; s++) {
    const rId = (s === 10) ? 'rId15' : `rId${nextRId++}`;
    slideRelMap[s] = rId;
    if (!presRels.includes(`Target="slides/slide${s}.xml"`)) {
      presRels = presRels.replace('</Relationships>', `<Relationship Id="${rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${s}.xml"/></Relationships>`);
    }
  }
  fs.writeFileSync(presRelsPath, presRels, 'utf8');

  // 9. Update ppt/presentation.xml <p:sldIdLst>
  console.log('Updating ppt/presentation.xml slide list...');
  const presPath = path.join(extractedDir, 'ppt/presentation.xml');
  let presXml = fs.readFileSync(presPath, 'utf8');

  // Rebuild <p:sldIdLst>
  // Slide 1..9: id=256..264, r:id=rId6..rId14
  let sldIdLst = '<p:sldIdLst>';
  for (let s = 1; s <= 9; s++) {
    const id = 255 + s;
    const rId = `rId${s + 5}`;
    sldIdLst += `<p:sldId id="${id}" r:id="${rId}"/>`;
  }
  // Slides 10 through finalClosingSlideNum
  for (let s = 10; s <= finalClosingSlideNum; s++) {
    const id = 255 + s;
    const rId = slideRelMap[s];
    sldIdLst += `<p:sldId id="${id}" r:id="${rId}"/>`;
  }
  sldIdLst += '</p:sldIdLst>';

  presXml = presXml.replace(/<p:sldIdLst>[\s\S]*?<\/p:sldIdLst>/, sldIdLst);
  fs.writeFileSync(presPath, presXml, 'utf8');

  console.log(`PPTX XML files generated successfully. Total slides: ${finalClosingSlideNum}`);
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
