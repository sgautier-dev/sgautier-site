export type ReleaseStatus = {
  approvals: Record<string, { approved: boolean; evidence: string }>;
  assets: Record<
    string,
    { approved: boolean; path: string; alternative: string; evidence: string }
  >;
};
export function releaseBlockers(
  status: ReleaseStatus,
  env: Readonly<Record<string, string | undefined>>,
  exists: (path: string) => boolean,
): string[] {
  const blockers: string[] = [];
  for (const [name, approval] of Object.entries(status.approvals)) {
    if (!approval.approved || !approval.evidence.trim())
      blockers.push(`Approval required: ${name}`);
  }
  for (const [name, asset] of Object.entries(status.assets)) {
    if (!asset.approved || !asset.evidence.trim())
      blockers.push(`Asset approval required: ${name}`);
    if (!asset.path && !asset.alternative.trim())
      blockers.push(`Asset or approved truthful alternative required: ${name}`);
    if (
      asset.path &&
      (!/^(src\/images\/|public\/)/.test(asset.path) ||
        asset.path.includes("..") ||
        !exists(asset.path))
    )
      blockers.push(`Missing or unsafe asset path: ${name}`);
  }
  for (const key of [
    "SITE_URL",
    "RESEND_API_KEY",
    "ARCJET_KEY",
    "CONTACT_FROM_EMAIL",
    "CONTACT_TO_EMAIL",
  ]) {
    if (!env[key]?.trim())
      blockers.push(`Server configuration required: ${key}`);
  }
  if (env.CONTACT_DELIVERY_ENABLED !== "true")
    blockers.push("Authorized contact delivery is not enabled.");
  if (env.SITE_URL !== "https://www.sgautier.dev")
    blockers.push(
      "Canonical domain must be explicitly reviewed against the approved origin.",
    );
  return blockers;
}
