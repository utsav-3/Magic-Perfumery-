#!/usr/bin/env node
// The one gate to run before calling work done. Independent checks run in
// parallel; output is shown only for failures.
//
//   npm run verify            typecheck + lint + format + unit tests
//   npm run verify -- --build also runs a production build and the 3D bundle budget
import { color, run } from "./lib/run.mjs";

const checks = [
  ["typecheck", "npm run -s typecheck"],
  ["lint", "npm run -s lint"],
  ["format", "npm run -s format:check"],
  ["unit tests", "npm run -s test"],
];

const started = performance.now();
const results = await Promise.all(
  checks.map(async ([name, cmd]) => ({ name, ...(await run(cmd)) })),
);

if (process.argv.includes("--build") && results.every((r) => r.code === 0)) {
  const build = { name: "build", ...(await run("npm run -s build")) };
  results.push(build);
  if (build.code === 0) results.push({ name: "3D budget", ...(await run("npm run -s check:3d")) });
}

for (const r of results.filter((r) => r.code !== 0)) {
  console.log(color.bold(color.red(`\n── ${r.name} output ──`)));
  console.log(r.output.trim());
}

console.log();
for (const r of results) {
  const mark = r.code === 0 ? color.green("✓") : color.red("✗");
  console.log(`${mark} ${r.name.padEnd(11)} ${color.dim(`${(r.ms / 1000).toFixed(1)}s`)}`);
}
const failed = results.filter((r) => r.code !== 0).length;
const total = ((performance.now() - started) / 1000).toFixed(1);
console.log(
  failed
    ? color.red(`\n${failed} check(s) failed in ${total}s`)
    : color.green(`\nAll checks passed in ${total}s`),
);
process.exit(failed ? 1 : 0);
