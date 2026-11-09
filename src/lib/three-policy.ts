/**
 * Decides whether this device gets the real-time 3D hero or keeps the
 * drawn bottle. Pure, so the rules are unit-tested; `readDeviceSignals`
 * gathers the inputs in the browser.
 */

export interface DeviceSignals {
  reducedMotion: boolean;
  webgl: boolean;
  saveData?: boolean;
  effectiveType?: string;
  hardwareConcurrency?: number;
  deviceMemory?: number;
}

const SLOW_NETWORKS = new Set(["slow-2g", "2g", "3g"]);
const LOW_CORES = 4;
const LOW_MEMORY_GB = 4;

export function shouldUse3D(s: DeviceSignals): boolean {
  if (s.reducedMotion || !s.webgl || s.saveData) return false;
  if (s.effectiveType && SLOW_NETWORKS.has(s.effectiveType)) return false;
  // Only call a device low-power when both values are known and low.
  const lowPower =
    s.hardwareConcurrency !== undefined &&
    s.deviceMemory !== undefined &&
    s.hardwareConcurrency <= LOW_CORES &&
    s.deviceMemory <= LOW_MEMORY_GB;
  return !lowPower;
}

interface NavigatorHints {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
}

/** Browser only. Missing APIs (Safari, Firefox) count as unknown, never as low. */
export function readDeviceSignals(): DeviceSignals {
  const nav = navigator as Navigator & NavigatorHints;
  return {
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl: hasWebGL(),
    saveData: nav.connection?.saveData,
    effectiveType: nav.connection?.effectiveType,
    hardwareConcurrency: nav.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
  };
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
