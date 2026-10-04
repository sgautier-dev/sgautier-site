# Reveal motion presence

This pass starts from local `main` at `30f41cc5d660843acfe296667738eb6ac664026d`. The owner requested greater motion amplitude and a slightly quicker tempo while preserving the V2.1.1 transform-only fix. The same IntersectionObserver/Web Animations controller, reveal targets, section order, content, navigation and design system remain in place. No dependency is added.

## Parameters

| Area | Translation | Duration | Delay |
| --- | --- | --- | --- |
| Text, headings, section introductions, method steps, quotes, form wrappers, ArticleSections | 24px → 0 | 650ms | Existing groups use 120ms increments |
| Problems cards, service/project cards, secondary projects, portrait, case hero/flow visuals | 28px → 0 | 650ms | Existing groups use 120ms increments |
| Hero copy | 12px → 0 | 500ms | None; does not wait for the observer |
| Hero diagram | 24px → 0 | 650ms | 120ms |

Maximum stagger is 360ms; a four-item sequence finishes in 1010ms instead of 1170ms. The easing remains `cubic-bezier(0.22, 1, 0.36, 1)`, with one iteration and an unchanged +48px bottom observer margin. The workflow signal still plays once for 1.8s, starting 80ms after the diagram completes (approximately 850ms after its observer trigger, subject to browser scheduling).

Every reveal remains fully opaque. **No scale is used anywhere**, including cards and visuals: translation supplies the requested presence while keeping their embedded text, lines and controls at a constant size. Existing visual targets are identified with `data-reveal="visual"`; this only selects a larger translation and does not create new targets. The hero diagram retains its distinct marker and 24px amplitude.

No-JavaScript content remains visible, reduced motion remains static, and focused/anchored blocks immediately use their final state. The observer, once-only bookkeeping, route registration, cleanup and signal sequencing are unchanged.

## Comparison and evidence

Before changing production parameters, the existing production build was captured with the same eight scenes at 1440 and 390px: Hero, Problems, Services, Projects, Method, About, Contact and an internal service. The initial, 100ms, 300ms and 1200ms states use paused native animations for a reproducible comparison. Actual elapsed durations, stagger and opacity are measured separately by the unpaused browser tests. These captures are evidence of frame appearance, not a video or a real-time viewing claim.

The eight desktop scenes were compared at 100ms, with additional initial/intermediate/final desktop states and Hero/About/Contact mobile comparisons. At 100ms, an undelayed section has traveled 13.55px instead of 8.11px; an undelayed visual has traveled 15.80px instead of 8.11px. This makes the start more distinct while the same easing settles it quickly. Details of the inspected images are in `visual-review.md` and displacement comparisons in `frame-comparison.json` under the evidence directory.

The browser tests also verify initial translation and unit scale from native keyframes, plus unit scale in intermediate rendered frames. Existing accessibility, no-JavaScript, reduced-motion, focus, anchors and client-navigation checks are retained. A source comparison confirms that outside the controller, only existing reveal variant/delay attributes changed in application code. No publication approval, legal content, provider configuration, CSS or dependency file changed.

Evidence lives in ignored `artifacts/motion-presence/`; `before/screenshots/` contains fresh baseline captures and `before/lighthouse/` contains the archived V2.1.1 reports. See `verification-report.md` for final executed checks and new performance measurements. The in-app browser was unavailable; visual review uses the project's existing Playwright production captures.

## Git and publication

After every requested check passes, create one commit named `Increase reveal motion presence`, verify origin, fetch remote main and require it to be the direct parent of the local commit before an ordinary fast-forward push. Never force or rewrite history. The actual commit and remote SHA verification are recorded in local `git-sync.log` and the handoff.

The owner's pre-existing generated `next-env.d.ts` modification stays outside the commit. Publication approvals remain unchanged. A GitHub push does not authorize deployment, domain changes or real email; owner-controlled release blockers remain in `release-checklist.md`.
