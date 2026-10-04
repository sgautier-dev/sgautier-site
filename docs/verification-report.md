# Verification report — smoother motion

Execution date: 2026-10-04. Starting point: local `main` at `a985433460fc0c8267a8e657ea1814cd7ce12358`. Environment: macOS, Node 24.20.0, npm 11.19.0, Next 16.3.8, Playwright 1.63.0, headless Chrome 157. This section supersedes the historical results below. **Local preview validated; website publication remains blocked.**

## Executed verification

| Command | Actual result | Evidence under `artifacts/motion-tuning/` |
| --- | --- | --- |
| `npm run check` | PASS: ESLint, strict TypeScript and 64 tests in six files | `check.log` |
| `npm run build` | PASS; all thirteen page routes remain prerendered | `build.log` |
| `EVIDENCE_DIRECTORY=artifacts/motion-tuning/screenshots npm run test:e2e` | PASS: 51/51, zero skipped, retried or flaky tests, 270.9s | `browser.log`, `browser-results.json` |
| `npm run measure` | PASS: twelve new Lighthouse runs, three per route | `lighthouse.log`, `lighthouse/` |
| `git diff --check` | PASS | Local diff review |

The original flash was reproduced before changing the controller: SSR opacity was 1 immediately before the native animate call and 0 immediately afterward on the diagram, headings, cards and method blocks. The first opacity keyframe and backwards fill hid already visible content during the stagger. The old negative observer margin also started the reveal after viewport entry. See `before/opacity-audit.json`.

The final controller retains opacity 1 on every reveal block. Ordinary blocks move 16px over 750ms; related delays are 0/140/280/420ms. Hero copy moves 8px over 550ms without a delay. The observer starts up to 48px below the viewport. All headings, text, cards, diagrams and internal ArticleSections use transform-only motion; no light-fade variant remains. No dependency or additional target was introduced.

The unpaused browser audit recorded **120 block instances across ten audit files and 5,894 animation-frame samples, with zero opacity deviations**. These are repeated instances across scenarios, not 120 distinct site blocks. Measured completion times for the four Problems cards were approximately 774/921/1054/1204ms including stagger; sampled start intervals were 163/134/151ms, consistent with the configured 140ms and animation-frame scheduling. Tests assert actual duration, intermediate translation and stagger rather than only final visibility. Another test confirms a card starts 24px below the viewport and is still moving when scrolled into view. The single 1.8s hero signal still starts after diagram completion, with its existing 80ms delay.

Once-only behavior, reduced motion (including a preference change during animation), no-JavaScript visibility, missing observer support, client navigation, focus and direct anchors pass. All thirteen routes retain the same reveal map, without nested targets or breadcrumb/footer/field animation. Existing keyboard, contact validation and field retention, project restrictions, seven responsive widths and 200% CSS text-enlargement tests pass. Axe scans six representative routes at 390 and 1440px plus contact errors with zero violations. No real email was sent.

## Lighthouse comparison with V2.1

The before column uses the **archived V2.1 production reports**, copied to `before/lighthouse/`; these were not rerun in this pass. The after column contains twelve newly executed runs. Both use Lighthouse 13.5.0 mobile simulated throttling, 412 × 823 at DPR 1.75, 4× CPU slowdown, RTT 150ms and 1,638.4 Kbps throughput. Values are medians of three runs per route; settings and raw HTML/JSON reports are retained.

| Route | Performance before → after | LCP before → after | TBT before → after | CLS before → after | Transferred JS before → after |
| --- | --- | --- | --- | --- | --- |
| `/` | 95 → 95 | 2860.21 → 2859.48ms | 107 → 104ms | 0 → 0 | 153,263 → 153,244 bytes |
| `/services/integration-outils-api` | 96 → 96 | 2708.16 → 2708.67ms | 106 → 108ms | 0 → 0 | 153,263 → 153,244 bytes |
| `/realisations/compta-pro` | 96 → 95 | 2707.53 → 2707.61ms | 103.5 → 110.5ms | 0 → 0 | 159,467 → 159,448 bytes |
| `/contact` | 96 → 96 | 2707.42 → 2706.56ms | 104 → 99ms | 0 → 0 | 158,299 → 158,280 bytes |

