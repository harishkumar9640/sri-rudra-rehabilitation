import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { HERO_IMAGES, SUCCESS_STORIES } from '@/lib/constants';

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Recovery gallery"
        title="Moments from real recoveries"
        subtitle="Photos of patients and their families at discharge — celebrating progress and the journey back to daily life. Shared with consent."
        imageSrc={HERO_IMAGES[1].src}
        imageAlt="Sri Rudra recovery gallery — real patients, real progress"
        tone="dark"
      />

      <main className="bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SUCCESS_STORIES.map((story) => (
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
      </main>
    </>
  );
}
