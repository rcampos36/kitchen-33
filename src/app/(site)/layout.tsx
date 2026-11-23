import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getContent } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { site } = await getContent();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-white focus:p-2">
        Skip to content
      </a>
      <Header tagline={site.logoTagline} donateLabel={site.donateLabel} donateUrl={site.donateUrl} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer site={site} />
    </>
  );
}
