// packages/content/src/collection.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { postSchema } from "./schema";

// Resolved relative to this file's own location (not the consuming app's
// project root) so the collection resolves correctly regardless of which
// app — blog or site — imports it. See "Decisions Recorded" in
// docs/specs/001/task-000.md for why this deviates from the base path
// string shown in C-5.
const postsDir = new URL("../posts", import.meta.url);

export const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: postsDir }),
  schema: postSchema,
});
