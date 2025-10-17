// Minimal semantic-release plugin for Trusted Publishing (npm provenance via OIDC)
// - prepare: update package.json version to nextRelease.version
// - publish: run `npm publish --provenance --access public` with optional `--tag <channel>`
// No tokens are used; requires GitHub Actions job with `permissions: { id-token: write }`.

import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

function updatePkgVersion(cwd, version, logger) {
  const pkgPath = resolve(cwd, "package.json");
  const raw = readFileSync(pkgPath, "utf8");
  const json = JSON.parse(raw);
  json.version = version;
  writeFileSync(pkgPath, JSON.stringify(json, null, 2) + "\n", "utf8");
  logger.log(`Updated package.json version to ${version}`);
}

function npmPublish(channel, logger) {
  const args = ["publish", "--provenance", "--access", "public"];
  if (channel && channel !== "latest") {
    args.push("--tag", channel);
  }
  logger.log(`Running: npm ${args.join(" ")}`);
  execFileSync("npm", args, { stdio: "inherit" });
}

export default {
  // No special verifyConditions (avoid token-based checks)
  async prepare(pluginConfig, context) {
    const { nextRelease, logger, cwd } = context;
    updatePkgVersion(cwd, nextRelease.version, logger);
  },

  async publish(pluginConfig, context) {
    const { nextRelease, logger } = context;
    npmPublish(nextRelease.channel, logger);
  },
};
