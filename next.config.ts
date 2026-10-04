import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { releaseBlockers } from "./src/lib/release-readiness";
import releaseStatus from "./docs/release-status.json";
import legalContent from "./docs/legal-content.json";

const preview = process.env.SITE_RELEASE !== "approved";
if (!preview) {
  const blockers = releaseBlockers(
    releaseStatus,
    process.env,
    existsSync,
    legalContent,
  );
  if (blockers.length)
    throw new Error(
      `Public build blocked: ${blockers.length} unresolved release gates. Run npm run check:release.`,
    );
}
const config: NextConfig = {
  poweredByHeader: false,
  experimental: { serverActions: { bodySizeLimit: "64kb" } },
  async redirects() {
    return [
      { source: "/about", destination: "/a-propos", permanent: true },
      { source: "/projects", destination: "/realisations", permanent: true },
      { source: "/uses", destination: "/a-propos#outils", permanent: true },
      { source: "/speaking", destination: "/#temoignages", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          ...(preview
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]
            : []),
        ],
      },
    ];
  },
};
export default config;
