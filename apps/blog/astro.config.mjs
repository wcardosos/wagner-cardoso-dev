import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://blog.wagnercardoso.dev",
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { theme: "dracula", wrap: true } },
  vite: { plugins: [tailwindcss()] },
});
