import type { Rule } from "eslint";
import { describe, expect, it } from "vitest";
import { registerResolver, resolveDelegateRule } from "../src/utils/delegate-resolver";

const dummy: Rule.RuleModule = {
  meta: { type: "problem", docs: { description: "x" } },
  create: () => ({}),
};

describe("delegate-resolver", () => {
  it("resolves core rules via builtin resolver", () => {
    const core = resolveDelegateRule("core", "no-with");
    expect(core && typeof core.create === "function").toBe(true);
  });

  it("supports custom resolver registration", () => {
    registerResolver("demo", (name) => (name === "ok" ? dummy : undefined));
    const found = resolveDelegateRule("demo", "ok");
    const missing = resolveDelegateRule("demo", "ng");
    expect(found && typeof found.create === "function").toBe(true);
    expect(missing).toBeUndefined();
  });
});
