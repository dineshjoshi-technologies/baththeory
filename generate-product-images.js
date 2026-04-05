/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const products = [
  { id: 'aloe-oat', name: 'Aloe Oat', tagline: 'Comfort Bar', color: '#7a9e7e', accent: '#5a7e5e' },
  { id: 'milk-honey', name: 'Milk Honey', tagline: 'Cream Bar', color: '#d4a574', accent: '#b48554' },
  { id: 'rose-aloe', name: 'Rose Aloe', tagline: 'Softening Bar', color: '#c48b8b', accent: '#a46b6b' },
  { id: 'haldi-chandan', name: 'Haldi Chandan', tagline: 'Glow Bar', color: '#d4a017', accent: '#b48000' },
  { id: 'sandalwood-aloe', name: 'Sandalwood Aloe', tagline: 'Ritual Bar', color: '#8b6f47', accent: '#6b4f27' }
];

const bgLight = '#faf8f4';
const bgCard = '#f5f0e8';
const textDark = '#1a1a1a';
const textMuted = '#6b5e4f';

// Helper: create a soap bar SVG
function createSoapBarSVG(product, size = 800) {
  const cx = size / 2;
  const cy = size / 2;
  const barWidth = size * 0.45;
  const barHeight = size * 0.22;
  const barRx = barHeight * 0.4;
  
  // Shadow offset
  const shadowY = 12;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgLight}"/>
      <stop offset="100%" style="stop-color:${bgCard}"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${product.color}"/>
      <stop offset="100%" style="stop-color:${product.accent}"/>
    </linearGradient>
    <linearGradient id="labelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#faf8f4"/>
      <stop offset="100%" style="stop-color:#f0ece6"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="${shadowY}" stdDeviation="15" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.08"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  
  <!-- Subtle texture lines -->
  <g opacity="0.03" stroke="${textDark}" stroke-width="0.5">
    ${Array.from({length: 20}, (_, i) => {
      const y = 100 + i * 30;
      return `<line x1="0" y1="${y}" x2="${size}" y2="${y + 15}"/>`;
    }).join('')}
  </g>
  
  <!-- Soap bar shadow -->
  <rect x="${cx - barWidth/2 + 4}" y="${cy - barHeight/2 + shadowY}" width="${barWidth}" height="${barHeight}" rx="${barRx}" fill="#000" opacity="0.08"/>
  
  <!-- Soap bar -->
  <rect x="${cx - barWidth/2}" y="${cy - barHeight/2}" width="${barWidth}" height="${barHeight}" rx="${barRx}" fill="url(#barGrad)" filter="url(#shadow)"/>
  
  <!-- Bar highlight -->
  <rect x="${cx - barWidth/2 + 8}" y="${cy - barHeight/2 + 4}" width="${barWidth - 16}" height="${barHeight * 0.35}" rx="${barRx * 0.6}" fill="#ffffff" opacity="0.15"/>
  
  <!-- Label -->
  <rect x="${cx - barWidth * 0.35}" y="${cy - barHeight * 0.3}" width="${barWidth * 0.7}" height="${barHeight * 0.6}" rx="4" fill="url(#labelGrad)" filter="url(#softShadow)"/>
  
  <!-- Brand name on label -->
  <text x="${cx}" y="${cy - 6}" font-family="Georgia, serif" font-size="14" fill="${textDark}" text-anchor="middle" font-weight="bold" letter-spacing="1">BATH THEORY</text>
  
  <!-- Product name on label -->
  <text x="${cx}" y="${cy + 12}" font-family="Arial, sans-serif" font-size="9" fill="${textMuted}" text-anchor="middle" letter-spacing="0.5">${product.name.toUpperCase()}</text>
  
  <!-- Weight -->
  <text x="${cx}" y="${cy + 24}" font-family="Arial, sans-serif" font-size="7" fill="${textMuted}" text-anchor="middle" opacity="0.7">100g</text>
  
  <!-- Decorative elements - small dots -->
  <circle cx="${cx - barWidth/2 - 20}" cy="${cy - 15}" r="3" fill="${product.color}" opacity="0.3"/>
  <circle cx="${cx + barWidth/2 + 25}" cy="${cy + 20}" r="4" fill="${product.color}" opacity="0.25"/>
  <circle cx="${cx - barWidth/2 - 15}" cy="${cy + 25}" r="2" fill="${product.accent}" opacity="0.2"/>
  
  <!-- Subtle product name below -->
  <text x="${cx}" y="${cy + barHeight/2 + 50}" font-family="Georgia, serif" font-size="22" fill="${textDark}" text-anchor="middle">${product.name}</text>
  <text x="${cx}" y="${cy + barHeight/2 + 72}" font-family="Arial, sans-serif" font-size="13" fill="${textMuted}" text-anchor="middle" letter-spacing="2">${product.tagline.toUpperCase()}</text>
