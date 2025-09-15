import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center gap-2">
      <Image
        src="/lp.png"
        alt="Baseline JS"
        width={300}
        height={100}
        className="w-full max-w-3xl"
      />
      <div className="mx-auto max-w-3xl">
        <p className="text-pretty mx-auto mb-8 max-w-2xl text-fd-muted-foreground">
          Enforce Baseline (widely/newly/year) across JS Syntax, JS Builtins, and Web APIs
        </p>

        <div className="mb-10 flex items-center justify-center gap-3">
          <Link
            href="/docs"
            className={buttonVariants({
              color: "primary",
              size: "icon",
              className: "group gap-2 px-5 py-2.5 shadow-sm transition-all hover:shadow-md",
            })}
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Code demo */}
        <div className="mx-auto max-w-sm md:max-w-4xl overflow-hidden rounded-2xl border bg-fd-card text-left  ring-1 ring-white/5 [box-shadow:0_30px_100px_-10px_rgba(99,102,241,0.25)]">
          <div className="border-b px-4 md:px-6 py-3 text-xs md:text-base text-fd-muted-foreground">
            example.ts
          </div>
          <pre className="overflow-auto p-4 md:p-6 text-sm md:text-lg leading-8 mb-2">
            <code>
              {"const date = new Date();\n"}
              {"const year = "}
              <span className="underline decoration-rose-500 decoration-3 underline-offset-4 [text-decoration-style:wavy]">
                date.getYear();
              </span>
            </code>
          </pre>
          <div className="border-t bg-fd-card px-4 md:px-6 py-4 text-xs md:text-base">
            <p className="flex items-start gap-1 md:gap-3 text-rose-500">
              <span className="mt-1 inline-block h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-rose-500" />
              <span>
                Feature{" "}
                <code className="font-mono bg-fd-muted px-2 py-1 rounded border">
                  date-get-year-set-year
                </code>{" "}
                is not a widely available Baseline feature.
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
