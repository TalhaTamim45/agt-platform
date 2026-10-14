import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { QRCodeSVG } from 'qrcode.react';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const TARGET_URL = 'https://abdullahglobaltrade.netlify.app/api/track-scan?ref=qr';
const DISPLAY_URL = 'abdullahglobaltrade.netlify.app';

async function generateQRCodes() {
  console.log('Generating luxury QR Code assets for:', TARGET_URL);

  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo-clean.png');
  const logoBuffer = await fs.readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  // 1. Generate Raw High-Res SVG from qrcode.react
  const qrSvgString = ReactDOMServer.renderToStaticMarkup(
    React.createElement(QRCodeSVG, {
      value: TARGET_URL,
      size: 900,
      level: 'H',
      fgColor: '#0c1f3b',
      bgColor: '#ffffff',
      marginSize: 2,
      imageSettings: {
        src: logoBase64,
        x: undefined,
        y: undefined,
        height: 180,
        width: 180,
        excavate: true,
      },
    })
  );

  // 2. Wrap into a luxury square badge SVG (1200x1200px)
  const squareBadgeSvg = `
<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfb76c"/>
      <stop offset="50%" stop-color="#c59b4c"/>
      <stop offset="100%" stop-color="#8c6623"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#faf7f0"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0c1f3b" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="1200" fill="url(#bgGrad)" rx="60"/>
  
  <!-- Outer Gold Border -->
  <rect x="24" y="24" width="1152" height="1152" fill="none" stroke="url(#goldGrad)" stroke-width="4" rx="48"/>
  <rect x="36" y="36" width="1128" height="1128" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.4" rx="40"/>

  <!-- Corner Ornaments -->
  <path d="M 60 110 L 60 60 L 110 60" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round"/>
  <path d="M 1140 110 L 1140 60 L 1090 60" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round"/>
  <path d="M 60 1090 L 60 1140 L 110 1140" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round"/>
  <path d="M 1140 1090 L 1140 1140 L 1090 1140" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round"/>

  <!-- Top Title Header -->
  <text x="600" y="105" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="34" fill="#0c1f3b" text-anchor="middle" letter-spacing="4">ABDULLAH GLOBAL TRADE</text>
  <text x="600" y="142" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="16" fill="#c59b4c" text-anchor="middle" letter-spacing="6">FROM VISION TO VALUE</text>

  <!-- QR Container Card -->
  <g filter="url(#shadow)">
    <rect x="150" y="175" width="900" height="900" rx="36" fill="#ffffff" stroke="url(#goldGrad)" stroke-width="3"/>
  </g>

  <!-- Embedded QR Code -->
  <g transform="translate(150, 175)">
    ${qrSvgString}
  </g>

  <!-- Bottom CTA -->
  <text x="600" y="1115" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#0c1f3b" text-anchor="middle" letter-spacing="3">SCAN TO EXPLORE 3D PRODUCT CATALOG</text>
  <text x="600" y="1145" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="16" fill="#8c6623" text-anchor="middle" letter-spacing="1">${DISPLAY_URL}</text>
</svg>
`;

  // 3. Render Standalone Badge PNG (1200x1200px)
  const squarePngBuffer = await sharp(Buffer.from(squareBadgeSvg))
    .png({ quality: 100 })
    .toBuffer();

  const outSquarePath = path.join(process.cwd(), 'public', 'images', 'agt-qr-code.png');
  await fs.writeFile(outSquarePath, squarePngBuffer);
  console.log('✓ Generated:', outSquarePath);

  // 4. Generate Luxury Corporate Display Standee / Flyer (1200x1800px)
  const standeeSvg = `
<svg width="1200" height="1800" viewBox="0 0 1200 1800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="navyBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#071224"/>
      <stop offset="50%" stop-color="#0c1f3b"/>
      <stop offset="100%" stop-color="#050e1c"/>
    </linearGradient>
    <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf0cd"/>
      <stop offset="35%" stop-color="#dfb76c"/>
      <stop offset="70%" stop-color="#c59b4c"/>
      <stop offset="100%" stop-color="#8c6623"/>
    </linearGradient>
    <linearGradient id="goldPill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c59b4c"/>
      <stop offset="100%" stop-color="#aa8135"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="25" stdDeviation="35" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <radialGradient id="glow" cx="50%" cy="35%" r="50%">
      <stop offset="0%" stop-color="#c59b4c" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#0c1f3b" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Deep Royal Navy Background -->
  <rect width="1200" height="1800" fill="url(#navyBg)"/>
  <rect width="1200" height="1800" fill="url(#glow)"/>

  <!-- Ornate Double Gold Borders -->
  <rect x="36" y="36" width="1128" height="1728" fill="none" stroke="url(#goldGrad2)" stroke-width="3" rx="36"/>
  <rect x="52" y="52" width="1096" height="1696" fill="none" stroke="url(#goldGrad2)" stroke-width="1" stroke-opacity="0.35" rx="28"/>

  <!-- Decorative Corner Accents -->
  <path d="M 80 140 L 80 80 L 140 80" fill="none" stroke="url(#goldGrad2)" stroke-width="5" stroke-linecap="round"/>
  <path d="M 1120 140 L 1120 80 L 1060 80" fill="none" stroke="url(#goldGrad2)" stroke-width="5" stroke-linecap="round"/>
  <path d="M 80 1660 L 80 1720 L 140 1720" fill="none" stroke="url(#goldGrad2)" stroke-width="5" stroke-linecap="round"/>
  <path d="M 1120 1660 L 1120 1720 L 1060 1720" fill="none" stroke="url(#goldGrad2)" stroke-width="5" stroke-linecap="round"/>

  <!-- Header Section -->
  <g transform="translate(600, 160)">
    <text y="0" font-family="'Outfit', sans-serif" font-weight="900" font-size="44" fill="#ffffff" text-anchor="middle" letter-spacing="6">ABDULLAH GLOBAL TRADE</text>
    <text y="42" font-family="'Outfit', sans-serif" font-weight="700" font-size="20" fill="url(#goldGrad2)" text-anchor="middle" letter-spacing="8">FROM VISION TO VALUE</text>
    
    <line x1="-220" y1="75" x2="220" y2="75" stroke="url(#goldGrad2)" stroke-width="2" stroke-opacity="0.6"/>
    <circle cx="0" cy="75" r="5" fill="#dfb76c"/>
  </g>

  <!-- Tagline Pill -->
  <g transform="translate(600, 290)">
    <rect x="-240" y="-22" width="480" height="44" rx="22" fill="#12294d" stroke="url(#goldGrad2)" stroke-width="1.5"/>
    <text y="6" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="15" fill="#fdf0cd" text-anchor="middle" letter-spacing="2">B2B CORPORATE &amp; PMD SOURCING</text>
  </g>

  <!-- QR Code White Luxury Plaque -->
  <g filter="url(#cardShadow)">
    <rect x="230" y="370" width="740" height="740" rx="44" fill="#ffffff"/>
    <rect x="230" y="370" width="740" height="740" rx="44" fill="none" stroke="url(#goldGrad2)" stroke-width="5"/>
  </g>

  <!-- Scaled QR Code inside Plaque -->
  <g transform="translate(260, 400)">
    <g transform="scale(0.755)">
      ${qrSvgString}
    </g>
  </g>

  <!-- Instruction Banner below QR -->
  <g transform="translate(600, 1180)">
    <text y="0" font-family="'Outfit', sans-serif" font-weight="800" font-size="30" fill="#ffffff" text-anchor="middle" letter-spacing="3">SCAN WITH ANY PHONE CAMERA</text>
    <text y="38" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="20" fill="#dfb76c" text-anchor="middle">Instant Access to 3D Zero-Gravity Product Catalog</text>
    
    <!-- URL Pill -->
    <rect x="-260" y="70" width="520" height="48" rx="24" fill="url(#goldPill)"/>
    <text y="101" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="18" fill="#ffffff" text-anchor="middle" letter-spacing="1">🌐 ${DISPLAY_URL}</text>
  </g>

  <!-- Divider -->
  <line x1="200" y1="1350" x2="1000" y2="1350" stroke="url(#goldGrad2)" stroke-width="1.5" stroke-opacity="0.35"/>

  <!-- Corporate Contact & Capabilities Footer -->
  <g transform="translate(600, 1430)">
    <text y="0" font-family="'Outfit', sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle" letter-spacing="3">CORPORATE HEADQUARTERS &amp; PROCUREMENT</text>
    
    <text y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#dfb76c" text-anchor="middle">📞 Phone / WhatsApp: +880 1787 239 863</text>
    <text y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="18" fill="#d0d9e8" text-anchor="middle">✉️ Email: agtbd763@gmail.com</text>
    <text y="118" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="16" fill="#9db0cc" text-anchor="middle">📍 G-85, Gulshan-Badda Link Road, Badda, Dhaka-1212, Bangladesh</text>

    <!-- Slogan Box -->
    <rect x="-380" y="160" width="760" height="44" rx="10" fill="#0c1f3b" stroke="url(#goldGrad2)" stroke-width="1" stroke-opacity="0.5"/>
    <text y="188" font-family="'Plus Jakarta Sans', sans-serif" font-style="italic" font-weight="600" font-size="14" fill="#dfb76c" text-anchor="middle">“Connecting Business | Building Partnerships | Delivering Growth”</text>
  </g>
</svg>
`;

  // 5. Render Standee PNG (1200x1800px)
  const standeePngBuffer = await sharp(Buffer.from(standeeSvg))
    .png({ quality: 100 })
    .toBuffer();

  const outStandeePath = path.join(process.cwd(), 'public', 'images', 'agt-qr-standee.png');
  await fs.writeFile(outStandeePath, standeePngBuffer);
  console.log('✓ Generated:', outStandeePath);

  // 6. Also copy both files to artifact directory for instant viewing
  const artifactDir = 'C:\\Users\\Hi\\.gemini\\antigravity-ide\\brain\\81999536-9b02-4de4-ae4e-e86de892d089';
  await fs.writeFile(path.join(artifactDir, 'agt-qr-code.png'), squarePngBuffer);
  await fs.writeFile(path.join(artifactDir, 'agt-qr-standee.png'), standeePngBuffer);
  console.log('✓ Saved artifacts for user viewing.');
}

generateQRCodes().catch(console.error);
