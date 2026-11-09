import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cinzel, Jost } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";
import { robotsMeta } from "@/lib/seo";
import "./globals.css";

// Cinzel echoes the classical capitals of the Magic Perfumery wordmark.
const heading = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
const body = Jost({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${siteConfig.name} — long-lasting perfumes`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: robotsMeta(env.NEXT_PUBLIC_ALLOW_INDEXING),
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_IN" },
};

export const viewport: Viewport = { themeColor: "#241640" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const whatsapp = env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <html lang="en-IN" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <CartProvider brand={siteConfig.name} whatsappNumber={whatsapp}>
          <a
            href="#main"
            className="bg-saffron text-night-deep sr-only z-50 px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter whatsappNumber={whatsapp} />
          <WhatsAppFloat number={whatsapp} />
          <CartDrawer />
        </CartProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
