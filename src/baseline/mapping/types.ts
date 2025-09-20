export type DelegatePlugin = "es-x" | "core" | "self";

export interface DelegateMappingEntry {
  plugin: DelegatePlugin;
  rule: string;
  // Optional knobs reserved for future use
  options?: unknown;
  level?: "error" | "warn";
}

export type MappingKind = "syntax" | "api" | "meta";

export interface FeatureMapping {
  kind: MappingKind;
  delegates: ReadonlyArray<DelegateMappingEntry>;
}

export type SyntaxMapping = Readonly<Record<string, FeatureMapping>>;
