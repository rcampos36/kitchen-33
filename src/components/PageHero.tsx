import Image from "next/image";
import type { Hero } from "@/lib/types";
import { Wave } from "./Wave";

/** Dark-green hero used on inner pages: text on the left, photo fading in on the right. */
export function PageHero({ hero, highlightColor = "text-brand-yellow", children }: { hero: Hero; highlightColor?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      {hero.image && (
        <div className="absolute inset-0 -z-10 md:left-[38%]">
          <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="(min-width: 768px) 62vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-forest/75 md:bg-transparent md:bg-gradient-to-r md:from-forest md:via-forest/40 md:to-transparent" />
        </div>
      )}
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-24 sm:pt-20 sm:pb-32 lg:px-8 lg:pt-24 lg:pb-40">
        <div className="max-w-xl">
          <h1 className="font-display text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            {hero.title} {hero.highlight && <span className={highlightColor}>{hero.highlight}</span>}
          </h1>
          <p className="mt-6 max-w-lg text-lg font-semibold leading-relaxed text-white/95 sm:text-xl">{hero.body}</p>
          {children}
        </div>
      </div>
      <Wave />
    </section>
  );
}
