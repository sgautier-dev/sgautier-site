# Asset manifest

Review date: 2026-10-04. All project captures are still missing. No donor demonstration images, generated customer screens, bank files, actual transactions, client exports, or private repositories are embedded in this project.

| Asset | Source | Local path | Actual dimensions | Use and approval | Data |
| --- | --- | --- | --- | --- | --- |
| Portrait candidate | Existing portfolio, `src/images/portrait.jpg` | `src/images/portrait-sebastien.jpg` | 800 × 800 px; 134,470 bytes | Home/About preview only; owner must approve final selection and credits | Genuine supplied photograph |
| Compta Pro overview | Approved isolated synthetic demo, not supplied | None | Not available | Required; preview placeholder | Synthetic-only policy |
| Compta Pro review | Same isolated demo, not supplied | None | Not available | Required; review placeholder | Synthetic-only policy |
| ADF events | Approved genuine events view, not supplied | None | Not available | Required; preview placeholder | No project data copied |
| Holistis content | Approved live/delivered content view, not supplied | None | Not available | Required; preview placeholder | No project data copied |
| VBM overview | Approved redesign preview, not supplied | None | Not available | Required; upcoming context | No project data copied |
| AMA overview | Approved genuine site view, not supplied | None | Not available | Required; preview placeholder | No project data copied |
| L.FIT overview | Approved delivered/live view, not supplied | None | Not available | Required; premium runtime not asserted | No project data copied |
| Julie Gautier overview | Approved portfolio view, not supplied | None | Not available | Required; imagery rights to confirm | No project data copied |
| Browser icon | Original SVG for this website | `src/app/icon.svg` | 64 × 64 viewBox | Integrated; included in visual approval gate | No personal data |
| Social image | Original HTML typography rendered locally | `public/og/brand.png` | 1200 × 630 px; 54,346 bytes | Integrated; regenerate using `npm run assets:og`; owner visual approval pending | Public identity and copy only |
| Mona Sans | Licensed Studio archive | `src/fonts/Mona-Sans.var.woff2` | 133,748 bytes | Embedded website font; `font-display: swap`; see `src/fonts/OFL.txt` | Not applicable |
| Workflow diagrams | Original HTML/CSS | `src/components/diagrams/Workflow.tsx` | Responsive vectors/HTML, no bitmap | Generic illustrations or labeled functional summaries | No financial or customer data |

The old portfolio also contains genuine testimonial portraits and project logos, but no required screenshots were found in its asset inventory. Those optional images were not copied. Lifestyle photographs and excluded project logos were not used.

The portrait is a candidate, not automatic approval. Its visible preview caption and the release flag preserve that distinction. `ProjectVisual` supports a real static image with `next/image`, responsive sizes and lazy loading; its current empty states intentionally contain no invented file URL. Replace missing captures only with owner-approved assets or an explicitly approved truthful schematic. For a Compta Pro capture, never open or derive fixtures from real finance storage.

Licensed source archives remain outside the Git tree. The full Tailwind Plus license is retained in `docs/TAILWIND-PLUS-LICENSE.md`; Mona Sans's official SIL OFL notice is in `src/fonts/OFL.txt`. This is a specific end-product website, not a redistributable template or standalone font package.

The font binary was inspected with fontTools in a temporary environment outside the app. Its variable axes are `wght` 200–900 (default 200), `wdth` 75–125 (default 100), and `ital` 0–12 (default 0). Actual output is retained locally in `artifacts/font-axes.json`.

The integrated portrait and social image were inspected with the installed image library: neither contains EXIF, IPTC or XMP metadata. The dimension/metadata-presence summary is retained locally in `artifacts/image-metadata-summary.json`; no location or personal metadata values were printed.

## V2 rendering contract

`release-status.json` is the single approval ledger. Every asset slot is connected to the actual page components through `AssetKey`; independent project delivery/pilot statuses remain in `src/data/projects.ts`. There are no duplicate readiness booleans to update. Image approvals require alt text and intrinsic dimensions. Approved text alternatives render as editorial text, not fabricated screenshots. Legal documents have a separate empty `legal-content.json` awaiting owner-approved copy. The disposable public-mode test uses clearly labeled synthetic SVGs and never copies its approvals back.
