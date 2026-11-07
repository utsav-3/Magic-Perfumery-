#!/usr/bin/env node
// Environment health check. Read-only: reports problems and the fix for each.
import { existsSync, readFileSync } from "node:fs";
import { color, run } from "./lib/run.mjs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const minNode = pkg.engines.node.replace(/[^\d.]/g, "");

const cmp = (a, b) => {
  const [x, y] = [a, b].map((v) => v.split(".").map(Number));
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
  return 0;
};

const checks = [
  {
    name: `Node ${pkg.engines.node}`,
    ok: cmp(process.versions.node, minNode) >= 0,
    detail: `found ${process.versions.node}`,
    fix: "Install Node from .nvmrc (nvm install / fnm use / volta)",
  },
  {
    name: "Dependencies installed",
    ok: existsSync("node_modules/.package-lock.json"),
    fix: "npm run setup",
  },
  {
    name: ".env.local present",
    ok: existsSync(".env.local"),
    fix: "Copy .env.example to .env.local",
  },
  {
    name: "Git repository",
    ok: (await run("git rev-parse --is-inside-work-tree")).code === 0,
    fix: "git init -b main",
  },
];

let failed = 0;
for (const c of checks) {
  if (!c.ok) failed++;
  const mark = c.ok ? color.green("✓") : color.red("✗");
  const detail = c.detail ? color.dim(` (${c.detail})`) : "";
  console.log(`${mark} ${c.name}${detail}${c.ok ? "" : color.yellow(`  → ${c.fix}`)}`);
}
process.exit(failed ? 1 : 0);
