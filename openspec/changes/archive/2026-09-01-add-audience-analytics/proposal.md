## Why

Audience data is not reconstructible after the fact: if page-view collection does not start now, the data for this period is permanently lost. The blog has no visibility into what happens after publishing, and a single deferred question — which topics drove traffic, and from where — needs continuous history by March 2027 to be answerable at all.

## What Changes

- Add page-view tracking to both `apps/site` and `apps/blog`, pointed at the existing self-hosted Umami instance (already live on Vercel, backed by Neon Postgres, already receiving events from another application).
- Register both domains under a single Umami website/tracking ID (via allowed hostnames), so a visit that starts on one domain and continues on the other reads as one journey rather than two disconnected sessions.
- Gate collection to production only via a runtime hostname check against the canonical production domains, so local dev and Cloudflare Pages preview deployments never emit events — no reliance on build-time environment configuration that could silently drift.
- No dashboard, report, or UI is built. The existing Umami instance's own interface is the only consumption surface, used once, around March 2027.

## Capabilities

### New Capabilities
- `audience-analytics`: production-only page-view collection for both apps, unified under one tracking identity so cross-domain visits register as a single journey.

### Modified Capabilities
(none)

## Impact

- **Affected code**: `apps/site` and `apps/blog` layout(s) — each gets a small script-injection snippet with a hostname guard. No shared package changes; this does not meet the design system's promotion bar (local until a third duplication).
- **External systems**: existing Umami instance (Vercel) and its Neon Postgres — reused as-is, no infrastructure changes. Requires creating/confirming one website entry in Umami with both `wagnercardoso.dev` and `blog.wagnercardoso.dev` as allowed hostnames.
- **No new dependencies, no new environment variables, no build pipeline changes.**
- **Scope note**: this reopens the CLAUDE.md exclusion on "analytics dashboards" in a narrow sense — this is a collection-only integration into infrastructure that already exists outside this repo, not a dashboard built as a feature of either app. Confirmed explicitly with the project owner rather than assumed.
