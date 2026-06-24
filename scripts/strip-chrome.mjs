#!/usr/bin/env node
/**
 * One-off cleanup: removes per-page header/footer markup from inner pages
 * now that the root layout provides SiteHeader / SiteFooter.
 *
 * For each target file:
 *   1. Drop the <header ...>...</header> block
 *   2. Drop the <footer ...>...</footer> block
 *   3. Convert <div className="min-h-screen bg-gray-50">...</div> outer wrapper
 *      to a fragment <></>
 *   4. If `import Link from 'next/link'` is now unused, drop it.
 *
 * The matcher is line-based and assumes the file content is well-formed JSX
 * with one JSX element per line (which is true for all our pages).
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = join(__dirname, '..', 'app');

const targets = [
  'about/page.tsx',
  'contact/page.tsx',
  'facilities/page.tsx',
  'gallery/page.tsx',
  'services/page.tsx',
  ...readdirSync(join(APP, 'services'))
    .filter((d) => statSync(join(APP, 'services', d)).isDirectory())
    .map((d) => `services/${d}/page.tsx`),
];

/** Strip from the line containing `<header` through the matching `</header>` line. */
function stripElement(lines, tag) {
  const openRe = new RegExp(`^\\s*<${tag}(\\s|>)`);
  const closeRe = new RegExp(`^\\s*</${tag}>`);
  const startIdx = lines.findIndex((l) => openRe.test(l));
  if (startIdx === -1) return lines;
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < lines.length; i++) {
    const openMatches = lines[i].match(new RegExp(`<${tag}(?:\\s[^>]*)?>`, 'g')) || [];
    const closeMatches = lines[i].match(new RegExp(`</${tag}>`, 'g')) || [];
    depth += openMatches.length - closeMatches.length;
    if (depth === 0) {
      endIdx = i;
      break;
    }
  }
  if (endIdx === -1) return lines;
  return [...lines.slice(0, startIdx), ...lines.slice(endIdx + 1)];
}

for (const rel of targets) {
  const path = join(APP, rel);
  let lines = readFileSync(path, 'utf8').split('\n');

  lines = stripElement(lines, 'header');
  lines = stripElement(lines, 'footer');

  // Convert outer wrapper into a fragment
  const wrapIdx = lines.findIndex((l) => l.includes('<div className="min-h-screen bg-gray-50">'));
  if (wrapIdx !== -1) {
    lines[wrapIdx] = '<>';
    // find closing </div>
    for (let i = lines.length - 1; i >= wrapIdx; i--) {
      if (/^\s*<\/div>\s*$/.test(lines[i])) {
        lines[i] = '  </>';
        break;
      }
    }
  }

  // Drop unused Link import
  const src = lines.join('\n');
  if (!/<Link\b/.test(src)) {
    const cleaned = src.replace(/^import Link from 'next\/link';\n/m, '');
    if (cleaned !== src) {
      lines = cleaned.split('\n');
    }
  }

  writeFileSync(path, lines.join('\n'));
  console.log('updated:', rel);
}
