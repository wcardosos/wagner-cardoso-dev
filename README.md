# wagner-cardoso-dev

Monorepo pessoal contendo as aplicações Astro de Wagner Cardoso.

## Estrutura

```
.
├── apps/
│   └── site/         # Landing page pessoal (wagnercardoso.dev)
└── packages/         # (reservado — design system entra quando o blog chegar)
```

Na v1, apenas `apps/site` está populado. O blog e o design system compartilhado
serão adicionados em iterações futuras conforme o PRD.

## Stack

- pnpm workspaces (sem Turborepo/Nx)
- Astro (output estático, sem SSR)
- Tailwind CSS v4 via plugin Vite, tokens declarados em `@theme` no CSS
- Montserrat self-hosted via `@fontsource/montserrat`
- Deploy em Cloudflare Pages

## Comandos

```bash
pnpm install               # instala dependências do workspace
pnpm dev                   # roda o site em localhost:4321
pnpm build                 # gera o site estático em apps/site/dist
pnpm --filter site preview # serve o build local
```

## Decisões

- Tokens de design vivem em `apps/site/src/styles/global.css` enquanto não há
  segunda aplicação consumindo-os. Promoção para `packages/design-system`
  acontecerá quando o blog for criado.
- Sem `tailwind.config.js`: toda configuração via `@theme` (Tailwind v4).
- Identidade dark com accent vermelho, Montserrat como única família tipográfica.

## Deploy

Cloudflare Pages, um projeto por app. Deploy manual via integração Git na v1.

- **Site** → `wagnercardoso.dev`
  - Root directory: `/` (raiz do repo — necessário para resolver o workspace pnpm)
  - Build command: `pnpm install --frozen-lockfile && pnpm --filter site build`
  - Build output directory: `apps/site/dist`
  - Variáveis de ambiente: nenhuma

### Configuração crítica

- `site` em `apps/site/astro.config.mjs` é a fonte de verdade para URLs absolutas
  (sitemap, Open Graph, canonical). Se o domínio mudar, atualize lá e em
  `apps/site/public/robots.txt`.
- A imagem de Open Graph (`apps/site/public/og-image.png`) é gerada por
  `pnpm --filter site og:generate`. Regenere localmente e faça commit do PNG
  quando o texto/identidade mudar — não roda no build.
- O build cache do Cloudflare deve ficar desligado ou escopado: alterações em
  `packages/design-system` precisam invalidar o build dos apps consumidores
  (ver CLAUDE.md).
