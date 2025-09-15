import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Book, ExternalLink } from "lucide-react";
import Image from "next/image";
import baselineLogo from "@/public/logos/baseline-widely-icon-dark.svg";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src={baselineLogo} alt="Baseline Logo" width={24} height={24} />
          eslint-plugin-baseline-js
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: "Documentation",
        url: "/docs",
        active: "nested-url",
        icon: <Book className="mr-1.5 h-4 w-4" />,
      },
      {
        text: "Web Features",
        url: "https://web-platform-dx.github.io/web-features/",
        external: true,
        icon: <ExternalLink className="mr-1.5 h-4 w-4" />,
        active: "url",
      },
    ],
    githubUrl: "https://github.com/3ru/eslint-plugin-baseline-js",
  };
}
