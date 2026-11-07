import Link from "next/link";
import { CartButton } from "@/components/cart/cart-button";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="on-dark bg-dusk/95 text-plaster sticky top-0 z-40 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-base tracking-[0.18em] whitespace-nowrap uppercase sm:text-xl sm:tracking-[0.28em]"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6 sm:gap-8">
          <ul className="flex gap-6 sm:gap-8">
            {/* Phones keep just the wordmark and Bag; the hero and footer link the collection. */}
            {siteConfig.nav.map((item, i) => (
              <li key={item.href} className={i > 0 ? "hidden md:block" : "hidden sm:block"}>
                <Link href={item.href} className="eyebrow hover:text-sodium transition-colors">
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
