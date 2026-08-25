// packages/content/src/collection.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { postSchema } from "./schema";

// Resolved relative to this file's own location (not the consuming app's
// project root) so the collection resolves correctly regardless of which
// app — blog or site — imports it.
const postsDir = new URL("../posts", import.meta.url);

export const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: postsDir }),
  schema: postSchema,
});
