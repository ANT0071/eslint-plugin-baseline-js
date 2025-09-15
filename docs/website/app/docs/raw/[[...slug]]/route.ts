import { notFound } from "next/navigation";
import { source } from "@/lib/source";

export async function GET(_request: Request, ctx: { params: { slug?: string[] } }) {
  const slug = ctx.params.slug ?? [];
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(page.data.raw ?? "", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
