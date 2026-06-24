import type { MetadataRoute } from 'next';
import { SERVICES } from '@/lib/services';

// Required for `output: export` so Next renders this at build time.
export const dynamic = 'force-static';

const SITE_URL = 'https://srirudra.in';

/**
 * sitemap.xml — generated at build time for the static export.
 *
 * Includes:
 *  - Home (highest priority)
 *  - Static routes (about, services, facilities, gallery, contact)
 *  - All 14 service detail pages (via SERVICES from lib/services.ts)
 *
 * `changeFrequency` and `priority` are hints only — Google may ignore them —
 * but they help prioritise crawl budget for a small site like this.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,           lastModified: now, changeFrequency: 'weekly',  priority: 1.0,  images: [`${SITE_URL}/images/logo.jpg`] },
    { url: `${SITE_URL}/about/`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/facilities/`,lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/gallery/`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact/`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
