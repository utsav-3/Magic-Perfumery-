import Link from "next/link";
import { LotusMark } from "@/components/brand/lotus-mark";
import { CartButton } from "@/components/cart/cart-button";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="on-dark bg-night/95 text-paper sticky top-0 z-40 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 whitespace-nowrap sm:gap-2.5">
          <LotusMark className="text-saffron h-7 w-7 sm:h-8 sm:w-8" strokeWidth={4} />
          <span className="font-display text-[0.9rem] font-semibold tracking-[0.1em] uppercase sm:text-lg sm:tracking-[0.18em]">
            {siteConfig.name}
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6 lg:gap-8">
          <ul className="hidden gap-6 md:flex lg:gap-8">
            {/* Phones keep the wordmark and Bag; the hero, tiles and footer link the rest. */}
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="eyebrow hover:text-saffron transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
