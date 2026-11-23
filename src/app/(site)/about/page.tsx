import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SmartLink } from "@/components/SmartLink";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const { about } = await getContent();
  const { hero, mission, story, facts } = about;
  return (
    <>
      <PageHero hero={hero} highlightColor="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent" />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:py-20 md:grid-cols-2 lg:gap-16 lg:px-8">
        {mission.image && (
          <div className="relative aspect-[7/5] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
            <Image
              src={mission.image}
              alt={mission.imageAlt}
              fill
              quality={90}
              sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h2 className="flex items-center gap-3 text-4xl font-black text-ink sm:text-5xl">
            {mission.title}
            <svg viewBox="0 0 40 30" className="h-8 w-10 text-brand-orange" aria-hidden="true">
              <path d="M8 4 12 16M24 2 18 16M34 14l-14 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </h2>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-ink/80">{mission.body}</p>
          <SmartLink href={mission.cta.href} className="btn-outline mt-8 text-brand-orange">
            {mission.cta.label} <Icon name="arrow" className="size-5" />
          </SmartLink>
        </div>
      </section>

      {facts.length > 0 && (
        <section aria-label="Key facts" className="bg-cream">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 text-center lg:grid-cols-4 lg:px-8">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-4xl font-black text-brand-orange sm:text-5xl">{f.value}</dd>
                <dd className="mt-1 font-bold text-ink/75">{f.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section id="story" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-14 sm:py-20 lg:px-8">
        <h2 className="text-4xl font-black text-ink">{story.title}</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/80">
          {story.paragraphs.map((p, i) => (
            <p key={i}>{p.text}</p>
          ))}
        </div>
      </section>
    </>
  );
}
