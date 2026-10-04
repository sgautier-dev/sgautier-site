# Verification report

Execution date: 2026-10-04. Scope: local production preview on macOS, Node 24.20.0, npm 11.19.0, Next 16.3.8. **Publication is blocked.** No remote resource, deployment, domain change, real email or financial-data access was performed.

## Executed commands

| Command | Actual result | Evidence |
| --- | --- | --- |
| `npm ci` | PASS, exit 0; 587 packages installed from the lockfile | `artifacts/npm-ci.log` |
| `npm ls --all` | PASS, exit 0; no invalid peer dependency tree | Local dependency inspection |
| `npm run check` | PASS: ESLint, strict typecheck, 51 tests in five files | `artifacts/check.log` |
| `npm run build` | PASS, exit 0; all 13 page routes statically prerendered | `artifacts/build.log` |
| `npm run test:e2e` | PASS: 26/26, zero skipped/flaky, 45.4 seconds | `artifacts/browser.log`, `artifacts/browser-results.json`, `playwright-report/index.html` |
| `npm run measure` | PASS, exit 0; 12 completed mobile Lighthouse runs, median performance 95/96/96/96, accessibility 100 | `artifacts/lighthouse.log`, `artifacts/lighthouse/summary.json` |
| `npm audit --omit=dev --json` | PASS, exit 0; zero reported production dependency vulnerabilities | Sanitized counts below; raw dependency output kept outside tracking |
| Full dependency audit / installation report | BLOCKED for release review: five high-severity development dependency entries remain | `artifacts/npm-ci.log`; private audit output is not tracked |
| `npm run check:release` | BLOCKED as intended, exit 1; 35 unresolved conditions | `artifacts/release-check.log` |
| `SITE_RELEASE=approved npm run build` | Correctly refused during configuration loading | `artifacts/public-build-gate.log` |
| `git diff --cached --check` | PASS after preserving license text while trimming one trailing space | Local staged diff review |

The restricted shell initially prevented Turbopack from opening its internal CSS-processing port. The cached error also persisted for one retry. Moving that generated cache outside the project and rerunning with local execution permission produced the successful build above. The failed logs are retained as environment evidence, not counted as successful builds. npm warned about optional native install scripts for two development tools; the actual checks and browser tests ran successfully without approving those scripts.

The installed ESLint 9 is deprecated but currently satisfies the Next lint plugins' peer ranges; ESLint 10 did not. Production dependency audit counts are info 0, low 0, moderate 0, high 0, critical 0. This is a dated registry check, not a complete security assessment. Detailed advisory information is intentionally excluded from this public-facing source tree. The development toolchain remains a release review gate.

## Contact coverage

Unit/integration tests exercise trimmed valid input, optional fields, required/email/length rejection, unsolicited recipient removal, honeypot-before-provider rejection, missing/disabled configuration, Arcjet denial/rate limit/error/throw, resolved and thrown Resend failures, null/server transport status, missing/empty acceptance IDs, genuine acceptance handling, fixed sender/recipient/reply-to, escaped HTML and sanitized errors. Blocking conditions assert that sending is not invoked; actual next-safe-action v8 parsing is used around the dependency-injected pipeline.

Interface tests use the real next-safe-action hook with an isolated mocked server action. They verify associated field errors, pending/disabled state, retained values after rejection, unknown-network wording and reset only on accepted success. Browser tests call the real credential-free server action: invalid input is rejected, valid synthetic input returns unavailable, and fields remain. No production test bypass exists and no provider network call is needed for these tests.

## Browser, visual and copy evidence

Playwright 1.63.0 with installed headless Google Chrome tested all 13 pages, unique H1/title/description, canonical origin, JSON-LD parsing/identity, noindex headers, curated anchor behavior, faithful testimonials and project status restrictions. The legacy redirects return 308 with the intended fragments; retired/unknown URLs return actual 404. Preview robots disallow crawling and the sitemap contains no URLs. Approved-mode sitemap membership is separately unit-tested for the 13 canonical pages.

The six representative layouts are home, integration service, all three cases and contact. Each was checked for horizontal overflow and captured at **320, 375, 390, 430, 768, 1024 and 1440 px**. The suite runs these checks with reduced motion. At 390 and 1440 px, axe checks WCAG 2 A/AA, 2.1 A/AA and 2.2 A/AA tags, plus the explicitly enabled label/content-name rule. The errored contact form is also scanned. Final result: zero violations in the executed scans. Automated checks do not establish complete accessibility compliance.

