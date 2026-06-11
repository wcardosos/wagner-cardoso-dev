import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection("posts"))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 5);

  const items = posts.map((post) => ({
    slug: post.id,
    title: post.data.title,
    date: post.data.date.toISOString(),
    description: post.data.description,
    url: new URL(`/${post.id}`, context.site).toString(),
  }));

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
};
