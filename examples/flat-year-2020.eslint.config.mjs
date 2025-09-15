// Flat config (year-based)
// Set a Baseline year (e.g., allow features that became Baseline by 2020).
// Includes examples of ignore knobs and narrowing detection to specific features.

import baselineJs from "eslint-plugin-baseline-js";

export default [
  {
    files: ["**/*.{js,ts,mjs,cjs,jsx,tsx}"],
    plugins: { "baseline-js": baselineJs },
    rules: {
      "baseline-js/use-baseline": [
        "error",
        {
          available: 2020, // Allow only features Baseline'd in or before 2020
          // Exclude specific features (web-features IDs or /.../ regex)
          ignoreFeatures: ["nullish-coalescing", "/^optional-/"],
          // Suppress by ESTree node.type (supports /.../ regex)
          ignoreNodeTypes: ["WithStatement", "/Expression$/"],
          // Explicitly enable Web APIs/JS builtins detection
          includeWebApis: { preset: "auto" },
          includeJsBuiltins: {
            preset: "auto",
            // Example: narrow to specific featureIds
            // only: ["javascript.array-grouping"],
          },
        },
      ],
    },
  },
];
