// packages/content/src/index.ts
export { postsCollection } from "./collection";
export { postSchema, type Post } from "./schema";

import { getCollection } from "astro:content";
import type { Post } from "./schema";

/**
 * Shape of a `posts` collection entry as produced by `postSchema` (see
 * ./schema.ts). Declared locally because the package's standalone `tsc`
 * types `getCollection` as `any` (no project-generated Astro types inside
 * the package itself — accepted limitation, see Task 000/002 notes). This
 * annotation restores real inference for the code below without attempting
 * to "fix" that underlying limitation.
 */
type PostEntry = { id: string; data: Omit<Post, "slug"> };

/**
 * Every post, sorted by `date` descending. Empty collection returns `[]`.
 *
 * Each element carries `slug`, `title`, `date`, `description` and nothing
 * else — never the entry body or a render function (DC-002 scope: no URL
 * construction either, only the bare slug).
 */
export async function getAllPosts(): Promise<Post[]> {
  const entries: PostEntry[] = await getCollection("posts");

  return entries
    .map(
      (entry): Post => ({
        slug: entry.id,
        title: entry.data.title,
        date: entry.data.date,
        description: entry.data.description,
      })
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * The `n` newest posts. When `n` exceeds the total, returns everything.
 * When `n <= 0`, returns `[]`. Never throws on an empty collection.
 */
export async function getRecentPosts(n: number): Promise<Post[]> {
  if (n <= 0) {
    return [];
  }

  const posts = await getAllPosts();

  return posts.slice(0, n);
}
