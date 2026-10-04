import { z } from "zod";

export const assetRoutes = {
  portrait: ["/", "/a-propos"],
  comptaProOverview: ["/", "/realisations", "/realisations/compta-pro"],
  comptaProReview: ["/realisations/compta-pro"],
  adfEvents: ["/", "/realisations", "/realisations/aqua-dance-flow"],
  holistisContent: ["/", "/realisations", "/realisations/holistis"],
  vbmOverview: ["/realisations"],
  amaOverview: ["/realisations"],
  lfitOverview: ["/realisations"],
  julieGautierOverview: ["/realisations"],
} as const;
export type AssetKey = keyof typeof assetRoutes;
export const approvalNames = [
  "visualAndEditorialReview",
  "legalIdentityAndNotices",
  "privacyAndRetention",
  "projectLinksAndDeliveryContext",
  "senderAndProviderConfiguration",
  "authorizedRealEmailReceipt",
  "dependencyAndRuntimeReview",
  "legacyUrlsAndSearchConsole",
  "previewAccessProtection",
  "domainCanonicalAndRollback",
  "ownerPublicationAuthorization",
  "manualAccessibilityAndBrowserReview",
] as const;

export const approvedAssetSchema = z
  .object({
    approved: z.literal(true),
    evidence: z.string().trim().min(1),
    path: z.string(),
    alternative: z.string(),
    alt: z.string().default(""),
    caption: z.string().default(""),
    width: z.number().int().nonnegative().default(0),
    height: z.number().int().nonnegative().default(0),
  })
  .superRefine((asset, context) => {
    if (asset.path) {
      if (
        asset.path !== "src/images/portrait-sebastien.jpg" &&
        (!/^public\/images\/[a-zA-Z0-9_/-]+\.(png|jpe?g|webp|avif|svg)$/.test(
          asset.path,
        ) ||
          asset.path.includes(".."))
      )
        context.addIssue({
          code: "custom",
          message: "Unsupported public image path.",
        });
      if (!asset.alt.trim() || asset.width < 1 || asset.height < 1)
        context.addIssue({
          code: "custom",
          message: "Image alternative text and dimensions are required.",
        });
      if (asset.alternative.trim())
        context.addIssue({
          code: "custom",
          message: "Choose an image or a truthful alternative, not both.",
        });
    } else if (!asset.alternative.trim()) {
      context.addIssue({
        code: "custom",
        message: "An image or approved truthful alternative is required.",
      });
    }
  });
export type ApprovedAsset = z.output<typeof approvedAssetSchema>;
export const approvedDocumentSchema = z.object({
  approved: z.literal(true),
  evidence: z.string().trim().min(1),
  sections: z
    .array(
      z.object({
        heading: z.string().trim().min(1),
        paragraphs: z.array(z.string().trim().min(1)).min(1),
      }),
    )
    .min(1),
});
export const draftMarker =
  /Document de travail|À compléter|À confirmer|À déterminer(?:\s*:|\s+et valider)|À valider\s*:|à intégrer avant publication|sélection à valider avant publication|Prévisualisation non publique/iu;
