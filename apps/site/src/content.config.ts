import { postsCollection } from "@content/content";

// The schema and loader live in packages/content (DC-001, Task 000 of
// US-001). The site declares no schema of its own — this registration only
// wires the "posts" key to the package's collection so that
// getRecentPosts() (called from Escrita.astro) can resolve `getCollection
// ("posts")` internally. Mirrors apps/blog/src/content.config.ts.
export const collections = { posts: postsCollection };
