# Sébastien Gautier — professional website

A local, static-first French service website with 13 pages, original workflow illustrations, three case studies and four secondary references. This repository is a new isolated end product; the old site and client applications are not implementation targets.

**Local preview only. Website publication remains blocked by asset, legal, provider and owner approvals.** The owner permits a GitHub push after all requested checks pass and a fast-forward to the verified origin is confirmed; see `AGENTS.md`. This does not authorize deployment. Default servers bind to loopback. No analytics, CMS, database, financial data, or real email credentials are required to run it.

## Install and run

Use Node 24 LTS (tested with 24.20.0) and npm (tested with 11.19.0).

```sh
nvm use
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. A credential-free production preview is also available:

```sh
npm run build
npm run start -- --port 3100
```

## Verification scripts

| Command | Purpose |
| --- | --- |
| `npm run lint` | ESLint CLI with Next/TypeScript configuration |
| `npm run typecheck` | Next route types and strict TypeScript |
| `npm test` | Deterministic tests with isolated provider mocks and real next-safe-action hooks |
| `npm run check` | Lint, typecheck and unit/interface tests |
| `npm run build` | Production build; all 13 public routes are prerendered |
| `npm run test:e2e` | Playwright/axe on the production build, local port 3100; requires that port to be free |
| `npm run measure` | Three Lighthouse mobile runs on four routes; first start the production server on port 3100 |
| `npm run check:release` | Validate approvals, legal content and all 13 built HTML pages, including actual approved asset bindings; intentionally failing in preview |
| `npm run test:public-mode` | Build a disposable final-content fixture, verify 13 routes and loaded images in Chromium, with real provider adapters removed |
| `npm run assets:og` | Recreate the original static 1200 × 630 social image locally |

Browser scripts use installed Google Chrome by default. If Chrome is unavailable, run `npx playwright install chromium` and use `PLAYWRIGHT_CHANNEL=chromium npm run test:e2e` (the same setting applies to social-image generation). Test dependencies are development-only. No test sends real email or changes client systems.

See `docs/refinement-v2.md` for the five V2 batches, `docs/refinement-v2-1-motion.md` for the motion pass, `docs/verification-report.md` for executed results, `docs/release-checklist.md` for owner actions, and `docs/implementation-state.md` for continuation status. Screenshots and machine reports live in the ignored `artifacts/` directory; Playwright's HTML report is in `playwright-report/`.

## Architecture

`src/app` contains explicit Server Component pages and metadata/error routes. Long editorial content stays in readable TSX. Short shared identity, service/project metadata, quotes and home copy live in `src/data`. Client islands are limited to navigation disclosures, form state, optional contact intent, the error retry boundary and one native reveal controller. Shared CSS tokens and one preloaded Mona Sans file through `next/font/local` define the visual system.

SSR blocks marked with `data-reveal` remain visible without JavaScript. `RevealController` uses IntersectionObserver and Web Animations, registers new markup on pathname changes, and releases each completed animation back to ordinary CSS. All blocks use transform-only motion: opacity stays at 1 before, during and after enhancement. Text/section movement is 24px over 650ms; existing cards and visuals use 28px over 650ms. Stagger is 120ms capped at 360ms, beginning up to 48px below the viewport. Home H1 copy moves 12px over 500ms and never waits for an observer. The decorative hero signal runs once after the diagram settles. Focused blocks and direct anchor targets stay immediately visible; reduced motion disables reveals, the signal and arrow transforms. No motion dependency is required. No reveal uses scale. The hero diagram moves 24px over 650ms after a 120ms delay. See `docs/motion-presence.md` for current parameters and `docs/motion-tuning.md` for the historical flash diagnosis.

The form uses one next-safe-action v8 client with `.inputSchema(contactSchema)`, Zod normalization, a honeypot, Arcjet protection and a Resend adapter. Errors are fixed public codes. Input is retained on errors, reset only on accepted delivery, and never persisted in a URL or browser storage. Server-only modules own secrets and provider calls. The HTML email is escaped and a text alternative is supplied. The recipient, sender and subject cannot be chosen by the visitor.

Arcjet runs only for valid contact submissions: Shield, bot detection and five attempts per minute per SDK-resolved IP. Protection errors fail closed. Resend must return a nonempty acceptance ID without error; transport/timeout or ambiguous server failures show an unknown-outcome message and are not retried. Provider acceptance does not prove final inbox delivery.

## Environment and controlled contact activation

Copy `.env.example` to `.env.local` only when configuring a local environment. Keep all API keys server-side and out of Git. Static pages build without them.

- `SITE_URL`: validated HTTPS canonical origin, initially `https://www.sgautier.dev`.
- `SITE_RELEASE`: defaults to `preview`; noindex headers/metadata and an empty sitemap are intentional. `approved` triggers the release gate before building or starting.
- `CONTACT_DELIVERY_ENABLED`: defaults off; set to `true` only after separate authorization for a controlled real send or release.
- `RESEND_API_KEY`, `ARCJET_KEY`: actual provider credentials, never `NEXT_PUBLIC_*`.
- `CONTACT_FROM_EMAIL`: owner-approved mailbox on a verified sending domain, e.g. `contact@sgautier.dev`; do not include a display name. The server adds `Sébastien Gautier`.
- `CONTACT_TO_EMAIL`: fixed owner-approved recipient; default `contact@sgautier.dev`.

Credentialed delivery is available only in a production build. This avoids the SDK's development error logging and keeps local development safely unavailable. Rebuild after environment changes so the static form-availability notice matches configuration. Any real test needs separate explicit authorization and receipt verification. No production protection bypass exists for tests; mocks are confined to tests, the dependency-injected server pipeline or a disposable test copy. The public-mode script copies no environment files and never changes the real approval ledger.

Next's origin checking remains enabled. The action body limit is 64 KiB. Arcjet uses its documented `request()` extraction and `ip.src`; confirm the real proxy/hosting configuration before activation. Security headers include framing denial, no-sniff, referrer policy and restricted browser capabilities. No strict CSP or HSTS preload claim is made; final HTTPS/hosting policy must be reviewed separately.

## Assets, source hygiene and publication

Licensed ZIPs and full donor trees remain outside this Git tree. Selected Studio primitives and Radiant grid/frame/bento patterns were adapted; no demo clients, agency navigation, motion library, Sanity or donor manifests were inherited. See `docs/implementation-notes.md` and the retained license notices.

The existing portrait is a preview candidate. Eight project screenshots are missing; explicit preview placeholders preserve layout without fabricated captures. `docs/asset-manifest.md` records actual files and pending approval. Compta Pro captures must come from an approved isolated synthetic demo, never real financial storage.

Approved asset slots in `docs/release-status.json` bind through typed project keys to the real cards and case pages. Approval evidence, a safe image path, alternative text and dimensions are required, or an explicitly approved truthful text alternative. The existing portrait has a statically imported source; other approved images belong in `public/images/`. Do not store private data or licensed archives there.

Both legal routes are explicitly non-final. Owner-approved final sections belong in `docs/legal-content.json`; no legal identity or provider fact is inferred. The public build gate checks the ledger and document data, and `check:release` checks their actual rendered output. Run it after the intended final build. Missing, mismatched or draft-rendering assets/documents fail the gate. Noindex is not access control. Before any separately authorized remote preview, configure real access protection. A provider's production alias is not permission to publish. Follow the release checklist before domains, remote resources or real email are touched.
