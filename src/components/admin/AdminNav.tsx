"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/actions/admin";
import { Icon } from "@/components/Icon";
import { SCHEMAS } from "@/lib/schemas";

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = [
    { href: "/admin", label: "Overview" },
    ...SCHEMAS.map((s) => ({ href: `/admin/${s.key}`, label: s.title })),
    { href: "/admin/messages", label: "Messages", badge: unread },
  ];

  return (
    <aside className="border-b border-slate-200 bg-forest text-white lg:sticky lg:top-0 lg:h-dvh lg:w-64 lg:shrink-0 lg:border-0">
      <div className="flex items-center justify-between px-5 py-4 lg:block lg:py-6">
        <Link href="/admin" className="font-serif text-2xl font-bold">
          Kitchen33 <span className="block text-xs font-sans font-bold uppercase tracking-widest text-white/60">Content dashboard</span>
        </Link>
        <button className="rounded p-2 hover:bg-white/10 lg:hidden" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className="sr-only">Toggle navigation</span>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav className={`${open ? "block" : "hidden"} px-3 pb-4 lg:block`}>
        <ul className="space-y-1">
          {items.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 font-semibold ${active ? "bg-white text-forest" : "text-white/85 hover:bg-white/10"}`}
                >
                  {item.label}
                  {"badge" in item && item.badge ? (
                    <span className="rounded-full bg-brand-orange px-2 text-xs font-bold text-white">{item.badge}</span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 space-y-1 border-t border-white/15 pt-4">
          <a href="/" target="_blank" className="block rounded-lg px-3 py-2 font-semibold text-white/85 hover:bg-white/10">
            View website ↗
          </a>
          <form action={logout}>
            <button className="w-full rounded-lg px-3 py-2 text-left font-semibold text-white/85 hover:bg-white/10">Sign out</button>
          </form>
        </div>
      </nav>
    </aside>
  );
}