</svg>`;
}

// Hero image SVG
function createHeroSVG() {
  const w = 1200, h = 800;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f5f0e8"/>
      <stop offset="50%" style="stop-color:#faf8f4"/>
      <stop offset="100%" style="stop-color:#f0ece6"/>
    </linearGradient>
    <linearGradient id="heroOverlay" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:0.2"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#heroBg)"/>
  
  <!-- Subtle pattern -->
  <g opacity="0.04" stroke="#1a1a1a" stroke-width="0.5">
    ${Array.from({length: 30}, (_, i) => `<line x1="0" y1="${i * 30}" x2="${w}" y2="${i * 30 + 20}"/>`).join('')}
  </g>
  
  <!-- Soap bars arranged in a row -->
  ${products.map((p, i) => {
    const x = 150 + i * 180;
    const y = 280;
    const bw = 140, bh = 60, rx = 20;
    return `
    <rect x="${x + 3}" y="${y + 8}" width="${bw}" height="${bh}" rx="${rx}" fill="#000" opacity="0.08"/>
    <rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="${rx}" fill="${p.color}"/>
    <rect x="${x + 6}" y="${y + 4}" width="${bw - 12}" height="${bh * 0.35}" rx="10" fill="#fff" opacity="0.15"/>
    <rect x="${x + 25}" y="${y + 15}" width="${bw - 50}" height="${bh - 30}" rx="3" fill="#faf8f4" opacity="0.9"/>
    <text x="${x + bw/2}" y="${y + 32}" font-family="Georgia, serif" font-size="8" fill="#1a1a1a" text-anchor="middle" font-weight="bold">BATH THEORY</text>
    <text x="${x + bw/2}" y="${y + 42}" font-family="Arial, sans-serif" font-size="6" fill="#6b5e4f" text-anchor="middle">${p.name.toUpperCase().slice(0, 8)}</text>
    `;
  }).join('')}
  
  <!-- Overlay text -->
  <text x="600" y="180" font-family="Georgia, serif" font-size="48" fill="#1a1a1a" text-anchor="middle" font-weight="bold">Bath Theory</text>
  <text x="600" y="220" font-family="Arial, sans-serif" font-size="16" fill="#6b5e4f" text-anchor="middle" letter-spacing="4">HANDCRAFTED BATH RITUALS</text>
  
  <!-- Bottom text -->
  <text x="600" y="520" font-family="Georgia, serif" font-size="24" fill="#4a3f33" text-anchor="middle">Ancient Wisdom. Modern Self-Care.</text>
  <text x="600" y="550" font-family="Arial, sans-serif" font-size="13" fill="#6b5e4f" text-anchor="middle" letter-spacing="2">DISCOVER YOUR RITUAL</text>
  
  <!-- Decorative line -->
  <line x1="500" y1="480" x2="700" y2="480" stroke="#c4b9a8" stroke-width="1"/>
</svg>`;
}

