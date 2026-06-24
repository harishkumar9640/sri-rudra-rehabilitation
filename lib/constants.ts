/**
 * Site-wide constants. Kept in one place so a future change to phone,
 * address, or branding only needs to happen once.
 */

export const SITE = {
  name: 'Sri Rudra Rehabilitation & Healing Institute',
  shortName: 'Sri Rudra',
  tagline: 'Guided by Science, Rooted in Care',
  phoneDisplay: '+91 9642321052',
  phoneHref: 'tel:+919642321052',
  whatsappHref: 'https://wa.me/+919642321052',
  email: 'info@rehabcure.com',
  emailHref: 'mailto:info@rehabcure.com',
  address:
    '7-9-16/9/2/B, Sri Ram Nagar, Panagal Rd, beside Bharath Petrol Bunk, Alivelumangapuram Colony, Nalgonda, Telangana 508001',
  /** Brand blue used by the official logo background. */
  brandBlue: '#1E3A8A',
  /** Official social channels. Update these when the institute adds/renames accounts. */
  social: {
    instagram: {
      handle: '@sri_rudra_rehab_center',
      url: 'https://www.instagram.com/sri_rudra_rehab_center/',
    },
  },
} as const;

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

// Hero backgrounds — abstract, premium SVG scenes. They are deliberately
// free of text so the page's own H1 / buttons are always the loudest voice.
// Toned dark enough that any overlay gradient keeps body copy at AA contrast.
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
