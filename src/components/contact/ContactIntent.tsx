"use client";
import { useSearchParams } from "next/navigation";
export function ContactIntent() {
  const params = useSearchParams();
  return params.get("intent") === "diagnostic" ? (
    <p className="eyebrow">Votre demande · Diagnostic automatisation</p>
  ) : null;
}
