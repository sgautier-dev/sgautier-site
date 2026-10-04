# V2 refinement record

The complete V2 refinement brief was read before edits. It overrides conflicting instructions in the original master brief, which was also read in full. This pass preserves the thirteen routes, project status restrictions, contact stack, preview safeguards and local-only scope.

The starting commit is `b1a8cd3`. A pre-existing generated `next-env.d.ts` development-path change is preserved outside refinement commits. An owner-configured remote exists; this pass does not use it.

## Batch 1 — Navigation and readable interfaces

Implemented ordinary native disclosure navigation with separate Services destination, keyboard dismissal and no-JavaScript fallback; one mobile contact entry; general footer links; shared external link semantics; the requested contact label and helper. Meaningful small text is at least 12px at the default root size and uses rem units. The hero stacks at 1100px. A single document scroll offset replaces doubled anchor spacing. Decorative interface microcopy is replaced with simple shapes.

Initial browser checks found placeholder aspect-ratio overflow, enlarged-text grid overflow and contact anchor drift during query-context hydration. These were corrected. The anchor check allows a 0–48px gap below the header, including local-font settling.

Validation: `npm run check` passed (51 unit tests), production build passed, 30 browser checks passed in the full run; the remaining anchor assertion passed on its focused rerun after correcting its unnecessarily narrow upper bound. Desktop and mobile menu captures were visually inspected.

Evidence directory: `artifacts/v2/batch-1/` (local, ignored).

## Batch 2 — Diagrams and finite motion

A decorative CSS/SVG signal crosses the hero once in 1.8 seconds and disappears. Content remains server-rendered and visible throughout. Reduced-motion removes animation and arrow transforms; keyboard focus receives the same small arrow feedback as hover. The automation diagram now branches from Condition into Action or Human validation then Action. ADF retains separate API-read and webhook-revalidation diagrams.

Validation: static checks and 51 unit tests passed; build passed; all 34 browser tests passed, including normal/reduced motion, no-JavaScript, branch order and responsive axe checks. Hero final-state and branch captures were inspected. Evidence: `artifacts/v2/batch-2/`.

## Remaining batches

## Batch 3 — Human accents and favicon

Terracotta `#A9523B` and pale `#F3E5DE` replace amber for human validation and selected contact actions; tool connections remain teal. The portrait receives a small warm edge. The favicon now echoes the header's lowercase sg monogram, with an ivory mark and warm dot on teal.

Validation: check (51 unit tests), production build and all 34 browser tests passed. Axe checks include the changed light/dark sections. Calculated text contrasts: contact 5.31:1, hover 7.05:1, human validation 5.49:1. The hero capture was inspected. Evidence: `artifacts/v2/batch-3/`.

## Batch 4 — Editorial refinement

Updated the Problems heading and adopted the requested Compta Pro title and teaser verbatim. Shortened service and case-study paragraphs, removed internal audit rhetoric, and reserved the diagnostic maxim for the home diagnostic section. Existing section structure, testimonials and project restrictions remain. Compta Pro remains a personal local pilot with a future second-user adaptation; ADF separates API reading from webhook revalidation; Holistis describes the delivered draft-generation integration without claiming current activation.

Validation: check (51 unit tests), production build and all 35 browser tests passed. New browser assertions cover revised copy and retained boundaries. The Compta Pro desktop case capture was inspected. Evidence: `artifacts/v2/batch-4/`.

5. Approved-asset rendering, rendered release checks, isolated public-mode regression and stronger text-resize verification.

Publication remains blocked by owner-approved assets, legal facts, provider configuration and required manual release checks. Preview readiness is not publication authorization.
