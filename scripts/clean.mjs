#!/usr/bin/env node
// Remove build output and caches. Leaves node_modules and .env.local alone.
import { rmSync } from "node:fs";

const targets = [
  ".next",
  "out",
  "coverage",
  "playwright-report",
  "test-results",
  "node_modules/.cache",
];
for (const t of targets) rmSync(t, { recursive: true, force: true });
console.log(`Removed: ${targets.join(", ")}`);
