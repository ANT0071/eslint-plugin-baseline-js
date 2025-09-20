import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function readText(p: string): string {
  return readFileSync(p, "utf8");
}

function parseManualFeatureIdsFromScript(): { api: Set<string>; jsbi: Set<string> } {
  const p = resolve(process.cwd(), "scripts/data/build-descriptors.mjs");
  const src = readText(p);
  function collect(name: string): Set<string> {
    const out = new Set<string>();
    const re = new RegExp(`${name}\\s*=\\s*\\[([\\\\s\\S]*?)\\]`, "m");
    const m = re.exec(src);
    if (!m) return out;
    const block = m[1];
    const fe = /featureId:\s*['"]([^'"]+)['"]/g;
    for (const x of block.matchAll(fe)) out.add(x[1]);
    return out;
  }
  return { api: collect("manualApi"), jsbi: collect("manualJsbi") };
}

function readManifest(): { api: string[]; jsbi: string[] } {
  const p = resolve(process.cwd(), "tests/fixtures/manifest.manual.json");
  return JSON.parse(readText(p));
}

describe("manual descriptors consistency", () => {
  it("manifest covers all manualApi/manualJsbi featureIds", () => {
    const script = parseManualFeatureIdsFromScript();
    const manifest = readManifest();
    const missApi = [...script.api].filter((id) => !manifest.api.includes(id));
    const missJsbi = [...script.jsbi].filter((id) => !manifest.jsbi.includes(id));
    expect({ missApi, missJsbi }).toEqual({ missApi: [], missJsbi: [] });
  });
});
