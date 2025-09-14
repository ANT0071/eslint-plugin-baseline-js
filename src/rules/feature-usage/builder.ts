import type { Rule } from "eslint";
import type {
  CallMemberWithArgsDescriptor,
  CallStaticDescriptor,
  Descriptor,
  InstanceMemberDescriptor,
  MemberDescriptor,
  NewIdentDescriptor,
  NewMemberDescriptor,
  NewWithOptionsDescriptor,
} from "../../baseline/types";
import { addCallMemberWithArgsDetector, addNewWithOptionsDetector } from "./detectors/safe-args";
import {
  addCallStaticDetector,
  addMemberDetector,
  addNewIdentDetector,
  addNewMemberDetector,
} from "./detectors/safe-core";
import { addTypedInstanceMemberDetector } from "./detectors/typed-instance-member";

export interface BuildOptions {
  descriptors: ReadonlyArray<Descriptor>;
  messages: Record<string, string>;
  typed?: boolean;
}

export function buildListeners(context: Rule.RuleContext, opt: BuildOptions): Rule.RuleListener {
  const listeners: Rule.RuleListener = {};

  function merge(target: Rule.RuleListener, add: Rule.RuleListener) {
    type AnyFn = (...args: unknown[]) => void;
    const tgt = target as unknown as Record<string, unknown>;
    for (const [event, handler] of Object.entries(add)) {
      const name = event as keyof Rule.RuleListener;
      const prev = target[name] as unknown as AnyFn | undefined;
      if (!prev) {
        tgt[event] = handler as unknown;
      } else {
        const next = handler as unknown as AnyFn;
        tgt[event] = function merged(this: unknown, ...args: unknown[]) {
          prev.apply(this as unknown as object, args);
          next.apply(this as unknown as object, args);
        } as unknown;
      }
    }
  }

  function report(node: unknown, featureId: string) {
    const msg = opt.messages[featureId] ?? `Feature '${featureId}' exceeds configured Baseline.`;
    context.report({ node: node as unknown as Rule.Node, message: msg });
  }

  type ParserServicesLike = {
    program?: { getTypeChecker?: () => unknown };
    esTreeNodeToTSNodeMap?: unknown;
  };
  type CtxLike = {
    parserServices?: ParserServicesLike;
    sourceCode?: { parserServices?: ParserServicesLike };
  };
  const ctxLike = context as unknown as CtxLike;
  const services: ParserServicesLike =
    ctxLike.parserServices || ctxLike.sourceCode?.parserServices || {};
  const checker: unknown = services.program?.getTypeChecker?.();
  const useTyped = !!opt.typed && !!checker && !!services.esTreeNodeToTSNodeMap;

  for (const d of opt.descriptors) {
    switch (d.kind) {
      case "newIdent":
        merge(listeners, addNewIdentDetector(context, d as NewIdentDescriptor, report));
        break;
      case "newMember":
        merge(listeners, addNewMemberDetector(context, d as NewMemberDescriptor, report));
        break;
      case "callStatic":
        merge(listeners, addCallStaticDetector(context, d as CallStaticDescriptor, report));
        break;
      case "member":
        merge(listeners, addMemberDetector(context, d as MemberDescriptor, report));
        break;
      case "instanceMember":
        if (useTyped)
          merge(
            listeners,
            addTypedInstanceMemberDetector(context, d as InstanceMemberDescriptor, report),
          );
        break;
      case "callMemberWithArgs":
        merge(
          listeners,
          addCallMemberWithArgsDetector(context, d as CallMemberWithArgsDescriptor, report),
        );
        break;
      case "newWithOptions":
        merge(listeners, addNewWithOptionsDetector(context, d as NewWithOptionsDescriptor, report));
        break;
      default:
        break;
    }
  }

  return listeners;
}
