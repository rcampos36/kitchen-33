import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon, type AnyIcon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const { contact, site } = await getContent();
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <PageHero hero={contact.hero} highlightColor="text-brand-orange" />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <div className="space-y-9">
          <Row icon="pin" title={contact.visitTitle}>
            <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">
              {site.name}
              <br />
              {site.addressLine1}
              <br />
              {site.addressLine2}
            </a>
            <p className="mt-2 text-base">
              {site.hoursLabel}, {site.hours}
            </p>
          </Row>
          <Row icon="phone" title={contact.callTitle}>
            <a href={tel} className="hover:text-brand-orange">
              {site.phone}
            </a>
          </Row>
          <Row icon="mail" title={contact.emailTitle}>
            <a href={`mailto:${site.email}`} className="break-all hover:text-brand-orange">
              {site.email}
            </a>
          </Row>
          {site.social.length > 0 && (
            <ul className="flex gap-4" aria-label="Social media">
              {site.social.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-12 place-items-center rounded-full bg-ink/80 text-white transition hover:bg-brand-orange"
                  >
                    <span className="sr-only">{s.platform}</span>
                    <Icon name={s.platform} className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-10">
          <ContactForm successText={contact.formSuccess} />
        </div>
      </section>
    </>
  );
}

function Row({ icon, title, children }: { icon: AnyIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <Icon name={icon} className="size-10 shrink-0 fill-brand-orange/15 text-brand-orange" />
      <div>
        <h2 className="text-2xl font-black">{title}</h2>
        <div className="mt-1 text-lg font-semibold text-ink/80">{children}</div>
      </div>
    </div>
  );
}
