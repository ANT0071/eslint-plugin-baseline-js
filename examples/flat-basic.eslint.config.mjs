// Flat config (basic)
// Goal: enforce the JS Baseline at "widely".
// Web APIs/JS builtins detection is off by default here.
// For broader detection, use the recommended preset or explicitly enable
// includeWebApis/includeJsBuiltins.

import baselineJs, { BASELINE } from "eslint-plugin-baseline-js";

export default [
  {
    files: ["**/*.{js,ts,mjs,cjs,jsx,tsx}"],
    plugins: { "baseline-js": baselineJs },
    rules: {
      // Baseline policy: "widely" = allow only widely available features
      "baseline-js/use-baseline": ["error", { available: BASELINE.WIDELY }],
      // Example: also detect Web APIs/JS builtins (opt-in):
      // "baseline-js/use-baseline": ["error", {
      //   available: BASELINE.WIDELY,
      //   includeWebApis: { preset: "auto" },
      //   includeJsBuiltins: { preset: "auto" },
      // }],
    },
  },
];
