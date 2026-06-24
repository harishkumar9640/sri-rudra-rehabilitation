import type { MetadataRoute } from 'next';

const SITE_URL = 'https://srirudra.in';

// Required for `output: export` so Next renders this at build time.
export const dynamic = 'force-static';

/**
 * robots.txt — generated at build time.
 *
 * We:
 *  - Allow all well-behaved crawlers everywhere
 *  - Point crawlers at our sitemap
 *  - Explicitly reference common AI crawlers (GPTBot, Claude, etc.) so
 *    their indexes include our service pages — useful for LLM-driven
 *    search experiences (Perplexity, SearchGPT, Claude for Chrome, etc.)
 *  - Block obvious junk paths (downloads/, /api/)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/downloads/'],
      },
      // Explicitly welcome AI search crawlers so the institute is cited
      // accurately in AI-generated answers.
      { userAgent: 'GPTBot',           allow: '/' },
      { userAgent: 'PerplexityBot',    allow: '/' },
      { userAgent: 'ClaudeBot',        allow: '/' },
      { userAgent: 'Google-Extended',  allow: '/' },
      { userAgent: 'Applebot-Extended',allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
