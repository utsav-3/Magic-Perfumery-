#!/usr/bin/env node
// One-command, idempotent, non-interactive project setup. Safe to re-run.
//
//   npm run setup               install deps, seed .env.local, run doctor
//   npm run setup -- --e2e      also install the Playwright Chromium browser
import { copyFileSync, existsSync } from "node:fs";
import { color, run } from "./lib/run.mjs";

const step = (msg) => console.log(color.bold(`\n▸ ${msg}`));
const must = async (cmd) => {
  const { code } = await run(cmd, { inherit: true });
  if (code !== 0) {
    console.error(color.red(`\nFailed: ${cmd}`));
    process.exit(code);
  }
};

step("Installing dependencies");
// `npm ci` is faster and reproducible when a lockfile exists.
await must(existsSync("package-lock.json") ? "npm ci" : "npm install");

step("Environment file");
if (existsSync(".env.local")) {
  console.log(color.dim(".env.local already exists — left untouched"));
} else {
  copyFileSync(".env.example", ".env.local");
  console.log("Created .env.local from .env.example");
}

if (process.argv.includes("--e2e")) {
  step("Installing Playwright Chromium");
  await must("npx playwright install chromium");
}

step("Doctor");
await must("node scripts/doctor.mjs");

console.log(color.green("\nReady. Start with: npm run dev"));
