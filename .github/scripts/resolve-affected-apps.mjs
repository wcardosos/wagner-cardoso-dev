#!/usr/bin/env node
// Resolves a list of changed file paths to the affected-app set.
//
// Usage (invoked from the `detect` job in deploy.yml):
//   git diff --name-only "$BASE" "$HEAD" | node .github/scripts/resolve-affected-apps.mjs
//
// Also runnable directly for manual/local verification — with no
// GITHUB_OUTPUT / GITHUB_STEP_SUMMARY env vars set it just prints the
// resolved JSON array and the summary table to stdout instead of writing
// to those files.

import { appendFileSync } from "node:fs";

// Canonical order: every output array uses ["site", "blog"] when both
// are present. Fixing the order here means callers can compare with a
// plain deep-equal instead of set semantics.
const APP_ORDER = ["site", "blog"];

// A path matching one of these contributes no apps
// at all — it is invisible to resolution, not "unmapped".
function isIgnored(path) {
  if (path === "README.md") return true;
  if (path.endsWith("/README.md")) return true; // **/README.md
  if (path.startsWith("docs/")) return true;
  if (path.startsWith(".vscode/")) return true;
  if (path === ".editorconfig") return true;
  if (path === "LICENSE") return true;
  if (path === ".gitignore") return true;
  return false;
}

// Returns the set of apps a single (non-ignored)
// changed path maps to, and whether it matched a row at all. A path
// matching zero rows falls back to the fail-loud default (R-002) — the
// caller applies that default when `matched` is false.
function classify(path) {
  const apps = new Set();
  let matched = false;

  if (path.startsWith("apps/site/")) {
    apps.add("site");
    matched = true;
  }
  if (path.startsWith("apps/blog/")) {
    apps.add("blog");
    matched = true;
  }
  if (path.startsWith("packages/design-system/")) {
    apps.add("site");
    apps.add("blog");
    matched = true;
  }
  if (path.startsWith("packages/content/")) {
    apps.add("site");
    apps.add("blog");
    matched = true;
  }
  // Root-only config files. Deliberately exact-match (no directory
  // component) so that e.g. apps/site/package.json is NOT caught here —
  // it already matched the apps/site/** row above, site-only.
  const isRootConfigFile =
    path === "package.json" ||
    path === "pnpm-lock.yaml" ||
    path === "pnpm-workspace.yaml" ||
    (/^tsconfig[^/]*\.json$/.test(path) && !path.includes("/"));
  if (isRootConfigFile) {
    apps.add("site");
    apps.add("blog");
    matched = true;
  }
  if (
    path.startsWith(".github/workflows/") ||
    path.startsWith(".github/actions/")
  ) {
    apps.add("site");
    apps.add("blog");
    matched = true;
  }

  return { apps, matched };
}

// Resolves a full list of changed paths to the union affected-app set,
// plus a per-path trace for the job summary (R-003).
export function resolveAffectedApps(paths) {
  const resolved = new Set();
  const trace = [];

  for (const path of paths) {
    if (path === "") continue;

    if (isIgnored(path)) {
      trace.push({ path, apps: [], reason: "ignored" });
      continue;
    }

    const { apps, matched } = classify(path);
    if (!matched) {
      // unmapped path defaults to both apps,
      // fail loud rather than silently stale.
      apps.add("site");
      apps.add("blog");
      trace.push({
        path,
        apps: APP_ORDER.filter((a) => apps.has(a)),
        reason: "unmapped-default",
      });
    } else {
      trace.push({
        path,
        apps: APP_ORDER.filter((a) => apps.has(a)),
        reason: "mapped",
      });
    }

    for (const app of apps) resolved.add(app);
  }

  // Defensive fallback: this function should never be called with an
  // empty/all-ignored path list in practice, because
  // `on.push.paths-ignore` in deploy.yml already prevents the `detect`
  // job from running on an ignore-only push. If it somehow happens
  // anyway (e.g. a diff/checkout misconfiguration upstream of this
  // script), fail loud instead of silently resolving to "deploy
  // nothing" — same fail-loud principle as the unmapped-path default.
  if (resolved.size === 0 && paths.some((p) => p !== "")) {
    trace.push({
      path: "(no path resolved to an app — defensive fallback)",
      apps: [...APP_ORDER],
      reason: "empty-resolution-fallback",
    });
    APP_ORDER.forEach((a) => resolved.add(a));
  }

  const apps = APP_ORDER.filter((a) => resolved.has(a));
  return { apps, trace };
}

function renderSummary(paths, apps, trace) {
  const lines = [];
  lines.push("## Affected apps (detect job)");
  lines.push("");
  lines.push(`**Resolved set:** \`${JSON.stringify(apps)}\``);
  lines.push("");
  lines.push("| Changed path | Resolved apps | Reason |");
  lines.push("|---|---|---|");
  for (const { path, apps: pathApps, reason } of trace) {
    lines.push(
      `| \`${path}\` | ${pathApps.length ? pathApps.join(", ") : "(none)"} | ${reason} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const input = Buffer.concat(chunks).toString("utf8");
  const paths = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const { apps, trace } = resolveAffectedApps(paths);
  const json = JSON.stringify(apps);
  const summary = renderSummary(paths, apps, trace);

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `apps=${json}\n`);
  } else {
    console.log(`apps=${json}`);
  }

  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
  } else {
    console.log(summary);
  }
}

// Only run the CLI entrypoint when invoked directly (not when imported for
// testing).
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
