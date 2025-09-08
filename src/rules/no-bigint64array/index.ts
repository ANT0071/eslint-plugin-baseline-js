import type { Rule } from "eslint";

// TODO(improve-detection)
// - Restrict reports to global BigInt64Array/BigUint64Array, avoid shadowed locals.
// - Detect aliasing: const C = BigInt64Array; new C(); (needs reference tracking)
// - Consider using @eslint-community/eslint-utils ReferenceTracker for robust global lookups.

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: { description: "disallow BigInt64Array/BigUint64Array usage" },
    messages: { forbidden: "BigInt64Array/BigUint64Array are not allowed." },
    schema: [],
  },
  create(context) {
    function report(node: unknown) {
      context.report({ node: node as any, messageId: "forbidden" });
    }
    return {
      NewExpression(node: unknown) {
        const n = node as Record<string, unknown>;
        const callee = n.callee as Record<string, unknown> | undefined;
        if (callee?.type === "Identifier") {
          if (callee.name === "BigInt64Array" || callee.name === "BigUint64Array") report(callee);
        }
      },
      CallExpression(node: unknown) {
        const n = node as Record<string, unknown>;
        const callee = n.callee as Record<string, unknown> | undefined;
        if (callee?.type === "Identifier") {
          if (callee.name === "BigInt64Array" || callee.name === "BigUint64Array") report(callee);
        }
      },
      MemberExpression(node: unknown) {
        const m = node as Record<string, unknown>;
        const obj = m.object as Record<string, unknown> | undefined;
        if (obj?.type === "Identifier") {
          if (obj.name === "BigInt64Array" || obj.name === "BigUint64Array") report(obj);
        }
      },
    };
  },
};

export default rule;
