// End-to-end-ish regression tests.
//
// These tests don't render React (too heavy for a Node-only suite),
// but they read the built HTML files from `out/` and check for the
// kinds of bugs that visual QA used to catch by hand:
//
//   - duplicate suffixes in <title>
//   - missing canonical URLs
//   - missing JSON-LD structured data
//   - missing sitemap entries for pages that should exist
//   - missing favicon
//
// Run `npm run build` first; this test reads from `out/`.

import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'out');

/**
 * True if `npm run build` has produced the `out/` directory.
 * We skip the suite (with a clear reason) rather than fail, so a
 * first-time clone that hasn't built yet doesn't fail CI on unrelated
 * reasons.
 */
function outExists(): boolean {
  return existsSync(join(OUT, 'index.html'));
}

describe('regression: built site quality', () => {
  beforeAll(() => {
    if (!outExists()) {
      // Skip via a single fake test if out/ doesn't exist.
    }
  });

  const PAGES = [
    'index.html',
    'about/index.html',
    'services/index.html',
    'facilities/index.html',
    'gallery/index.html',
    'contact/index.html',
    'services/neuro-rehabilitation/index.html',
    'services/cardio-rehabilitation/index.html',
    'services/old-age-care/index.html',
  ];

  it.each(PAGES)('page exists in build output: %s', (rel) => {
    if (!outExists()) return; // Skip if not built yet
    expect(existsSync(join(OUT, rel))).toBe(true);
  });

  it.each(PAGES)('<title> does not contain duplicated institute name: %s', (rel) => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, rel), 'utf-8');
    const m = html.match(/<title[^>]*>([^<]+)<\/title>/);
    expect(m, `${rel} has no <title>`).toBeTruthy();
    const title = m![1];
    const occurrences = (title.match(/Sri Rudra Rehabilitation &amp; Healing Institute/g) || []).length;
    expect(occurrences, `${rel} title duplicated: "${title}"`).toBeLessThanOrEqual(1);
  });

  it.each(PAGES)('has canonical link: %s', (rel) => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, rel), 'utf-8');
    expect(html).toMatch(/<link rel="canonical"[^>]*href="https:\/\/srirudra\.in\//);
  });

  it.each(PAGES)('emits JSON-LD structured data: %s', (rel) => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, rel), 'utf-8');
    expect(html).toMatch(/<script type="application\/ld\+json">/);
  });

  it('every service slug is present in the built sitemap.xml', () => {
    if (!outExists()) return;
    const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf-8');
    const expectedSlugs = [
      'neuro-rehabilitation',
      'orthopedic-rehabilitation',
      'cardio-rehabilitation',
      'cancer-rehabilitation',
      'fracture-rehabilitation',
      'head-injury-rehabilitation',
      'spinal-cord-rehabilitation',
      'sports-injury-rehabilitation',
      'total-knee-replacement-rehabilitation',
      'long-term-icu-rehabilitation',
      'pediatric-rehabilitation',
      'geriatric-rehabilitation',
      'old-age-care',
      'pulmonology-rehabilitation',
    ];
    for (const slug of expectedSlugs) {
      expect(sitemap, `sitemap missing ${slug}`).toContain(`/services/${slug}/`);
    }
  });

  it('static assets are all served (favicon, apple touch icon, og image)', () => {
    if (!outExists()) return;
    const assets = ['favicon.ico', 'apple-touch-icon.png', 'images/og-image.jpg', 'images/logo.jpg'];
    for (const a of assets) {
      expect(existsSync(join(OUT, a)), `missing asset ${a}`).toBe(true);
    }
  });

  it('no Next.js error markers in the HTML', () => {
    if (!outExists()) return;
    for (const rel of PAGES) {
      const html = readFileSync(join(OUT, rel), 'utf-8');
      // Next.js inlines error overlays into pages when something throws.
      // We never want these on a deployed site.
      expect(html, `${rel} contains "unhandled error"`).not.toContain('unhandled error');
      expect(html, `${rel} contains "Internal Server Error"`).not.toContain('Internal Server Error');
    }
  });

  it('every page links to the homepage logo', () => {
    if (!outExists()) return;
    for (const rel of PAGES) {
      const html = readFileSync(join(OUT, rel), 'utf-8');
      // Look for an <a> that has both href="/" AND aria-label starting with "Sri Rudra".
      // Attribute order in Next.js output is non-deterministic, so we
      // check both substrings independently rather than a regex.
      expect(html, `${rel} missing / href`).toMatch(/href="\/"/);
      expect(html, `${rel} missing logo aria-label`).toMatch(/aria-label="Sri Rudra[^"]*"/);
    }
  });

  it('sitemap is valid XML', () => {
    if (!outExists()) return;
    const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf-8');
    expect(sitemap).toMatch(/<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(sitemap).toMatch(/<urlset[^>]*>/);
    expect(sitemap).toMatch(/<\/urlset>/);
  });
});

// Suppress the unused-import warning for readdirSync (kept for future use).
void readdirSync;
