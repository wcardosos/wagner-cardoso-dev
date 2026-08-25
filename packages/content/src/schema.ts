// packages/content/src/schema.ts
import { z } from "astro:content";

export const postSchema = z.object({
  title: z.string().min(1),
  date: z.date(),
  description: z.string().min(1),
});

export type Post = {
  slug: string; // derived from filename, without extension
  title: string;
  date: Date;
  description: string;
};
