import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#000001] via-[#0a0d18] to-[#06050e]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_60%)] blur-3xl" />
      </div>
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </div>
  );
}
