import { HomeLayout as HomeLayoutUI } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";

const HomeLayout: typeof HomeLayoutUI = HomeLayoutUI;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-gradient-to-b from-[#080f12] via-[#080f12] to-[#080f12]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(30,164,70,0.18),transparent_60%)] blur-3xl sm:w-[48rem] md:w-[60rem]" />
        <div className="absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </div>
  );
}
