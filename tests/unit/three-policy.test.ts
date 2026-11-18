import { describe, expect, it } from "vitest";
import { probeWebGL, shouldUse3D, type DeviceSignals } from "@/lib/three-policy";

const ok: DeviceSignals = { reducedMotion: false, webgl: true };

describe("shouldUse3D", () => {
  it("allows 3D on a capable device", () => {
    expect(shouldUse3D(ok)).toBe(true);
  });

  it.each<[string, DeviceSignals]>([
    ["reduced motion", { ...ok, reducedMotion: true }],
    ["no WebGL", { ...ok, webgl: false }],
    ["Save-Data", { ...ok, saveData: true }],
    ["3g", { ...ok, effectiveType: "3g" }],
    ["2g", { ...ok, effectiveType: "2g" }],
    ["slow-2g", { ...ok, effectiveType: "slow-2g" }],
    ["a software renderer (no GPU)", { ...ok, softwareRenderer: true }],
    ["low cores and low memory", { ...ok, hardwareConcurrency: 4, deviceMemory: 4 }],
  ])("keeps the drawing with %s", (_, signals) => {
    expect(shouldUse3D(signals)).toBe(false);
  });

  it.each<[string, DeviceSignals]>([
    ["low cores, memory unknown", { ...ok, hardwareConcurrency: 4 }],
    ["many cores, low memory", { ...ok, hardwareConcurrency: 8, deviceMemory: 2 }],
    ["4g", { ...ok, effectiveType: "4g" }],
  ])("allows 3D with %s", (_, signals) => {
    expect(shouldUse3D(signals)).toBe(true);
  });
});

describe("probeWebGL failure paths", () => {
  // The probe runs off the main thread so a slow GPU can't freeze the page.
  // When the worker itself fails, it must answer "no WebGL", never fall back
  // to probing on the main thread, and never reject.
  const g = globalThis as Record<string, unknown>;
  const touched = { main: 0 };
  g.OffscreenCanvas ??= class {};
  g.Worker ??= class {};
  g.document ??= {
    createElement: () => {
      touched.main++;
      throw new Error("main-thread probe");
    },
  };

  it("answers no WebGL when the worker can't be created", async () => {
    const result = await probeWebGL(() => {
      throw new Error("blocked by CSP");
    });
    expect(result).toEqual({ webgl: false });
    expect(touched.main).toBe(0);
  });

  it("answers no WebGL when the worker errors, without a main-thread probe", async () => {
    const result = await probeWebGL(() => {
      const w = {
        onerror: null as null | (() => void),
        onmessage: null,
        terminate() {},
        postMessage() {
          queueMicrotask(() => w.onerror?.());
        },
      };
      return w as unknown as Worker;
    });
    expect(result).toEqual({ webgl: false });
    expect(touched.main).toBe(0);
  });
});
