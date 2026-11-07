import { spawn } from "node:child_process";

/**
 * Run a shell command, resolving with { code, output, ms }. Output is captured
 * (not streamed) unless `inherit` is set, so parallel tasks don't interleave.
 */
export function run(command, { inherit = false, cwd = process.cwd() } = {}) {
  const started = performance.now();
  return new Promise((resolve) => {
    const child = spawn(command, {
      cwd,
      shell: true,
      stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
      env: process.env.NO_COLOR ? process.env : { ...process.env, FORCE_COLOR: "1" },
    });
    let output = "";
    child.stdout?.on("data", (d) => (output += d));
    child.stderr?.on("data", (d) => (output += d));
    child.on("close", (code) =>
      resolve({ code: code ?? 1, output, ms: Math.round(performance.now() - started) }),
    );
  });
}

export const color = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};
