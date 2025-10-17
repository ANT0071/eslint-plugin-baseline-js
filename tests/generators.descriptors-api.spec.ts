import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function readDescriptorsApi(): string {
  const p = resolve(process.cwd(), "src/baseline/data/descriptors.api.ts");
  return readFileSync(p, "utf8");
}

describe("descriptors.api generation (manual + auto WebGL)", () => {
  it("contains Canvas 2D willReadFrequently option", () => {
    const src = readDescriptorsApi();
    expect(src).toMatch(
      /(?:"featureId"|featureId):\s*"canvas-2d-willreadfrequently"[\s\S]*?(?:"kind"|kind):\s*"callMemberWithArgs"[\s\S]*?(?:"prop"|prop):\s*"getContext"[\s\S]*?(?:"values"|values):\s*\[\s*"2d"\s*\][\s\S]*?(?:"hasKeys"|hasKeys):\s*\[\s*"willReadFrequently"\s*\]/,
    );
  });

  it("contains WebGL extension EXT_sRGB (getExtension + includes via getSupportedExtensions)", () => {
    const src = readDescriptorsApi();
    expect(src).toMatch(
      /(?:"featureId"|featureId):\s*"ext-srgb"[\s\S]*?(?:"prop"|prop):\s*"getExtension"[\s\S]*?(?:"values"|values):\s*\[\s*"EXT_sRGB"\s*\]/,
    );
    expect(src).toMatch(
      /(?:"featureId"|featureId):\s*"ext-srgb"[\s\S]*?(?:"prop"|prop):\s*"includes"[\s\S]*?(?:"values"|values):\s*\[\s*"EXT_sRGB"\s*\][\s\S]*?(?:"viaCall"|viaCall):[\s\S]*?"getSupportedExtensions"/,
    );
  });
});
