# V2 refinement record

The complete V2 refinement brief was read before edits. It overrides conflicting instructions in the original master brief, which was also read in full. This pass preserves the thirteen routes, project status restrictions, contact stack, preview safeguards and local-only scope.

The starting commit is `b1a8cd3`. A pre-existing generated `next-env.d.ts` development-path change is preserved outside refinement commits. An owner-configured remote exists; this pass does not use it.

## Batch 1 — Navigation and readable interfaces

Implemented ordinary native disclosure navigation with separate Services destination, keyboard dismissal and no-JavaScript fallback; one mobile contact entry; general footer links; shared external link semantics; the requested contact label and helper. Meaningful small text is at least 12px at the default root size and uses rem units. The hero stacks at 1100px. A single document scroll offset replaces doubled anchor spacing. Decorative interface microcopy is replaced with simple shapes.

Initial browser checks found placeholder aspect-ratio overflow, enlarged-text grid overflow and contact anchor drift during query-context hydration. These were corrected. The anchor check allows a 0–48px gap below the header, including local-font settling.

Validation: `npm run check` passed (51 unit tests), production build passed, 30 browser checks passed in the full run; the remaining anchor assertion passed on its focused rerun after correcting its unnecessarily narrow upper bound. Desktop and mobile menu captures were visually inspected.

Evidence directory: `artifacts/v2/batch-1/` (local, ignored).

## Remaining batches

2. Finite hero signal, hover/focus feedback and decision-before-action automation diagram.
3. Terracotta human accents and related favicon.
4. Concise service and case-study copy preserving scope and status.
5. Approved-asset rendering, rendered release checks, isolated public-mode regression and stronger text-resize verification.

Publication remains blocked by owner-approved assets, legal facts, provider configuration and required manual release checks. Preview readiness is not publication authorization.
