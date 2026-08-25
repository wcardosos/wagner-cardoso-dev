import { postsCollection } from "@content/content";

// The schema and loader live in packages/content (DC-001, Task 000). The
// blog declares no schema of its own — this registration only wires the
// "posts" key to the package's collection. Post MDX files live under
// packages/content/posts/ (migrated there by Task 003); the blog no longer
// has a local src/content/posts directory.
export const collections = { posts: postsCollection };
