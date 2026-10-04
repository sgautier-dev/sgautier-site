"use client";
import { useSearchParams } from "next/navigation";
export function ContactIntent() {
  const params = useSearchParams();
  return (
    <div className="contact-intent">
      {params.get("intent") === "diagnostic" ? (
        <p className="eyebrow">Votre demande · Diagnostic automatisation</p>
      ) : null}
    </div>
  );
}
