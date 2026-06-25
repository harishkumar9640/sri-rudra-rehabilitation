/**
 * Site-wide constants. Kept in one place so a future change to phone,
 * address, or branding only needs to happen once.
 *
 * Updating the phone number, for example, requires editing ONE field
 * (`SITE.phoneDisplay` + `SITE.phoneHref`) and every header CTA, footer
 * link, contact page, JSON-LD schema, sitemap, and OpenGraph metadata
 * picks up the change automatically.
 */

/**
 * Core institute identity and contact information.
 *
 * Display values (`phoneDisplay`) are formatted for humans (with spaces).
 * Href values (`phoneHref`, `emailHref`, `whatsappHref`) are formatted
 * for browsers (no spaces, proper URI scheme prefix).
 *
 * The `social.instagram` object pairs a human-readable handle with the
 * canonical URL — both are surfaced in different contexts (the handle
 * for social posts, the URL for clickable links).
 */
export const SITE = {
  /** Full official name — used in <title>, structured data, OG cards. */
  name: 'Sri Rudra Rehabilitation & Healing Institute',
  /** Short brand name — used in the desktop header at ≥lg breakpoints. */
  shortName: 'Sri Rudra',
  tagline: 'Guided by Science, Rooted in Care',
  /** Phone formatted for display: "+91 9642321052" (human-readable). */
  phoneDisplay: '+91 9642321052',
  /** Phone formatted for href: "tel:+919642321052" (no spaces, dialable). */
  phoneHref: 'tel:+919642321052',
  /** WhatsApp deep link — opens chat with this number pre-selected. */
  whatsappHref: 'https://wa.me/+919642321052',
  email: 'info@rehabcure.com',
  emailHref: 'mailto:info@rehabcure.com',
  /** Full postal address — single source of truth for footer + JSON-LD + map. */
  address:
    '7-9-16/9/2/B, Sri Ram Nagar, Panagal Rd, beside Bharath Petrol Bunk, Alivelumangapuram Colony, Nalgonda, Telangana 508001',
  /** Brand blue used by the official logo background. */
  brandBlue: '#1E3A8A',
  /** Official social channels. Update these when the institute adds/renames accounts. */
  social: {
    instagram: {
      /** Display handle — "@sri_rudra_rehab_center" — for buttons + captions. */
      handle: '@sri_rudra_rehab_center',
      /** Canonical URL — for href attributes + structured data. */
      url: 'https://www.instagram.com/sri_rudra_rehab_center/',
    },
  },
} as const;

/**
 * Patient recovery stories — photos with consent, paired with short
 * captions. Rendered in the home page "Real people, real recoveries"
 * grid and in the full /gallery page.
 *
 * Each entry has three fields:
 *   - src:     path to the image (under /public, served at the URL root)
 *   - alt:     descriptive alt text — long enough to be useful to a
 *              screen-reader user who cannot see the photo
 *   - caption: short, evocative quote for the figcaption
 *
 * Patient photos carry explicit consent. Do not add a story without
 * confirming consent from the patient or their family.
 */
export const SUCCESS_STORIES = [
  {
    src: '/images/success/success-1.jpg',
    alt: 'Patient surrounded by the Sri Rudra care team on discharge day.',
    caption: 'Back on his feet — and back to family life.',
  },
  {
    src: '/images/success/success-2.jpg',
    alt: 'Patient in a wheelchair with the rehabilitation team giving thumbs-up.',
    caption: 'Step by step, regained strength and confidence.',
  },
  {
    src: '/images/success/success-3.jpg',
    alt: 'Patient and family with the Sri Rudra team at the reception.',
    caption: 'Long-term recovery supported every day, end to end.',
  },
  {
    src: '/images/success/success-4.jpg',
    alt: 'Young adult patient with the rehabilitation team celebrating progress.',
    caption: 'Personalized therapy, real-world milestones.',
  },
  {
    src: '/images/success/success-5.jpg',
    alt: 'Patient with the Sri Rudra team at the institute reception.',
    caption: 'Discharged with pride — and a plan for the road ahead.',
  },
] as const;

/**
 * Hero backgrounds — abstract, premium SVG scenes. They are deliberately
 * free of text so the page's own H1 / buttons are always the loudest voice.
 * Toned dark enough that any overlay gradient keeps body copy at AA contrast.
 *
 * Rendered as the background of every PageHero. The hero index is rotated
 * per service (see app/services/[slug]/page.tsx) to avoid the same image
 * appearing on consecutive pages.
 */
export const HERO_IMAGES = [
  { src: '/images/heroes/hero-1.svg', alt: '' },
  { src: '/images/heroes/hero-2.svg', alt: '' },
  { src: '/images/heroes/hero-3.svg', alt: '' },
  { src: '/images/heroes/hero-4.svg', alt: '' },
  { src: '/images/heroes/hero-5.svg', alt: '' },
] as const;

// Legacy marketing posters (Telugu) — kept on disk for the downloadable
// brochure section. They are no longer used as page hero backgrounds.
export const BANNERS = [
  { src: '/images/banners/banner-1.jpg', alt: 'Sri Rudra Rehabilitation & Healing Institute — Nalgonda' },
  { src: '/images/banners/banner-2.jpg', alt: 'Therapy that restores strength, balance, and breath.' },
  { src: '/images/banners/banner-3.jpg', alt: 'Nalgonda’s premier rehabilitation & healing institute.' },
  { src: '/images/banners/banner-4.jpg', alt: 'Compassionate care, advanced equipment, 24/7 doctors.' },
  { src: '/images/banners/banner-5.jpg', alt: 'Recovery, reimagined at Sri Rudra.' },
] as const;
