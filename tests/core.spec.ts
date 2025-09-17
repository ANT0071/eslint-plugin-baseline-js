import { describe, expect, it } from "vitest";
import { lintWithBaseline } from "./helpers";

describe("orchestrator (ESLint core delegates)", () => {
  it("[with] widely: 'with' (limited) should be flagged", async () => {
    const msgs = await lintWithBaseline("with ({} ) {}", "widely");
    expect(
      msgs.some((m) =>
        m.includes("Feature 'with' (with) is not a widely available Baseline feature."),
      ),
    ).toBe(true);
  });

  it("[arguments-callee] widely: arguments.callee (limited) should be flagged", async () => {
    const msgs = await lintWithBaseline("function f(){ return arguments.callee }", "widely");
    expect(
      msgs.some((m) =>
        m.includes(
          "Feature 'arguments.callee' (arguments-callee) is not a widely available Baseline feature.",
        ),
      ),
    ).toBe(true);
  });

  it("[escape-unescape] widely: escape() (limited) should be flagged", async () => {
    const msgs = await lintWithBaseline('escape("x")', "widely");
    expect(
      msgs.some((m) =>
        m.includes(
          "Feature 'escape() and unescape()' (escape-unescape) is not a widely available Baseline feature.",
        ),
      ),
    ).toBe(true);
  });

  it("[date-get-year-set-year] widely: Date#getYear / setYear (limited) should be flagged", async () => {
    const msgs1 = await lintWithBaseline("(new Date()).getYear()", "widely");
    const msgs2 = await lintWithBaseline("(new Date()).setYear(99)", "widely");
    expect(
      msgs1.some((m) =>
        m.includes(
          "Feature 'getYear() and setYear()' (date-get-year-set-year) is not a widely available Baseline feature.",
        ),
      ),
    ).toBe(true);
    expect(
      msgs2.some((m) =>
        m.includes(
          "Feature 'getYear() and setYear()' (date-get-year-set-year) is not a widely available Baseline feature.",
        ),
      ),
    ).toBe(true);
  });
});
