import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { IconBadge } from "@/components/IconBadge";
import { PageHero } from "@/components/PageHero";
import { SmartLink } from "@/components/SmartLink";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Programs" };

export default async function ProgramsPage() {
  const { programs } = await getContent();
  return (
    <>
      <PageHero hero={programs.hero} />
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.cards.map((card) => (
            <li key={card.title} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
              <div className="relative aspect-[16/9]">
                {card.image && <Image src={card.image} alt={card.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />}
              </div>
              <div className="relative flex flex-1 flex-col px-7 pt-14 pb-8">
                <IconBadge icon={card.icon} color={card.color} className="absolute -top-10 left-1/2 size-20 -translate-x-1/2" />
                <h2 className="text-2xl font-black text-ink">{card.title}</h2>
                <p className="mt-3 flex-1 font-semibold leading-relaxed text-ink/75">{card.text}</p>
                <SmartLink href={card.link.href} className="mt-6 inline-flex items-center gap-2 font-extrabold text-brand-orange hover:underline">
                  {card.link.label} <Icon name="arrow" className="size-5" />
                </SmartLink>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
