export type BaselineOption = "widely" | "newly" | number; // YYYY
export type EnvOption = "browser" | "worker" | "node";

export interface CommonRuleOptions {
  baseline?: BaselineOption;
  available?: BaselineOption; // alias (optional)
  env?: EnvOption;
  tsAware?: boolean;
  failOn?: "limited" | "newly" | "all";
  // Ignore options (rule-specific). Strings beginning and ending with '/' are treated as regex.
  ignoreFeatures?: string[]; // web-features feature IDs to ignore (e.g., ['nullish-coalescing'])
  ignoreNodeTypes?: string[]; // ESTree node.type to ignore (e.g., ['WithStatement'])
}

export function getBaselineValue(opt: CommonRuleOptions | undefined): BaselineOption {
  if (!opt) return "widely";
  return opt.baseline ?? opt.available ?? "widely";
}