// Discovery set SVG
function createDiscoverySVG(count, products) {
  const size = 800;
  const cx = size / 2;
  const cy = size / 2 - 20;
  
  const barWidth = 100;
  const barHeight = 45;
  const rx = 15;
  const spacing = 20;
  const totalWidth = count * (barWidth + spacing) - spacing;
  const startX = cx - totalWidth / 2;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgLight}"/>
      <stop offset="100%" style="stop-color:${bgCard}"/>
    </linearGradient>
  </defs>
  
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  
  <!-- Box outline -->
  <rect x="${cx - 200}" y="${cy - 80}" width="400" height="160" rx="12" fill="#f5f0e8" stroke="#e2dcd2" stroke-width="1"/>
  <text x="${cx}" y="${cy - 95}" font-family="Georgia, serif" font-size="18" fill="#1a1a1a" text-anchor="middle">Discovery ${count === 3 ? 'Set' : 'Kit'}</text>
  
  <!-- Soap bars in box -->
  ${products.slice(0, count).map((p, i) => {
    const x = startX + i * (barWidth + spacing);
    const y = cy - barHeight / 2;
    return `
    <rect x="${x + 2}" y="${y + 4}" width="${barWidth}" height="${barHeight}" rx="${rx}" fill="#000" opacity="0.06"/>
    <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="${rx}" fill="${p.color}"/>
    <rect x="${x + 15}" y="${y + 10}" width="${barWidth - 30}" height="${barHeight - 20}" rx="2" fill="#faf8f4" opacity="0.9"/>
    <text x="${x + barWidth/2}" y="${y + 22}" font-family="Georgia, serif" font-size="6" fill="#1a1a1a" text-anchor="middle" font-weight="bold">BT</text>
    <text x="${x + barWidth/2}" y="${y + 30}" font-family="Arial, sans-serif" font-size="5" fill="#6b5e4f" text-anchor="middle">${p.name.slice(0, 6).toUpperCase()}</text>
    `;
  }).join('')}
  
  <!-- Price badge -->
  <circle cx="${cx}" cy="${cy + 130}" r="35" fill="#1a1a1a"/>
  <text x="${cx}" y="${cy + 125}" font-family="Arial, sans-serif" font-size="11" fill="#f5f0e8" text-anchor="middle">FROM</text>
  <text x="${cx}" y="${cy + 142}" font-family="Georgia, serif" font-size="16" fill="#f5f0e8" text-anchor="middle">₹${count === 3 ? '649' : '999'}</text>
  
  <!-- Subtitle -->
  <text x="${cx}" y="${cy + 200}" font-family="Arial, sans-serif" font-size="12" fill="#6b5e4f" text-anchor="middle" letter-spacing="2">${count === 3 ? 'CHOOSE ANY 3 BARS' : 'COMPLETE COLLECTION'}</text>
