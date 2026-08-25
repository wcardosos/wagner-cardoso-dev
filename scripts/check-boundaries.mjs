#!/usr/bin/env node
/**
 * check-boundaries.mjs
 *
 * Mechanism: plain, dependency-free Node script (fs + regex/text scanning).
 *
 * Why not dependency-cruiser?
 * dependency-cruiser reasons about the *module dependency graph* — import/
 * require edges between files. All four constraints enforced here are about
 * *file content*, not graph edges:
 *   - "does this call site pass a `schema` argument?"
 *     — a question about a function call's arguments, which no dependency
 *     graph tool can see.
 *   - does this file contain an `http(s)://` string
 *     literal?" — a content scan, not an edge between modules.
 *   - no-app-to-app is graph-shaped in principle, but the specifier
 *     text pattern it looks for (a relative import whose path, once dot
 *     segments are stripped, reaches into a sibling apps/* directory) is
 *     cheaper to match as text than to wire up a resolver for.
 *   - no-build-fetch-for-content asks "does this build-time module
 *     call `fetch(`?" — a content scan.
 * Forcing any of these into dependency-cruiser would mean writing a custom
 * reporter that re-parses file contents anyway, at which point the tool
 * contributes nothing but a config format to learn.
 *
 * Why not ESLint? A full ESLint setup (config, parser, plugin resolution)
 * is a heavyweight way to answer a handful of narrow, one-off structural
 * questions that a few dozen lines of Node can answer directly, with no new
 * dependency and no config-format indirection.
 *
 * What this script does:
 *   walks apps/** and packages/** (excluding
 *            packages/content itself, which is the one place a schema
 *            declaration is legitimate), finds every `defineCollection(...)`
 *            call, and fails if the call's argument list contains a
 *            `schema` key.
 *   walks packages/content/src/** (posts/*.mdx bodies are
 *            exempt by design — a post may link anywhere) and fails if any
 *            file contains an absolute `http://` or `https://` string
 *            literal.
 *   no-app-to-app — walks apps/**, and for every file finds
 *            import/require/dynamic-import specifiers. A relative specifier
 *            that, once its leading `./`/`../` segments are stripped, starts
 *            with the name of a *different* apps/* directory is a violation
 *            (e.g. `apps/site/...` importing `../../blog/src/content.config`).
 *            Shared code must travel through packages/ instead.
 *   no-build-fetch-for-content — scoped to apps/site/src
 *            only. If apps/site ever gains a client island,
 *            this scope must be revisited so client-side fetches aren't
 *            swept in.
 *
 * Usage: node scripts/check-boundaries.mjs   (wired to `pnpm check:boundaries`)
 * Exits 0 on a clean repo, 1 if any violation is found. Each violation line
 * names the offending file path and the constraint id.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = join(__filename, "..", "..");

const EXCLUDED_DIR_NAMES = new Set([
  "node_modules",
  ".git",
  "dist",
  ".astro",
  ".wrangler",
  ".vercel",
  ".turbo",
  "coverage",
]);

const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".astro",
  ".js",
  ".mjs",
  ".cjs",
]);

/**
 * Recursively collect files under `dir` whose extension is in
 * SOURCE_EXTENSIONS, skipping excluded directory names.
 */
function walk(dir, results = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (EXCLUDED_DIR_NAMES.has(entry.name)) continue;
      walk(join(dir, entry.name), results);
      continue;
    }

    const ext = entry.name.slice(entry.name.lastIndexOf("."));
    if (SOURCE_EXTENSIONS.has(ext)) {
      results.push(join(dir, entry.name));
    }
  }

  return results;
}

function toRepoRelative(absPath) {
  return relative(repoRoot, absPath).split(sep).join("/");
}

/**
 * Extract the raw argument-list text of every `<calleeName>(...)` call
 * found in `source`, via simple paren-balance scanning. This is not a
 * real parser (it does not understand strings/comments containing stray
 * parens), but it is more than sufficient for a codebase-controlled
 * check over our own source files, and far cheaper than pulling in a
 * TS/JS AST parser for two narrow rules.
 */
function extractCallArgs(source, calleeName) {
  const calls = [];
  const needle = `${calleeName}(`;
  let searchFrom = 0;

  while (true) {
    const start = source.indexOf(needle, searchFrom);
    if (start === -1) break;

    const openParenIdx = start + calleeName.length;
    let depth = 0;
    let i = openParenIdx;
    for (; i < source.length; i++) {
      const ch = source[i];
      if (ch === "(") depth++;
      else if (ch === ")") {
        depth--;
        if (depth === 0) {
          i++;
          break;
        }
      }
    }

    calls.push(source.slice(openParenIdx + 1, i - 1));
    searchFrom = i;
  }

  return calls;
}

/**
 * DC-001: forbid any `defineCollection` call outside packages/content from
 * passing a `schema` property.
 */
function checkDC001() {
  const violations = [];
  const scanRoots = [join(repoRoot, "apps"), join(repoRoot, "packages")];
  const packagesContentSrc = join(repoRoot, "packages", "content");

  const files = scanRoots.flatMap((root) => walk(root));

  for (const absPath of files) {
    if (absPath.startsWith(packagesContentSrc + sep)) continue;

    const source = readFileSync(absPath, "utf8");
    if (!source.includes("defineCollection(")) continue;

    const calls = extractCallArgs(source, "defineCollection");
    const hasSchemaArg = calls.some((argsText) =>
      /\bschema\s*:/.test(argsText),
    );

    if (hasSchemaArg) {
      violations.push({
        constraint: "DC-001 (US-001)",
        file: toRepoRelative(absPath),
        message:
          "defineCollection() outside packages/content passes a `schema` property. " +
          "The schema must be declared exactly once, inside packages/content (see docs/specs/001/overview.md).",
      });
    }
  }

  return violations;
}