Accessibility and best practices remain 100 on every run; CLS remains 0. Home JavaScript is 19 transferred bytes smaller. Compta Pro's performance median falls one point, with TBT 7ms higher and effectively unchanged LCP; this small local variation does not establish a production regression or improvement. SEO remains 69/66 because preview noindex is retained: `is-crawlable` is the only failed SEO audit in all twelve reports. **The existing 2.5s LCP target remains unmet.** These are local lab measurements, not field Core Web Vitals.

## Visual evidence and remaining limits

`screenshots/frames-*.png` contains 36 controlled stills: Hero, Problems, Services, Projects, Method and an internal service section, at 1440/390px and 0/300/1200ms. Actual native animations are paused and sought for these captures; they establish readable initial/intermediate/final appearance, not real-time pacing. Separate unpaused JSON audits establish timing and opacity continuity. Representative initial, intermediate and final captures were visually inspected across all six scenes. Normal/reduced full pages and section crops remain available; 42 current route/width captures are in `responsive/`. That copied directory also contains fourteen historical `early-*`, `review-*` and `final-*` files; those are not new evidence for this pass. `opacity-summary.json` summarizes the frame audit.

Approval/legal files retain their before-snapshot hashes. The owner's pre-existing `next-env.d.ts` modification is restored and excluded from the commit. The owner's new instruction permits a single coherent commit and an ordinary push only after checking the verified origin and fresh remote ancestry. The actual synchronization result is recorded in local `git-sync.log` and the handoff. No deployment, domain action, provider change, real email, financial-data access or old/client repository modification is part of this pass.

Native browser zoom, screen readers, Safari/Firefox and real provider receipt were NOT RUN. Release-gate, synthetic final-content and dependency audit checks were not rerun in this pass; their dated evidence remains below. Publication approvals remain unchanged, and missing assets/legal/provider inputs remain blockers. See `motion-tuning.md`, `implementation-state.md` and `release-checklist.md`.

---

# Previous verification report — V2.1 motion

Execution date: 2026-10-04. Starting point: `main` at `8090c60fae4142b59814dbbcbe4eddb36ea64cab`. Environment: macOS, Node 24.20.0, npm 11.19.0, Next 16.3.8, Playwright 1.63.0, headless Chrome 157. This section supersedes the historical results below. **Local preview validated; publication remains blocked.**

## Executed verification

| Command | Actual result | Evidence under `artifacts/v2-1/` |
| --- | --- | --- |
| `npm run check` | PASS: ESLint, strict TypeScript and 64 tests in six files | `check.log` |
| `npm run build` | PASS; all thirteen page routes remain prerendered | `build.log` |
| `EVIDENCE_DIRECTORY=artifacts/v2-1/screenshots npm run test:e2e` | PASS: 48/48, zero skipped, retried or flaky tests, 153.5s | `browser.log`, `browser-results.json` |
| `npm run test:e2e -- tests/browser/reveal.spec.ts --grep 'hero copy stays opaque'` | PASS: 2/2 after changing only the hero screenshot crop to avoid sticky-header overlap | `browser-hero-final.log` |
| `npm run measure` before implementation | PASS: all twelve Lighthouse runs against the V2 production preview | `before/lighthouse.log`, `before/lighthouse/` |
| `npm run measure` after implementation | PASS: all twelve Lighthouse runs against the final production preview | `lighthouse.log`, `lighthouse/` |
| `npm run check:release` | Expected rejection, exit 1; 93 rendered/preflight findings, unchanged from V2 | `release-check.log` |

Browser tests observe real Web Animations and CSS animation events. They verify finite 500ms entrances, ordered 0/100/200/300ms delays, a single trigger after repeated scrolling, final opacity 1 / transform none and released animation effects. Home copy has transform-only keyframes for 220ms. At desktop and mobile widths the one-iteration signal starts 60–250ms after the diagram's recorded finish event, consistent with its configured 80ms delay. Reduced motion disables effects and cancels active ones. No-JavaScript content and internal navigation remain visible. Client navigation is verified without a document reload and the new page animates once. Missing observer support leaves the static site visible. Focus and deep-link targets have immediate-visibility checks.

