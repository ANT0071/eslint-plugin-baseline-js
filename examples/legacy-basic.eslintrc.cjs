// Legacy config (.eslintrc.*) — basic
// Note: The plugin recommends Flat Config, but legacy configs work too.

const { BASELINE } = require("eslint-plugin-baseline-js");

module.exports = {
  // Limit target files via overrides as needed
  plugins: ["baseline-js"],
  rules: {
    // Baseline: "newly" (more permissive than "widely")
    "baseline-js/use-baseline": ["warn", { available: BASELINE.NEWLY }],
  },
};
