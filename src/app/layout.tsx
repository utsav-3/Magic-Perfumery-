import type { Metadata, Viewport } from "next";
import { Italiana, Jost } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";
import "./globals.css";

const heading = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});
const body = Jost({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${siteConfig.name} — perfumes from the city by the sea`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_IN" },
};

export const viewport: Viewport = { themeColor: "#1f2142" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const whatsapp = env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <html lang="en-IN" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <CartProvider brand={siteConfig.name} whatsappNumber={whatsapp}>
          <a
            href="#main"
            className="bg-sodium text-dusk-deep sr-only z-50 px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter whatsappNumber={whatsapp} />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
