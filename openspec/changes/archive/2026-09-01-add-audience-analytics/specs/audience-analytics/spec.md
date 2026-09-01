## Purpose

Collects page-view history for `wagnercardoso.dev` and `blog.wagnercardoso.dev` from production traffic only, as a single unified journey, so a future one-time query can compare which topics drove organic traffic.

## ADDED Requirements

### Requirement: Production-only page-view collection
The system SHALL emit a page-view event to the existing Umami instance for every page load on `wagnercardoso.dev` and `blog.wagnercardoso.dev` when served from their canonical production hostnames, and SHALL NOT emit an event for any other hostname (local development, Cloudflare Pages preview deployments, or any other origin).

#### Scenario: Page view in production
- **WHEN** a page on `wagnercardoso.dev` or `blog.wagnercardoso.dev` is loaded from its canonical production hostname
- **THEN** a page-view event is sent to the Umami instance

#### Scenario: Page view in local development
- **WHEN** a page is loaded from `localhost` or any non-production hostname during local development
- **THEN** no page-view event is sent

#### Scenario: Page view on a preview deployment
- **WHEN** a page is loaded from a Cloudflare Pages preview URL (a hostname other than the canonical production domain)
- **THEN** no page-view event is sent

### Requirement: Unified cross-domain journey
The system SHALL report page views from both `wagnercardoso.dev` and `blog.wagnercardoso.dev` under the same Umami website identity, so that a visit spanning both domains is attributable to a single journey rather than two disconnected sessions.

#### Scenario: Visit crosses from the blog to the site
- **WHEN** a visitor loads a page on `blog.wagnercardoso.dev` and then navigates to `wagnercardoso.dev` in the same visit
- **THEN** both page views are recorded under the same Umami website identity
