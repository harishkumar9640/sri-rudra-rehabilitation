import PageHero from '@/components/PageHero';
import { LinkButton } from '@/components/Button';
import { ArrowRightIcon } from '@/components/Icon';
import { HERO_IMAGES } from '@/lib/constants';
import { FACILITIES, getFacilityIcon } from '@/lib/facilities';

export default function Facilities() {
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="State-of-the-art rehabilitation spaces"
        subtitle="From advanced therapy gyms to private inpatient rooms, every space is designed to promote comfort, dignity, and progress."
        imageSrc={HERO_IMAGES[3].src}
        imageAlt="Sri Rudra facilities — designed for recovery"
        tone="dark"
      >
        <LinkButton href="/contact" size="lg">
          Schedule a visit
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </LinkButton>
      </PageHero>

      <main className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FACILITIES.map((facility) => (
              <li
                key={facility.title}
                className="group flex h-full flex-col rounded-2xl border border-brand-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lg focus-within:-translate-y-1 focus-within:border-teal-600 focus-within:shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white"
                >
                  {(() => {
                    const Icon = getFacilityIcon(facility.title);
                    return Icon ? <Icon className="h-6 w-6" /> : null;
                  })()}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-brand-900">
                  {facility.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700">
                  {facility.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
