'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/constants';

const NAV = [
  { href: '/about', label: 'About Us' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu when the route changes (hashchange) or the user
  // resizes the viewport up to the desktop breakpoint.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brand-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-md py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500"
            aria-label={`${SITE.name} — home`}
            onClick={() => setOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-brand-200 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo-icon.jpg"
                alt={`${SITE.name} logo`}
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
                priority
              />
            </span>
            <span className="hidden whitespace-nowrap text-base font-semibold text-brand-900 leading-tight lg:inline-block lg:text-lg">
              {SITE.shortName}
              <span className="sr-only"> — {SITE.name}</span>
            </span>
          </Link>

          {/* Primary nav (desktop) */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="ml-6 flex items-baseline gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-md px-3 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 hover:text-teal-700 focus-visible:bg-brand-50 focus-visible:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA cluster */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={SITE.whatsappHref}
              aria-label="Chat on WhatsApp"
              // At md (768–1023px) the header is space-tight — hide the
              // button labels and show icons only, with sr-only text for
              // screen readers. Full label returns at lg.
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1ebe5b] hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-[0.98] lg:px-4"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              >
                <path d="M20.5 3.5A11 11 0 0 0 3.6 17.6L2 22l4.5-1.5A11 11 0 1 0 20.5 3.5ZM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.6.9.9-2.6-.2-.3A8 8 0 1 1 12 20Zm4.5-5.7c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4 0-.4.2-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.2.3-.9 1-.9 2.4 0 1.4 1 2.8 1.1 3 .1.2 1.9 3 4.7 4.2 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1 .1-1.2l-.5-.2Z" />
              </svg>
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
            <a
              href={SITE.phoneHref}
              aria-label="Call us now"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-800 px-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-900 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-[0.98] lg:px-4"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              >
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
              </svg>
              <span className="hidden lg:inline">Call Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-800 transition-colors hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-brand-200 bg-white shadow-lg transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Primary mobile" className="px-4 py-3">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center rounded-md px-3 text-base font-medium text-brand-800 transition-colors hover:bg-brand-50 hover:text-teal-700 focus-visible:bg-brand-50 focus-visible:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-brand-200 pt-4">
            <a
              href={SITE.whatsappHref}
              aria-label="Chat on WhatsApp"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1ebe5b] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                <path d="M20.5 3.5A11 11 0 0 0 3.6 17.6L2 22l4.5-1.5A11 11 0 1 0 20.5 3.5ZM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.6.9.9-2.6-.2-.3A8 8 0 1 1 12 20Zm4.5-5.7c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4 0-.4.2-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.2.3-.9 1-.9 2.4 0 1.4 1 2.8 1.1 3 .1.2 1.9 3 4.7 4.2 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1 .1-1.2l-.5-.2Z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={SITE.phoneHref}
              aria-label="Call us now"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-800 px-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-900 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.5 11.5 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
              </svg>
              Call Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
