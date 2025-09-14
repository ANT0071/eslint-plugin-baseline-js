// Legacy config (.eslintrc.*) — year-based
// Goal: allow only features that became Baseline in or before 2018.

module.exports = {
  plugins: ["baseline-js"],
  rules: {
    "baseline-js/use-baseline": [
      "error",
      {
        baseline: 2018,
        // Enable Web APIs/JS builtins detection
        includeWebApis: { preset: "auto" },
        includeJsBuiltins: { preset: "auto" },
      },
    ],
  },
};
