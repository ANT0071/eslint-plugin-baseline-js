import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { DOCS_SIDEBAR } from "@/lib/ui";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={source.pageTree} sidebar={DOCS_SIDEBAR} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
