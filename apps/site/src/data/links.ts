import { PUBLIC_BLOG_URL } from "astro:env/client";

export type LinkEntry = {
  label: string;
  display: string;
  href: string;
  external: boolean;
};

export const links: LinkEntry[] = [
  {
    label: "Blog",
    display: "blog.wagnercardoso.dev",
    href: PUBLIC_BLOG_URL,
    external: true,
  },
  {
    label: "GitHub",
    display: "github.com/wcardosos",
    href: "https://github.com/wcardosos",
    external: true,
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/wagner-cardoso-dev",
    href: "https://linkedin.com/in/wagner-cardoso-dev",
    external: true,
  },
  {
    label: "Email",
    display: "wagnerdev01@gmail.com",
    href: "mailto:wagnerdev01@gmail.com",
    external: false,
  },
];
