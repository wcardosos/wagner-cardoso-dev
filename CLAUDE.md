# CLAUDE.md

Guidance for Claude instances working in this repository.

## Repository purpose

Personal monorepo containing two independent Astro applications:

- `apps/site` — personal landing site (single-page, hub)
- `apps/blog` — technical blog (Markdown/MDX, Content Collections)

Apps share a design system via a workspace package. They are deployed independently to Cloudflare Pages.

## Stack

- **Package manager:** pnpm with workspaces. Never use `npm` or `yarn` commands in this repo.
- **Framework:** Astro for both apps. Static output, no SSR adapter.
- **Styling:** Tailwind CSS v4 with `@theme` directive (no `tailwind.config.js`).
- **Blog content:** Astro Content Collections + MDX. Syntax highlighting via Shiki, Dracula theme.
- **Deploy:** Cloudflare Pages, one project per app, Git integration.

## Structure

```
wagner-cardoso-dev/
├── apps/
│   ├── site/
│   └── blog/
└── packages/
    └── design-system/
```

Design system is consumed via `workspace:*` protocol. Package name: `@design-system`.

## Component framework policy

**Astro components are the default.** Use React (or any other framework via Astro Islands) only when client-side interactivity is genuinely required.

React is justified for:

- Interactive widgets with state (calculators, live demos)
- Forms with non-trivial client-side validation
- Components with persistent client state across interactions

React is **not** justified for:

- Static UI (buttons, cards, layouts, navigation)
- Anything that can be plain HTML + CSS
- Hover effects, transitions, or behavior achievable with CSS alone

When adding interactivity, prefer Astro's `client:visible` or `client:idle` directives over `client:load` to keep JS payload minimal.

## Design system rules

- Single source of truth for design tokens lives in `packages/design-system/theme.css`, exposed via Tailwind v4 `@theme`.
- Apps import tokens with `@import "@design-system/theme.css"`.
- Components start **local to each app**. Promote to the design system only after the third duplication, and only when divergence is genuinely accidental.
- The design system has no build step on v1. It exports raw CSS and `.astro` files directly via the `exports` field in its `package.json`.

## Visual identity (shared across both apps)

- Dark background, light grey text, red accent.
- Single font family: Montserrat.
- No animations, no parallax, no theme toggle, no light mode.
- Generous spacing. Typography does the visual work.

Exact tokens are defined in `packages/design-system/theme.css` — always read that file before suggesting color or typography changes.

## Things explicitly not in scope

Do not suggest, scaffold, or add:

- Turborepo, Nx, Lerna, or any other monorepo orchestrator beyond pnpm workspaces.
- Storybook or component playgrounds.
- Light/dark theme toggle, language toggle.
- Automated tests for the apps (no behavior to test on v1).
- Newsletter signups, comment systems, analytics dashboards.
- Tags, categories, pagination, or search for the blog (cronological only on v1).
- Reading time estimates, view counters, or other vanity metrics.

These exclusions are deliberate. If a future need genuinely requires one of them, raise it explicitly rather than introducing it silently.

## Working principles

- **Incremental over abstract.** Prefer concrete implementations that solve the current case over generic abstractions for hypothetical future cases.
- **Local first, promote later.** New components, utilities, and styles live in the app that needs them until duplication justifies promotion.
- **Validate strategy before generating code.** When facing a non-trivial decision (architecture, structure, tooling), discuss the trade-offs before producing artifacts.
- **Respect the v1 scope.** Features marked out of scope above stay out until reopened explicitly.

## Deployment

Each app is a separate Cloudflare Pages project pointing at this repo:

- Site → `wagnercardoso.dev` (or equivalent root domain)
- Blog → `blog.wagnercardoso.dev`

Both use:

- Root directory: `/` (repo root, required for pnpm workspace resolution)
- Build command: `pnpm install --frozen-lockfile && pnpm --filter <app> build`
- Build output directory: `apps/<app>/dist`

Build cache should be configured carefully or disabled — changes to `packages/design-system` must invalidate consumer builds.

### Environment variables

Internal deploy domains are externalized via `astro:env` (see each app's `.env.example`). Each Cloudflare Pages project should define its build-time env vars:

- Site → `SITE_URL` (own `site:`) and `PUBLIC_BLOG_URL` (cross-link to the blog).
- Blog → `BLOG_URL` (own `site:`) and `PUBLIC_SITE_URL` (cross-link to the site).

Without them, the build falls back to the production defaults embedded in each app's `env.schema` / config, so it never breaks. External/content URLs (GitHub, LinkedIn, etc.) stay hard-coded — they don't depend on the environment.