All thirteen routes are checked for nested reveal markers and unintended breadcrumb/footer/field markers. Existing keyboard navigation, credential-free contact validation/field retention, API/webhook distinction, automation branch order, redirects, metadata, project restrictions and responsive layouts pass. Axe scans six representative routes at 390 and 1440px plus contact errors, with zero violations. Seven responsive widths (320–1440px) and 200% CSS text enlargement remain covered.

The first full run reported 46 passes and one anchor failure: an entrance transform moved `/a-propos#outils` beyond the established 48px header-gap limit. Direct anchor targets now skip entrances; the assertion was not relaxed. The subsequent full run passed all 48 tests, including a new direct-anchor/focus check. Failed logs and trace remain in `browser-first.log` and `first-run-failures/`; they are not counted as success.

## Fresh before/after Lighthouse medians

Three mobile runs per route, Lighthouse 13.5.0, simulated throttling, 412 × 823 viewport at DPR 1.75, 4× CPU slowdown, RTT 150ms and 1,638.4 Kbps throughput. Exact configuration and raw HTML/JSON reports are retained in both measurement directories. These are local lab measurements, not field Core Web Vitals.

| Route | Performance before → after | LCP before → after | TBT before → after | CLS before → after | Transferred JS before → after |
| --- | --- | --- | --- | --- | --- |
| `/` | 95 → 95 | 2863.22 → 2860.21ms | 105 → 107ms | 0 → 0 | 152,544 → 153,263 bytes |
| `/services/integration-outils-api` | 96 → 96 | 2707.93 → 2708.16ms | 99 → 106ms | 0 → 0 | 152,544 → 153,263 bytes |
| `/realisations/compta-pro` | 96 → 96 | 2707.23 → 2707.53ms | 107 → 103.5ms | 0 → 0 | 158,748 → 159,467 bytes |
| `/contact` | 96 → 96 | 2709.63 → 2707.42ms | 101 → 104ms | 0 → 0 | 157,601 → 158,299 bytes |

Accessibility and best-practices medians remain 100 on all four routes. SEO remains 69 on home and 66 on the other routes; the inspected reports' only failed SEO audit is `is-crawlable`, required by preview noindex. Home JavaScript increases by **719 transferred bytes (0.47%)**; total resources increase from 328,197 to 329,575 bytes. No dependency was added. There is no meaningful measured LCP regression. The fresh baseline home score was 95, versus 94 in the historical V2 report; comparisons above use fresh measurements. The absolute 2.5s LCP target remains unmet and requires review with final assets and hosting.

## Visual evidence and remaining limits

`artifacts/v2-1/screenshots/` contains home at 1440/390px in normal and reduced motion; hero during/after; Problems, Services, Method, About, Contact and the combined About/contact transition; the integration service and Compta Pro case at both widths in both modes. Normal/reduced captures were visually inspected. Section crops use document coordinates to avoid sticky-header overlap. Files named `hero-*-paused-at-300ms.png` deliberately pause the actual diagram animation for a reproducible still; separate tests measure unpaused sequencing. Forty-two responsive page captures are in `responsive/`. Long full-page mobile images have section crops for readable detail.

Approval and legal-content hashes remain identical to the before snapshot. Missing owner-approved media, legal facts, provider configuration/real receipt authorization, final hosting/domain and owner sign-off remain blockers. The pre-existing generated `next-env.d.ts` change is retained outside the commit. No push, remote resource, deployment, domain action, real email, financial-data access or old/client repository change occurred.

Native browser zoom, screen readers, Safari/Firefox, real provider receipt and hosted-domain checks were NOT RUN. The isolated synthetic final-content test and dependency audits were not rerun in this motion-only pass; their dated V2 evidence remains below. See `refinement-v2-1-motion.md` for implementation, timing, reveal map and files; `release-checklist.md` retains the owner-controlled gates. Preview readiness does not authorize publication.

---

# Previous verification report — V2

Execution date: 2026-10-04. Environment: macOS, Node 24.20.0, npm 11.19.0, Next 16.3.8 and installed headless Google Chrome. This section supersedes the initial implementation results retained below. **Local preview validated; publication blocked.**

## Final executed verification

