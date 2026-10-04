<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Portfolio Git workflow

The owner authorizes a coherent commit and an automatic push to `origin main` after an implementation pass only when all requested checks pass. Verify that origin resolves to `sgautier-dev/sgautier-site` on GitHub, fetch the current remote main, and confirm it is an ancestor of local main before pushing. Use an ordinary fast-forward push, never force. If the remote has commits absent locally or has diverged, stop and report without resetting, rebasing, deleting commits or otherwise rewriting history. No additional push approval is required within these conditions.

This authorization does not include deployment, domain changes, provider configuration or real email. Preserve the owner's pre-existing generated `next-env.d.ts` modification outside implementation commits.
