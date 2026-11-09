#!/usr/bin/env node
// Guards the 3D budget after `next build`:
//   1. the chunks that hold three.js (WebGLRenderer) gzip to at most 300 KB;
//   2. none of them is among the scripts the home page loads up front.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET_KB = 300;
const chunksDir = ".next/static/chunks";

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const threeChunks = walk(chunksDir)
  .filter((f) => f.endsWith(".js"))
  .map((file) => ({ file, body: readFileSync(file) }))
  .filter(({ body }) => body.includes("WebGLRenderer"));

if (threeChunks.length === 0) {
  console.error("check:3d: no chunk contains WebGLRenderer. Did the build run?");
  process.exit(1);
}

const gzipKb = threeChunks.reduce((sum, { body }) => sum + gzipSync(body).length, 0) / 1024;
console.log(
  `3D chunks: ${threeChunks.length} file(s), ${gzipKb.toFixed(1)} KB gzip (budget ${BUDGET_KB} KB)`,
);

const homeHtml = readFileSync(".next/server/app/index.html", "utf8");
const upfront = new Set([...homeHtml.matchAll(/static\/chunks\/[^"' <>]+\.js/g)].map((m) => m[0]));
const leaked = threeChunks.filter(({ file }) =>
  upfront.has(file.replaceAll("\\", "/").slice(".next/".length)),
);

let failed = false;
if (gzipKb > BUDGET_KB) {
  console.error(`check:3d: ${gzipKb.toFixed(1)} KB is over the ${BUDGET_KB} KB budget.`);
  failed = true;
}
if (leaked.length > 0) {
  console.error(
    `check:3d: the home page loads 3D code up front: ${leaked.map((l) => l.file).join(", ")}`,
  );
  failed = true;
}
process.exit(failed ? 1 : 0);