| Command | Actual result | Evidence under `artifacts/v2/batch-5/` |
| --- | --- | --- |
| `npm ci` | PASS, exit 0; 587 packages installed from the unchanged lockfile | `npm-ci.log` |
| `npm run check` | PASS: lint, strict types, 64 tests in six files | `check.log` |
| `npm run build` | PASS; all 13 page routes prerendered | `build.log` |
| `npm run test:e2e` | PASS: 36/36, no retries or skipped tests | `browser.log` |
| `npm run test:public-mode` | PASS: 13 actual Next routes, 16 loaded image instances, no external browser requests, contact disabled, real ledger unchanged | `public-mode.log`, `public-mode/summary.json`, `public-mode/rendered-gate.log` |
| `npm run measure` | PASS: all twelve Lighthouse runs completed | `lighthouse.log`, `lighthouse/summary.json` |
| `npm run check:release` | Expected rejection, exit 1; 93 rendered/preflight findings on the real preview | `release-check.log` |
| `SITE_RELEASE=approved npm run build` | Expected rejection before compilation; 47 preflight conditions | `public-build-gate.log` |

The real approvals remain false. The 93 findings include repeated missing-media and preview-policy findings across routes; they are not 93 separate owner tasks. The synthetic final-content test does not approve any real asset, legal statement, provider configuration or publication.

The enlarged-text test verifies actual doubled font sizes, unclipped text ranges, retained form values, focused errors and usable mobile navigation. Both no-JavaScript disclosures, ordinary desktop navigation, external-link announcements, anchor lower/upper bounds, normal finite motion, reduced motion, exact revised copy and project restrictions are covered. Responsive coverage remains 320, 375, 390, 430, 768, 1024 and 1440px. Axe scans the six representative routes at 390 and 1440px plus contact errors; no violations were reported in the executed scans.

During V2 verification, tests caught narrow-layout overflow, contact-anchor hydration drift and an over-broad draft phrase matcher; all were corrected and rerun. The asynchronous form-reset test now waits for the real success callback. A resize test was scoped to the form's error alert rather than Next's separate route announcer. No failed execution is counted as a success.

## Lighthouse mobile medians (three runs each)

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 94 | 100 | 100 | 69 | 2.86s | 0 | 110.0ms |
| `/services/integration-outils-api` | 96 | 100 | 100 | 66 | 2.71s | 0 | 108.0ms |
| `/realisations/compta-pro` | 96 | 100 | 100 | 66 | 2.71s | 0 | 103.5ms |
| `/contact` | 95 | 100 | 100 | 66 | 2.71s | 0 | 114.0ms |

The only failed SEO audit in each inspected report is `is-crawlable`, expected because the real preview remains noindex. Do not remove preview protection to improve this score. Compared with the retained initial reports, transferred JavaScript is essentially unchanged (home 152,548 → 152,544 bytes); LCP is within approximately 5ms of the baseline medians. Home/contact performance medians are one point lower. These are local simulated lab results, not field measurements or proof of production performance. **The 2.5s LCP target remains unmet** and must be reviewed with final approved assets and hosting.

## Captures and publication limits

Final preview evidence includes `home-390.png`, `home-1440.png`, `desktop-submenu.png`, `mobile-menu.png`, `hero-normal-final.png`, `automation-branches.png`, service/case/contact captures at 390 and 1440px in `artifacts/v2/batch-5/`. All 42 responsive full-page captures remain in `artifacts/screenshots/`; a copy is preserved under `batch-5/responsive/`. Synthetic final-mode captures are separately labeled under `batch-5/public-mode/`. The final legal fixture, menus, hero and case layout were visually inspected.

Native browser zoom, VoiceOver/NVDA, Safari and Firefox were NOT RUN. Actual provider behavior with credentials and inbox receipt were NOT RUN. No deployment, push, domain action, real email or financial-data access occurred. npm ci still reports five high-severity development-tool findings and deprecated ESLint; dependency/runtime review remains a release gate. The initial production-only audit below is historical, not a new V2 audit.

See `refinement-v2.md` for commits and decisions, and `release-checklist.md` for required approvals and release steps. A runnable local preview does not authorize publication.

---

# Initial implementation evidence

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
