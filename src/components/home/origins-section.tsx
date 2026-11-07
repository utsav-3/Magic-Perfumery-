import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { findFragrance, getOrigins } from "@/lib/catalog";

export async function OriginsSection() {
  const origins = await getOrigins();
  return (
    <section id="origins" className="bg-mint/45 scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl space-y-4">
          <p className="eyebrow text-haze">Raw materials</p>
          <h2 className="text-5xl sm:text-6xl">Where the notes come from</h2>
          <p className="text-haze text-lg">
            Every perfume is named for a place, and built around a material we buy as close to its
            source as we can.
          </p>
        </Reveal>

        <ul className="border-dusk/15 mt-16 border-t">
          {origins.map((o, i) => (
            <li key={o.material} className="border-dusk/15 border-b">
              <Reveal
                delay={i * 60}
                className="grid gap-2 py-7 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-baseline sm:gap-8"
              >
                <h3 className="text-4xl">{o.material}</h3>
                <p>
                  {o.place}
                  <span className="text-haze block text-sm">{o.region}</span>
                </p>
                <p className="text-sm">
                  <span className="text-haze">In </span>
                  {o.usedIn.map((slug, j) => {
                    const f = findFragrance(slug);
                    if (!f) return null;
                    return (
                      <span key={slug}>
                        {j > 0 && <span className="text-haze">, </span>}
                        <Link
                          href={`/fragrances/${slug}`}
                          className="decoration-dusk/30 hover:decoration-dusk underline underline-offset-4"
                        >
                          {f.name}
                        </Link>
                      </span>
                    );
                  })}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
