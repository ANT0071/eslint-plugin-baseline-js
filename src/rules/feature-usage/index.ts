import type { Rule } from "eslint";
import type { Descriptor } from "../../baseline/types";
import { buildListeners } from "./builder";

interface Options {
  descriptors: ReadonlyArray<Descriptor>;
  messages: Record<string, string>; // featureId -> message
  typed?: boolean; // enable instanceMember detection via parserServices
}

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Detect usage of Web APIs and JS builtins beyond configured Baseline (data-driven).",
    },
    schema: [
      {
        type: "object",
        properties: {
          descriptors: { type: "array" },
          messages: { type: "object" },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const opt = (context.options?.[0] ?? {}) as Options;
    const descs = (opt.descriptors ?? []) as ReadonlyArray<Descriptor>;
    const messages = (opt.messages ?? {}) as Record<string, string>;
    const useTyped = !!opt.typed;
    // ESLint v9 exposes parserServices under sourceCode
    return buildListeners(context, { descriptors: descs, messages, typed: useTyped });
  },
};

export default rule;
