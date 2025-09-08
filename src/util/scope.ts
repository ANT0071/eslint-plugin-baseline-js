import type { Rule } from "eslint";

type ScopeLike = { set?: Map<string, unknown>; upper?: ScopeLike | null } | null | undefined;

function isShadowed(ctx: Rule.RuleContext, name: string, node: unknown): boolean {
  try {
    const sc = (
      ctx as unknown as { getSourceCode: () => { scopeManager?: unknown } }
    ).getSourceCode();
    const scopeManager = sc.scopeManager as unknown as {
      acquire?: (n: unknown) => ScopeLike;
      globalScope?: ScopeLike;
    };
    const scope = scopeManager?.acquire?.(node) || scopeManager?.globalScope;
    let s: ScopeLike = scope ?? null;
    while (s) {
      if (s.set?.has(name)) return true;
      s = s.upper ?? null;
    }
  } catch {}
  return false;
}

function isGlobalIdentifier(ctx: Rule.RuleContext, node: unknown, expected: string): boolean {
  const n = node as Record<string, unknown>;
  return n?.type === "Identifier" && n.name === expected && !isShadowed(ctx, expected, node);
}

export function isGlobalNavigator(ctx: Rule.RuleContext, obj: unknown): boolean {
  const o = obj as Record<string, unknown>;
  if (isGlobalIdentifier(ctx, obj, "navigator")) return true;
  if (o?.type === "MemberExpression" && o.computed === false) {
    const base = o.object as Record<string, unknown>;
    const prop = o.property as Record<string, unknown>;
    if (
      isGlobalIdentifier(ctx, base, "globalThis") &&
      prop?.type === "Identifier" &&
      prop.name === "navigator"
    ) {
      return true;
    }
  }
  return false;
}

export function isGlobalCrypto(ctx: Rule.RuleContext, obj: unknown): boolean {
  return isGlobalIdentifier(ctx, obj, "crypto");
}

export function isGlobalIntl(ctx: Rule.RuleContext, obj: unknown): boolean {
  return isGlobalIdentifier(ctx, obj, "Intl");
}

export function isGlobalScheduler(ctx: Rule.RuleContext, obj: unknown): boolean {
  return isGlobalIdentifier(ctx, obj, "scheduler");
}
