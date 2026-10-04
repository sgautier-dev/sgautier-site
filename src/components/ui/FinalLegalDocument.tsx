import { getFinalDocument } from "@/lib/publication";
import { ArticleSection } from "./Article";

export function FinalLegalDocument({
  document,
}: {
  document: NonNullable<ReturnType<typeof getFinalDocument>>;
}) {
  return (
    <div data-publication-document="final">
      {document.sections.map((section) => (
        <ArticleSection key={section.heading} title={section.heading}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ArticleSection>
      ))}
    </div>
  );
}