/**
 * DC-002: forbid absolute http(s):// string literals inside
 * packages/content/src. packages/content/posts/*.mdx (post bodies) are
 * explicitly exempt.
 */
function checkDC002() {
  const violations = [];
  const srcRoot = join(repoRoot, "packages", "content", "src");
  const urlPattern = /https?:\/\/[^\s"'`)]+/;

  const files = walk(srcRoot);

  for (const absPath of files) {
    const source = readFileSync(absPath, "utf8");
    const match = source.match(urlPattern);
    if (match) {
      violations.push({
        constraint: "DC-002 (US-001)",
        file: toRepoRelative(absPath),
        message:
          `Absolute URL literal "${match[0]}" found in packages/content/src. ` +
          "The package must stay URL-agnostic; the consuming app supplies the base URL via env var (see docs/specs/001/overview.md).",
      });
    }
  }

  return violations;
}

/**
 * Extract every import/require/dynamic-import specifier string referenced
 * in `source`. Covers:
 *   - `import ... from "x"` / `export ... from "x"`
 *   - `import "x"` (side-effect import, no `from`)
 *   - `require("x")`
 *   - `import("x")` (dynamic import)
 * This is a text-pattern scan, not a real parser — sufficient for our own
 * source files, same tradeoff as extractCallArgs() above.
 */
function findImportSpecifiers(source) {
  const specifiers = [];
  const patterns = [
    /\bfrom\s+["']([^"']+)["']/g,
    /\brequire\(\s*["']([^"']+)["']\s*\)/g,
    /\bimport\(\s*["']([^"']+)["']\s*\)/g,
    /^\s*import\s+["']([^"']+)["']/gm,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(source)) !== null) {
      specifiers.push(match[1]);
    }
  }

  return specifiers;
}

/**
 * US-002 DC-001 ("no-app-to-app"): no module under apps/* may import from a
 * different apps/* directory. Shared code must travel through packages/.
 */
function checkNoAppToApp() {
  const violations = [];
  const appsRoot = join(repoRoot, "apps");

  let appDirs;
  try {
    appDirs = readdirSync(appsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    appDirs = [];
  }

  const files = walk(appsRoot);

  for (const absPath of files) {
    const relPath = toRepoRelative(absPath);
    const ownerMatch = relPath.match(/^apps\/([^/]+)\//);
    if (!ownerMatch) continue;
    const currentApp = ownerMatch[1];

    const source = readFileSync(absPath, "utf8");
    const specifiers = findImportSpecifiers(source);

    for (const spec of specifiers) {
      let tail;
      if (spec.startsWith(".")) {
        tail = spec.replace(/^(\.\.?\/)+/, "");
      } else if (spec.startsWith("apps/")) {
        tail = spec.slice("apps/".length);
      } else {
        continue; // bare package specifier, not a same-repo path into apps/
      }

      for (const otherApp of appDirs) {
        if (otherApp === currentApp) continue;
        if (tail === otherApp || tail.startsWith(`${otherApp}/`)) {
          violations.push({
            constraint: "US-002 DC-001 (no-app-to-app)",
            file: relPath,
            message:
              `Imports "${spec}", which reaches into sibling app "apps/${otherApp}" from ` +
              `"apps/${currentApp}". Shared code must travel through packages/ instead `,
          });
        }
      }
    }
  }

  return violations;
}

/**
 * Extract the frontmatter block (the part between the first `---` fences)
 * of an .astro file — the portion that runs at build time. Returns "" if
 * the file has no frontmatter fence.
 */
function extractAstroFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : "";
}

/**
 * US-002 DC-002 ("no-build-fetch-for-content"): no build-time module under
 * apps/site may call fetch(). Scoped to apps/site/src only (this rule
 * targets the site's build path, not the blog's — see file header note).
 * For .astro files only the frontmatter (build-time) block is scanned, so a
 * future client-hydrated island's inline <script> is not swept in.
 */
function checkNoBuildFetchForContent() {
  const violations = [];
  const siteSrcRoot = join(repoRoot, "apps", "site", "src");
  const fetchCallPattern = /\bfetch\s*\(/;

  const files = walk(siteSrcRoot);

  for (const absPath of files) {
    const source = readFileSync(absPath, "utf8");
    const scanned = absPath.endsWith(".astro")
      ? extractAstroFrontmatter(source)
      : source;

    if (fetchCallPattern.test(scanned)) {
      violations.push({
        constraint: "US-002 DC-002 (no-build-fetch-for-content)",
        file: toRepoRelative(absPath),
        message:
          "Build-time module calls fetch(). The site must read posts in-process via " +
          "getRecentPosts() from @content/content, not over the network at build time",
      });
    }
  }

  return violations;
}

function main() {
  const violations = [
    ...checkDC001(),
    ...checkDC002(),
    ...checkNoAppToApp(),
    ...checkNoBuildFetchForContent(),
  ];

  if (violations.length === 0) {
    console.log(
      "check:boundaries — OK (DC-001 US-001, DC-002 US-001, no-app-to-app US-002, " +
        "no-build-fetch-for-content US-002 satisfied)",
    );
    return 0;
  }

  console.error(
    `check:boundaries — FAILED (${violations.length} violation(s))\n`,
  );
  for (const v of violations) {
    console.error(`[${v.constraint}] ${v.file}`);
    console.error(`  ${v.message}\n`);
  }

  return 1;
}

process.exit(main());
