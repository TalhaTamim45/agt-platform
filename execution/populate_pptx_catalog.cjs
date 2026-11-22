const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function generateClosingSlide() {
  let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
  xml += `<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:dgm="http://schemas.openxmlformats.org/drawingml/2006/diagram" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:pvml="urn:schemas-microsoft-com:office:powerpoint" xmlns:com="http://schemas.openxmlformats.org/drawingml/2006/compatibility" xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" xmlns:p15="http://schemas.microsoft.com/office/powerpoint/2012/main" xmlns:ahyp="http://schemas.microsoft.com/office/drawing/2018/hyperlinkcolor">\n`;
  xml += `  <p:cSld>\n`;
  xml += `    <p:bg><p:bgPr><a:solidFill><a:srgbClr val="F8FAFC"/></a:solidFill></p:bgPr></p:bg>\n`;
  xml += `    <p:spTree>\n`;
  xml += `      <p:nvGrpSpPr><p:cNvPr id="900" name="Closing Slide Frame"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>\n`;
  xml += `      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>\n`;

  // Top Section Tag: NEXT STEP COLLABORATION
  xml += `      <p:sp><p:nvSpPr><p:cNvPr id="901" name="Section Tag"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="695325" y="450000"/><a:ext cx="6000000" cy="200000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="1100"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>NEXT STEP COLLABORATION</a:t></a:r></a:p></p:txBody></p:sp>\n`;

  // Top Main Title: Let's Build A High-Value Partnership
  xml += `      <p:sp><p:nvSpPr><p:cNvPr id="902" name="Main Title"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="695325" y="700000"/><a:ext cx="7500000" cy="400000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="2400"><a:solidFill><a:srgbClr val="0F172A"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>Let&apos;s Build A High-Value Partnership</a:t></a:r></a:p></p:txBody></p:sp>\n`;

  // Subtitle: Connecting Business | Building Partnerships | Delivering Growth
  xml += `      <p:sp><p:nvSpPr><p:cNvPr id="903" name="Subtitle"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="695325" y="1150000"/><a:ext cx="7500000" cy="250000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:buNone/></a:pPr><a:r><a:rPr b="0" i="0" lang="en-US" sz="1150"><a:solidFill><a:srgbClr val="64748B"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>Connecting Business  |  Building Partnerships  |  Delivering Growth</a:t></a:r></a:p></p:txBody></p:sp>\n`;

  // Top-Right Target Badge: Prepared Exclusively for Eskayef Pharmaceuticals Ltd. (SK+F)
  xml += `      <p:sp><p:nvSpPr><p:cNvPr id="904" name="Target Badge BG"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="7200000" y="600000"/><a:ext cx="4300000" cy="350000"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst><a:gd fmla="val 24242" name="adj"/></a:avLst></a:prstGeom><a:solidFill><a:srgbClr val="E0F2FE"/></a:solidFill><a:ln cap="flat" cmpd="sng" w="9525"><a:solidFill><a:srgbClr val="BAE6FD"/></a:solidFill><a:prstDash val="solid"/><a:round/><a:headEnd len="sm" w="sm" type="none"/><a:tailEnd len="sm" w="sm" type="none"/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="ctr" bIns="45700" lIns="91425" spcFirstLastPara="1" rIns="91425" wrap="square" tIns="45700"><a:noAutofit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="ctr"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="950"><a:solidFill><a:srgbClr val="0369A1"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>Prepared Exclusively for Eskayef Pharmaceuticals Ltd. (SK+F)</a:t></a:r></a:p></p:txBody></p:sp>\n`;

  // CARD 1: Fast-Track Vendor Onboarding
  xml += `      <p:sp><p:nvSpPr><p:cNvPr id="905" name="Card 1 BG"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="695325" y="1650000"/><a:ext cx="5250000" cy="4000000"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst><a:gd fmla="val 6205" name="adj"/></a:avLst></a:prstGeom><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:ln cap="flat" cmpd="sng" w="9525"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:prstDash val="solid"/><a:round/><a:headEnd len="sm" w="sm" type="none"/><a:tailEnd len="sm" w="sm" type="none"/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="180000" lIns="250000" spcFirstLastPara="1" rIns="250000" wrap="square" tIns="250000"><a:noAutofit/></a:bodyPr><a:lstStyle/>`;
  xml += `<a:p><a:pPr algn="l"><a:spcAft><a:spcPts val="600"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="1500"><a:solidFill><a:srgbClr val="0F172A"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>Fast-Track Vendor Onboarding</a:t></a:r></a:p>`;
  xml += `<a:p><a:pPr algn="l"><a:spcBef><a:spcPts val="300"/></a:spcBef><a:spcAft><a:spcPts val="400"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="1300"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>1  </a:t></a:r><a:r><a:rPr b="0" lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="334155"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>Physical sample dispatch to SK+F procurement.</a:t></a:r></a:p>`;
  xml += `<a:p><a:pPr algn="l"><a:spcBef><a:spcPts val="300"/></a:spcBef><a:spcAft><a:spcPts val="400"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="1300"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>2  </a:t></a:r><a:r><a:rPr b="0" lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="334155"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>Digital branding mockups with SK+F logos.</a:t></a:r></a:p>`;
  xml += `<a:p><a:pPr algn="l"><a:spcBef><a:spcPts val="300"/></a:spcBef><a:spcAft><a:spcPts val="400"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="1300"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>3  </a:t></a:r><a:r><a:rPr b="0" lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="334155"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>Final volume quotation &amp; rapid delivery.</a:t></a:r></a:p>`;
  xml += `</p:txBody></p:sp>\n`;

  // CARD 2: Head Office & Inquiries
  xml += `      <p:sp><p:nvSpPr><p:cNvPr id="906" name="Card 2 BG"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="6250000" y="1650000"/><a:ext cx="5250000" cy="4000000"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst><a:gd fmla="val 6205" name="adj"/></a:avLst></a:prstGeom><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:ln cap="flat" cmpd="sng" w="9525"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:prstDash val="solid"/><a:round/><a:headEnd len="sm" w="sm" type="none"/><a:tailEnd len="sm" w="sm" type="none"/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="180000" lIns="250000" spcFirstLastPara="1" rIns="250000" wrap="square" tIns="250000"><a:noAutofit/></a:bodyPr><a:lstStyle/>`;
  xml += `<a:p><a:pPr algn="l"><a:spcAft><a:spcPts val="600"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="1500"><a:solidFill><a:srgbClr val="0F172A"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>Head Office &amp; Inquiries</a:t></a:r></a:p>`;
  
  xml += `<a:p><a:pPr algn="l"><a:spcBef><a:spcPts val="200"/></a:spcBef><a:spcAft><a:spcPts val="100"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="950"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>OFFICE ADDRESS</a:t></a:r></a:p>`;
  xml += `<a:p><a:pPr algn="l"><a:spcAft><a:spcPts val="400"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="0" lang="en-US" sz="1150"><a:solidFill><a:srgbClr val="334155"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>TA 134, Boishakhi Soroni, Badda, Dhaka-1212, Bangladesh</a:t></a:r></a:p>`;

  xml += `<a:p><a:pPr algn="l"><a:spcBef><a:spcPts val="200"/></a:spcBef><a:spcAft><a:spcPts val="100"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="950"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>DIRECT HOTLINE &amp; WHATSAPP</a:t></a:r></a:p>`;
  xml += `<a:p><a:pPr algn="l"><a:spcAft><a:spcPts val="400"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="1200"><a:solidFill><a:srgbClr val="0F172A"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>+880 1787-239863</a:t></a:r></a:p>`;

  xml += `<a:p><a:pPr algn="l"><a:spcBef><a:spcPts val="200"/></a:spcBef><a:spcAft><a:spcPts val="100"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="950"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>CORPORATE EMAIL</a:t></a:r></a:p>`;
  xml += `<a:p><a:pPr algn="l"><a:spcAft><a:spcPts val="200"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" lang="en-US" sz="1150"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>agtbd763@gmail.com</a:t></a:r></a:p>`;
  xml += `</p:txBody></p:sp>\n`;

  // Bottom Footer: © 2026 Abdullah Global Trade. All rights reserved.
  xml += `      <p:sp><p:nvSpPr><p:cNvPr id="907" name="Footer Text"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="695325" y="6050000"/><a:ext cx="10800000" cy="250000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="ctr" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="none" tIns="0"><a:noAutofit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="ctr"><a:buNone/></a:pPr><a:r><a:rPr b="0" i="0" lang="en-US" sz="950"><a:solidFill><a:srgbClr val="94A3B8"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/></a:rPr><a:t>© 2026 Abdullah Global Trade. All rights reserved.</a:t></a:r></a:p></p:txBody></p:sp>\n`;

  xml += `    </p:spTree>\n`;
  xml += `  </p:cSld>\n`;
  xml += `  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>\n`;
  xml += `</p:sld>\n`;

  return xml;
}

