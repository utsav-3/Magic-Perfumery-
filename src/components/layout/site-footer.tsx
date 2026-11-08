import Link from "next/link";
import { LotusMark } from "@/components/brand/lotus-mark";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/cart";

export function SiteFooter({ whatsappNumber }: { whatsappNumber?: string }) {
  return (
    <footer className="on-dark bg-night-deep text-paper/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-[2fr_1fr] sm:px-6">
        <div className="space-y-4">
          <div className="text-paper flex items-center gap-3">
            <LotusMark className="text-saffron h-9 w-9" strokeWidth={3.5} />
            <p className="font-display text-xl font-semibold tracking-[0.18em] uppercase">
              {siteConfig.name}
            </p>
          </div>
          <p className="max-w-sm text-sm">{siteConfig.description}</p>
        </div>
        <ul className="space-y-3 text-sm">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-saffron transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
          {whatsappNumber && (
            <li>
              <a
                href={whatsappUrl(`Hello ${siteConfig.name}, I have a question.`, whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-saffron transition-colors"
              >
                Message us on WhatsApp
              </a>
            </li>
          )}
        </ul>
      </div>
      <p className="border-paper/10 border-t py-6 text-center text-xs">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}
