"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { tiltFromPointer } from "@/components/product/tilt-math";

const style = {
  transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
  transition: "transform 500ms var(--ease-magic)",
} as CSSProperties;

/**
 * Gentle pointer-driven lean with a soft sheen. Mouse only: nothing runs on
 * touch devices or with reduced motion. Children keep receiving clicks.
 */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef<boolean | null>(null);

  const allowed = () => {
    enabled.current ??=
      matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
    return enabled.current;
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={style}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || !allowed()) return;
        const r = el.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        const { rx, ry } = tiltFromPointer(px, py, r.width, r.height);
        el.style.setProperty("--rx", `${rx}deg`);
        el.style.setProperty("--ry", `${ry}deg`);
        el.style.setProperty("--mx", `${(px / r.width) * 100}%`);
        el.style.setProperty("--my", `${(py / r.height) * 100}%`);
        el.style.setProperty("--sheen", "1");
        el.style.transition = "transform 120ms linear";
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--sheen", "0");
        el.style.transition = style.transition as string;
      }}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-(--sheen,0) transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgb(255 255 255 / 0.28), transparent 55%)",
        }}
      />
    </div>
  );
}
