#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

function parseFeaturesTs(tsPath) {
  const src = readFileSync(tsPath, "utf8");
  const m = src.match(/export default (\{[\s\S]*\}) as const;\n?$/);
  if (!m) throw new Error(`Failed to parse features from ${tsPath}`);
  return JSON.parse(m[1]);
}

async function importMapping(modulePath) {
  const mod = await import(pathToFileURL(modulePath).href);
  return mod.default || mod;
}

const root = resolve(process.cwd());
const featuresTs = resolve(root, "src/baseline/features.ts");
const mappingModule = resolve(root, "src/baseline/mapping.mjs");

const features = parseFeaturesTs(featuresTs);
const mapping = await importMapping(mappingModule);

const featureIds = Object.keys(features);
const mappedIds = Object.keys(mapping);

const missing = featureIds
  .filter((id) => !mappedIds.includes(id))
  .map((id) => ({
    id,
    name: features[id]?.name || id,
  }));

const unknown = mappedIds.filter((id) => !featureIds.includes(id)).map((id) => ({ id }));

const report = { missing, unknown };

const outFlagIndex = process.argv.indexOf("--out");
if (outFlagIndex !== -1 && process.argv[outFlagIndex + 1]) {
  const outPath = resolve(root, process.argv[outFlagIndex + 1]);
  writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`);
}

console.log(`mapping check: missing=${missing.length}, unknown=${unknown.length}`);
if (missing.length) {
  console.log("Missing feature IDs:", missing.map((m) => m.id).join(", "));
}
if (unknown.length) {
  console.log("Unknown mapping IDs:", unknown.map((u) => u.id).join(", "));
}
