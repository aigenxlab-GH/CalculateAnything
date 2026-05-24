/**
 * Generates public/og-image.png (1200×630) from an inline SVG.
 * Uses `sharp` which is already installed as a Next.js dependency.
 * Run: node scripts/generate-og-image.mjs
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'og-image.png');

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Dark background gradient -->
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <!-- Blue glow -->
    <radialGradient id="glow" cx="50%" cy="45%" r="40%">
      <stop offset="0%"   stop-color="#4f46e5" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
    </radialGradient>
    <!-- Subtle dot grid mask -->
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#334155" opacity="0.6"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <!-- Dot grid -->
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <!-- Glow -->
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="${W}" height="4" fill="#4f46e5"/>

  <!-- Calculator icon box -->
  <rect x="540" y="140" width="120" height="120" rx="28" fill="#4f46e5"/>
  <!-- Icon: grid of dots (calculator keys) -->
  <rect x="562" y="166" width="22" height="16" rx="4" fill="white" opacity="0.9"/>
  <rect x="592" y="166" width="22" height="16" rx="4" fill="white" opacity="0.9"/>
  <rect x="622" y="166" width="22" height="16" rx="4" fill="white" opacity="0.9"/>
  <rect x="562" y="190" width="22" height="12" rx="3" fill="white" opacity="0.7"/>
  <rect x="592" y="190" width="22" height="12" rx="3" fill="white" opacity="0.7"/>
  <rect x="622" y="190" width="22" height="12" rx="3" fill="white" opacity="0.7"/>
  <rect x="562" y="210" width="52" height="12" rx="3" fill="#818cf8" opacity="0.9"/>
  <rect x="622" y="210" width="22" height="12" rx="3" fill="white" opacity="0.7"/>

  <!-- Brand name -->
  <text
    x="${W / 2}" y="318"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    font-size="72" font-weight="800" text-anchor="middle"
    letter-spacing="-1"
  >
    <tspan fill="white">Calculate</tspan><tspan fill="#818cf8" font-style="italic">Today</tspan>
  </text>

  <!-- Tagline -->
  <text
    x="${W / 2}" y="372"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    font-size="26" font-weight="400" text-anchor="middle" fill="#94a3b8"
    letter-spacing="0.5"
  >
    Free Indian Financial Calculators — No Sign-Up Required
  </text>

  <!-- Category pills -->
  ${[
    { label: 'Income Tax', x: 216 },
    { label: 'SIP / EMI', x: 374 },
    { label: 'GST', x: 502 },
    { label: 'FD / PPF', x: 598 },
    { label: 'Home Loan', x: 706 },
    { label: 'BMI', x: 844 },
    { label: '+ 32 more', x: 940 },
  ].map(({ label, x }) => {
    const pw = label.length * 10 + 24;
    return `
      <rect x="${x - pw / 2}" y="418" width="${pw}" height="32" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="${x}" y="439" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-size="14" font-weight="500" text-anchor="middle" fill="#94a3b8">${label}</text>
    `;
  }).join('')}

  <!-- URL -->
  <text
    x="${W / 2}" y="558"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    font-size="20" font-weight="400" text-anchor="middle" fill="#475569"
  >
    calculate-today.com
  </text>

  <!-- Bottom accent -->
  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="#4f46e5" opacity="0.5"/>
</svg>
`;

mkdirSync(join(__dirname, '..', 'public'), { recursive: true });

const png = await sharp(Buffer.from(svg))
  .resize(W, H)
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(OUT, png);
console.log(`✅  og-image.png generated → public/og-image.png (${(png.length / 1024).toFixed(1)} KB)`);
