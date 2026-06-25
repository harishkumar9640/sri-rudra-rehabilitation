import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { LinkButton, AnchorButton } from '@/components/Button';
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  WhatsappIcon,
} from '@/components/Icon';
import * as Icons from '@/components/Icon';
import { SERVICES, getServiceBySlug } from '@/lib/services';
import { HERO_IMAGES, SITE } from '@/lib/constants';

type Params = Promise<{ slug: string }>;

/** Statically generate every known service slug at build time. */
export function generateStaticParams(): { slug: string }[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  // Resolve the dynamic route param and look up the service by slug.
  // If the slug doesn't match any service, return a 404-style title.
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found' };
  // Return only the service name as the title — the root layout's
  // `title.template` ('%s — Sri Rudra ...') wraps it with the institute
  // name automatically. Returning the full title here would cause the
  // institute name to appear twice in the rendered <title>.
  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon =
    (Icons as Record<string, React.ComponentType<{ className?: string; title?: string }> | undefined>)[
      `Service${pascal(service.icon)}Icon`
    ];

  // Pick a different hero per service for visual variety. Stable per slug.
  const heroIndex = Math.abs(hashSlug(slug)) % HERO_IMAGES.length;

  return (
    <>
      <PageHero
        eyebrow="Specialized program"
        title={service.name}
        subtitle={service.description}
        imageSrc={HERO_IMAGES[heroIndex].src}
        imageAlt={`${service.name} at Sri Rudra`}
        tone="dark"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/contact" size="lg">
            Speak with our team
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </LinkButton>
          <AnchorButton href={SITE.phoneHref} variant="ghost" size="lg">
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
            {SITE.phoneDisplay}
          </AnchorButton>
        </div>
      </PageHero>

      <main className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Overview */}
          <section
            aria-labelledby="overview"
            className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 sm:flex"
              >
                {Icon ? <Icon className="h-7 w-7" /> : null}
              </span>
              <div>
                <h2
                  id="overview"
                  className="text-2xl font-bold text-brand-900"
                >
                  Program overview
                </h2>
                <p className="mt-3 text-base leading-relaxed text-brand-700">
                  {service.longDescription}
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section aria-labelledby="benefits" className="mt-10">
            <h2
              id="benefits"
              className="text-2xl font-bold text-brand-900"
            >
              What this program helps with
            </h2>
            <ul
              role="list"
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {service.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-brand-200 bg-white p-4 shadow-sm"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700"
                  >
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-brand-800">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Cross-link to related */}
          <section
            aria-labelledby="other-programs"
            className="mt-12"
          >
            <h2
              id="other-programs"
              className="text-2xl font-bold text-brand-900"
            >
              Other specialized programs
            </h2>
            <ul
              role="list"
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {SERVICES.filter((s) => s.slug !== service.slug)
                .slice(0, 6)
                .map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}/`}
                      className="group flex items-center justify-between rounded-xl border border-brand-200 bg-white p-4 text-sm font-semibold text-brand-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-600 hover:text-teal-700 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-teal-600 focus-visible:text-teal-700 focus-visible:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                    >
                      <span>{s.name}</span>
                      <ArrowRightIcon
                        className="h-4 w-4 text-brand-400 transition-all group-hover:translate-x-1 group-hover:text-teal-700"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
            </ul>
          </section>

          {/* CTA */}
          <section
            aria-labelledby="contact-cta"
            className="mt-12 rounded-2xl bg-brand-900 p-6 text-white shadow-lg sm:p-8"
          >
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2
                  id="contact-cta"
                  className="text-2xl font-bold"
                >
                  Ready to begin {service.name.toLowerCase()}?
                </h2>
                <p className="mt-2 text-brand-200">
                  Call us or message on WhatsApp — our care team will guide you
                  through the next steps.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <AnchorButton
                  href={SITE.phoneHref}
                  variant="phone"
                  aria-label={`Call ${SITE.phoneDisplay}`}
                >
                  <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </AnchorButton>
                <AnchorButton
                  href={SITE.whatsappHref}
                  variant="whatsapp"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
                  WhatsApp us
                </AnchorButton>
              </div>
            </div>
          </section>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 text-sm font-semibold text-teal-700 underline underline-offset-4 transition-colors hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
              <ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />
              Back to all services
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function pascal(s: string): string {
  return s
    .split(/[-_]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function hashSlug(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return h;
}
