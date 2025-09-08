import type { BaselineOption } from "../config";

export function baselineConfigs(
  opts: { baseline?: BaselineOption; env?: "browser" | "worker" | "node" } = {},
) {
  const baseline: BaselineOption = opts.baseline ?? "widely";
  const rules: Record<string, unknown> = {
    "baseline-js/use-baseline": ["error", { baseline }],
  };
  return [
    {
      rules,
    },
  ];
}
