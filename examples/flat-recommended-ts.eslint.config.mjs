// Flat config (TypeScript recommended)
// Uses type-required detection (preset: "type-aware").
// Enables precise instance-member checks (e.g., Iterator helpers, TypedArray methods).
// Requires @typescript-eslint/parser and a valid tsconfig.

import tsParser from "@typescript-eslint/parser"; // Install separately
import baselineJs from "eslint-plugin-baseline-js";

export default [
  // Register the plugin so its rules are available across the config
  { plugins: { "baseline-js": baselineJs } },

  // TypeScript parsing setup
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // Simplest: auto-detect the nearest tsconfig.json
        project: true,
        // Or explicitly point to one or more configs (monorepo):
        // project: ["./tsconfig.json"],
      },
    },
  },

  // Baseline + type-aware detection
  ...baselineJs.configs["recommended-ts"]({ available: "widely", level: "error" }),
];
