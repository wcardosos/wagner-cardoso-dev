import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://wagnercardoso.dev",
  integrations: [sitemap()],
  env: {
    schema: {
      PUBLIC_BLOG_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://blog.wagnercardoso.dev",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