The strengthened name check caught an overly specific ARIA name on the home link. It was corrected to use the visible identity text and a hidden home hint; the full browser suite was rerun successfully. The earlier failure log is retained as `artifacts/browser-label-review.log`.

Keyboard checks cover the skip link, visible focus, main focus, mobile menu opening, link navigation, Escape and focus restoration. With JavaScript disabled, home content/testimonials and native navigation remain visible; contact fields are disabled and the email fallback is available. **200% text enlargement at a 640 px viewport** verifies reflow on home, contact and Compta Pro. Native browser zoom, VoiceOver/NVDA, Safari and Firefox were **NOT RUN**: this headless Chromium suite does not drive native browser UI or screen readers. Perform those manual checks before release. This report does not relabel CSS text enlargement as a native browser zoom test.

Visual inspection used actual production screenshots of the hero, asymmetric services, case diagrams, contact states, portrait candidate and responsive full pages. No clipped content or decorative horizontal overflow was found in the reviewed views. Missing customer captures and the portrait approval caption are intentional, visible preview states. The generic interface/workflow illustrations are labeled and distinct from project screenshot placeholders.

Key local files:

- `artifacts/screenshots/home-390.png`, `home-1440.png`: complete final home pages.
- `artifacts/screenshots/final-hero-390.png`, `final-hero-1440.png`: readable hero detail.
- `artifacts/screenshots/final-services-390.png`, `final-services-1440.png`: asymmetric services.
- `artifacts/screenshots/services-integration-outils-api-390.png`, `services-integration-outils-api-1440.png`.
- `artifacts/screenshots/realisations-compta-pro-390.png`, `realisations-compta-pro-1440.png`.
- `artifacts/screenshots/realisations-aqua-dance-flow-390.png`, `realisations-holistis-1440.png`.
- `artifacts/screenshots/contact-320.png`, `contact-1440.png`.

There are 42 final route/width screenshots and six additional production section captures. Files named `early-*` or `review-*` are intermediate development inspections, not the final production evidence. Screenshots and machine reports are ignored by Git.

A separate rendered-text audit compared all 108 French blockquote paragraphs from sections 7–10 of the brief against their corresponding pages. **107 match exactly after whitespace normalization.** The one documented difference changes Compta Pro's sentence about already-present demo screenshots to a requirement for future approved demo screenshots. The remainder of that paragraph stays intact. This avoids claiming nonexistent assets. H1s and testimonial text also pass browser assertions. Evidence: `artifacts/copy-audit.json`; the temporary comparison script reads the private brief outside the Git tree.

## Performance measurements

Lighthouse 13.5.0, headless Chrome 157.0.0.0, local production server `127.0.0.1:3100`. Mobile emulation: 412 × 823, device scale factor 1.75, simulated Moto G Power profile, 4× CPU slowdown, 150 ms RTT and 1638.4 Kbps throughput. Storage reset enabled. Three sequential runs per route; the table reports medians rather than the best run. Exact settings/environment are saved in `artifacts/lighthouse/settings.json`; every raw HTML/JSON report is retained.

| Page | Performance (all runs) | Median | Accessibility | Best practices | LCP | CLS | TBT | Transferred JS / total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 94, 95, 95 | 95 | 100 | 100 | 2.86 s | 0 | 99 ms | 149.0 / 316.9 KiB |
| Integration service | 96, 96, 96 | 96 | 100 | 100 | 2.71 s | 0 | 103 ms | 149.0 / 311.8 KiB |
| Compta Pro | 96, 96, 96 | 96 | 100 | 100 | 2.71 s | 0 | 96 ms | 155.0 / 319.7 KiB |
| Contact | 96, 96, 96 | 96 | 100 | 100 | 2.71 s | 0 | 101 ms | 153.9 / 310.8 KiB |

All 12 runs scored accessibility and best practices 100. SEO is intentionally 69 on home and 66 on internal pages: the only failed SEO audit is crawlability, because preview indexing remains blocked. This restriction was not removed to improve a score. One font file is requested; no third-party resource is loaded by these page views. Lazy below-fold images are not included in the initial-navigation byte totals. No field Core Web Vitals or INP result is claimed. Simulated LCP still exceeds 2.5 seconds, so verify actual hosting/network behavior and approved image weight before release despite the performance scores exceeding 90.

The first incomplete baseline remains in `artifacts/lighthouse-baseline-incomplete/` (including a cold home score of 73); it preceded the accessibility correction and removal of runtime Zod from client imports. The next complete series remains in `artifacts/lighthouse-before-font-preload/`, with median performance 87/97/95/95. Its CSS-to-font request chain and home layout cost prompted replacing the manual font-face with `next/font/local`, retaining swap/axes while adding preload and a metric-adjusted local fallback. The full check/build/browser suite and all 12 Lighthouse runs were then repeated for the actual final source. The final home median is 95 with lower observed blocking time; these local observations are not a universal causal or production-performance guarantee.

