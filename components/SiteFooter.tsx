import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/constants';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const;

const SOCIAL: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: SITE.social.instagram.url,
    label: `Instagram (${SITE.social.instagram.handle})`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: SITE.whatsappHref,
    label: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.7l-4.5.8Z" />
        <path d="M9 9c0-.6.4-1 1-1h.5c.3 0 .6.2.7.5l.7 1.7c.1.3 0 .6-.2.8l-.6.6c.5 1 1.4 1.9 2.4 2.4l.6-.6c.2-.2.5-.3.8-.2l1.7.7c.3.1.5.4.5.7v.5c0 .6-.4 1-1 1-3.3 0-7-3.7-7-7Z" />
      </svg>
    ),
  },
  {
    href: SITE.phoneHref,
    label: `Call ${SITE.phoneDisplay}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
      </svg>
    ),
  },
  {
    href: SITE.emailHref,
    label: `Email ${SITE.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

// Shared className for every footer link — guarantees min-h-44px tap target
// and a visible focus ring on dark backgrounds.
const linkCls =
  'inline-flex min-h-[44px] items-center rounded-md px-2 -mx-2 text-sm ' +
  'text-brand-200 transition-colors hover:text-white hover:bg-white/5 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-teal-500';

export default function SiteFooter() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-white/10">
                <Image
                  src="/images/logo-icon.jpg"
                  alt={`${SITE.name} logo`}
                  width={44}
                  height={44}
                  className="h-11 w-11 object-cover"
                />
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                {SITE.name}
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-brand-300">
              {SITE.tagline}. Doctor-led, 24×7 rehabilitation care for
              neurological, orthopedic, cardiac, and age-related recovery in
              Nalgonda.
            </p>

            <ul className="mt-6 flex items-center gap-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={`Follow us on ${s.label}`}
                    rel="noopener noreferrer"
                    // 44×44px tap target (WCAG 2.5.5). The SVG inside stays
                    // 16px so the icon stays crisp without growing the hit
                    // area visually.
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-brand-200 transition-colors hover:border-teal-500/60 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="lg:col-span-2">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
              Quick Links
            </h4>
            <ul className="space-y-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-0.5 text-teal-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span className="text-brand-200">{SITE.address}</span>
                </span>
              </li>
              <li>
                <a href={SITE.phoneHref} aria-label={`Call ${SITE.phoneDisplay}`} className={linkCls}>
                  <span aria-hidden="true" className="mr-2 text-teal-400">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
                    </svg>
                  </span>
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} aria-label={`Email ${SITE.email}`} className={linkCls}>
                  <span aria-hidden="true" className="mr-2 text-teal-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
              Resources
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="/downloads/brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download our brochure as a PDF (opens in a new tab)"
                  className={linkCls}
                >
                  <span aria-hidden="true" className="mr-2 text-teal-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                      <path d="M14 3v5h5" />
                    </svg>
                  </span>
                  Brochure
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-brand-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-brand-400">
            Designed for recovery. Built with care.{' '}
            <a
              href="/sitemap.xml"
              className="ml-2 underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
