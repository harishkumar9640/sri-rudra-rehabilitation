// Unit tests for `lib/structured-data.ts`.
//
// Schema.org JSON-LD output is rendered into <script> tags. If any field
// is malformed, Google silently rejects the rich-result eligibility for
// the whole site. These tests verify the schemas are well-formed and
// carry the data Google needs to power the Knowledge Panel + FAQ rich
// results.

import { describe, it, expect } from 'vitest';
import {
  medicalClinicJsonLd,
  webSiteJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  serializeJsonLd,
  FAQS,
} from './structured-data';

describe('medicalClinicJsonLd', () => {
  const payload = medicalClinicJsonLd() as Record<string, unknown>;
  const types = Array.isArray(payload['@type'])
    ? (payload['@type'] as string[])
    : [payload['@type'] as string];

  it('declares the right schema.org types', () => {
    // We multi-type as MedicalClinic + MedicalOrganization + LocalBusiness
    // so Google can match it under several knowledge-panel categories.
    expect(types).toContain('MedicalClinic');
  });

  it('includes name, address, telephone, and url (required for KG panel)', () => {
    expect(payload['name']).toBeTruthy();
    expect(payload['url']).toMatch(/^https:\/\//);
    expect(payload['telephone']).toBeTruthy();
    expect(payload['address']).toBeDefined();
  });

  it('includes geo coordinates for local pack ranking', () => {
    const geo = payload['geo'] as Record<string, number>;
    expect(geo).toBeDefined();
    // Real coordinates for Panagal Rd, Nalgonda (India).
    expect(geo['latitude']).toBeCloseTo(17.0727, 3);
    expect(geo['longitude']).toBeCloseTo(79.2838, 3);
  });

  it('declares 24×7 opening hours', () => {
    const hours = payload['openingHoursSpecification'] as Array<Record<string, unknown>>;
    expect(hours).toBeDefined();
    expect(hours[0]['opens']).toBe('00:00');
    expect(hours[0]['closes']).toBe('23:59');
    expect((hours[0]['dayOfWeek'] as string[]).length).toBe(7);
  });

  it('lists medical specialties and services', () => {
    expect((payload['medicalSpecialty'] as string[]).length).toBeGreaterThanOrEqual(5);
    expect((payload['availableService'] as string[]).length).toBe(14);
  });
});

describe('webSiteJsonLd', () => {
  it('declares WebSite + url + publisher', () => {
    const payload = webSiteJsonLd() as Record<string, unknown>;
    expect(payload['@type']).toBe('WebSite');
    expect(payload['url']).toMatch(/^https:\/\//);
    expect(payload['publisher']).toBeDefined();
  });
});

describe('faqJsonLd', () => {
  it('emits 6 mainEntity Question entries', () => {
    const payload = faqJsonLd() as Record<string, unknown>;
    expect(payload['@type']).toBe('FAQPage');
    expect((payload['mainEntity'] as unknown[]).length).toBe(6);
  });

  it('every FAQ has a question and an accepted answer', () => {
    const payload = faqJsonLd() as Record<string, unknown>;
    const main = payload['mainEntity'] as Array<Record<string, unknown>>;
    for (const item of main) {
      expect((item['name'] as string).length).toBeGreaterThan(5);
      const answer = item['acceptedAnswer'] as Record<string, unknown>;
      expect((answer['text'] as string).length).toBeGreaterThan(10);
    }
  });
});

describe('breadcrumbJsonLd', () => {
  it('encodes crumbs with absolute URLs in the item field', () => {
    const payload = breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact/' },
    ]) as Record<string, unknown>;
    expect(payload['@type']).toBe('BreadcrumbList');
    const items = payload['itemListElement'] as Array<Record<string, unknown>>;
    expect(items).toHaveLength(2);
    // Schema.org's BreadcrumbList uses `item` (not `url`) on ListItem.
    for (const item of items) {
      const url = item['item'] as string;
      expect(url.startsWith('https://')).toBe(true);
    }
  });
});

describe('serializeJsonLd (XSS prevention)', () => {
  it('escapes `<` so the script tag cannot be broken out of', () => {
    const dangerous = { script: '</script><img src=x onerror=alert(1)>' };
    const serialized = serializeJsonLd(dangerous);
    // The literal `<` must be escaped — otherwise a malicious payload
    // could terminate the JSON-LD <script> tag and inject HTML.
    expect(serialized).not.toContain('</script>');
    expect(serialized).toContain('\\u003c');
  });
});

describe('FAQS constant', () => {
  it('has 6 questions', () => {
    expect(FAQS).toHaveLength(6);
  });

  it('every entry has a question and an answer', () => {
    for (const f of FAQS) {
      expect(f.q.length).toBeGreaterThan(5);
      expect(f.a.length).toBeGreaterThan(10);
    }
  });
});