</svg>`;
}

// About/lifestyle image SVG
function createLifestyleSVG() {
  const w = 800, h = 600;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="lifestyleBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e2dcd2"/>
      <stop offset="50%" style="stop-color:#f0ece6"/>
      <stop offset="100%" style="stop-color:#faf8f4"/>
    </linearGradient>
  </defs>
  
  <rect width="${w}" height="${h}" fill="url(#lifestyleBg)"/>
  
  <!-- Decorative circles -->
  <circle cx="150" cy="150" r="80" fill="#f5f0e8" opacity="0.5"/>
  <circle cx="650" cy="450" r="100" fill="#f5f0e8" opacity="0.4"/>
  
  <!-- Soap bar arrangement -->
  <g transform="translate(200, 180) rotate(-5)">
    <rect x="0" y="0" width="120" height="50" rx="18" fill="#7a9e7e"/>
    <rect x="20" y="12" width="80" height="26" rx="3" fill="#faf8f4" opacity="0.9"/>
    <text x="60" y="29" font-family="Georgia, serif" font-size="7" fill="#1a1a1a" text-anchor="middle">BATH THEORY</text>
  </g>
  
  <g transform="translate(350, 220) rotate(3)">
    <rect x="0" y="0" width="120" height="50" rx="18" fill="#d4a017"/>
    <rect x="20" y="12" width="80" height="26" rx="3" fill="#faf8f4" opacity="0.9"/>
    <text x="60" y="29" font-family="Georgia, serif" font-size="7" fill="#1a1a1a" text-anchor="middle">BATH THEORY</text>
  </g>
  
  <g transform="translate(280, 300) rotate(-2)">
    <rect x="0" y="0" width="120" height="50" rx="18" fill="#c48b8b"/>
    <rect x="20" y="12" width="80" height="26" rx="3" fill="#faf8f4" opacity="0.9"/>
    <text x="60" y="29" font-family="Georgia, serif" font-size="7" fill="#1a1a1a" text-anchor="middle">BATH THEORY</text>
  </g>
  
  <g transform="translate(450, 280) rotate(8)">
    <rect x="0" y="0" width="120" height="50" rx="18" fill="#8b6f47"/>
    <rect x="20" y="12" width="80" height="26" rx="3" fill="#faf8f4" opacity="0.9"/>
    <text x="60" y="29" font-family="Georgia, serif" font-size="7" fill="#1a1a1a" text-anchor="middle">BATH THEORY</text>
  </g>
  
  <g transform="translate(380, 380) rotate(-3)">
    <rect x="0" y="0" width="120" height="50" rx="18" fill="#d4a574"/>
    <rect x="20" y="12" width="80" height="26" rx="3" fill="#faf8f4" opacity="0.9"/>
    <text x="60" y="29" font-family="Georgia, serif" font-size="7" fill="#1a1a1a" text-anchor="middle">BATH THEORY</text>
  </g>
  
  <!-- Text overlay -->
  <text x="400" y="120" font-family="Georgia, serif" font-size="28" fill="#1a1a1a" text-anchor="middle">Our Story</text>
  <text x="400" y="520" font-family="Georgia, serif" font-size="18" fill="#4a3f33" text-anchor="middle">Rooted in ancient Indian bathing rituals</text>
  <text x="400" y="550" font-family="Arial, sans-serif" font-size="12" fill="#6b5e4f" text-anchor="middle" letter-spacing="2">HANDCRAFTED WITH CARE</text>
  
  <!-- Decorative line -->
  <line x1="320" y1="140" x2="480" y2="140" stroke="#c4b9a8" stroke-width="1"/>
</svg>`;
}

async function generateImages() {
  const outputDir = path.join(__dirname, 'public', 'products');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate product photos (800x800)
  for (const product of products) {
    const svg = createSoapBarSVG(product, 800);
    await sharp(Buffer.from(svg))
      .resize(800, 800)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(outputDir, `${product.id}.jpg`));
    console.log(`Created ${product.id}.jpg`);
  }

  // Generate hero image (1200x800)
  const heroSvg = createHeroSVG();
  await sharp(Buffer.from(heroSvg))
    .resize(1200, 800)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(outputDir, 'hero.jpg'));
  console.log('Created hero.jpg');

  // Generate discovery set (800x800)
  const discovery3Svg = createDiscoverySVG(3, products);
  await sharp(Buffer.from(discovery3Svg))
    .resize(800, 800)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(outputDir, 'discovery-3.jpg'));
  console.log('Created discovery-3.jpg');

  // Generate discovery kit (800x800)
  const discovery5Svg = createDiscoverySVG(5, products);
  await sharp(Buffer.from(discovery5Svg))
    .resize(800, 800)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(outputDir, 'discovery-5.jpg'));
  console.log('Created discovery-5.jpg');

  // Generate lifestyle/about image (800x600)
  const lifestyleSvg = createLifestyleSVG();
  await sharp(Buffer.from(lifestyleSvg))
    .resize(800, 600)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(outputDir, 'lifestyle.jpg'));
  console.log('Created lifestyle.jpg');

  console.log('\nAll product photography assets generated successfully!');
}

generateImages().catch(console.error);
