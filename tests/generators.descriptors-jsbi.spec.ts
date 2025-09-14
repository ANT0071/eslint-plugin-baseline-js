import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function readDescriptorsJsbi(): string {
  const p = resolve(process.cwd(), "src/baseline/data/descriptors.jsbi.ts");
  return readFileSync(p, "utf8");
}

describe("descriptors.jsbi generation (manual JS builtins)", () => {
  it("contains Error cause (Error/AggregateError newWithOptions)", () => {
    const src = readDescriptorsJsbi();
    // Error(msg, { cause })
    expect(src).toMatch(
      /featureId:\s*"error-cause"[\s\S]*?kind:\s*"newWithOptions"[\s\S]*?name:\s*"Error"[\s\S]*?index:\s*1[\s\S]*?hasKeys:\s*\[\s*"cause"\s*\]/,
    );
    // AggregateError(errors, msg, { cause })
    expect(src).toMatch(
      /featureId:\s*"error-cause"[\s\S]*?kind:\s*"newWithOptions"[\s\S]*?name:\s*"AggregateError"[\s\S]*?index:\s*2[\s\S]*?hasKeys:\s*\[\s*"cause"\s*\]/,
    );
  });

  it("contains ArrayBuffer resizable option (maxByteLength)", () => {
    const src = readDescriptorsJsbi();
    expect(src).toMatch(
      /featureId:\s*"resizable-buffers"[\s\S]*?kind:\s*"newWithOptions"[\s\S]*?name:\s*"ArrayBuffer"[\s\S]*?index:\s*1[\s\S]*?hasKeys:\s*\[\s*"maxByteLength"\s*\]/,
    );
  });

  it("contains Uint8Array base64/hex (static + instance)", () => {
    const src = readDescriptorsJsbi();
    expect(src).toMatch(
      /featureId:\s*"uint8array-base64-hex"[\s\S]*?kind:\s*"callStatic"[\s\S]*?base:\s*"Uint8Array"[\s\S]*?prop:\s*"fromBase64"/,
    );
    expect(src).toMatch(
      /featureId:\s*"uint8array-base64-hex"[\s\S]*?kind:\s*"instanceMember"[\s\S]*?iface:\s*"Uint8Array"[\s\S]*?prop:\s*"toHex"/,
    );
  });

  it("contains Weak references constructors", () => {
    const src = readDescriptorsJsbi();
    expect(src).toMatch(
      /featureId:\s*"weak-references"[\s\S]*?kind:\s*"newIdent"[\s\S]*?name:\s*"WeakRef"/,
    );
    expect(src).toMatch(
      /featureId:\s*"weak-references"[\s\S]*?kind:\s*"newIdent"[\s\S]*?name:\s*"FinalizationRegistry"/,
    );
  });
});
