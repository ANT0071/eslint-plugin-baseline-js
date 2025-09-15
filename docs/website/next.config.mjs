import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Silence Next.js Turbopack workspace root warning by pinning the root
  // to this app directory. This avoids auto-detection across parent lockfiles.
  turbopack: {
    root: process.cwd(),
  },
  // Twoslash requires these packages to be externalized for Next.js
  serverExternalPackages: ["typescript", "twoslash"],
};

export default withMDX(config);
