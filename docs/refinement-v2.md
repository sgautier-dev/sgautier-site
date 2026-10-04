# V2 refinement record

The complete V2 brief was read before edits. It overrides conflicting instructions in the original master brief, which was also read in full. This pass preserves the thirteen routes, project delivery/pilot restrictions, testimonials, contact stack and local-only scope.

Starting commit: `b1a8cd3`. The pre-existing generated `next-env.d.ts` development-path change is preserved outside refinement commits. An owner-configured remote exists; this pass does not use it. No client repository, old portfolio, real financial storage or provider account was modified.

| Batch | Local commit | Validated work |
| --- | --- | --- |
| 1 | `ed9f766` | Navigation, readable labels, link semantics and anchor offsets |
| 2 | `5688b96` | Finite hero signal, focus feedback and decision-before-action diagram |
| 3 | `93be3f6` | Terracotta human accents and related sg favicon |
| 4 | `0f662ee` | Service and case-study editorial refinement |
| 5 | Commit containing this record | Rendered publication gates, real asset bindings and stronger verification |

## Batch 1 — Navigation and readable interfaces

Ordinary native disclosures provide a separate Services destination, three service links, keyboard dismissal and no-JavaScript fallback. Mobile has one contact entry; the footer restores general links. `ExternalLink` supplies a new-tab announcement, arrow and `noopener`, without changing mailto/internal links or adding guessed destinations. The contact label and helper match V2.

Meaningful small text is at least 12px at the default root size and uses rem units. The hero stacks at 1100px. A single document scroll offset replaces doubled spacing. Decorative interface microcopy is replaced with simple shapes. Native details remain usable before hydration. Contact query context reserves space to avoid shifting the anchor during hydration.

Validation: lint/typecheck and 51 unit tests passed; production build passed. Thirty browser checks passed in the full run and the remaining anchor assertion passed on its focused rerun with a reasonable 0–48px gap below the header. Later complete suites pass all navigation checks together. Placeholder aspect-ratio overflow and enlarged-text grid overflow were found and corrected. Menu captures were inspected.

## Batch 2 — Diagrams and finite motion

A decorative CSS/SVG signal crosses the hero once in 1.8 seconds and disappears. Content is server-rendered and visible throughout. Reduced-motion removes animation and arrow transforms; keyboard focus gets the same small arrow feedback as hover. Condition branches into Action or Human validation then Action. ADF retains separate API-read and webhook-revalidation diagrams. No motion library or new runtime dependency was added.

Validation: check with 51 unit tests, build and all 34 browser tests passed. Normal/reduced motion, no-JavaScript, branch order and responsive axe scans were exercised. Hero final-state and branch captures were inspected.

## Batch 3 — Human accents and favicon

Terracotta `#A9523B` and pale `#F3E5DE` replace amber for human validation and selected contact actions; connections remain teal. The portrait has a small warm edge. The favicon echoes the lowercase sg header mark, with ivory lettering and a warm dot on teal.

Validation: check with 51 unit tests, build and all 34 browser tests passed. Text contrasts: contact 5.31:1, hover 7.05:1, human validation 5.49:1. The hero capture was inspected; axe covers changed light and dark sections.

## Batch 4 — Editorial refinement

Adopted the requested Problems heading and Compta Pro title/teaser verbatim. Shortened paragraphs and removed internal audit rhetoric while retaining the section structure, proof links, testimonials and functional limits. The diagnostic maxim remains in its home section.

Compta Pro remains a personal local pilot; Visual Budget is read-only; ambiguous decisions require validation; the second-user adaptation is future work. ADF distinguishes API reads and event-triggered revalidation, with custom events and configuration dependence. Holistis describes delivered draft-generation functionality without claiming current activation or automatic sending. No fabricated metric, certification, screenshot or client result was introduced.

Validation: check with 51 unit tests, build and all 35 browser tests passed, including exact revised copy and retained restrictions. The Compta Pro desktop case capture was inspected.

## Batch 5 — Rendered publication and accessibility checks

Typed asset keys connect all nine media slots to actual cards, case pages and portrait components. The release ledger is the single approval source; duplicated readiness booleans were removed from project records. Approved images require evidence, a supported local source, alt text and dimensions. An approved truthful text alternative is also supported. Missing approvals retain explicit preview fallbacks; approved mode fails closed.

Final legal/privacy sections are represented in `legal-content.json`, currently empty and unapproved. The actual final-document component is exercised by the isolated test. No legal facts were invented.

The configuration gate requires all known approval categories, assets, final documents and provider settings. `check:release` additionally parses all thirteen generated HTML pages, excludes inert framework scripts, detects draft markers/placeholder elements and verifies each required asset's rendered source, alt text and dimensions. Tests catch booleans without rendering, wrong sources, unsafe paths, missing descriptions, missing final legal content and visible draft text. Ordinary editorial phrases are not treated as draft instructions.

`test:public-mode` creates a disposable local project, copies no environment files or Git state, uses visibly synthetic image/legal fixtures, removes the real provider adapters, and forces contact configuration unavailable. It builds with final-content mode enabled, passes the rendered gate and checks thirteen actual Next pages in Chromium. Sixteen image instances load, no external browser requests occur, a valid form submission remains unavailable and the real ledger hash is unchanged. There is no application request/header/query bypass. The disposable copy is removed afterward.

The enlarged-text test verifies actual doubling of meaningful labels/body text, checks text ranges against viewport and clipping ancestors, and exercises the form and menu at 200%. Native browser zoom, screen readers, Safari and Firefox remain explicit manual release checks; CSS enlargement is not reported as native zoom.

Validation: `npm ci`, check with 64 unit tests, production build, all 36 preview browser tests and the isolated thirteen-page public-mode test passed. The real public build is rejected with 47 preflight conditions; the full rendered preview check reports 93 findings, including repeated asset/preview conditions across routes. These are expected publication blockers, not 93 distinct owner tasks. No real email was sent.

## Evidence and remaining publication work

Per-batch logs are in `artifacts/v2/batch-1/` through `batch-5/`. Final screenshots use the batch-5 directory; responsive full-page captures are also in `artifacts/screenshots/`. Earlier test screenshot paths were reused across early batches; preserved palette/editorial comparisons are in batches 3 and 4. Synthetic public-mode screenshots are clearly separated under `batch-5/public-mode/` and are not owner-approved site assets.

See `verification-report.md` for final measured performance and `release-checklist.md` for owner-controlled publication steps. Required inputs remain: portrait approval/replacement, eight approved project captures or truthful alternatives, legal/privacy facts, project URL/context confirmation, provider configuration and separately authorized real-mail receipt verification, dependency review, manual accessibility/browser checks, legacy URL inventory and explicit publication/cutover authorization. Preview readiness is not permission to publish.
