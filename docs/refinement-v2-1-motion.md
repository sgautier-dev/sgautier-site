# V2.1 motion refinement

The complete `codex-refinement-v2.1-motion.md` was explicitly read before edits. Starting branch: `main`, commit `8090c60fae4142b59814dbbcbe4eddb36ea64cab`. The master brief and V2 remain historical context; this pass changes only motion and the specified home contact heading. The pre-existing generated `next-env.d.ts` development-path change is preserved outside the commit.

## Implementation

The licensed Studio TypeScript `FadeIn` source was read directly from `../references/studio.zip`, outside the Git tree. Only its behavior informs this implementation. No archive or full template was extracted into the project; no dependency was added.

One null-rendering `RevealController` client island observes semantic Server Component markup marked with `data-reveal`. Native Web Animations apply transient keyframes only when a block enters the viewport. SSR/CSS never hides reveal content. Completed animations are canceled to release their effects; a WeakSet prevents replay on the same DOM node. Each observer target is removed after entry. Pathname changes clean up observers/listeners/animations and register the next page's elements. No MutationObserver, pre-hydration class or persistent inline opacity is used.

Reduced motion starts with no controller animation. Changing to reduced motion cancels active effects and prevents replay when the preference is restored. Missing native animation APIs leave the static site visible. Keyboard focus finishes a block immediately; a directly targeted anchor skips its entrance to preserve navigation position. Neither semantic nor tab order changes.

| Motion | Parameters |
| --- | --- |
| Ordinary block | Opacity 0 to 1; Y 24px to 0; 500ms; `cubic-bezier(0.22, 1, 0.36, 1)`; one iteration |
| Viewport entry | IntersectionObserver root margin `0px 0px -48px 0px`, threshold 0 |
| Related siblings | 100ms increments; largest delay 300ms; longest four-item sequence 800ms |
| Home hero copy | Transform only, Y 8px to 0 in 220ms, no delay and no viewport wait; opacity always 1 |
| Hero diagram | Ordinary reveal with 100ms delay |
| Hero signal | Existing teal SVG/CSS pass, 1.8s linear once; starts 80ms after diagram completion, including a below-fold mobile diagram |
| Arrow feedback | Existing 3px movement, 160ms; unchanged |

The signal now depends on successful enhancement. Without JavaScript or with reduced motion, the complete diagram remains static and readable. This avoids consuming the signal before a below-fold diagram appears.

## Reveal map

| Area | Animated units |
| --- | --- |
| Home hero | Copy and diagram as separate blocks |
| Problems | Combined heading/lead, then four rows at 0/100/200/300ms |
| Services | Intro; three complete cards at 0/100/200ms |
| Featured projects | Intro; three complete project cards at 0/100/200ms |
| Method | Combined intro; four steps at 0/100/200/300ms |
| Diagnostic | Left column at 0ms, right at 100ms |
| Testimonials | Intro; three quotes at 0/100/200ms |
| About preview | Portrait at 0ms, copy at 100ms |
| Home contact | Copy at 0ms, complete form at 100ms |
| Internal pages | PageIntro and each ArticleSection as a block; closing CTA |
| Cases | Main visual, process diagram and technology stack additionally reveal separately |
| Project collection | Complete project cards; secondary projects have no stagger |
| About | Portrait additionally reveals |
| Contact page | Complete form at 0ms and sidebar at 100ms |
| Legal/privacy | PageIntro and document sections, no stagger |

Problems note, method signature, dark panel backgrounds, breadcrumbs, footer and individual form fields deliberately remain static. No nested reveal units exist on any of the thirteen routes. The sole copy change broadens the home contact heading to “Qu’aimeriez-vous créer, connecter ou automatiser ?”. The form label and V2 project restrictions remain intact.

## Changed files

- `src/components/motion/RevealController.tsx`: the only new application module; registered in `src/app/layout.tsx`.
- `src/components/home/Foundation.tsx` and `Sections.tsx`: home reveal map and contact heading.
- `src/components/ui/Primitives.tsx`, `Article.tsx`, `Portrait.tsx`, `ApprovedVisual.tsx`, and `src/components/projects/ProjectCard.tsx`: shared block markers, optional intro/portrait markers and card delays.
- `src/components/diagrams/Workflow.tsx` and `src/styles/tailwind.css`: diagram marker and signal sequencing; existing diagram contents and arrow behavior retained.
- `src/app/contact/page.tsx`, `src/app/realisations/page.tsx` and the three case `page.tsx` files: form/sidebar, project collection and case visual/flow/stack markers.
- `tests/browser/reveal.spec.ts`: motion, navigation, fallback, focus and visual evidence; `motion.spec.ts` waits for the sequenced signal; `site.spec.ts` checks the thirteen routes for nested or inappropriate markers.
- README, implementation notes/state, verification report, release checklist and this record: current behavior, evidence and remaining owner gates. No approval data is edited.

## Evidence

Fresh before measurements are preserved under `artifacts/v2-1/before/`, including all twelve Lighthouse reports and configuration. Final checks, measurements and captures are recorded in `verification-report.md`. Normal-speed behavioral tests are separate from still-image evidence; files named `paused-at-300ms` deliberately freeze the diagram's real animation for visual inspection and are not timing measurements.

The first browser run caught a transient anchor gap of 49.83px against the existing 48px upper bound. Direct anchor targets now skip entrance motion; the original bound is unchanged. The failed run is retained under `artifacts/v2-1/first-run-failures/` and `browser-first.log`.

No publication approval, legal document, provider configuration, dependency lockfile, client repository or old portfolio is changed. Publication remains blocked; see `release-checklist.md`. No push, deployment, domain action or real email is authorized by this pass.
