import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { LinkButton } from '@/components/Button';
import { HERO_IMAGES, SUCCESS_STORIES } from '@/lib/constants';
import { SERVICES, type ServiceIconName } from '@/lib/services';
import { ArrowRightIcon } from '@/components/Icon';
import * as Icons from '@/components/Icon';

/**
 * Map a service's `icon` key to the matching inline-SVG component from
 * `components/Icon.tsx`. Using SVGs (not emoji) gives us:
 *  - crisp rendering at every DPR
 *  - consistent line weight with the rest of the site
 *  - themeable via `currentColor` (so the hover state on the card actually
 *    recolors the icon)
 */
const SERVICE_ICON_MAP: Record<
  ServiceIconName,
  React.ComponentType<{ className?: string; title?: string }>
> = {
  neuro: Icons.ServiceNeuroIcon,
  orthopedic: Icons.ServiceOrthopedicIcon,
  cardiac: Icons.ServiceCardiacIcon,
  cancer: Icons.ServiceCancerIcon,
  fracture: Icons.ServiceFractureIcon,
  headInjury: Icons.ServiceHeadInjuryIcon,
  spinalCord: Icons.ServiceSpinalCordIcon,
  sportsInjury: Icons.ServiceSportsInjuryIcon,
  kneeReplacement: Icons.ServiceKneeReplacementIcon,
  longTermIcu: Icons.ServiceLongTermIcuIcon,
  pediatric: Icons.ServicePediatricIcon,
  geriatric: Icons.ServiceGeriatricIcon,
  oldAgeCare: Icons.ServiceOldAgeCareIcon,
  pulmonology: Icons.ServicePulmonologyIcon,
};

export default function Services() {
  return (
    <>
      {/* Highlight strip — three real patient moments from the gallery. */}
      <section
        className="bg-white"
        aria-label="Sri Rudra recovery highlights"
      >
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SUCCESS_STORIES.slice(0, 3).map((story) => (
              <div
                key={story.src}
                className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-sm ring-1 ring-brand-200/60"
              >
                <Image
                  src={story.src}
                  alt={story.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageHero
        eyebrow="Our services"
        title="Specialized rehabilitation programs"
        subtitle="Fourteen dedicated programs covering the full spectrum of physical, neurological, cardiac, and age-related recovery — built around measurable, milestone-based progress."
        imageSrc={HERO_IMAGES[1].src}
        imageAlt="Therapy scene at Sri Rudra"
        tone="dark"
      >
        <LinkButton href="/contact" size="lg" aria-label="Contact us to learn more about our services">
          Speak with our team
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </LinkButton>
      </PageHero>

      <main className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICON_MAP[service.icon];
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="group flex h-full flex-col rounded-2xl border border-brand-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-teal-600 focus-visible:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white"
                    >
                      {Icon ? <Icon className="h-6 w-6" /> : null}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-brand-900 group-hover:text-teal-700">
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
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}
