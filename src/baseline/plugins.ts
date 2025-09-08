export const PLUGIN_NAME = "baseline-js" as const;
export type PluginName = typeof PLUGIN_NAME;

export const DELEGATE_PLUGINS = ["es-x", "core", "self"] as const;
export type DelegatePlugin = (typeof DELEGATE_PLUGINS)[number];

// Mapping for rule key prefixes to delegate plugin kinds.
const PREFIX_TO_PLUGIN: Array<{ prefix: string; plugin: DelegatePlugin }> = [
  { prefix: "core/", plugin: "core" },
  { prefix: "self/", plugin: "self" },
];

export function parseDelegateRuleKey(key: string): { plugin: DelegatePlugin; name: string } {
  for (const { prefix, plugin } of PREFIX_TO_PLUGIN) {
    if (key.startsWith(prefix)) {
      return { plugin, name: key.slice(prefix.length) };
    }
  }
  // Default to es-x when no explicit prefix is present.
  return { plugin: "es-x", name: key };
}
