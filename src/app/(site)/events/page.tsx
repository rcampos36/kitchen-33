import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { EventList } from "@/components/EventList";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { todayInRichmond } from "@/lib/format";

export const metadata: Metadata = { title: "Events" };

export default async function EventsPage() {
  const { events } = await getContent();
  return (
    <>
      <PageHero hero={events.hero} />
      <section className="mx-auto min-h-96 max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        <Suspense fallback={<p className="font-semibold text-ink/60">Loading events…</p>}>
          <UpcomingEvents />
        </Suspense>
      </section>
    </>
  );
}

/** Rendered per request so past events drop off automatically. */
async function UpcomingEvents() {
  await connection();
  const { events } = await getContent();
  const today = todayInRichmond();
  const upcoming = events.items
    .filter((e) => e.published && e.date >= today)
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));
  return (
    <EventList
      events={upcoming}
      categories={events.categories.map((c) => c.name)}
      emptyTitle={events.emptyTitle}
      emptyText={events.emptyText}
    />
  );
}
