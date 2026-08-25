import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readdir, readFile } from "node:fs/promises";

// a previously published slug must never disappear from packages/content/posts.
// Deliberately dependency-free and doesn't boot Astro's content API — slugs are
// just filenames (minus extension), same rule the content loader itself uses.

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = resolve(
  __dirname,
  "..",
  "..",
  "..",
  "packages",
  "content",
  "posts",
);
const fixturePath = resolve(
  __dirname,
  "..",
  "test",
  "fixtures",
  "published-slugs.json",
);

const fixtureRaw = await readFile(fixturePath, "utf-8");
const { slugs: publishedSlugs } = JSON.parse(fixtureRaw);

const files = await readdir(postsDir);
const currentSlugs = files
  .filter((f) => /\.mdx?$/.test(f))
  .map((f) => f.replace(/\.mdx?$/, ""));

const currentSet = new Set(currentSlugs);
const missing = publishedSlugs.filter((slug) => !currentSet.has(slug));

if (missing.length > 0) {
  console.error(
    `Slug regression detected: the following previously published slug(s) are missing from ${postsDir}:\n` +
      missing.map((slug) => `  - ${slug}`).join("\n") +
      "\n\nA published slug is immutable. Restore the file or rename it back before building.",
  );
  process.exit(1);
}

console.log(
  `Slug guard OK: all ${publishedSlugs.length} previously published slug(s) are present (${currentSlugs.length} post(s) found).`,
);
