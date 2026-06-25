// Unit tests for `lib/constants.ts`.
//
// These tests guard against accidental drift in the site-wide constants.
// A wrong phone number or a broken `tel:` URL means every CTA on every page
// stops working — so we test the shape, not just the values.

import { describe, it, expect } from 'vitest';
import { SITE, HERO_IMAGES, BANNERS, SUCCESS_STORIES } from './constants';

describe('SITE constant', () => {
  it('exposes the full official name', () => {
    // The brand name should always include "Sri Rudra" + "Rehabilitation".
    expect(SITE.name).toContain('Sri Rudra');
    expect(SITE.name).toContain('Rehabilitation');
  });

  it('has a short name for use in the header on tablet widths', () => {
    expect(SITE.shortName.length).toBeLessThan(15);
    expect(SITE.shortName).toBeTruthy();
  });

  it('has matching display + href phone values', () => {
    // Display: "+91 9642321052" (with spaces).
    // Href:    "tel:+919642321052"     (no spaces).
    expect(SITE.phoneDisplay).toMatch(/^\+\d{2}\s\d{10}$/);
    expect(SITE.phoneHref).toMatch(/^tel:\+\d{12}$/);
    // Strip non-digits from display and confirm it matches the href suffix.
    const displayDigits = SITE.phoneDisplay.replace(/\D/g, '');
    expect(SITE.phoneHref).toBe(`tel:+${displayDigits}`);
  });

  it('has a working WhatsApp deep link', () => {
    expect(SITE.whatsappHref).toMatch(/^https:\/\/wa\.me\/\+\d{12}$/);
  });

  it('has matching email values', () => {
    expect(SITE.emailHref).toBe(`mailto:${SITE.email}`);
  });

  it('has a non-empty postal address', () => {
    expect(SITE.address.length).toBeGreaterThan(20);
    expect(SITE.address).toContain('Nalgonda');
  });

  it('exposes Instagram credentials', () => {
    expect(SITE.social.instagram.handle).toMatch(/^@?[\w._]+$/);
    expect(SITE.social.instagram.url).toMatch(/^https:\/\/(www\.)?instagram\.com\//);
  });
});

describe('HERO_IMAGES array', () => {
  it('has at least 4 hero images so pages can rotate without repeating', () => {
    expect(HERO_IMAGES.length).toBeGreaterThanOrEqual(4);
  });

  it('every entry exposes a non-empty src', () => {
    for (const img of HERO_IMAGES) {
      expect(img.src).toMatch(/^\/images\/heroes\/.+\.svg$/);
      expect(img.src.length).toBeGreaterThan(0);
    }
  });
});

describe('BANNERS array', () => {
  it('every banner entry has a usable src + alt text', () => {
    expect(BANNERS.length).toBeGreaterThan(0);
    for (const b of BANNERS) {
      expect(b.src).toMatch(/^\/.+\.jpg$/);
      expect(b.alt.length).toBeGreaterThan(5);
    }
  });
});

describe('SUCCESS_STORIES array', () => {
  it('has at least 3 patient stories for the gallery', () => {
    expect(SUCCESS_STORIES.length).toBeGreaterThanOrEqual(3);
  });

  it('every story has src, alt text, and a caption', () => {
    for (const s of SUCCESS_STORIES) {
      expect(s.src).toMatch(/^\/images\/success\/.+\.jpg$/);
      expect(s.alt.length).toBeGreaterThan(10);
      expect(s.caption.length).toBeGreaterThan(10);
    }
  });
});
