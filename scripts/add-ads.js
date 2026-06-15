/**
 * Adds two InContentAd placements to every calculator page:
 *   Slot 1 (rectangle): immediately after the main calculator component
 *   Slot 2 (horizontal): immediately before the FAQ section
 */
const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../app/calculators');
const IMPORT_LINE = "import { InContentAd } from '@/components/ads/InContentAd';";
const AD_RECTANGLE = `\n\n      <InContentAd format="rectangle" className="my-6" />`;
const AD_HORIZONTAL = `      <InContentAd format="horizontal" className="mb-6" />\n`;

// Matches any self-closing component at 6-space indent that is the main calc widget
// Excludes layout/utility components
const CALC_REGEX = /^(      <(?!Calculator|JsonLd|Script|Link|Related|Newsletter|Section)[A-Z]\w+(?:\s+[^<>]*)?\/>)$/m;

// Matches the start of the FAQ section (consistent across all pages)
const FAQ_REGEX = /(      <section className="mt-6">\n        <h2 className="text-lg font-bold text-slate-800 mb-3">Frequently Asked Questions<\/h2>)/;

let updated = 0;
let skipped = 0;
let warnings = [];

const dirs = fs.readdirSync(PAGES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => path.join(PAGES_DIR, d.name, 'page.tsx'))
  .filter(f => fs.existsSync(f));

for (const filePath of dirs) {
  const name = path.basename(path.dirname(filePath));
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('InContentAd')) {
    skipped++;
    continue;
  }

  // 1. Add import after the last import statement
  const importMatches = [...content.matchAll(/^import .+$/mg)];
  if (importMatches.length > 0) {
    const lastMatch = importMatches[importMatches.length - 1];
    const insertAt = lastMatch.index + lastMatch[0].length;
    content = content.slice(0, insertAt) + '\n' + IMPORT_LINE + content.slice(insertAt);
  }

  // 2. Ad slot 1: after calculator component
  if (CALC_REGEX.test(content)) {
    content = content.replace(CALC_REGEX, `$1${AD_RECTANGLE}`);
  } else {
    warnings.push(`  ⚠ No calc component matched in: ${name}`);
  }

  // 3. Ad slot 2: before FAQ section
  if (FAQ_REGEX.test(content)) {
    content = content.replace(FAQ_REGEX, `${AD_HORIZONTAL}$1`);
  } else {
    warnings.push(`  ⚠ No FAQ section found in: ${name}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ ${name}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} already done`);
if (warnings.length) {
  console.log('\nWarnings:');
  warnings.forEach(w => console.log(w));
}
