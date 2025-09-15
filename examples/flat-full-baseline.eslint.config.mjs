// Flat config (full) — JS + CSS + HTML Baseline
// Goal: enforce Baseline consistently across JavaScript, CSS, and HTML.
// Notes:
// - JS uses this plugin with the "recommended" preset (Web APIs/JS builtins).
// - CSS uses @eslint/css with its "use-baseline" rule.
// - HTML uses @html-eslint/eslint-plugin with its "use-baseline" rule.

import css from "@eslint/css";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";
import baselineJs from "eslint-plugin-baseline-js";
import globals from "globals";

export default [
  // Shared: browser globals (adjust per project: browser/worker/node)
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  // JavaScript (JS/TS)
  // Broad coverage with minimal config: Web APIs and JS builtins on preset: "auto".
  { plugins: { "baseline-js": baselineJs } },
  ...baselineJs.configs.recommended({ available: "widely", level: "error" }),

  // CSS
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    rules: {
      // Allow only widely available CSS features
      "css/use-baseline": ["error", { available: "widely" }],
    },
  },

  // HTML
  {
    files: ["**/*.html"],
    plugins: { "@html-eslint": html },
    languageOptions: { parser: htmlParser },
    rules: {
      // Allow only widely available HTML features
      "@html-eslint/use-baseline": ["error", { available: "widely" }],
    },
  },
];
