import type { BaselineOption } from "../config";
import apiRaw from "./data/features.api";
import raw from "./data/features.javascript";
import jsbiRaw from "./data/features.jsbi";

type WebFeaturesBaseline = "high" | "low" | false;

export interface MinFeatureRecord {
  id: string;
  name?: string;
  group?: string;
  status?: {
    baseline?: WebFeaturesBaseline;
    baseline_low_date?: string;
    baseline_high_date?: string;
    support?: Record<string, string>;
  };
  discouraged?: unknown;
}

const features: Record<string, MinFeatureRecord> = {
  ...(raw as unknown as Record<string, MinFeatureRecord>),
  ...(apiRaw as unknown as Record<string, MinFeatureRecord>),
  ...(jsbiRaw as unknown as Record<string, MinFeatureRecord>),
};

export type BaselineBucket = "widely" | "newly" | "limited" | "unknown";

function mapBaseline(b: WebFeaturesBaseline | undefined): BaselineBucket {
  if (b === "high") return "widely";
  if (b === "low") return "newly";
  if (b === false) return "limited";
  return "unknown";
}

function yearFrom(dateStr?: string): number | null {
  if (!dateStr) return null;
  const y = Number(dateStr.slice(0, 4));
  return Number.isFinite(y) ? y : null;
}

export function getFeatureRecord(id: string): MinFeatureRecord | null {
  return features[id] ?? null;
}

export function getFeatureBucket(id: string): BaselineBucket {
  const rec = getFeatureRecord(id);
  return mapBaseline(rec?.status?.baseline);
}

export function isBeyondBaseline(featureId: string, baseline: BaselineOption): boolean {
  const rec = getFeatureRecord(featureId);
  if (!rec) return false;
  const bucket = mapBaseline(rec.status?.baseline);
  if (baseline === "widely") {
    return bucket !== "widely";
  }
  if (baseline === "newly") {
    return bucket === "limited";
  }
  if (typeof baseline === "number") {
    // Year-based policy: anything that hasn't entered Baseline yet (limited)
    // should be considered beyond the configured year.
    if (bucket === "limited") return true;
    const y = yearFrom(rec.status?.baseline_low_date) ?? yearFrom(rec.status?.baseline_high_date);
    if (y == null) return false;
    return y > baseline;
  }
  return false;
}

export function confidenceLabel(kind: "high" | "medium" | "low"): string {
  return kind.charAt(0).toUpperCase() + kind.slice(1);
}
