# Implementation notes

Reviewed 2026-10-04. This is a local preview implementation, not a publication approval.

## Specification and evidence

The entire consolidated `codex-portfolio-master-prompt-v1.md` was explicitly read before changes. It supersedes older portfolio notes. The repository was created independently as `sgautier-site` on `main`, beneath the working directory. No remote is configured.

The actual supplied sources were found in the parent workspace's `references/` directory. ZIPs were read in place; no full template tree was extracted into this repository.

| Input | SHA-256 or source reference |
| --- | --- |
| Studio ZIP | `9ad8546273eb41709e0eb71187b70141dd3306ad86e5c886145bc9c090227f32` |
| Radiant ZIP | `5db92c0ef1a19e09f4cf1ec7a2dcc6d1013e4bde41cb24be37271e994a7057d7` |
| Existing Portfolio2025, read-only | `9b3abb6d139d7e4ced5260fdf0f5696b8594e93a` |

Studio's TypeScript manifest used Next 16.1.6, React 19.2.4, Tailwind 4.3.3 and a motion/MDX stack. Radiant's TypeScript manifest used Next 16.2.6, React 19.2.6, Tailwind 4.3.3 and a motion/Sanity stack. These manifests were inspected, not inherited. Client repositories and financial storage were not accessed. Case claims come from the consolidated brief; this work does not establish current operational status of those applications.

Portfolio2025 supplied the existing portrait candidate, testimonial text and known profile/project links. It did not contain the required case screenshots. The owner's confirmation that no new assets were approved is reflected in visible preview captions and the release ledger. HTTP 200 checks on the curated ADF, Holistis, L.FIT and Julie Gautier URLs establish reachability only, not delivered-version identity or current feature behavior. AMA's actual URL remains missing; VBM is still upcoming.

## Selective design adaptation

| Donor reference | Actual adaptation |
| --- | --- |
| Studio `Container`, `PageIntro`, `SectionIntro` | Server-rendered editorial primitives in `src/components/ui/Primitives.tsx`; new widths, tokens and hierarchy |
| Studio `Button`, `TagList` | Semantic Link/button union, explicit focus treatment and small secondary tags |
| Studio `Blockquote`, `Testimonial` | Static editorial quotes in `src/components/home/Sections.tsx`, with supplied text and attribution |
| Studio font | Integrated Mona Sans variable WOFF2 through `next/font/local`, preloaded once with `font-display: swap`; applicable SIL OFL retained |
| Radiant `plus-grid` | Bounded decorative structural edges/corners in `PlusGrid` and CSS, without viewport-width overflow |
| Radiant `screenshot` | Frame vocabulary in `ProjectVisual`; real images use `next/image`; missing captures have explicit non-public preview states |
| Radiant `bento-card` | Asymmetric service composition in `Foundation.tsx`, rendered on the server |
| Radiant `logo-timeline` | Static workflow-layout inspiration; no copied animation or branded demo logos |

The initial implementation omitted FadeIn, GridPattern and motion dependencies. V2.1 subsequently added a small native reveal controller, using Studio FadeIn only as behavioral inspiration; content and diagrams remain visible in the initial HTML and no motion dependency was introduced. See `refinement-v2-1-motion.md`. Original HTML/CSS diagrams, monogram/icon and typographic social image replace generic illustrations. The local font's binary axes were inspected: `wght` 200–900, `wdth` 75–125, `ital` 0–12. CSS declares the supported weight/stretch range and a legible system fallback.

Files are grouped by responsibility rather than one file for every proposed component name. This reduces tiny abstractions while preserving small client islands. There is no blog, MDX pipeline, RSS feed, CMS, global dark mode, carousel, database, analytics, or donor demo content.

## Runtime and compatibility

