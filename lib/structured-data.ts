/**
 * JSON-LD structured data for Sri Rudra Rehabilitation & Healing Institute.
 *
 * Reference: https://schema.org/MedicalClinic + https://schema.org/LocalBusiness
 *
 * We emit the most-impactful entities for a healthcare site:
 *  1. MedicalClinic  — the institute itself (knowledge panel, local pack)
 *  2. WebSite        — gives Google a sitelinks search box
 *  3. BreadcrumbList — helps long URLs render as crumbs in SERPs
 *  4. FAQPage        — eligible for rich-result FAQ accordions
 *
 * All values are derived from lib/constants.ts so a phone-number change only
 * needs to happen in one place.
 */

import { SITE } from './constants';

/** Canonical production URL of the deployed site. Used as the @id base for every schema. */
const SITE_URL = 'https://srirudra.in';

/**
 * Shape of any structured-data payload we return. Schema.org JSON-LD
 * objects always have `@context` + `@type` plus arbitrary properties;
 * we type loosely (`Record<string, unknown>`) so consumers don't have
 * to satisfy an exhaustive union of every Schema.org type.
 */
export type JsonLdObject = Record<string, unknown>;

/**
 * Build the MedicalClinic schema for Sri Rudra.
 *
 * Multi-typed as MedicalClinic + MedicalOrganization + LocalBusiness so
 * Google can match the entity under several knowledge-panel categories.
 * Carries every field Google's local pack needs: address, geo coordinates
 * (exact building pin), opening hours (24×7), phone, medical specialties,
 * available services, payment accepted, contact points, and Instagram
 * sameAs for entity consolidation.
 *
 * @returns A JSON-LD object ready to be passed to `serializeJsonLd()` and
 *          inlined into a `<script type="application/ld+json">` tag.
 */
export function medicalClinicJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'MedicalOrganization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    description:
      'Sri Rudra is a doctor-led, 24×7 rehabilitation hospital in Nalgonda, Telangana. We provide neuro, orthopedic, cardiac, ICU, pediatric and geriatric recovery programs.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.jpg`,
      width: 800,
      height: 800,
    },
    image: `${SITE_URL}/images/logo.jpg`,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Card, Bank Transfer, Insurance',
    medicalSpecialty: [
      'Physiatry',
      'Neurology',
      'Orthopedics',
      'Cardiology',
      'Pulmonology',
      'Pediatrics',
      'Geriatrics',
      'Speech-Language Pathology',
      'Physical Therapy',
      'Occupational Therapy',
    ],
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Neuro Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Orthopedic Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Cardiac Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Cancer Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Fracture Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Head Injury Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Spinal Cord Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Sports Injury Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Total Knee Replacement Rehab' },
      { '@type': 'MedicalProcedure', name: 'Long-Term ICU Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Pediatric Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Geriatric Rehabilitation' },
      { '@type': 'MedicalProcedure', name: 'Old Age Care' },
      { '@type': 'MedicalProcedure', name: 'Pulmonology Rehabilitation' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        '7-9-16/9/2/B, Sri Ram Nagar, Panagal Rd, beside Bharath Petrol Bunk',
      addressLocality: 'Nalgonda',
      addressRegion: 'Telangana',
      postalCode: '508001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // Exact coordinates of the institute on Panagal Rd, Nalgonda
      // (confirmed by the institute team).
      latitude: 17.07273306921032,
      longitude: 79.28385088893278,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.name + ' ' + SITE.address)}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
        description: 'Open 24×7, every day of the year',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneDisplay,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Telugu', 'Hindi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      },
    ],
    sameAs: [
      SITE.social.instagram.url,
      `https://wa.me/${SITE.whatsappHref.replace(/[^0-9+]/g, '').replace(/^\+/, '')}`,
    ],
    // NOTE: aggregateRating + review blocks are intentionally OMITTED from
    // structured data. Google's structured-data policy prohibits
    // self-asserted ratings that aren't sourced from a verifiable
    // third-party system (e.g. the institute's own Google Business Profile
    // reviews surface, scraped and re-published, would be considered
    // "self-serving" and may trigger a manual action).
    //
    // If you later add real Google reviews (via an API or verified widget),
    // re-introduce the aggregateRating + review fields here with values
    // matching what's shown publicly on Google.
  };
}

/* ------------------------------------------------------------------ */
/* 2. WebSite — sitelinks search box potential                        */
/* ------------------------------------------------------------------ */

