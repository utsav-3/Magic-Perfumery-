import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter({ whatsappNumber }: { whatsappNumber?: string }) {
  return (
    <footer className="on-dark bg-dusk-deep text-plaster/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-[2fr_1fr] sm:px-6">
        <div className="space-y-3">
          <p className="font-display text-plaster text-2xl tracking-[0.28em] uppercase">
            {siteConfig.name}
          </p>
          <p className="max-w-sm text-sm">{siteConfig.description}</p>
        </div>
        <ul className="space-y-3 text-sm">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-sodium transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
          {whatsappNumber && (
            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sodium transition-colors"
              >
                Message us on WhatsApp
              </a>
            </li>
          )}
        </ul>
      </div>
      <p className="border-plaster/10 border-t py-6 text-center text-xs">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}
