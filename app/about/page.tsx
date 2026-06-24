import PageHero from '@/components/PageHero';
import { LinkButton } from '@/components/Button';
import { ArrowRightIcon, CheckIcon } from '@/components/Icon';
import { HERO_IMAGES, SITE } from '@/lib/constants';
import { DELIVERY_PILLARS, WHY_CHOOSE, WHY_CHOOSE_ICONS } from '@/lib/services';

const ABOUT_HERO = HERO_IMAGES[2];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built for recovery. Built around you."
        subtitle="Sri Rudra Rehabilitation & Healing Institute — a doctor-led, 24×7 rehabilitation hospital serving Nalgonda and the wider Telangana region."
        imageSrc={ABOUT_HERO.src}
        imageAlt="Sri Rudra institute — built for recovery"
        tone="dark"
      >
        <LinkButton href="/contact" size="lg">
          Get in touch
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </LinkButton>
      </PageHero>

      <main className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mission & Vision */}
          <section
            aria-labelledby="mission-vision"
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            <article className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm sm:p-8">
              <h2
                id="mission-vision"
                className="text-2xl font-bold text-brand-900"
              >
                Our mission
              </h2>
              <p className="mt-3 text-brand-700">
                To provide exceptional rehabilitation care that empowers
                patients to achieve their highest level of function and
                independence.
              </p>
              <h3 className="mt-6 text-xl font-semibold text-brand-900">
                Our approach
              </h3>
              <p className="mt-2 text-brand-700">
                We believe in a holistic approach that addresses the physical,
                emotional, social, and psychological aspects of recovery.
                Evidence-based, patient-centred, family-involved.
              </p>
            </article>

            <article className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-brand-900">Our team</h2>
              <p className="mt-3 text-brand-700">
                Board-certified physicians, physiotherapists, occupational
                therapists, speech-language pathologists, psychologists,
                dietitians, and rehabilitation nurses — collaborating on
                every care plan.
              </p>
              <h3 className="mt-6 text-xl font-semibold text-brand-900">
                Facilities & technology
              </h3>
              <p className="mt-2 text-brand-700">
                Our purpose-built facility features the latest rehabilitation
                technology — robotic-assisted therapy, virtual-reality balance
                training, advanced diagnostic equipment, and 24×7 doctor and
                nursing coverage.
              </p>
            </article>
          </section>

          {/* How we deliver */}
          <section className="mt-16" aria-labelledby="how-we-deliver-about">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                How we deliver recovery
              </p>
              <h2
                id="how-we-deliver-about"
                className="mt-2 text-3xl font-bold text-brand-900"
              >
                Four principles that shape every care plan
              </h2>
            </div>
            <ul
              role="list"
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {DELIVERY_PILLARS.map((p) => (
                <li
                  key={p.title}
                  className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-brand-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-700">
                    {p.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Why Choose */}
          <section className="mt-16" aria-labelledby="why-choose-about">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                Why choose us
              </p>
              <h2
                id="why-choose-about"
                className="mt-2 text-3xl font-bold text-brand-900"
              >
                What sets our care apart
              </h2>
            </div>
            <ul
              role="list"
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {WHY_CHOOSE.map((item) => {
                const Icon = WHY_CHOOSE_ICONS[item.icon];
                return (
                  <li
                    key={item.title}
                    className="flex h-full flex-col rounded-2xl border border-brand-200 bg-white p-6 shadow-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700"
                    >
                      {Icon ? <Icon className="h-6 w-6" /> : null}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-brand-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-700">
                      {item.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Why at a glance — checklist summary */}
          <section className="mt-16" aria-labelledby="at-a-glance">
            <div className="rounded-2xl bg-brand-900 p-6 text-white shadow-lg sm:p-8">
              <h2
                id="at-a-glance"
                className="text-2xl font-bold"
              >
                At a glance
              </h2>
              <ul
                role="list"
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {[
                  'Doctor-led, 24×7 medical supervision',
                  '30 inpatient beds (AC & Non-AC)',
                  'In-house ICU facility with ventilator support',
                  '14 specialized rehabilitation programs',
                  'Multidisciplinary team across therapies',
                  'Convenient Nalgonda location with parking',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-600/20 text-teal-300"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-brand-100">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Instagram CTA */}
          <section className="mt-12" aria-labelledby="follow-instagram">
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                  Follow our journey
                </p>
                <h2
                  id="follow-instagram"
                  className="mt-2 text-2xl font-bold text-brand-900"
                >
                  See daily life at Sri Rudra on Instagram
                </h2>
                <p className="mt-2 max-w-xl text-sm text-brand-700">
                  Therapy moments, recovery milestones, and the team behind
                  every patient&rsquo;s progress.
                </p>
              </div>
              <a
                href={SITE.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-[0.98]"
                aria-label={`Follow ${SITE.social.instagram.handle} on Instagram (opens in a new tab)`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
                Follow {SITE.social.instagram.handle}
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
