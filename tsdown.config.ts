import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  clean: true,
  sourcemap: false,
  format: ["esm", "cjs"],
  target: "es2020",
  fixedExtension: true,
});
