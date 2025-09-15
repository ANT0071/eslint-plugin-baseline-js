import type { BaselineOption } from "../config";

export function baselineConfigs(
  opts: {
    available?: BaselineOption; // preferred
    baseline?: BaselineOption; // alias (back-compat)
    env?: "browser" | "worker" | "node";
    level?: "error" | "warn";
  } = {},
) {
  const available: BaselineOption = opts.available ?? opts.baseline ?? "widely";
  const level = opts.level ?? "error";
  // Prefer available: to align with CSS/HTML ecosystems; baseline stays as user option but we emit available internally.
  const rules: Record<string, unknown> = {
    "baseline-js/use-baseline": [level, { available }],
  };
  return [
    {
      rules,
    },
  ];
}

/**
 * Recommended config: enable Baseline with Web APIs and JS builtins detection on auto preset.
 * - baseline: defaults to 'widely'
 * - includeWebApis/includeJsBuiltins: { preset: 'auto' }
 */
export function recommendedConfig(
  opts: {
    available?: BaselineOption;
    baseline?: BaselineOption;
    env?: "browser" | "worker" | "node";
    level?: "error" | "warn";
  } = {},
) {
  const available: BaselineOption = opts.available ?? opts.baseline ?? "widely";
  const level = opts.level ?? "error";
  const rules: Record<string, unknown> = {
    "baseline-js/use-baseline": [
      level,
      {
        available,
        includeWebApis: { preset: "auto" },
        includeJsBuiltins: { preset: "auto" },
      },
    ],
  };
  return [
    {
      rules,
    },
  ];
}

/**
 * Recommended config for TypeScript-aware projects:
 * - Uses 'type-aware' preset to require type information for instance-member checks.
 * - Falls back gracefully when types are unavailable (instance checks are skipped by the rule).
 */
export function recommendedTsConfig(
  opts: {
    available?: BaselineOption;
    baseline?: BaselineOption;
    env?: "browser" | "worker" | "node";
    level?: "error" | "warn";
  } = {},
) {
  const available: BaselineOption = opts.available ?? opts.baseline ?? "widely";
  const level = opts.level ?? "error";
  const rules: Record<string, unknown> = {
    "baseline-js/use-baseline": [
      level,
      {
        available,
        includeWebApis: { preset: "type-aware" },
        includeJsBuiltins: { preset: "type-aware" },
      },
    ],
  };
  return [
    {
      rules,
    },
  ];
}
