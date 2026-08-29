# wagner-cardoso-dev

Monorepo pessoal contendo as aplicações Astro de Wagner Cardoso: a landing page
e o blog técnico.

## Estrutura

```
.
├── apps/
│   ├── site/              # Site profissional (wagnercardoso.dev)
│   └── blog/               # Blog técnico, MDX + Content Collections (blog.wagnercardoso.dev)
├── packages/
│   ├── design-system/      # Tokens visuais compartilhados (@design-system)
│   └── content/             # Posts em MDX + schema das collections (@content/content)
├── scripts/
│   └── check-boundaries.mjs # Guarda regras estruturais do monorepo (ver abaixo)
└── docs/specs/               # Specs e handoffs das tasks já implementadas
```

`site` e `blog` são apps independentes, cada uma com seu próprio deploy no
Cloudflare Pages. Ambas consomem `@design-system` (tokens de cor/tipografia) e
`@content/content` (posts em MDX + o schema das collections) via
`workspace:*`.

## Stack

- pnpm workspaces (sem Turborepo/Nx/Lerna)
- Astro 5 (output estático, sem SSR) + `@astrojs/mdx` + `@astrojs/sitemap`
- Tailwind CSS v4 via plugin Vite, tokens declarados em `@theme` — sem `tailwind.config.js`
- Montserrat self-hosted via `@fontsource/montserrat`
- Syntax highlighting do blog via Shiki (tema Dracula) + plugin remark próprio (`apps/blog/remark/remark-alerts.mjs`)
- Deploy em Cloudflare Pages, um projeto por app

## Comandos

```bash
pnpm install                # instala dependências do workspace

pnpm dev                    # roda site (4321) e blog (4322) em paralelo
pnpm dev:site                # só o site
pnpm dev:blog                # só o blog

pnpm build                  # build de site + blog
pnpm build:site
pnpm build:blog

pnpm preview                 # preview de site + blog em paralelo
pnpm preview:site
pnpm preview:blog

pnpm check:boundaries         # valida as regras estruturais do monorepo
```

## Pacotes compartilhados

- **`@design-system`** — fonte única de tokens de design (`theme.css`), sem
  build step; exporta CSS bruto via `exports` no `package.json`. Componentes
  `.astro` começam locais a cada app e só são promovidos para cá após a
  terceira duplicação genuína.
- **`@content/content`** — posts em MDX (`packages/content/posts`) e o schema
  das Content Collections consumido pelo blog. `check-boundaries.mjs` garante
  que nenhum app declare `schema` localmente e que os posts não linkem URLs
  absolutas fora do necessário.

## Regras de estrutura (`check-boundaries.mjs`)

Script Node sem dependências, rodado em CI, que garante:

- nenhuma collection fora de `packages/content` declara `schema` próprio;
- `packages/content` não contém strings `http(s)://` fora do corpo dos posts;
- nenhum app importa diretamente de outro app (`apps/site` → `apps/blog` ou
  vice-versa) — código compartilhado deve passar por `packages/`;
- `apps/site` não faz `fetch` em tempo de build para buscar conteúdo.

## Deploy

Cloudflare Pages, um projeto por app, via GitHub Actions
(`.github/workflows/deploy.yml`):

- push em `main` detecta quais apps mudaram e builda/deploya só esses;
- `workflow_dispatch` permite escolher `site`, `blog` ou `both` manualmente;
- cada deploy tenta novamente uma vez antes de falhar.

`.github/workflows/verify-draft.yml` builda ambos os apps (sem deploy) a cada
push em branches `post/**`, para validar rascunhos de post antes do merge.

- **Site** → `wagnercardoso.dev`
- **Blog** → `blog.wagnercardoso.dev`

Ambos:

- Root directory: `/` (raiz do repo — necessário para resolver o workspace pnpm)
- Build command: `pnpm install --frozen-lockfile && pnpm --filter <app> build`
- Build output directory: `apps/<app>/dist`

### Variáveis de ambiente

Ver `apps/site/.env.example` e `apps/blog/.env.example`. Definidas via
`astro:env` em cada `astro.config.mjs`:

- Site → `SITE_URL` (próprio `site:`) e `PUBLIC_BLOG_URL` (cross-link pro blog)
- Blog → `BLOG_URL` (próprio `site:`) e `PUBLIC_SITE_URL` (cross-link pro site)

Sem elas, o build cai nos defaults de produção embutidos em cada
`astro.config.mjs` — nunca quebra. URLs externas (GitHub, LinkedIn etc.) ficam
hard-coded, pois não dependem do ambiente.

### Configuração crítica

- A imagem de Open Graph de cada app (`public/og-image.png`) é gerada por
  `pnpm --filter <app> og:generate`. Regenere localmente e faça commit do PNG
  quando o texto/identidade mudar — não roda automaticamente no build do site
  (no blog, roda a cada `build`, junto com a verificação de slugs publicados).
- O build cache do Cloudflare deve ficar desligado ou escopado: alterações em
  `packages/design-system` ou `packages/content` precisam invalidar o build
  dos apps consumidores.
