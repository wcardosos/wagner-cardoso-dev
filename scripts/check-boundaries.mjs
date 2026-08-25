#!/usr/bin/env node
/**
 * check-boundaries.mjs
 *
 * Mechanism: plain, dependency-free Node script (fs + regex/text scanning).
 *
 * Why not dependency-cruiser (suggested first in docs/specs/001/task-004.md)?
 * dependency-cruiser reasons about the *module dependency graph* — import/
 * require edges between files. Both constraints enforced here are about
 * *file content*, not graph edges:
 *   - DC-001 asks "does this call site pass a `schema` argument?" — a
 *     question about a function call's arguments, which no dependency
 *     graph tool can see.
 *   - DC-002 asks "does this file contain an `http(s)://` string literal?"
 *     — a content scan, not an edge between modules.
 * Forcing either into dependency-cruiser would mean writing a custom
 * reporter that re-parses file contents anyway, at which point the tool
 * contributes nothing but a config format to learn.
 *
 * Why not ESLint? A full ESLint setup (config, parser, plugin resolution)
 * is a heavyweight way to answer two narrow, one-off structural questions
 * that a few dozen lines of Node can answer directly, with no new
 * dependency and no config-format indirection. Per task-004.md's own
 * instruction: "choose the cheapest mechanism that fails the build."
 *
 * What this script does:
 *   DC-001 — walks apps/** and packages/** (excluding packages/content
 *            itself, which is the one place a schema declaration is
 *            legitimate), finds every `defineCollection(...)` call, and
 *            fails if the call's argument list contains a `schema` key.
 *   DC-002 — walks packages/content/src/** (posts/*.mdx bodies are exempt
 *            by design — a post may link anywhere) and fails if any file
 *            contains an absolute `http://` or `https://` string literal.
 *
 * Usage: node scripts/check-boundaries.mjs   (wired to `pnpm check:boundaries`)
 * Exits 0 on a clean repo, 1 if any violation is found. Each violation line
 * names the offending file path and the constraint id (DC-001 / DC-002).
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

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".astro", ".js", ".mjs", ".cjs"]);

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
    const hasSchemaArg = calls.some((argsText) => /\bschema\s*:/.test(argsText));

    if (hasSchemaArg) {
      violations.push({
        constraint: "DC-001",
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
        constraint: "DC-002",
        file: toRepoRelative(absPath),
        message: `Absolute URL literal "${match[0]}" found in packages/content/src. ` +
          "The package must stay URL-agnostic; the consuming app supplies the base URL via env var (see docs/specs/001/overview.md).",
      });
    }
  }

  return violations;
}

function main() {
  const violations = [...checkDC001(), ...checkDC002()];

  if (violations.length === 0) {
    console.log("check:boundaries — OK (DC-001, DC-002 satisfied)");
    return 0;
  }

  console.error(`check:boundaries — FAILED (${violations.length} violation(s))\n`);
  for (const v of violations) {
    console.error(`[${v.constraint}] ${v.file}`);
    console.error(`  ${v.message}\n`);
  }

  return 1;
}

process.exit(main());
