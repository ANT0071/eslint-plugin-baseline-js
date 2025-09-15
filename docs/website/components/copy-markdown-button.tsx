"use client";

import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const cache = new Map<string, string>();

export function CopyMarkdownButton({ markdownUrl }: { markdownUrl: string }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(cached);

    setLoading(true);
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": fetch(markdownUrl).then(async (res) => {
            const content = await res.text();
            cache.set(markdownUrl, content);
            return content;
          }),
        }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={buttonVariants({
        color: "secondary",
        size: "sm",
        className: "gap-2 [&_svg]:size-3.5",
      })}
      onClick={onClick}
      aria-label="Copy Markdown"
      title="Copy Markdown"
      type="button"
    >
      {checked ? <Check /> : <Copy />}
      Copy Markdown
    </button>
  );
}
