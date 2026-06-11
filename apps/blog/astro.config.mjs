import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.BLOG_URL ?? "https://blog.wagnercardoso.dev",
  integrations: [mdx(), sitemap()],
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://wagnercardoso.dev",
      }),
    },
  },
  markdown: { shikiConfig: { theme: "dracula", wrap: true } },
  vite: { plugins: [tailwindcss()] },
});
