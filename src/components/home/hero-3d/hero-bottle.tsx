"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from "react";
import { readDeviceSignals, shouldUse3D } from "@/lib/three-policy";
import type { Fragrance } from "@/types/fragrance";
import { fallbackAfterContextLoss, type HeroMode } from "./hero-motion";

// The 3D code is its own chunk, fetched only after the policy says yes.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

class SceneBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch(_e: Error, _i: ErrorInfo) {
    this.props.onError();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * `children` is the drawn SVG bottle: first paint and fallback. The 3D canvas
 * fades in over it once its first frame renders; the SVG keeps its space.
 */
export function HeroBottle({ fragrance, children }: { fragrance: Fragrance; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<HeroMode>("svg");
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  // Decide, then mount the scene when the browser is idle.
  useEffect(() => {
    let cancelled = false;
    let cancelIdle = () => {};
    const start = () => {
      setMode("3d");
      setMounted(true);
    };
    const whenIdle = () => {
      if (typeof requestIdleCallback === "function") {
        const id = requestIdleCallback(start, { timeout: 1500 });
        cancelIdle = () => cancelIdleCallback(id);
      } else {
        const id = setTimeout(start, 200);
        cancelIdle = () => clearTimeout(id);
      }
    };
    // After the page has loaded, so the scene never competes with first paint.
    const decide = async () => {
      if (!shouldUse3D(await readDeviceSignals()) || cancelled) return;
      whenIdle();
    };
    if (document.readyState === "complete") void decide();
    else window.addEventListener("load", decide, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", decide);
      cancelIdle();
    };
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setInView(entries[0]?.isIntersecting ?? true));
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const toSvg = (event: "lost" | "error") => {
    setMode((m) => fallbackAfterContextLoss(m, event));
    setReady(false);
  };

  const show3D = mode === "3d" && ready;

  return (
    <div ref={box} data-hero-bottle className="relative" aria-hidden>
      <div
        className={`transition-opacity duration-[600ms] ${show3D ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </div>
      {mounted && mode === "3d" && (
        <div
          className={`pointer-events-none absolute -inset-x-1/2 inset-y-0 transition-opacity duration-[600ms] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <SceneBoundary onError={() => toSvg("error")}>
            <HeroScene
              fragrance={fragrance}
              active={inView && tabVisible}
              onReady={() => setReady(true)}
              onContextLost={() => toSvg("lost")}
            />
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}
