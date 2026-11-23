import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { IconBadge } from "@/components/IconBadge";
import { PageHero } from "@/components/PageHero";
import { SmartLink } from "@/components/SmartLink";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Get Involved" };

export default async function GetInvolvedPage() {
  const { getInvolved } = await getContent();
  return (
    <>
      <PageHero hero={getInvolved.hero} />
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {getInvolved.cards.map((card) => (
            <li
              key={card.title}
              id={card.id || undefined}
              className="flex scroll-mt-28 flex-col items-center rounded-2xl bg-white px-7 py-10 text-center shadow-lg ring-1 ring-black/5"
            >
              <IconBadge icon={card.icon} color={card.color} className="size-24 ring-0" />
              <h2 className="mt-6 text-3xl font-black text-ink">{card.title}</h2>
              <p className="mt-4 flex-1 text-lg font-semibold leading-relaxed text-ink/75">{card.text}</p>
              <SmartLink href={card.link.href} className="btn-primary mt-8 w-full sm:w-auto">
                {card.link.label} <Icon name="arrow" className="size-5" />
              </SmartLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
