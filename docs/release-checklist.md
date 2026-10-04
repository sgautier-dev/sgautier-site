# Owner-controlled release checklist

**Current status: local preview only. Publication blocked.** A build, a preview, or this checklist does not authorize remote repository creation, a public deployment, domain reassignment, or real email. The application defaults to noindex and loopback-only local servers. Noindex is not access control.

Record each approval's date and responsible reviewer in `release-status.json`. Do not flip flags merely to make a command succeed. `npm run check:release` must fail while evidence is missing; `SITE_RELEASE=approved` also fails at configuration loading until those gates are resolved.

| Gate | Owner's next action | Status |
| --- | --- | --- |
| Design and content | Review all 13 pages and the actual screenshots; approve composition, complete French text, and diagram meanings | Pending |
| Portrait | Approve the existing portrait candidate or supply a replacement, with required credits/rights | Pending |
| Compta Pro assets | Supply approved overview and review screenshots from an isolated synthetic demo, or approve a truthful alternate treatment | Blocked |
| Other project assets | Supply/approve ADF, Holistis, VBM, AMA, L.FIT and Julie captures with delivered/live context and rights | Blocked |
| Legal notices | Confirm legal identity, business status/registration, publication responsibility, required professional address/contact, and final hosting information | Blocked |
| Privacy | Decide lawful bases, retention/deletion, provider recipients, transfers/guarantees and rights/complaints handling; approve the final policy | Blocked |
| Project context | Confirm VBM remains upcoming or supply explicit new-live confirmation; provide AMA's actual URL; approve context of all external links and captures | Pending |
| Providers | Verify Resend domain/sender and recipient; configure Resend/Arcjet keys in the correct server environment; verify SDK IP extraction for the selected proxy/hosting setup | Blocked |
| Real email | Separately authorize a specific controlled test and recipient; run a production build with delivery enabled; verify acceptance and actual receipt, including reply-to | NOT RUN |
| Dependencies/runtime | Recheck official security releases, npm audit and hosting Node 24 compatibility; resolve or explicitly assess remaining development-tool advisories and ESLint peer constraints | Pending |
| Manual accessibility | Check native 200% browser zoom, VoiceOver/NVDA and Safari/Firefox on the final content; automated Chromium/axe and text-enlargement checks are recorded separately | NOT RUN |
| Legacy URLs | Review Search Console/backlink and old CV information; preserve supplied verification files; confirm removed URLs or explicitly accept the missing-data limitation | Blocked by missing inventory |
| Preview protection | If a hosted preview is separately authorized, apply provider access protection before uploading draft/rights-pending material; retain noindex | Not configured; no remote project exists |
| Final domain | Confirm `https://www.sgautier.dev`, apex-to-www policy, canonical tags, robots/sitemap, OG image, 404 and redirects on the actual final domain | NOT RUN |
| Cutover and rollback | Authorize new GitHub/Vercel resources, retain old deployment, define rollback and only then authorize domain reassignment | Not authorized |
| Publication | Remove draft captions/placeholders, approve both legal documents, review acceptance results, then give explicit publication authorization | Not authorized |

## Controlled activation sequence

1. Complete local content/assets/legal work. Keep `SITE_RELEASE=preview`.
2. Re-run `npm ci`, `npm run check`, `npm run build`, `npm run test:e2e`, and representative measurements. Review the full Git history and staged files for secrets/licensed donor trees/private data before any remote exposure.
3. Obtain separate authorization for any remote resources and protect a preview with actual access controls. A provider environment named production is not authorization to publish its temporary alias.
4. Add provider secrets through the hosting environment, never Git. `CONTACT_FROM_EMAIL` is an approved mailbox only, without a display name; the server adds the fixed display name. Set `CONTACT_DELIVERY_ENABLED=true` only for an authorized test or approved release. Credentialed sends require a production build; development SDK logs are deliberately avoided.
5. Perform and record the separately authorized real-mail receipt test. An accepted provider ID alone is insufficient proof of inbox placement.
6. Once all approval evidence exists, run `check:release` with the intended server environment. Enable `SITE_RELEASE=approved` only for the authorized final-domain build. Verify indexing is enabled in the actual response; the preview sitemap is intentionally empty.
7. Reassign the domain only after explicit cutover authorization. Recheck origin/proxy protections, form, redirect fragments, legal pages, canonical host and rollback immediately afterward. Do not remove the old deployment first.

No Search Console change-of-address operation is automatically needed when the public domain stays the same. No Search Console changes are authorized here.
