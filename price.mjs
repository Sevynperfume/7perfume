#!/usr/bin/env node
// SEVYN Perfumes - update: new prices (50 ml 499, 30 ml 299) (2 files). Run inside the project folder (the one with package.json and src):  node <this file>
// Files:
//   src/features/perfumes/data/perfumes.data.ts
//   src/features/perfumes/components/price-tag.tsx
const OBSOLETE = [];
const DATA = `
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
`;

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  rmdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const looksLikeProject = (dir) =>
  existsSync(join(dir, "package.json")) && existsSync(join(dir, "src"));
let target = process.argv[2] ? resolve(process.argv[2]) : process.cwd();
if (
  !process.argv[2] &&
  !looksLikeProject(target) &&
  looksLikeProject(join(target, "7perfumes"))
)
  target = join(target, "7perfumes");
// No refusal: an existing project is updated; an empty or other folder gets the whole project written into it.
mkdirSync(target, { recursive: true });
const fresh = !looksLikeProject(target);
console.log(
  "SEVYN Perfumes - full sync\n" +
    (fresh
      ? "No existing project here, writing a full copy into: "
      : "Updating project: ") +
    target +
    "\n",
);

let payload;
try {
  payload = JSON.parse(
    gunzipSync(Buffer.from(DATA.replace(/\s+/g, ""), "base64")).toString(
      "utf8",
    ),
  );
} catch {
  console.error(
    "This script is damaged (the paste was probably cut off or changed). Copy it again in full.",
  );
  process.exit(1);
}
const files = payload.files.map((f) => ({
  ...f,
  c: f.c.replace(/@@BLOB(\d+)@@/g, (_, i) => payload.blobs[Number(i)]),
}));

let written = 0,
  unchanged = 0,
  removed = 0;
for (const f of files) {
  const dest = join(target, f.p);
  const data = Buffer.from(f.c, f.e);
  if (existsSync(dest) && readFileSync(dest).equals(data)) {
    unchanged++;
    continue;
  }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, data);
  written++;
  console.log("  wrote    " + f.p);
}
for (const p of OBSOLETE) {
  const dest = join(target, p);
  if (existsSync(dest)) {
    rmSync(dest, { force: true });
    removed++;
    console.log("  removed  " + p);
  }
}
const obsoleteDirs = new Set();
for (const p of OBSOLETE)
  for (
    let d = dirname(p);
    d !== "." && d !== "public" && d !== "src";
    d = dirname(d)
  )
    obsoleteDirs.add(d);
for (const dir of [...obsoleteDirs].sort(
  (a, b) => b.split("/").length - a.split("/").length,
)) {
  try {
    const d = join(target, dir);
    if (existsSync(d) && readdirSync(d).length === 0) rmdirSync(d);
  } catch {}
}
const bad = files.filter((f) => {
  const dest = join(target, f.p);
  return (
    !existsSync(dest) ||
    createHash("sha256")
      .update(readFileSync(dest))
      .digest("hex")
      .slice(0, 16) !== f.h
  );
});
console.log(
  "\nDone: " +
    written +
    " written, " +
    unchanged +
    " already up to date, " +
    removed +
    " old files removed.",
);
if (bad.length) {
  console.error(
    "WARNING: these files did not verify: " + bad.map((f) => f.p).join(", "),
  );
  process.exit(1);
}
console.log("All 2 files verified.");
