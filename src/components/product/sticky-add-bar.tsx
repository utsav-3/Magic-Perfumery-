"use client";

/**
 * Phone-only bar pinned to the bottom of a product page once the main add
 * button has scrolled out of view. Shares the page's selected size and quantity.
 */
export function StickyAddBar({
  name,
  priceLabel,
  onAdd,
  visible,
}: {
  name: string;
  priceLabel: string;
  onAdd: () => void;
  visible: boolean;
}) {
  return (
    <div
      data-sticky-bar
      data-shown={visible ? "" : undefined}
      aria-hidden={!visible}
      inert={!visible}
      className={`bg-night/95 text-paper fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(10_5_25/0.3)] backdrop-blur transition-transform duration-500 ease-(--ease-magic) md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <span className="font-display min-w-0 flex-1 truncate text-base font-semibold">{name}</span>
      <button type="button" className="btn-light shrink-0" onClick={onAdd}>
        Add to bag — {priceLabel}
      </button>
    </div>
  );
}
