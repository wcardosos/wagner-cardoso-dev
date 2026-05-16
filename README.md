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
