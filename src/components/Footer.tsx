import type { SiteSettings } from "@/lib/types";
import { FooterLogo } from "./Logo";
import { SmartLink } from "./SmartLink";

export function Footer({ site }: { site: SiteSettings }) {
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;
  return (
    <footer className="mt-auto">
      <div className="h-2 bg-brand-orange" />
      <div className="h-1.5 bg-cream" />
      <div className="relative overflow-hidden bg-forest text-white">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-6 size-28 rounded-full bg-white/5" />
        <div aria-hidden className="pointer-events-none absolute right-10 top-24 size-20 rounded-full bg-white/5" />
        <div aria-hidden className="pointer-events-none absolute -left-8 bottom-10 size-20 rounded-full bg-white/5" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1.2fr_1fr] lg:gap-0 lg:px-8">
          <div className="lg:pr-8">
            <FooterLogo />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/90">Kitchen &amp; Bakery</p>
            <div className="mt-5 h-1.5 w-28 rounded-full bg-brand-orange" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-white/85">{site.footerAbout}</p>
          </div>

          <div className="lg:border-l lg:border-white/25 lg:px-8">
            <h2 className="text-xl font-bold">Explore</h2>
            <ul className="mt-4 space-y-2 text-white/85">
              {site.footerLinks.map((l) => (
                <li key={l.label + l.href}>
                  <SmartLink href={l.href} className="hover:text-white hover:underline">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
              <li>
                <SmartLink href={site.orderUrl} className="font-bold text-brand-orange hover:underline">
                  Order Online
                </SmartLink>
              </li>
            </ul>
          </div>

          <div className="lg:border-l lg:border-white/25 lg:px-8">
            <h2 className="text-xl font-bold">Visit us</h2>
            <address className="mt-4 not-italic">
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                <span className="block text-lg font-bold">{site.addressLine1}</span>
                <span className="block text-white/85">{site.addressLine2}</span>
              </a>
              <a href={tel} className="mt-5 block text-xl font-bold hover:underline">
                {site.phone}
              </a>
              <a href={`https://${site.website.replace(/^https?:\/\//, "")}`} className="block text-white/85 hover:underline">
                {site.website}
              </a>
            </address>
          </div>

          <div className="lg:border-l lg:border-white/25 lg:pl-8">
            <h2 className="text-xl font-bold">Hours</h2>
            <p className="mt-4 text-white/85">{site.hoursLabel}</p>
            <p className="text-xl font-bold">{site.hours}</p>
            {site.hoursDetail && <p className="mt-2 text-sm text-white/70">{site.hoursDetail}</p>}
            <p className="mt-5 whitespace-pre-line text-lg italic text-white/90">{site.footerTagline}</p>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-2 border-t border-white/20 py-5 text-xs font-semibold uppercase tracking-wide text-white/85 sm:flex-row sm:items-center sm:justify-between">
            <p>{site.footerBottomLeft}</p>
            <p>{site.footerBottomRight}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
