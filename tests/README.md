## Tests

Welcome! A quick note on how tests are organized and how to read them.

- File layout
  - `core.spec.ts`  → scenarios backed by ESLint core rules (e.g., `no-with`, `no-caller`, `no-restricted-*`).
  - `esx.spec.ts`   → scenarios backed by `eslint-plugin-es-x` (newer JS syntax).
  - Rule unit tests for our own custom rules live next to the rule implementation, e.g.:
    - `src/rules/no-foo/__tests__/rule.spec.ts`

- Titles and labels in tests
  - We prefix titles with the web‑features feature ID in square brackets, e.g. `[nullish-coalescing]`.
  - Sometimes we add a Baseline hint like `(limited)` in the title.
    - In web‑features: `high = widely`, `low = newly`, `false = limited`.
    - The label is just a reading aid; assertions use the actual Baseline logic from `features.ts` + `resolve.ts`.

- Running tests locally
  - Generate features (once or whenever web‑features updates):
    - `pnpm gen:features`
  - Run all tests:
    - `pnpm test`
  - Run a single file:
    - `pnpm test tests/core.spec.ts`
