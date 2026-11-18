"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import type { Fragrance } from "@/types/fragrance";
import { BottleModel } from "./bottle-model";
import { advanceClock, bottleRotation, pointerFromWindow } from "./hero-motion";

interface SceneProps {
  fragrance: Fragrance;
  /** Render loop runs only while the hero is on screen and the tab is visible. */
  active: boolean;
  onReady: () => void;
  onContextLost: () => void;
}

/** cubic-bezier(0.2, 0.7, 0.1, 1): the site's --ease-magic curve. */
function easeMagic(x: number): number {
  const [x1, y1, x2, y2] = [0.2, 0.7, 0.1, 1];
  const bez = (a: number, b: number, t: number) =>
    3 * a * (1 - t) ** 2 * t + 3 * b * (1 - t) * t ** 2 + t ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (bez(x1, x2, mid) < x) lo = mid;
    else hi = mid;
  }
  return bez(y1, y2, (lo + hi) / 2);
}

function Bottle({ fragrance, onReady }: { fragrance: Fragrance; onReady: () => void }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const lean = useRef({ x: 0, y: 0 });
  const readyFired = useRef(false);
  // Our own clock: starts at the first rendered frame (label faces the viewer as it
  // fades in) and survives the frame loop pausing off-screen, so the entrance plays once.
  const elapsed = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [finePointer] = useState(
    () => typeof matchMedia === "function" && matchMedia("(pointer: fine)").matches,
  );

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY / Math.max(1, window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lean follows the pointer anywhere in the window, and eases back when it leaves.
  useEffect(() => {
    if (!finePointer) return;
    const onMove = (e: PointerEvent) => {
      pointer.current = pointerFromWindow(e.clientX, e.clientY, innerWidth, innerHeight);
    };
    const reset = () => {
      pointer.current = { x: 0, y: 0 };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [finePointer]);

  useFrame((_state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = elapsed.current;
    elapsed.current = advanceClock(elapsed.current, delta);
    if (finePointer) {
      lean.current.x = THREE.MathUtils.damp(lean.current.x, pointer.current.x, 4, delta);
      lean.current.y = THREE.MathUtils.damp(lean.current.y, -pointer.current.y, 4, delta);
    }
    const r = bottleRotation(t, scroll.current, lean.current);
    g.rotation.set(r.x, r.y, 0);
    g.position.y = 0.05 - 0.3 * (1 - easeMagic(Math.min(1, t / 1.2)));
    if (!readyFired.current) {
      readyFired.current = true;
      onReady();
    }
  });

  return (
    <group ref={group}>
      <BottleModel fragrance={fragrance} />
    </group>
  );
}

export default function HeroScene({ fragrance, active, onReady, onContextLost }: SceneProps) {
  const [dpr, setDpr] = useState(1.75);

  return (
    <Canvas
      aria-hidden
      frameloop={active ? "always" : "never"}
      dpr={[1, dpr]}
      camera={{ position: [0, 0, 5.8], fov: 20 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      onCreated={({ gl }) => {
        // Half-resolution glass pass: the frost blurs it anyway, and phones save a lot of fill.
        gl.transmissionResolutionScale = 0.5;
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost();
        });
      }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={2.4} position={[0, 3, 3]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-4, 0, 2]} scale={[2, 6, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[4, 0, 2]} scale={[2, 6, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[0, 0, -4]} scale={[8, 6, 1]} />
      </Environment>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} />
      <Bottle fragrance={fragrance} onReady={onReady} />
      <ContactShadows position={[0, -0.95, 0]} opacity={0.35} blur={2.5} scale={3} far={1.5} />
    </Canvas>
  );
}
