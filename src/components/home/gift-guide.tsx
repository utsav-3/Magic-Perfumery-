import Link from "next/link";
import { Bottle } from "@/components/product/bottle";
import { QuickAdd } from "@/components/product/quick-add";
import { labelTint } from "@/components/product/tint";
import { Reveal } from "@/components/ui/reveal";
import { sharedVariants, type ResolvedGiftPick } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Fragrance } from "@/types/fragrance";

export function GiftGuide({
  picks,
  fragrances,
}: {
  picks: readonly ResolvedGiftPick[];
  fragrances: readonly Fragrance[];
}) {
  const small = sharedVariants(fragrances)?.[0];
  return (
    <section id="gifts" aria-labelledby="gifts-heading" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="eyebrow text-orchid">Gift guide</p>
            <h2 id="gifts-heading" className="text-4xl sm:text-5xl">
              Easy gifts
            </h2>
          </div>
          <Link
            href="/fragrances?occasion=gifting"
            className="eyebrow underline underline-offset-8"
          >
            All gift picks
          </Link>
        </Reveal>

        <ul className="grid gap-6 md:grid-cols-3">
          {picks.map(({ title, reason, fragrance: f }, i) => (
            <li key={f.slug}>
              <Reveal delay={i * 100} className="flex h-full flex-col">
                <div
                  className="grid aspect-[5/4] place-items-center"
                  style={{ background: labelTint(f.label, 26) }}
                >
                  <Bottle
                    id={`gift-${f.slug}`}
                    name={f.name}
                    label={f.label}
                    className="h-52 w-auto sm:h-60"
                  />
                </div>
                <p className="eyebrow text-haze mt-5">{title}</p>
                <h3 className="mt-2 text-2xl font-semibold">
                  <Link href={`/fragrances/${f.slug}`} className="hover:underline">
                    {f.name}
                  </Link>
                </h3>
                <p className="text-haze mt-2 mb-5">{reason}</p>
                <QuickAdd
                  slug={f.slug}
                  name={f.name}
                  variants={f.variants}
                  className="ring-night/15 mt-auto ring-1"
                />
              </Reveal>
            </li>
          ))}
        </ul>

        {small && (
          <Reveal className="bg-night on-dark text-paper mt-10 flex flex-wrap items-center justify-between gap-6 p-6 sm:p-8">
            <div className="max-w-xl space-y-2">
              <p className="font-display text-2xl font-semibold">Can&rsquo;t choose? Give two.</p>
              <p className="text-paper/80">
                Two {small.sizeMl} ml bottles cost {formatPrice(small.priceMinor * 2)}, so they can
                try both and keep a favourite.
              </p>
            </div>
            <Link href="/fragrances" className="btn-light">
              Pick two
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
