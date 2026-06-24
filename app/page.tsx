import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { LinkButton, AnchorButton } from '@/components/Button';
import {
  PillarMilestoneIcon,
  PillarDoctorIcon,
  PillarTeamIcon,
  PillarEquipmentIcon,
  PhoneIcon,
  WhatsappIcon,
  CheckIcon,
  ArrowRightIcon,
  InstagramIcon,
} from '@/components/Icon';
import {
  HERO_IMAGES,
  SUCCESS_STORIES,
  SITE,
} from '@/lib/constants';
import {
  SERVICES,
  DELIVERY_PILLARS,
  HOME_STATS,
  CONDITIONS_TREATED,
  WHY_CHOOSE,
  WHY_CHOOSE_ICONS,
  TRUST_TEXT,
} from '@/lib/services';
import { FAQS } from '@/lib/structured-data';

const PILLAR_ICONS = {
  milestone: PillarMilestoneIcon,
  doctor: PillarDoctorIcon,
  team: PillarTeamIcon,
  equipment: PillarEquipmentIcon,
} as const;

export default function Home() {
  return (
    <>
      {/* ============== HERO ============== */}
      <PageHero
        eyebrow="Rehabilitation & Healing Institute • Nalgonda"
        title={
          // Use min-w-0 so the H1 can wrap on extremely narrow viewports
          // (Galaxy Fold cover at 280px), and drop the hard nowrap so
          // "Rooted in Care." can break if needed.
          <>
            <span>Guided by Science.&nbsp;</span>
            <span>Rooted in Care.</span>
          </>
        }
        subtitle="Doctor-led, 24×7 rehabilitation care — for stroke recovery, paralysis, joint replacement, ICU deconditioning, and every journey back to daily life."
        imageSrc={HERO_IMAGES[0].src}
        imageAlt="Therapist assisting a patient during a rehabilitation session at Sri Rudra"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton
            href="/services"
            size="lg"
            aria-label="Explore our rehabilitation services"
          >
            Explore Services
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </LinkButton>
          <AnchorButton
            href={SITE.phoneHref}
            variant="ghost"
            size="lg"
            aria-label={`Call ${SITE.phoneDisplay}`}
          >
            <PhoneIcon className="h-5 w-5" aria-hidden="true" />
            {SITE.phoneDisplay}
          </AnchorButton>
        </div>
      </PageHero>

      {/* ============== STATS STRIP ============== */}
      <section aria-label="At a glance" className="bg-white border-y border-brand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-6 lg:grid-cols-4">
            {HOME_STATS.map((stat) => (
              <div key={stat.label} className="min-w-0 text-center sm:text-left">
                <dt className="break-words text-xs font-semibold uppercase tracking-wider text-brand-500">
                  {stat.label}
                </dt>
                <dd className="mt-1 break-words text-3xl font-bold text-brand-800 sm:text-5xl">
                  {stat.value}
                </dd>
                <p className="mt-1 break-words text-sm text-brand-600">{stat.sub}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============== HOW WE DELIVER ============== */}
      <section className="bg-brand-50 py-16 sm:py-20" aria-labelledby="how-we-deliver">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              How we deliver recovery
            </p>
            <h2
              id="how-we-deliver"
              className="mt-2 text-3xl sm:text-4xl font-bold text-brand-900"
            >
              Four pillars behind every patient’s progress
            </h2>
            <p className="mt-4 text-lg text-brand-700">
              Recovery is built step by step. These are the principles that shape
              every care plan at Sri Rudra.
            </p>
          </div>

          <ul
            role="list"
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {DELIVERY_PILLARS.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.icon];
              return (
                <li key={pillar.title}>
                  <article className="group h-full rounded-2xl border border-brand-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lg focus-within:-translate-y-1 focus-within:border-teal-600 focus-within:shadow-lg">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white"
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-brand-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-700">
                      {pillar.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============== WHO WE HELP ============== */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="who-we-help">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              Conditions we treat
            </p>
            <h2
              id="who-we-help"
              className="mt-2 text-3xl sm:text-4xl font-bold text-brand-900"
            >
              Helping people recover fast
            </h2>
            <p className="mt-4 text-lg text-brand-700">
              From the ICU to daily life — specialized rehabilitation for a wide
              range of conditions.
            </p>
          </div>

          <ul role="list" className="mt-10 flex flex-wrap gap-3">
            {CONDITIONS_TREATED.map((condition) => (
              <li key={condition}>
                <Link
                  href="/services"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand-200 bg-white px-4 text-sm font-medium text-brand-800 transition-all duration-200 hover:border-teal-600 hover:bg-teal-50 hover:text-teal-800 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                >
                  <CheckIcon className="h-4 w-4 text-teal-600" aria-hidden="true" />
                  {condition}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============== SERVICES OVERVIEW ============== */}
      <section className="bg-brand-50 py-16 sm:py-20" aria-labelledby="our-services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                Our services
              </p>
              <h2
                id="our-services"
                className="mt-2 text-3xl sm:text-4xl font-bold text-brand-900"
              >
                Specialized rehabilitation programs
              </h2>
              <p className="mt-4 text-lg text-brand-700">
                Fourteen dedicated programs covering the full spectrum of
                physical, neurological, cardiac, and age-related recovery.
              </p>
            </div>
            <LinkButton
              href="/services"
              variant="secondary"
              aria-label="View all 14 rehabilitation services"
            >
              View all services
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
          </div>

          <ul
            role="list"
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICES.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}/`}
                  className="group flex h-full flex-col rounded-2xl border border-brand-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-teal-600 focus-visible:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                >
                  <h3 className="text-lg font-semibold text-brand-900 group-hover:text-teal-700">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-700">
                    {service.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700"
                  >
                    Learn more
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============== ABOUT (BANNER + COPY) ============== */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="about-rudra">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                About us
              </p>
              <h2
                id="about-rudra"
                className="mt-2 text-3xl sm:text-4xl font-bold text-brand-900"
              >
                A purpose-built rehabilitation institute in Nalgonda
              </h2>
              <p className="mt-6 text-lg text-brand-700">
                Sri Rudra combines advanced rehabilitation technology with
                compassionate, doctor-led care to provide personalized treatment
                plans for each patient. We help individuals recover from
                injuries, surgeries, and chronic conditions — and return to the
                life they love.
              </p>
              <p className="mt-4 text-brand-700">
                Our multidisciplinary team of physicians, physiotherapists,
                occupational therapists, speech-language pathologists,
                dietitians, psychologists, and rehabilitation nurses works
                together to build a plan around your goals.
              </p>
              <div className="mt-8">
                <LinkButton
                  href="/about"
                  size="lg"
                  aria-label="Learn more about Sri Rudra Rehabilitation & Healing Institute"
                >
                  Learn more about us
                  <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                </LinkButton>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-brand-200/60">
                <Image
                  src={SUCCESS_STORIES[2].src}
                  alt={SUCCESS_STORIES[2].alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-950/40 to-transparent"
                />
              </div>
              <p className="mt-3 text-xs text-brand-500">{TRUST_TEXT}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== WHY CHOOSE ============== */}
      <section className="bg-brand-50 py-16 sm:py-20" aria-labelledby="why-choose">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              Why choose Sri Rudra
            </p>
            <h2
              id="why-choose"
              className="mt-2 text-3xl sm:text-4xl font-bold text-brand-900"
            >
              What makes our care different
            </h2>
          </div>
          <ul
            role="list"
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {WHY_CHOOSE.map((item) => {
              const Icon = WHY_CHOOSE_ICONS[item.icon];
              return (
                <li key={item.title}>
                  <article className="group flex h-full flex-col rounded-2xl border border-brand-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lg">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white"
                    >
                      {Icon ? <Icon className="h-6 w-6" /> : null}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-brand-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-700">
                      {item.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============== REAL PEOPLE, REAL RECOVERIES ============== */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="real-stories">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                Real people, real recoveries
              </p>
              <h2
                id="real-stories"
                className="mt-2 text-3xl sm:text-4xl font-bold text-brand-900"
              >
                Stories from our patients and families
              </h2>
              <p className="mt-4 text-lg text-brand-700">
                Every discharge is a milestone. Moments shared with consent
                from patients and families at Sri Rudra.
              </p>
            </div>
            <LinkButton
              href="/gallery"
              variant="secondary"
              aria-label="See all patient recovery stories in the gallery"
            >
              See all recovery stories
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
          </div>

          <ul
            role="list"
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SUCCESS_STORIES.slice(0, 3).map((story) => (
              <li key={story.src}>
                <figure className="group h-full overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={story.src}
                      alt={story.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-5">
                    <p className="text-sm italic text-brand-700">
                      &ldquo;{story.caption}&rdquo;
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
                      Patient recovery at Sri Rudra
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============== INSTAGRAM CTA ============== */}
      <section
        aria-labelledby="instagram-cta"
        className="bg-gradient-to-br from-brand-50 via-white to-teal-50/40 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-brand-200/60">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="p-8 sm:p-10 lg:col-span-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                  Follow our journey
                </p>
                <h2
                  id="instagram-cta"
                  className="mt-2 text-3xl sm:text-4xl font-bold text-brand-900"
                >
                  Daily life at Sri Rudra, on Instagram
                </h2>
                <p className="mt-4 max-w-xl text-base text-brand-700">
                  Follow us for therapy moments, recovery milestones, doctor
                  insights, and the people behind every patient&rsquo;s progress
                  at Sri Rudra Rehabilitation & Healing Institute.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={SITE.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 whitespace-normal rounded-lg bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-[0.98]"
                    aria-label={`Follow ${SITE.social.instagram.handle} on Instagram (opens in a new tab)`}
                  >
                    <InstagramIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 break-words">Follow {SITE.social.instagram.handle}</span>
                  </a>
                  <span className="text-sm text-brand-500">
                    Real stories. No filters on the work.
                  </span>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-8 sm:p-10 lg:col-span-2">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]"
                />
                <div className="relative grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <a
                      key={i}
                      href={SITE.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View recovery moment ${i} on Instagram`}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-white/20 ring-1 ring-white/30 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Image
                        src={SUCCESS_STORIES[((i - 1) % SUCCESS_STORIES.length)].src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 12vw, 33vw"
                        className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                        loading="lazy"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                      />
                    </a>
                  ))}
                </div>
                <p className="relative mt-4 text-center text-xs font-medium text-white/90">
                  Tap any tile to view on Instagram
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="bg-brand-50 py-16 sm:py-20" aria-labelledby="faq-home">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              Frequently asked questions
            </p>
            <h2
              id="faq-home"
              className="mt-2 text-3xl sm:text-4xl font-bold text-brand-900"
            >
              Quick answers about our care
            </h2>
            <p className="mt-4 text-lg text-brand-700">
              The questions families ask most before reaching out. For
              anything specific to your situation, please call us.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {FAQS.slice(0, 4).map((f, i) => (
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
          <div className="mt-8 text-center">
            <Link
              href="/contact/#faq-heading"
              className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-teal-700 underline underline-offset-4 transition-colors hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
              See all questions
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== CALL CTA STRIP ============== */}
      <section
        aria-labelledby="call-cta"
        className="bg-brand-900 text-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <div>
            <h2
              id="call-cta"
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Have a question? Call us now.
            </h2>
            <p className="mt-2 text-base text-brand-200">
              Our care team is available 24/7 to help you understand the next
              step for you or your loved one.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-shrink-0">
            <AnchorButton
              href={SITE.phoneHref}
              variant="phone"
              size="lg"
              aria-label={`Call ${SITE.phoneDisplay}`}
            >
              <PhoneIcon className="h-5 w-5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </AnchorButton>
            <AnchorButton
              href={SITE.whatsappHref}
              variant="whatsapp"
              size="lg"
              aria-label="Chat with us on WhatsApp"
            >
              <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
              WhatsApp us
            </AnchorButton>
          </div>
        </div>
      </section>
    </>
  );
}
