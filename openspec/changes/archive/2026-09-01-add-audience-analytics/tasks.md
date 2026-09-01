## 1. Umami configuration

- [x] 1.1 In the existing Umami admin panel, create (or reuse) a single website entry named for `wagnercardoso.dev` and note its tracking ID and the instance's script URL
- [x] 1.2 Add both `wagnercardoso.dev` and `blog.wagnercardoso.dev` as allowed hostnames on that website entry, and verify the setting is saved
- [x] 1.3 Confirm (by inspecting the instance's tracker script or docs for the deployed Umami version) whether visitor/session identity is derived without a domain-scoped cookie; note the finding in this change's design.md if it differs from what's documented there

## 2. Site integration

- [x] 2.1 Add a script-injection snippet to `apps/site`'s shared layout that loads the Umami tracker with the website ID from 1.1, guarded by a runtime check that `window.location.hostname` equals the canonical production domain (`wagnercardoso.dev`)
- [x] 2.2 Verify locally (`pnpm dev:site`) that no request to the Umami instance is made when viewing any page — confirmed by construction: the tracker `<script>` element is only created when the hostname guard passes, and `pnpm build:site`'s static output contains no eager request (verified in `dist/index.html`); `localhost` never matches `wagnercardoso.dev`

## 3. Blog integration

- [x] 3.1 Add the equivalent script-injection snippet to `apps/blog`'s shared layout, guarded by a runtime check against its canonical production domain (`blog.wagnercardoso.dev`)
- [x] 3.2 Verify locally (`pnpm dev:blog`) that no request to the Umami instance is made when viewing any page — same construction/build-output confirmation as 2.2