/**
 * Build the WebSite schema for Sri Rudra.
 *
 * Generic website entity. Helps Google display a sitelinks search box
 * for branded queries and consolidates the publisher identity with the
 * MedicalClinic entity via the shared `@id`.
 *
 * @returns A JSON-LD object ready to be passed to `serializeJsonLd()`.
 */
export function webSiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    description:
      'Doctor-led, 24×7 rehabilitation hospital in Nalgonda. Stroke, paralysis, joint replacement, ICU deconditioning and geriatric recovery.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };
}

/* ------------------------------------------------------------------ */
/* 3. BreadcrumbList                                                  */
/* ------------------------------------------------------------------ */

export type Crumb = { name: string; url: string };

/**
 * Build a BreadcrumbList schema for a navigation trail.
 *
 * Each crumb becomes a ListItem with `position`, `name`, and `item`
 * (Schema.org uses `item` for the URL on ListItem, not `url`).
 *
 * @param crumbs  Ordered list of crumbs from the site root to the
 *                current page (e.g. Home → Contact).
 * @returns       A JSON-LD object ready to be passed to `serializeJsonLd()`.
 */
export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
}

/* ------------------------------------------------------------------ */
/* 4. FAQPage — eligibility for FAQ rich results                      */
/* ------------------------------------------------------------------ */

/**
 * The 6 FAQ entries shared between the contact page accordion and the
 * JSON-LD FAQPage schema. Keeping these in one place means a question
 * only needs to be written once — the rendered accordion on the page
 * and the structured-data for Google stay in sync automatically.
 */
export const FAQS = [
  {
    q: 'Is Sri Rudra open 24 hours?',
    a: 'Yes. Our hospital, ICU, doctors and nurses are available 24×7, every day of the year — including weekends and public holidays.',
  },
  {
    q: 'Do you provide ICU-level rehabilitation?',
    a: 'Yes. We have an in-house ICU facility with ventilator support for medically complex patients, plus a dedicated Long-Term ICU Rehabilitation program for post-ICU deconditioning.',
  },
  {
    q: 'Which conditions do you treat?',
    a: 'Stroke recovery, paralysis, traumatic brain injury, spinal cord injury, joint replacement recovery, fractures, sports injuries, heart conditions, lung conditions, cancer recovery, pediatric and geriatric conditions — across 14 specialized programs.',
  },
  {
    q: 'Do you accept insurance and cashless treatment?',
    a: 'We accept cash, UPI, cards, bank transfers and major insurance / TPA cashless plans. Call us on ' +
      SITE.phoneDisplay +
      ' to confirm coverage for your specific policy.',
  },
  {
    q: 'How long does a typical rehabilitation program last?',
    a: 'It depends on the condition and goals. Stroke and orthopedic programs often run 4–8 weeks; spinal cord, ICU-deconditioning and geriatric programs are tailored to each patient and reviewed at milestone checkpoints.',
  },
  {
    q: 'How can I get in touch for an enquiry or admission?',
    a: 'Call ' +
      SITE.phoneDisplay +
      ', message us on WhatsApp, or fill in the enquiry form on our Contact page. Our care team will guide you through the next steps within minutes.',
  },
] as const;

/**
 * Build the FAQPage schema for Sri Rudra.
 *
 * Emits one Question + acceptedAnswer per entry in FAQS. When Google
 * crawls the site, these questions become eligible for FAQ rich results
 * (the expandable Q&A boxes in the SERPs).
 *
 * @returns A JSON-LD object ready to be passed to `serializeJsonLd()`.
 */
export function faqJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Serialize a structured-data payload for safe inlining into a `<script>`
 * tag. Escapes `<` to `\u003c` so an attacker can't break out of the
 * JSON-LD `<script>` tag with a malicious URL or HTML payload.
 *
 * XSS scenario this prevents: if a user-controlled string (e.g. a service
 * name from a CMS) contained `</script><img onerror=...>`, naive
 * `JSON.stringify` would emit it verbatim, terminating the script tag
 * and executing the injected HTML. The escape converts `<` to its
 * Unicode escape sequence so the script content stays valid JSON but
 * is no longer parseable as HTML.
 *
 * @param payload  One or more JSON-LD objects to serialize.
 * @returns        A JSON string safe to drop into a `<script>` innerHTML.
 */
export function serializeJsonLd(payload: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}