| Component | Installed version |
| --- | --- |
| Node / npm | 24.20.0 / 11.19.0 |
| Next / React / React DOM | 16.3.8 / 19.3.0 / 19.3.0 |
| TypeScript | 5.9.3, strict |
| Tailwind / PostCSS adapter | 4.3.3 / 4.3.3 |
| next-safe-action / Zod | 8.7.3 / 4.6.5 |
| Arcjet Next / Resend | 1.14.0 / 6.32.0 |
| ESLint / Next configuration | 9.39.5 / 16.3.8 |
| Vitest / Playwright / axe adapter | 5.0.3 / 1.63.0 / 4.13.0 |
| Lighthouse | 13.5.0 |

`package.json` pins direct versions; the single npm lockfile pins the resolved installation. npm is the only package manager used. Next's default Turbopack build is retained. No broad type suppression or ignored build errors are configured.

ESLint 9.39.5 is retained because the installed Next lint plugins do not yet accept ESLint 10 in their peer ranges. npm marks this ESLint version unsupported. The development dependency audit also reports unresolved advisories; the production-only audit reports zero. Counts and verification are recorded separately. Detailed dependency-audit output stays outside public tracking. Reassess the toolchain and hosting Node support before release; a successful local build is not a universal security claim.

## Contact and privacy decisions

All contact inputs go through the real next-safe-action v8 `.inputSchema()` API and server-side Zod validation. Client code imports only message constants and erased schema types. Honeypot rejection precedes configuration, Arcjet and sending. Arcjet runs only on valid contact attempts with Shield, bot detection and a five-per-minute fixed window; denial, errors and indeterminate outcomes fail closed. Resend uses a server-controlled sender/recipient/subject, visitor reply-to, escaped HTML and a text alternative.

Only a nonempty provider acceptance ID without an error produces success. The SDK can resolve transport failures as error objects: missing transport status or server errors map to unknown outcome, as do thrown/timeout failures. Sending has a ten-second timeout and no automatic retry. Input stays in the form after failure and is cleared only on accepted delivery. Acceptance is not proof of inbox receipt.

Missing credentials or disabled delivery produce a clear unavailable response. Actual delivery additionally requires a production build because the provider SDK's development logging can expose raw error details. This is an intentional safety restriction, not a request to deploy. Test mocks exist only in the isolated test suite. No form content is persisted in a URL, browser storage or application database. No real mail was sent.

The native disclosure menu works without JavaScript. The enhanced contact form requires JavaScript; SSR disables its fields and provides a visible email fallback, preventing a default GET submission from putting personal input in a URL. Errors are associated with fields and summarized with focus management; pending inputs remain readable.

## Preview deviations and publication gates

- The existing portrait is a clearly labeled preview candidate; it is not treated as newly approved.
- Eight captures remain missing. Their layout frames are reviewable, but no invented customer or financial screenshots are used. Compta Pro's capture sentence is future-facing until an approved isolated synthetic demo exists.
- Both legal documents show the required draft notice and enumerate facts to validate; registration, address, retention and hosting facts were not inferred.
- Provider credentials, actual sender/domain verification, real receipt testing and remote access protection remain external gates.
- Default noindex response headers/metadata, disallow-all robots and empty sitemap are intentional. The approved release mode checks the owner ledger and server configuration before building/starting. Noindex is not authentication.
- The proposed canonical host is retained from the brief and still requires owner confirmation before cutover. Legacy Search Console/backlink data and any current verification files have not been supplied.

## Primary references consulted

- [Next September 2026 security release](https://nextjs.org/blog/september-2026-security-release) and the installed Next documentation for Server Actions, static pages and Server/Client Components.
- [next-safe-action action client](https://next-safe-action.dev/docs/concepts/action-client), with installed v8 types inspected for callback/error handling.
- [Arcjet Next reference](https://docs.arcjet.com/reference/nextjs/), with installed SDK types inspected for request extraction and fail-closed decision handling.
- [Resend with Next.js](https://resend.com/docs/send-with-nextjs), with the installed SDK inspected for resolved error and timeout behavior.
- [Node release schedule](https://nodejs.org/en/about/previous-releases).
- [Mona Sans license](https://github.com/github/mona-sans/blob/main/LICENSE); the license notice is retained with the integrated font.

These references support implementation choices, not claims about an unconfigured live deployment.
