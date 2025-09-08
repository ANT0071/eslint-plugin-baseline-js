import type { Rule } from "eslint";

// TODO(improve-detection)
// - Restrict to global Temporal (avoid shadowed identifiers).
// - Detect deeper aliasing: const T = Temporal; T.Now.instant().
// - Consider ReferenceTracker to follow global Temporal across scopes.
// - Expand coverage to key namespaces (PlainDate, ZonedDateTime, Duration, etc.).

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: { description: "disallow Temporal API usage" },
    messages: { forbidden: "Temporal API usage is not allowed." },
    schema: [],
  },
  create(context) {
    function report(node: unknown) {
      context.report({ node: node as any, messageId: "forbidden" });
    }
    function isTemporalIdent(node: unknown): boolean {
      const n = node as Record<string, unknown>;
      return n && n.type === "Identifier" && n.name === "Temporal";
    }
    return {
      Identifier(node: unknown) {
        if (!isTemporalIdent(node)) return;
        const p = (node as Record<string, unknown>).parent as Record<string, unknown> | undefined;
        if (!p) return;
        // report only when used as callee/object/new target or member base
        if (
          (p.type === "MemberExpression" && p.object === node) ||
          (p.type === "CallExpression" && p.callee === node) ||
          (p.type === "NewExpression" && p.callee === node)
        ) {
          report(node);
        }
      },
      MemberExpression(node: unknown) {
        const m = node as Record<string, unknown>;
        if (m.computed === false && isTemporalIdent(m.object)) {
          report(m.object as unknown);
        }
      },
      NewExpression(node: unknown) {
        const n = node as Record<string, unknown>;
        if (isTemporalIdent(n.callee)) {
          report(n.callee as unknown);
        }
      },
    };
  },
};

export default rule;
