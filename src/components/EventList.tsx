"use client";

import Image from "next/image";
import { useState } from "react";
import { formatTime, monthDay } from "@/lib/format";
import type { EventItem } from "@/lib/types";
import { Icon } from "./Icon";

export function EventList({ events, categories, emptyTitle, emptyText }: { events: EventItem[]; categories: string[]; emptyTitle: string; emptyText: string }) {
  const [active, setActive] = useState("All Events");
  const tabs = ["All Events", ...categories];
  const shown = active === "All Events" ? events : events.filter((e) => e.category === active);

  return (
    <div>
      <div role="tablist" aria-label="Filter events" className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === t}
            onClick={() => setActive(t)}
            className={`shrink-0 rounded-xl px-6 py-3 font-extrabold shadow-sm ring-1 transition ${
              active === t ? "bg-brand-orange text-white ring-brand-orange" : "bg-white text-ink ring-black/10 hover:ring-brand-orange"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-cream px-6 py-14 text-center">
          <Icon name="clock" className="mx-auto size-12 text-brand-orange" />
          <h2 className="mt-4 text-2xl font-black">{emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md font-semibold text-ink/70">{emptyText}</p>
        </div>
      ) : (
        <ul className="mt-8 space-y-6">
          {shown.map((e) => {
            const { month, day } = monthDay(e.date);
            return (
              <li key={e.title + e.date} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 sm:flex-row">
                {e.image && (
                  <div className="relative aspect-[16/9] sm:aspect-auto sm:w-64 sm:shrink-0">
                    <Image src={e.image} alt="" fill sizes="(min-width: 640px) 16rem, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="flex flex-1 gap-5 p-6">
                  <div className="w-14 shrink-0 text-center font-black leading-none text-brand-orange">
                    <span className="block text-xl">{month}</span>
                    <span className="block text-4xl">{day}</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-black text-ink">{e.title}</h2>
                    <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-bold text-ink/80">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="clock" className="size-4" />
                        {formatTime(e.startTime)}
                        {e.endTime && ` – ${formatTime(e.endTime)}`}
                      </span>
                      {e.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="pin" className="size-4" />
                          {e.location}
                        </span>
                      )}
                    </p>
                    <p className="mt-2 font-semibold text-ink/70">{e.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
