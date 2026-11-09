/**
 * Decides whether this device gets the real-time 3D hero or keeps the
 * drawn bottle. Pure, so the rules are unit-tested; `readDeviceSignals`
 * gathers the inputs in the browser.
 */

export interface DeviceSignals {
  reducedMotion: boolean;
  webgl: boolean;
  /** WebGL is emulated on the CPU (SwiftShader, llvmpipe): far too slow for the hero. */
  softwareRenderer?: boolean;
  saveData?: boolean;
  effectiveType?: string;
  hardwareConcurrency?: number;
  deviceMemory?: number;
}

const SLOW_NETWORKS = new Set(["slow-2g", "2g", "3g"]);
const LOW_CORES = 4;
const LOW_MEMORY_GB = 4;

export function shouldUse3D(s: DeviceSignals): boolean {
  if (s.reducedMotion || !s.webgl || s.softwareRenderer || s.saveData) return false;
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

/**
 * Browser only. Missing APIs (Safari, Firefox) count as unknown, never as low.
 * Async because the WebGL probe runs in a worker: the first context creation
 * can stall for seconds on devices without a GPU, and must not block the page.
 */
export async function readDeviceSignals(): Promise<DeviceSignals> {
  const nav = navigator as Navigator & NavigatorHints;
  const signals: DeviceSignals = {
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl: false,
    saveData: nav.connection?.saveData,
    effectiveType: nav.connection?.effectiveType,
    hardwareConcurrency: nav.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
  };
  // No point probing the GPU when the answer is already no.
  if (signals.reducedMotion || signals.saveData) return signals;
  return { ...signals, ...(await probeWebGL()) };
}

const SOFTWARE_RENDERER = /swiftshader|llvmpipe|softpipe|software|basic render/i;
const PROBE_TIMEOUT_MS = 4000;

const probeSource = `
self.onmessage = () => {
  try {
    const gl = new OffscreenCanvas(1, 1).getContext('webgl2') || new OffscreenCanvas(1, 1).getContext('webgl');
    if (!gl) return postMessage({ webgl: false });
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    postMessage({ webgl: true, renderer: info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '' });
  } catch (e) { postMessage({ webgl: false }); }
};`;

type Probe = Pick<DeviceSignals, "webgl" | "softwareRenderer">;

function probeWebGL(): Promise<Probe> {
  if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") {
    return Promise.resolve(probeOnMainThread());
  }
  return new Promise((resolve) => {
    const url = URL.createObjectURL(new Blob([probeSource], { type: "text/javascript" }));
    const worker = new Worker(url);
    const done = (result: Probe) => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(result);
    };
    // A GPU that takes this long to answer is not one to run the hero on.
    const timer = setTimeout(() => done({ webgl: false }), PROBE_TIMEOUT_MS);
    worker.onmessage = (e: MessageEvent<{ webgl: boolean; renderer?: string }>) =>
      done({
        webgl: e.data.webgl,
        softwareRenderer: SOFTWARE_RENDERER.test(e.data.renderer ?? ""),
      });
    worker.onerror = () => done(probeOnMainThread());
    worker.postMessage(0);
  });
}

function probeOnMainThread(): Probe {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return { webgl: false };
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    return { webgl: true, softwareRenderer: SOFTWARE_RENDERER.test(renderer) };
  } catch {
    return { webgl: false };
  }
}
