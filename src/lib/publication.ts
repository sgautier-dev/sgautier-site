import releaseStatus from "../../docs/release-status.json";
import documents from "../../docs/legal-content.json";
import {
  approvedAssetSchema,
  approvedDocumentSchema,
  type AssetKey,
} from "./publication-schema";

export function getApprovedAsset(key: AssetKey) {
  const result = approvedAssetSchema.safeParse(releaseStatus.assets[key]);
  if (result.success) return result.data;
  if (process.env.SITE_RELEASE === "approved")
    throw new Error(`Approved asset unavailable: ${key}`);
  return null;
}
export function getFinalDocument(key: "legal" | "privacy") {
  if (process.env.SITE_RELEASE !== "approved") return null;
  return approvedDocumentSchema.parse(documents[key]);
}
