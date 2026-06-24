import Image from 'next/image';
import type { ReactNode } from 'react';

/**
 * Full-width hero with a dark gradient + abstract background image.
 *
 * The hero is the "first impression" of the page. To feel premium it needs:
 *  - A confident, generous type scale that breathes
 *  - An accent vertical bar that ties the heading to the eyebrow
 *  - A multi-stop gradient (not flat dark) that fades the image into the page
 *  - Padding that feels right on phones (5rem) through ultrawide (8rem)
 *
 * Accessibility:
 *  - The <h1> is the page's primary heading and lives in the DOM order
 *  - The decorative background image has alt="" and role="presentation"
 *  - Foreground content sits in a relative layer with semantic markup
 *  - The hidden `sr-only` span describes the hero image for screen readers
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  children,
  align = 'left',
  tone = 'dark',
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
  /** left | center */
  align?: 'left' | 'center';
  /** dark = white text over dark overlay (default). light = dark text over light overlay. */
  tone?: 'dark' | 'light';
}) {
  const isDark = tone === 'dark';
  return (
    <section
      aria-labelledby="page-hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt=""
        role="presentation"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      {/* Gradient overlay — a multi-stop dark wash for legibility.
          Stronger on the left where the copy lives; fades to reveal the image
          on the right so the page doesn't feel like a flat dark slab. */}
      <div
        aria-hidden="true"
        className={
          isDark
            ? 'absolute inset-0 -z-10 bg-gradient-to-br from-brand-950/90 via-brand-950/75 to-brand-950/35'
            : 'absolute inset-0 -z-10 bg-gradient-to-br from-white/95 via-white/85 to-white/55'
        }
      />
      {/* Subtle bottom-fade so the hero sits smoothly on the next section. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 -z-10 h-24 ${
          isDark
            ? 'bg-gradient-to-b from-transparent to-brand-50'
            : 'bg-gradient-to-b from-transparent to-white'
        }`}
      />
      {/* Decorative accent line — the brand's teal running through the eyebrow. */}
      <div
        aria-hidden="true"
        className={`absolute left-0 right-0 top-0 -z-10 h-1 ${
          isDark ? 'bg-teal-500/60' : 'bg-teal-600/70'
        }`}
      />

      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        <div className={align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
          {eyebrow ? (
            <span
              className={`inline-flex max-w-full items-center gap-2 whitespace-normal rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] sm:text-xs ${
                isDark
                  ? 'bg-teal-500/15 text-teal-300 ring-1 ring-inset ring-teal-400/30'
                  : 'bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-200'
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  isDark ? 'bg-teal-400' : 'bg-teal-600'
                }`}
              />
              {eyebrow}
            </span>
          ) : null}

          <h1
            id="page-hero-heading"
            className={`mt-5 break-words text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight ${
              isDark ? 'text-white' : 'text-brand-900'
            }`}
          >
            {title}
          </h1>

          {subtitle ? (
            <p
              className={`mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed ${
                isDark ? 'text-brand-100' : 'text-brand-700'
              } ${align === 'center' ? 'mx-auto' : ''}`}
            >
              {subtitle}
            </p>
          ) : null}

          {children ? <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div> : null}
        </div>

        {/* Hidden text for screen readers describing the hero image */}
        <span className="sr-only">{imageAlt}</span>
      </div>
    </section>
  );
}
