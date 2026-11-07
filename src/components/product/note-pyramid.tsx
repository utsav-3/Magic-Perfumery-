import type { NotePyramid as Notes } from "@/types/fragrance";

const tiers = [
  ["top", "Top"],
  ["heart", "Heart"],
  ["base", "Base"],
] as const;

export function NotePyramid({ notes }: { notes: Notes }) {
  return (
    <dl className="border-dusk/15 grid grid-cols-3 gap-6 border-t pt-6">
      {tiers.map(([key, label]) => (
        <div key={key}>
          <dt className="eyebrow text-haze text-[0.65rem]">{label}</dt>
          <dd className="mt-2 space-y-1 text-sm">
            {notes[key].map((n) => (
              <span key={n} className="block">
                {n}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
