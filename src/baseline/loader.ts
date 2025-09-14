import api from "./data/descriptors.api";
import jsbi from "./data/descriptors.jsbi";
import type { Descriptor } from "./types";

export interface IncludePresetOption {
  preset?: "auto" | "safe" | "type-aware" | "heuristic";
  useTypes?: "off" | "auto" | "require";
  heuristics?: "off" | "conservative" | "aggressive";
  only?: string[];
  ignore?: string[];
}

export type IncludeOption = boolean | IncludePresetOption;

function matchesOnly(id: string, only?: string[] | null): boolean {
  if (!only || only.length === 0) return true;
  return only.includes(id);
}

function matchesIgnore(id: string, ignore?: string[]): boolean {
  return !!ignore && ignore.includes(id);
}

export function getIncludedDescriptors(opts?: {
  webApis?: IncludeOption;
  jsBuiltins?: IncludeOption;
}): ReadonlyArray<Descriptor> {
  const out: Descriptor[] = [];
  const webApis = opts?.webApis ?? false;
  const jsBuiltins = opts?.jsBuiltins ?? false;

  if (webApis) {
    const conf = typeof webApis === "object" ? webApis : {};
    for (const d of api) {
      if (!matchesOnly(d.featureId, conf.only)) continue;
      if (matchesIgnore(d.featureId, conf.ignore)) continue;
      out.push(d);
    }
  }
  if (jsBuiltins) {
    const conf = typeof jsBuiltins === "object" ? jsBuiltins : {};
    for (const d of jsbi) {
      if (!matchesOnly(d.featureId, conf.only)) continue;
      if (matchesIgnore(d.featureId, conf.ignore)) continue;
      out.push(d);
    }
  }

  return out;
}
