## Context

Two independent Astro apps (`apps/site`, `apps/blog`), both static output, no SSR adapter, deployed to separate Cloudflare Pages projects. Neither currently has any tracking code. An existing Umami instance (self-hosted on Vercel, Postgres via Neon) is already live and receiving events from an unrelated application — reused as-is, no infrastructure work. See proposal.md for why this needs to start now rather than later.

## Goals / Non-Goals

**Goals:**
- Collect page views from both apps' production traffic under one Umami website identity.
- Guarantee local dev and Cloudflare Pages previews never contaminate the series, without depending on correctly-scoped build-time environment configuration.
- Keep the change small enough to fit one working session and require no ongoing maintenance.

**Non-Goals:**
- No dashboard, report, or in-repo UI for viewing the data — consumption happens once, directly in Umami's own interface.
- No attempt to recover visitors lost to tracking blockers, and no attempt to distinguish the site owner's own traffic from readers'.
- No update to the Umami installation itself, even though it is known to be behind current upstream.

## Decisions

**Gating mechanism: runtime hostname check, not a build-time environment variable.**
A build-time `PUBLIC_*` env var scoped to Cloudflare Pages' Production environment was considered — it would keep tracking code out of preview/local bundles entirely. Rejected as the primary mechanism because its correctness depends on Cloudflare Pages environment-variable scoping staying configured correctly, indefinitely, on two separate Pages projects, with nobody checking. A misconfiguration would silently either drop production data or leak preview traffic into the series, and per the proposal's constraints nothing about this feature will be revisited to notice. A runtime check (`window.location.hostname === <canonical production domain>`) is self-contained in the code that ships once and is reviewed once. Cost: the tracking snippet still ships (inert) in preview/local bundles — accepted, since it's a few bytes with no functional effect there.

**Cross-domain identity: one Umami website ID, both domains as allowed hostnames.**
Umami derives its (cookieless) visitor/session identity from website ID + IP + user agent + a rotating salt, not from a domain-scoped cookie — so pointing both apps' tracker scripts at the same website ID is sufficient for a cross-domain visit to resolve to one identity, with no additional stitching logic needed. Registering both `wagnercardoso.dev` and `blog.wagnercardoso.dev` as allowed hostnames on that one website entry is an Umami admin-panel step, not a code change.

**Snippet placement: duplicated locally in each app's layout, not promoted to the design system.**
Per CLAUDE.md's promotion rule (promote after third duplication), a two-app, ~5-line duplication does not meet the bar. Each app gets its own small script-injection snippet in its layout.

**Umami website ID and script URL: hard-coded constants, not environment variables.**
These values are not secrets — they are already public in any page's rendered HTML once collection is live — and they do not vary between environments (the same ID is used everywhere; only the runtime hostname check decides whether the event fires). This matches the existing pattern in this repo of hard-coding non-environment-dependent external URLs rather than routing them through `astro:env`.

## Risks / Trade-offs

- **Umami's cookieless session derivation is asserted from general knowledge of the product, not verified against the specific version currently deployed.** → Mitigation: confirm during implementation (task will check the live instance's tracker script behavior); if it turns out to rely on something domain-scoped after all, the unified-journey requirement may need revisiting, but the production-only gating and per-app snippet decisions are unaffected either way.
- **Inert tracking snippet still ships in local/preview bundles under the runtime-check approach.** → Accepted; no functional or measurable cost.
- **Umami instance is already carrying another application's traffic; this adds load without any capacity check.** → Out of scope per proposal (no infrastructure work); low risk given both apps are low-traffic personal sites.

## Migration Plan

No migration — this is net-new collection with no prior data. Rollback, if ever needed, is deleting the snippet from both layouts; no data cleanup implied since the series is meant to be read as one continuous, unversioned history.
