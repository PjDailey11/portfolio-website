'use strict';

/**
 * Renders public/assets/og-image.png (1200x630) from the dark theme tokens in src/styles/app.css
 * (--bg, --bg-accent, --text, --text-muted, --primary, --accent).
 *
 * Implementation: composes an SVG then rasterizes with sharp (devDependency).
 * Regenerate after palette changes: npm run generate:og
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const W = 1200;
const H = 630;

const bg = '#050505';
const bgAccent = '#0a0a0f';
const text = '#f4f7fb';
const textMuted = '#c2cad8';
const primary = '#5ea4ff';
const accent = '#9f7aea';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="50%" stop-color="${bgAccent}"/>
      <stop offset="100%" stop-color="#070810"/>
    </linearGradient>
    <linearGradient id="accentBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${primary}"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
    <radialGradient id="glowTL" cx="8%" cy="8%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBR" cx="92%" cy="88%" r="50%">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M 72 0 L 0 0 0 72" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#glowTL)"/>
  <rect width="100%" height="100%" fill="url(#glowBR)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect x="72" y="248" width="112" height="5" rx="2.5" fill="url(#accentBar)"/>
  <text x="72" y="340" font-family="Segoe UI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="68" font-weight="700" fill="${text}">PJ Dailey</text>
  <text x="72" y="408" font-family="Segoe UI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="26" font-weight="500" fill="${textMuted}">Tutor · AI Consultant · Full-Stack Developer</text>
</svg>`;

const outDir = path.join(__dirname, '..', 'public', 'assets');
const outFile = path.join(outDir, 'og-image.png');

async function main() {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }
    await sharp(Buffer.from(svg))
        .resize(W, H)
        .png()
        .toFile(outFile);

    const meta = await sharp(outFile).metadata();
    if (meta.width !== W || meta.height !== H) {
        throw new Error(`Expected ${W}x${H}, got ${meta.width}x${meta.height}`);
    }
    console.log(`Wrote ${outFile} (${meta.width}x${meta.height})`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
