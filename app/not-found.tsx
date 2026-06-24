import Link from 'next/link';
import { LinkButton, AnchorButton } from '@/components/Button';
import { ArrowRightIcon, PhoneIcon, WhatsappIcon } from '@/components/Icon';
import { HERO_IMAGES, SITE } from '@/lib/constants';

export const metadata = {
  title: 'Page not found — Sri Rudra Rehabilitation & Healing Institute',
  description:
    'The page you are looking for has moved or no longer exists. Get back to the home page or contact our care team.',
};

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden">
      {/* Reuse a hero background so the 404 page still feels on-brand. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGES[4].src})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950/90 via-brand-950/75 to-brand-950/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-1 bg-teal-500/60"
      />

      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-4 py-20 text-white sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-300 ring-1 ring-inset ring-teal-400/30">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          404 — Page not found
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          We couldn’t find that page.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-brand-100">
          The page may have moved or no longer exists. Our care team is here
          24×7 if you’d like to talk to someone directly.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <LinkButton href="/" size="lg">
            Back to home
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </LinkButton>
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
    </main>
  );
}
