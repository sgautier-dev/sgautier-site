# Smoother reveal motion

The attached owner instructions were read completely before edits. This pass starts from local `main` at `a985433460fc0c8267a8e657ea1814cd7ce12358`. It retains the V2.1 block map, all thirteen pages, content and publication safeguards. No new animation target or dependency is added.

## Confirmed cause

V2.1's SSR markup was visible at opacity 1. When IntersectionObserver fired, `element.animate()` installed opacity 0 as the first keyframe. The `backwards` fill also applied that zero opacity during each stagger delay. The negative 48px bottom margin triggered after the block had already entered the screen. Content therefore went from visible, to invisible, to visible again. Extending the duration alone would preserve this discontinuity.

This was reproduced on the actual V2.1 production build before changes. `artifacts/motion-tuning/before/opacity-audit.json` records opacity immediately before and after the native animate call, plus subsequent animation-frame samples. The hero diagram, Problems heading/rows, service cards, featured project and method intro/steps all recorded **1 → 0** immediately. Hero copy stayed at 1.

## Final behavior

All reveal blocks now use **transform-only** motion. Text, headings, cards, portraits, diagrams, forms, PageIntro and ArticleSections retain opacity 1 before, during and after enhancement. No light-fade variant is retained: it would still lower opacity on already rendered content. No hidden SSR class, pre-hydration script, new observer architecture or motion dependency is introduced.

| Parameter | Final setting |
| --- | --- |
| Ordinary block | Y 16px → 0, 750ms, one iteration |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Related items | 140ms increments; maximum delay 420ms; four-item sequence 1170ms |
| Paired columns | Second block delayed 140ms |
| Observer | Bottom root margin +48px, threshold 0; modest anticipation of viewport entry |
| Hero copy | Y 8px → 0, 550ms, no delay or viewport wait |
| Hero diagram | Y 16px → 0, 750ms, 140ms delay |
| Workflow signal | Existing teal signal, 1.8s once, beginning 80ms after diagram completion |

The hero signal consequently starts approximately 970ms after the diagram enters the observer's trigger region, plus browser scheduling; it does not run while that diagram is settling. The H1 is always fully readable. Reduced motion and absent JavaScript remain static. Focused blocks and direct anchor targets keep the immediate final-state behavior. DOM/tab order, static breadcrumbs/footer, fixed panel backgrounds and unsplit form fields are unchanged. Internal article sections retain a single, quiet movement with no paragraph-level effects or stagger.

## Verification approach

The browser audit captures opacity before `animate()`, immediately after it and on every animation frame. It verifies unchanged opacity, actual elapsed durations, intermediate translation and sampled stagger starts. A separate test positions a service card 24px below the viewport, confirms that the observer starts it there, then scrolls it into view while it is still moving. Once-only behavior, client navigation, hero sequencing, focus, anchors, no-JavaScript and reduced motion remain covered.

For visual inspection, `motion-frames.spec.ts` seeks and pauses the actual native animations at 0, 300 and 1200ms. These controlled stills cover Hero, Problems, Services, Projects, Method and an internal service at 1440 and 390px. They are explicitly separate from the unpaused frame/time measurements. Full-page and section captures in normal/reduced motion remain available. All evidence is local and ignored by Git under `artifacts/motion-tuning/`.

See `verification-report.md` for executed results and Lighthouse comparisons against the archived V2.1 production measurements. Source changes are limited to the controller, existing delay attributes, browser tests and documentation.

## Git and publication

The owner now authorizes one coherent commit after passing the requested checks, then an ordinary fast-forward push to the verified `sgautier-dev/sgautier-site` origin. Fresh remote ancestry must be checked before push; remote divergence or unseen commits require stopping without rewriting history. This policy is recorded outside the generated Next block in `AGENTS.md`. The actual Git synchronization outcome is reported in the handoff and local `artifacts/motion-tuning/git-sync.log`.

The pre-existing generated `next-env.d.ts` change is preserved outside the commit. Approval/legal files and provider configuration are unchanged. GitHub synchronization does not authorize deployment, domain changes or real email. Website publication remains blocked by the owner inputs listed in `release-checklist.md`.
