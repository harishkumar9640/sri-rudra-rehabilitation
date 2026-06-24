import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { LinkButton, AnchorButton } from '@/components/Button';
import {
  PhoneIcon,
  WhatsappIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '@/components/Icon';
import EnquiryForm from '@/components/EnquiryForm';
import { HERO_IMAGES, SITE } from '@/lib/constants';
import {
  FAQS,
  breadcrumbJsonLd,
  serializeJsonLd,
} from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Contact us — Sri Rudra Rehabilitation & Healing Institute',
  description:
    'Get in touch with Sri Rudra Rehabilitation & Healing Institute in Nalgonda. Call, WhatsApp, or fill the enquiry form — open 24×7, every day.',
  alternates: { canonical: 'https://srirudra.in/contact/' },
  openGraph: {
    title: 'Contact Sri Rudra Rehabilitation & Healing Institute',
    description:
      'Reach our care team 24×7 by phone, WhatsApp, or the enquiry form. Located in Nalgonda, Telangana.',
    url: 'https://srirudra.in/contact/',
    type: 'website',
  },
};

const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=' +
  encodeURIComponent(`${SITE.name}, ${SITE.address}`) +
  '&output=embed';

const MAP_LINK_HREF =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`${SITE.name}, ${SITE.address}`);

export default function Contact() {
  return (
    <>
      {/* BreadcrumbList for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd([
              { name: 'Home', url: 'https://srirudra.in/' },
              { name: 'Contact', url: 'https://srirudra.in/contact/' },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Contact us"
        title="We&apos;re here, 24×7."
        subtitle="Reach out to our care team by phone, WhatsApp, the enquiry form, or in person. We'll help you understand the next step."
        imageSrc={HERO_IMAGES[3].src}
        imageAlt="Sri Rudra care team — here 24×7"
        tone="dark"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <AnchorButton href={SITE.phoneHref} variant="phone" size="lg">
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
            {SITE.phoneDisplay}
          </AnchorButton>
          <AnchorButton href={SITE.whatsappHref} variant="whatsapp" size="lg">
            <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
            WhatsApp us
          </AnchorButton>
        </div>
      </PageHero>

      <main className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ============== ENQUIRY FORM ============== */}
          <section aria-labelledby="enquiry-form-section" className="mb-12">
            <EnquiryForm />
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Contact details */}
            <section
              aria-labelledby="contact-details"
              className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
            >
              <h2
                id="contact-details"
                className="text-2xl font-bold text-brand-900"
              >
                Get in touch
              </h2>
              <p className="mt-3 text-brand-700">
                Have questions about our rehabilitation programs or want to
                schedule a consultation? Our care team is here to help you on
                your recovery journey.
              </p>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-brand-500">
                    Address
                  </dt>
                  <dd className="mt-1 flex items-start gap-2 text-brand-800">
                    <MapPinIcon
                      className="mt-1 h-5 w-5 flex-shrink-0 text-teal-700"
                      aria-hidden="true"
                    />
                    <span>{SITE.address}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-brand-500">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={SITE.phoneHref}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-2 -mx-2 text-brand-800 transition-colors hover:bg-brand-50 hover:text-teal-700 focus-visible:bg-brand-50 focus-visible:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                    >
                      <PhoneIcon
                        className="h-5 w-5 text-teal-700"
                        aria-hidden="true"
                      />
                      {SITE.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-brand-500">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={SITE.emailHref}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-2 -mx-2 text-brand-800 transition-colors hover:bg-brand-50 hover:text-teal-700 focus-visible:bg-brand-50 focus-visible:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-brand-500">
                    Instagram
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={SITE.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-2 -mx-2 text-brand-800 transition-colors hover:bg-brand-50 hover:text-teal-700 focus-visible:bg-brand-50 focus-visible:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                        className="h-5 w-5 text-teal-700"
                      >
                        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                      </svg>
                      <span>{SITE.social.instagram.handle}</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-brand-500">
                    Hours
                  </dt>
                  <dd className="mt-1 text-brand-800">Open 24×7, every day</dd>
                </div>
              </dl>
            </section>

            {/* Quick contact panel */}
            <section
              aria-labelledby="quick-contact"
              className="rounded-2xl bg-brand-900 p-6 text-white shadow-lg sm:p-8 lg:col-span-2"
            >
              <h2 id="quick-contact" className="text-2xl font-bold">
                For immediate assistance
              </h2>
              <p className="mt-3 text-brand-200">
                Tap below to call or chat — our care team answers 24×7.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <AnchorButton
                  href={SITE.phoneHref}
                  variant="phone"
                  size="lg"
                  fullWidth
                  aria-label={`Call ${SITE.phoneDisplay}`}
                >
                  <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </AnchorButton>
                <AnchorButton
                  href={SITE.whatsappHref}
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  aria-label="Chat with us on WhatsApp"
                >
                  <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
                  WhatsApp us
                </AnchorButton>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
                  Download our brochure
                </h3>
                <p className="mt-2 text-sm text-brand-200">
                  Full details about our programs and facilities.
                </p>
                <AnchorButton
                  href="/downloads/brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="mt-4 !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hover:!text-white hover:!border-white/40"
                  aria-label="Download brochure as PDF (opens in a new tab)"
                >
                  Download brochure (PDF)
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </AnchorButton>
              </div>
            </section>
          </div>

          {/* ============== MAP ============== */}
          <section
            aria-labelledby="find-us"
            className="mt-12 overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-sm"
          >
            <div className="border-b border-brand-200 p-6 sm:p-8">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2
                    id="find-us"
                    className="text-2xl font-bold text-brand-900"
                  >
                    Find us
                  </h2>
                  <p className="mt-1 text-sm text-brand-600">
                    Conveniently located in Nalgonda with easy access and
                    on-site parking.
                  </p>
                </div>
                <a
                  href={MAP_LINK_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-brand-200 bg-white px-4 text-sm font-semibold text-brand-800 transition-colors hover:border-teal-600 hover:bg-teal-50 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  aria-label="Open Sri Rudra Rehabilitation & Healing Institute in Google Maps (opens in a new tab)"
                >
                  <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                  Open in Google Maps
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="relative aspect-[16/10] w-full bg-brand-100 sm:aspect-[16/9]">
              <iframe
                title="Sri Rudra Rehabilitation & Healing Institute on Google Maps"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="p-6 text-sm text-brand-600 sm:p-8">
              <strong className="font-semibold text-brand-800">
                {SITE.name}
              </strong>
              <br />
              {SITE.address}
            </div>
          </section>

          {/* ============== FAQ ============== */}
          <section
            aria-labelledby="faq-heading"
            className="mt-16"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                Frequently asked questions
              </p>
              <h2
                id="faq-heading"
                className="mt-2 text-3xl font-bold text-brand-900"
              >
                Quick answers
              </h2>
              <p className="mt-3 text-brand-700">
                If you don't find what you need, just call us — we're happy
                to help.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-brand-200 bg-white p-6 shadow-sm open:shadow-md [&_summary::-webkit-details-marker]:hidden"
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-semibold text-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-brand-700">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ============== BOTTOM CTA ============== */}
          <section
            aria-labelledby="contact-cta"
            className="mt-16 rounded-2xl bg-brand-900 p-6 text-white shadow-lg sm:p-8"
          >
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2
                  id="contact-cta"
                  className="text-2xl font-bold"
                >
                  Still deciding? Talk to us first.
                </h2>
                <p className="mt-2 text-brand-200">
                  No obligation, no pressure. Our care team will listen, answer
                  your questions, and help you figure out the next step.
                </p>
              </div>
              <LinkButton href="/services" variant="secondary" size="lg">
                Explore our programs
                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
              </LinkButton>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
