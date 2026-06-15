/**
 * Second pass: adds InContentAd (horizontal) before the FAQ section.
 * Handles both LF and CRLF line endings.
 */
const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../app/calculators');
const AD_HORIZONTAL = `      <InContentAd format="horizontal" className="mb-6" />\n`;

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

  // Skip if FAQ ad already placed
  if (content.includes('format="horizontal"')) {
    skipped++;
    continue;
  }

  // Skip if no FAQ section at all
  if (!content.includes('Frequently Asked Questions')) {
    warnings.push(`  ⚠ No FAQ in: ${name}`);
    continue;
  }

  // Match FAQ section with CRLF or LF tolerance
  // The h2 heading text can have either mb-3 or mb-4 and may have dark mode classes
  const faqPattern = /(\s+<section[^>]*>\s*[\r\n]+\s+<h2[^>]*>Frequently Asked Questions<\/h2>)/;

  if (faqPattern.test(content)) {
    content = content.replace(faqPattern, `\n${AD_HORIZONTAL}$1`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ ${name}`);
    updated++;
  } else {
    warnings.push(`  ⚠ Pattern not matched in: ${name}`);
  }
}

console.log(`\nDone: ${updated} updated, ${skipped} already had it`);
if (warnings.length) {
  console.log('\nWarnings:');
  warnings.forEach(w => console.log(w));
}
