import type { Rule } from "eslint";
import { builtinRules } from "eslint/use-at-your-own-risk";
import esx from "eslint-plugin-es-x";
import { getEsxRule, resolveEsxRulesFrom } from "./rule-resolver";

type RuleMap = Record<string, Rule.RuleModule>;

let selfRules: RuleMap | null = null;

export function registerSelfRules(rules: RuleMap) {
  selfRules = rules;
}

function resolveEsx(name: string): Rule.RuleModule | undefined {
  const rules = resolveEsxRulesFrom(esx);
  return rules?.[name] || getEsxRule(name);
}

// Built-in resolvers
const registry: Record<string, (ruleName: string) => Rule.RuleModule | undefined> = {
  // eslint-plugin-es-x delegate
  "es-x": resolveEsx,
  // Project-internal rules
  self: (name) => (selfRules ? selfRules[name] : undefined),
  // ESLint core via builtinRules map
  core: (name) =>
    (builtinRules as unknown as Map<string, Rule.RuleModule>).get(name) as
      | Rule.RuleModule
      | undefined,
};

export function resolveDelegateRule(plugin: string, name: string): Rule.RuleModule | undefined {
  const resolver = registry[plugin];
  if (!resolver) return undefined;
  return resolver(name);
}

/**
 * Extension API — allow future resolvers to be registered dynamically by alias.
 * This keeps the orchestrator generic and supports third-party plugins.
 */
export function registerResolver(
  alias: string,
  fn: (ruleName: string) => Rule.RuleModule | undefined,
): void {
  registry[alias] = fn;
}

/**
 * Debug helper: list available resolver aliases. Used when BASELINE_DEBUG=1.
 */
export function listResolverPlugins(): string[] {
  return Object.keys(registry).sort();
}
