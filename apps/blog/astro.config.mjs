import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkAlerts from "./remark/remark-alerts.mjs";

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
  markdown: {
    remarkPlugins: [remarkAlerts],
    shikiConfig: { theme: "dracula", wrap: true },
  },
  vite: { plugins: [tailwindcss()] },
});
