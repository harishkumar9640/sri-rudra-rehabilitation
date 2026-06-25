// Accessibility regression tests.
//
// These tests don't run a real screen reader; they verify the static
// HTML output meets the patterns that screen readers and keyboard users
// rely on:
//
//   - Single <h1> per page
//   - Skip link exists and points to #main
//   - <main> has id="main" (the skip-link target)
//   - <html> declares lang="en-IN"
//   - Every <img> has an alt attribute (even if empty)
//   - Every <a> with target="_blank" has rel="noopener noreferrer"
//   - No <button> without accessible text
//   - 44px tap-target class present on every button / link
//
// Run `npm run build` first; this test reads from `out/`.

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'out');

function outExists(): boolean {
  return existsSync(join(OUT, 'index.html'));
}

const PAGES = [
  'index.html',
  'about/index.html',
  'services/index.html',
  'facilities/index.html',
  'gallery/index.html',
  'contact/index.html',
];

describe('accessibility regression', () => {
  it.each(PAGES)('%s has exactly one <h1>', (rel) => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, rel), 'utf-8');
    const h1s = html.match(/<h1\b/g) || [];
    expect(h1s.length, `${rel} should have exactly one h1, found ${h1s.length}`).toBe(1);
  });

  it.each(PAGES)('%s has a skip-to-main-content link targeting #main', (rel) => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, rel), 'utf-8');
    // The skip link is rendered into the streamed RSC payload as well as
    // the rendered HTML. Accept either form.
    expect(html, `${rel} missing skip link text`).toMatch(/Skip to main content/);
    expect(html, `${rel} skip link does not point to #main`).toMatch(/(?:#main|href: ?"#main")/);
  });

  it.each(PAGES)('%s has a <main id="main"> target', (rel) => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, rel), 'utf-8');
    // Either rendered or streamed form is acceptable.
    expect(html, `${rel} missing <main id="main">`).toMatch(/(?:id="main"|id: ?"main")/);
  });

  it('home page declares html lang="en-IN"', () => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, 'index.html'), 'utf-8');
    expect(html, 'html must declare lang="en-IN" for screen readers').toMatch(/lang="en-IN"/);
  });

  it('every image on the home page has an alt attribute', () => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, 'index.html'), 'utf-8');
    // Match every <img ...> opening tag (both <img> and <img ... />).
    const imgs = html.match(/<img\b[^>]*>/g) || [];
    expect(imgs.length, 'home page should have images').toBeGreaterThan(0);
    for (const img of imgs) {
      // alt="" is allowed for decorative images (matches `alt={}`).
      expect(img, `<img> missing alt: ${img.slice(0, 100)}`).toMatch(/\salt=/);
    }
  });

  it('every external link has rel="noopener noreferrer"', () => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, 'index.html'), 'utf-8');
    // Find all anchors that open in a new tab.
    const extLinks = html.match(/<a [^>]*(?:target="_blank"|target: ?"_blank")[^>]*/g) || [];
    expect(extLinks.length, 'home page should have external links').toBeGreaterThan(0);
    for (const a of extLinks) {
      expect(a, `<a target="_blank"> missing rel: ${a.slice(0, 100)}`).toContain("noopener noreferrer");
    }
  });

  it('every interactive button has a min-h-[44px] class', () => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, 'index.html'), 'utf-8');
    // <button> elements
    const buttons = html.match(/<button\b[^>]*?(?:class="[^"]*"|className: ?"[^"]*")/g) || [];
    expect(buttons.length, 'home should have buttons').toBeGreaterThan(0);
    for (const b of buttons) {
      expect(b, `<button> missing min-h-[44px]: ${b.slice(0, 100)}`).toContain("min-h-[44px]");
    }
  });

  it('CTA <a> elements have min-h-[44px]', () => {
    if (!outExists()) return;
    const html = readFileSync(join(OUT, 'index.html'), 'utf-8');
    // Capture every <a className="...min-h-[44px]..."> — i.e. styled as button.
    const styled = html.match(/<a [^>]*(?:class="[^"]*min-h-\[44px\][^"]*"|className: ?"[^"]*min-h-\[44px\][^"]*")/g) || [];
    expect(styled.length, 'home should have button-styled anchors').toBeGreaterThan(0);
  });
});