## Acceptance contract

`PASS` below means the stated local implementation/check has evidence, not that release is approved. Publication-related requirements and unavailable checks remain explicit.

| ID | Status | Evidence and remaining action |
| --- | --- | --- |
| A01 | PASS | New isolated repository; Portfolio2025 stayed clean at its recorded HEAD. No client repository was modified. |
| A02 | PASS | ZIPs/full donor trees absent from staged files; only integrated font/notices and selective adaptations are present. Full history must remain free of donor trees before any remote exposure. |
| A03 | BLOCKED | Pinned versions, clean npm ci, valid dependency tree and strict TypeScript pass. Development advisories and deprecated compatible ESLint still require a release decision/update; hosting runtime is unverified. |
| A04 | PASS | Actual server action wires next-safe-action v8, Zod, Arcjet and Resend; provider activation remains gated. |
| A05 | PASS | Route/source/dependency review confirms no portfolio blog/MDX/RSS/dark-mode/CMS/SaaS pages. |
| A06 | PASS | 13 production page routes render; both legal routes clearly carry non-final draft notices. |
| A07 | PASS | Rendered copy audit, H1 checks and editorial review; one truthful missing-capture refinement documented. |
| A08 | PASS | Light/teal design with intentional dark sections, inspected font axes, one preloaded font file with swap and production captures. |
| A09 | PASS | Server-rendered workflow, mobile simplification, no entrance-motion dependency; reduced-motion/no-JS browser evidence. |
| A10 | PASS | Problems grid and asymmetric services checked at seven widths; actual section screenshots. |
| A11 | PASS | Three featured/four secondary entries; VBM upcoming, AMA owner-reported live, other runtime claims limited. Missing AMA URL and capture context remain publication gates. |
| A12 | PASS | Personal pilot, future rollout language and synthetic-only capture policy preserved; no finance storage accessed. |
| A13 | PASS | Holistis copy/diagram end at draft preparation followed by human review/send decision; no new runtime security assertion. |
| A14 | PASS | ADF shows separate API read and webhook revalidation paths in text/diagram. |
| A15 | PASS | Boris, Amine and Pierre's full quotes and supplied attributions; exact browser assertions; no carousel. |
| A16 | PASS | Validation and blocked/provider-failure paths covered by isolated tests, with no-send invocation assertions. |
| A17 | PASS | Resend acceptance required; fields retained on error; ambiguous outcomes and timeout covered. Actual inbox delivery is NOT RUN. |
| A18 | PASS | Form labels/associated errors, focused summary, polite success, pending state and accessible email fallback tested. |
| A19 | PASS | 13-page metadata/JSON-LD browser checks; preview robots/sitemap and approved-mode membership unit checks. Final hosted domain remains unverified. |
| A20 | PASS | Four relevant 308 redirects and actual retired/unknown 404s tested. Search Console/backlink inventory is missing. |
| A21 | PASS | Local noindex headers/metadata, empty sitemap, loopback binding and documented protected-preview policy. No hosted preview exists. |
| A22 | PASS | Staged file/asset/manual review and credential-pattern scan found no secrets, financial data or demo trees. The scan is heuristic, not exhaustive. |
| A23 | PASS | 26 browser tests, axe, keyboard, reflow, no-JS and reduced-motion evidence; native zoom/assistive-technology/cross-engine checks NOT RUN. |
| A24 | PASS | Twelve final Lighthouse runs, scores/metrics/settings above, 42 route captures and visual review; LCP and manual-review limitations explicit. |
| A25 | PASS | npm ci, lint, typecheck, 51 tests, production build and 26 browser tests executed successfully; earlier failures disclosed. |
| A26 | PASS | Release ledger/checklist tracks asset, legal, provider, access, dependency, domain and owner approvals; gate correctly refuses release. |

## Remaining release work

Review `release-checklist.md` and `release-status.json`. Approve or replace the portrait; supply/approve eight truthful captures or explicit alternatives; finalize legal/privacy facts; confirm project URLs/context; assess development dependencies and deployment runtime; supply legacy SEO information; configure and verify providers only after separate authorization; run an authorized real-mail receipt test; protect any separately authorized hosted preview; verify the final canonical domain and rollback; obtain explicit publication authorization. Native browser zoom and assistive-technology/cross-engine review remain manual gates.
