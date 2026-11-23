import Image from "next/image";
import { Icon } from "@/components/Icon";
import { SmartLink } from "@/components/SmartLink";
import { Wave } from "@/components/Wave";
import { getContent } from "@/lib/content";

const featureColors = ["text-brand-orange", "text-brand-green", "text-brand-yellow", "text-brand-orange"];

export default async function HomePage() {
  const { home } = await getContent();
  const { hero, features } = home;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[55%] md:block">
          <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="55vw" className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/20 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-20 sm:pt-16 md:pb-36 lg:px-8 lg:pt-24 lg:pb-44">
          <div className="max-w-xl md:max-w-[52%]">
            <h1 className="font-display text-4xl leading-[1.08] font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {hero.title} <span className="text-brand-orange">{hero.highlight}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg font-semibold leading-relaxed text-ink/85">{hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <SmartLink href={hero.primaryCta.href} className="btn-primary">
                {hero.primaryCta.label} <Icon name="arrow" className="size-5" />
              </SmartLink>
              <SmartLink href={hero.secondaryCta.href} className="btn-outline">
                {hero.secondaryCta.label}
              </SmartLink>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full md:hidden">
          <Image src={hero.image} alt={hero.imageAlt} fill sizes="100vw" className="object-cover object-top" />
        </div>
        <Wave />
      </section>

      <section aria-label="Highlights" className="mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8">
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <li key={f.title} className="text-center">
              <Icon name={f.icon} className={`mx-auto size-16 ${featureColors[i % featureColors.length]}`} strokeWidth={1.6} />
              <h2 className="mt-4 text-xl font-extrabold text-ink">{f.title}</h2>
              <p className="mx-auto mt-2 max-w-[15rem] font-semibold text-ink/70">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
