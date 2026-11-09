import { describe, expect, it } from "vitest";
import { shouldUse3D, type DeviceSignals } from "@/lib/three-policy";

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
