import type { Metadata } from "next";
import { Kaushan_Script, Lora, Nunito } from "next/font/google";
import { getContent } from "@/lib/content";
import "./globals.css";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const kaushan = Kaushan_Script({ variable: "--font-kaushan", subsets: ["latin"], weight: "400" });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], weight: ["600", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    title: { default: site.name, template: `%s | ${site.name}` },
    description: site.seoDescription,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${nunito.variable} ${kaushan.variable} ${lora.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
