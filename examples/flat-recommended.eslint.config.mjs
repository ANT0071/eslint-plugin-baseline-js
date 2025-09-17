// Flat config (recommended)
// Enables Web APIs and JS builtins detection by default (preset: "auto").
// Good default when you want broad Baseline coverage with minimal config.

import baselineJs, { BASELINE } from "eslint-plugin-baseline-js";

export default [
  // Register the plugin once so its rules are available below
  { plugins: { "baseline-js": baselineJs } },

  // Baseline: defaults to "widely"; override via function argument if needed.
  // Level defaults to "error"; switch to "warn" by passing level.
  baselineJs.configs.recommended({ available: BASELINE.WIDELY, level: "warn" }),
];