async function main() {
  console.log('Starting PPTX catalog population with unified non-overlapping card layout...');

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
  const finalClosingSlideNum = 10 + slideChunks.length; // Slide 30

  // 2. Generate closing slide (Slide 30)
  console.log(`Generating closing slide at slide ${finalClosingSlideNum}...`);
  const closingSlideXml = generateClosingSlide();
  const closingSlidePath = path.join(extractedDir, `ppt/slides/slide${finalClosingSlideNum}.xml`);
  const closingSlideRelsPath = path.join(extractedDir, `ppt/slides/_rels/slide${finalClosingSlideNum}.xml.rels`);
  fs.writeFileSync(closingSlidePath, closingSlideXml, 'utf8');
  const slide30Rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>`;
  fs.writeFileSync(closingSlideRelsPath, slide30Rels, 'utf8');

  // 3. Clear all prices in existing slides 2 through 9
  console.log('Nulling all prices in existing slides 2 through 9...');
  for (let s = 2; s <= 9; s++) {
    const slidePath = path.join(extractedDir, `ppt/slides/slide${s}.xml`);
    if (fs.existsSync(slidePath)) {
      let content = fs.readFileSync(slidePath, 'utf8');
      const spRegex = /<p:sp>[\s\S]*?<\/p:sp>/g;
      content = content.replace(spRegex, (sp) => {
        const textMatches = sp.match(/<a:t>([\s\S]*?)<\/a:t>/g) || [];
        const fullText = textMatches.map(t => t.replace(/<\/?a:t>/g, '')).join('');
        if (fullText.includes('Tk')) {
          return sp.replace(/<a:t>[\s\S]*?<\/a:t>/g, '<a:t></a:t>');
        }
        return sp;
      });
      fs.writeFileSync(slidePath, content, 'utf8');
    }
  }

  // 4. Convert all product images to PNG and measure dimensions
  console.log('Ensuring all product PNG images exist in ppt/media/...');
  const mediaDir = path.join(extractedDir, 'ppt/media');
  const imageMeta = {};

  for (const p of toAdd) {
    const imgUrl = typeof p.image === 'string' ? p.image : p.image?.url;
    const srcPath = path.resolve('public' + imgUrl);
    const destPath = path.join(mediaDir, `cat_img_${p.serial}.png`);

    if (!fs.existsSync(destPath)) {
      const imgBuffer = await sharp(srcPath)
        .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 90, compressionLevel: 6 })
        .toBuffer();
      fs.writeFileSync(destPath, imgBuffer);
    }

    const meta = await sharp(destPath).metadata();
    imageMeta[p.serial] = {
      width: meta.width,
      height: meta.height
    };
  }
  console.log(`Image metadata indexed for ${Object.keys(imageMeta).length} products.`);

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

  function getCleanCategoryTag(cat, serial) {
    const c = (cat || '').toUpperCase();
    let shortCat = 'CORPORATE GIFT';
    if (c.includes('FOOD') || c.includes('BEVERAGE')) shortCat = 'FOOD & BEVERAGES';
    else if (c.includes('KITCHEN') || c.includes('APPLIANCE')) shortCat = 'KITCHEN & HOME';
    else if (c.includes('HEALTH') || c.includes('PERSONAL')) shortCat = 'HEALTH & CARE';
    else if (c.includes('HOME') || c.includes('LIFESTYLE')) shortCat = 'HOME & LIVING';
    else if (c.includes('ELECTRONIC') || c.includes('GADGET')) shortCat = 'SMART GADGETS';
    else if (c.includes('SPORT') || c.includes('FITNESS')) shortCat = 'SPORTS & FITNESS';
    return `${shortCat} • ${serial}`;
  }

  // 6. Generate slides 10 through (9 + slideChunks.length)
  let shapeIdCounter = 2000;

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

    // Top-Right Badge Background (wider to ensure zero wrapping)
    slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Badge BG"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="9350000" y="609600"/><a:ext cx="2380000" cy="314325"/></a:xfrm><a:prstGeom prst="roundRect"><a:avLst><a:gd fmla="val 24242" name="adj"/></a:avLst></a:prstGeom><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="ctr" bIns="45700" lIns="91425" spcFirstLastPara="1" rIns="91425" wrap="square" tIns="45700"><a:noAutofit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="ctr"><a:buNone/></a:pPr><a:r><a:t></a:t></a:r></a:p></p:txBody></p:sp>\n`;

    // Top-Right Badge Text: 9pt font, perfectly fitted on 1 line
    slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Badge Text"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="9400000" y="666750"/><a:ext cx="2280000" cy="200025"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="ctr" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="none" tIns="0"><a:noAutofit/></a:bodyPr><a:lstStyle/><a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="ctr"><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="900"><a:solidFill><a:srgbClr val="334155"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/></a:rPr><a:t>All Prices in BDT (VAT Applicable)</a:t></a:r></a:p></p:txBody></p:sp>\n`;

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

    // 4. Render Unified Card Info Text Body (Single <p:sp> to eliminate ANY text overlap)
    for (let c = 0; c < chunk.length; c++) {
      const p = chunk[c];
      const { innerX } = p._coords;

      const catText = getCleanCategoryTag(p.category, p.serial);
      const titleText = p.name;
      const descText = p.bulkDiscount || 'Custom corporate branding available.';

      // Dynamic sizing for title based on length
      let titleSz = '1050'; // 10.5pt
      if (titleText.length > 50) {
        titleSz = '950';   // 9.5pt
      } else if (titleText.length > 30) {
        titleSz = '1000';  // 10pt
      }

      slideXml += `      <p:sp><p:nvSpPr><p:cNvPr id="${shapeIdCounter++}" name="Card Info ${p.serial}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${innerX}" y="4050000"/><a:ext cx="1863030" cy="870000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln></p:spPr><p:txBody><a:bodyPr anchorCtr="0" anchor="t" bIns="0" lIns="0" spcFirstLastPara="1" rIns="0" wrap="square" tIns="0"><a:spAutoFit/></a:bodyPr><a:lstStyle/>`;

      // Paragraph 1: Category Tag (Sky Blue, Bold 8pt)
      slideXml += `<a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:spcBef><a:spcPts val="0"/></a:spcBef><a:spcAft><a:spcPts val="200"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="800" u="none" cap="none" strike="noStrike"><a:solidFill><a:srgbClr val="0284C7"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/><a:sym typeface="Plus Jakarta Sans"/></a:rPr><a:t>${escapeXml(catText)}</a:t></a:r><a:endParaRPr/></a:p>`;

      // Paragraph 2: Title (Dark Slate, Bold)
      slideXml += `<a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:lnSpc><a:spcPct val="115000"/></a:lnSpc><a:spcBef><a:spcPts val="0"/></a:spcBef><a:spcAft><a:spcPts val="200"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="1" i="0" lang="en-US" sz="${titleSz}" u="none" cap="none" strike="noStrike"><a:solidFill><a:srgbClr val="0F172A"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/><a:sym typeface="Plus Jakarta Sans"/></a:rPr><a:t>${escapeXml(titleText)}</a:t></a:r><a:endParaRPr/></a:p>`;

      // Paragraph 3: Description / Subtitle (Slate-500, Regular 8pt)
      slideXml += `<a:p><a:pPr indent="0" lvl="0" marL="0" marR="0" rtl="0" algn="l"><a:lnSpc><a:spcPct val="115000"/></a:lnSpc><a:spcBef><a:spcPts val="0"/></a:spcBef><a:spcAft><a:spcPts val="0"/></a:spcAft><a:buNone/></a:pPr><a:r><a:rPr b="0" i="0" lang="en-US" sz="800" u="none" cap="none" strike="noStrike"><a:solidFill><a:srgbClr val="64748B"/></a:solidFill><a:latin typeface="Plus Jakarta Sans"/><a:ea typeface="Plus Jakarta Sans"/><a:cs typeface="Plus Jakarta Sans"/><a:sym typeface="Plus Jakarta Sans"/></a:rPr><a:t>${escapeXml(descText)}</a:t></a:r><a:endParaRPr/></a:p>`;

      slideXml += `</p:txBody></p:sp>\n`;
    }

    // 5. Render Price Pill Contents (Unit Price Label & Blank Price)
    for (let c = 0; c < chunk.length; c++) {
      const p = chunk[c];
      const { innerX } = p._coords;

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

  if (!ctXml.includes('Extension="png"')) {
    ctXml = ctXml.replace('<Types', '<Types><Default ContentType="image/png" Extension="png"/>');
  }

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

  presRels = presRels.replace(/<Relationship[^>]*Target="slides\/slide10\.xml"[^>]*\/>/g, '');

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

  let sldIdLst = '<p:sldIdLst>';
  for (let s = 1; s <= 9; s++) {
    const id = 255 + s;
    const rId = `rId${s + 5}`;
    sldIdLst += `<p:sldId id="${id}" r:id="${rId}"/>`;
  }
  for (let s = 10; s <= finalClosingSlideNum; s++) {
    const id = 255 + s;
    const rId = slideRelMap[s];
    sldIdLst += `<p:sldId id="${id}" r:id="${rId}"/>`;
  }
  sldIdLst += '</p:sldIdLst>';

  presXml = presXml.replace(/<p:sldIdLst>[\s\S]*?<\/p:sldIdLst>/, sldIdLst);
  fs.writeFileSync(presPath, presXml, 'utf8');

  console.log(`PPTX XML files generated successfully with unified text flow. Total slides: ${finalClosingSlideNum}`);
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
