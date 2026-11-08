import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    title: "Choose your perfumes",
    body: "Pick a size and add it to your bag. Your bag stays saved on this device.",
  },
  {
    title: "Send your bag on WhatsApp",
    body: "One tap opens WhatsApp with your order already written out.",
  },
  {
    title: "We confirm and deliver",
    body: "We reply to confirm stock, delivery to your address, and payment.",
  },
];

export function OrderingSection() {
  return (
    <section id="ordering" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="space-y-4">
          <p className="eyebrow text-orchid">Ordering</p>
          <h2 className="text-4xl sm:text-5xl">How ordering works</h2>
        </Reveal>
        {/* A real sequence, so the steps are numbered. */}
        <ol className="mt-14 grid gap-10 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 120} className="border-night space-y-3 border-t pt-6">
                <span className="font-display text-orchid text-5xl">{i + 1}</span>
                <h3 className="text-2xl">{s.title}</h3>
                <p className="text-haze">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="mt-14">
          <Link href="/fragrances" className="btn-primary">
            Shop all perfumes
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
