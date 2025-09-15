export const DOCS_SIDEBAR = {
  // Open first-level folders by default for better discoverability
  defaultOpenLevel: 1 as const,
  // Prefetch sidebar links on hover for snappier nav
  prefetch: true as const,
};

export const DOCS_TOC = {
  // Clerk-inspired animated TOC
  style: "clerk" as const,
};
