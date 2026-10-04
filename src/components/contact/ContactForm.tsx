"use client";

import Link from "next/link";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { useAction } from "next-safe-action/hooks";
import { sendContactMessage } from "@/app/actions/send-contact-message";
import type { ContactField } from "@/lib/contact-schema";
import {
  contactFields,
  contactMessages,
  messageForError,
} from "@/lib/contact-messages";

const subscribe = () => () => {};
const labels: Record<ContactField, string> = {
  name: "Nom",
  email: "Email",
  activity: "Entreprise / activité",
  message: "Qu’aimeriez-vous simplifier ?",
};
const limits: Record<ContactField, number> = {
  name: 100,
  email: 254,
  activity: 160,
  message: 5000,
};

export function ContactForm({ available = false }: { available?: boolean }) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const submitted = useRef(false);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [networkUnknown, setNetworkUnknown] = useState(false);
  const action = useAction(sendContactMessage, {
    onExecute() {
      setNetworkUnknown(false);
    },
    onSuccess({ data }) {
      if (data.accepted) form.current?.reset();
    },
    onError({ error }) {
      if (error.thrownError) setNetworkUnknown(true);
      requestAnimationFrame(() => summary.current?.focus());
    },
    onSettled() {
      submitted.current = false;
    },
  });
  const errors = action.result.validationErrors?.fieldErrors;
  const failedFields = contactFields.filter((field) => errors?.[field]?.length);
  const errorMessage = networkUnknown
    ? contactMessages.unknown
    : action.result.serverError
      ? messageForError(action.result.serverError)
      : undefined;
  const accepted = action.result.data?.accepted === true && !action.isPending;
  function renderField(field: ContactField) {
    const fieldId = `${id}-${field}`;
    const error = errors?.[field]?.[0];
    const descriptions =
      [
        field === "message" ? `${fieldId}-help` : "",
        error ? `${fieldId}-error` : "",
      ]
        .filter(Boolean)
        .join(" ") || undefined;
    const shared = {
      id: fieldId,
      name: field,
      required: field !== "activity",
      maxLength: limits[field],
      "aria-invalid": error ? true : undefined,
      "aria-describedby": descriptions,
      readOnly: action.isPending,
    };
    return (
      <div className="field" key={field}>
        <label htmlFor={fieldId}>
          {labels[field]}
          {field === "activity" && (
            <span className="optional"> — facultatif</span>
          )}
        </label>
        {field === "message" ? (
          <textarea {...shared} rows={5} minLength={10} />
        ) : (
          <input
            {...shared}
            type={field === "email" ? "email" : "text"}
            autoComplete={
              field === "name"
                ? "name"
                : field === "email"
                  ? "email"
                  : "organization"
            }
          />
        )}
        {field === "message" && (
          <p className="field-help" id={`${fieldId}-help`}>
            Décrivez le fonctionnement actuel, ce qui vous pose problème et, si
            vous le savez, les outils déjà utilisés.
          </p>
        )}
        {error && (
          <p id={`${fieldId}-error`} className="field-error">
            {error}
          </p>
        )}
      </div>
    );
  }
  return (
    <form
      ref={form}
      className="contact-form"
      noValidate
      aria-label="Formulaire de contact"
      onSubmit={(event) => {
        event.preventDefault();
        if (!hydrated || action.isPending || submitted.current) return;
        submitted.current = true;
        const data = new FormData(event.currentTarget);
        action.execute({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          activity: String(data.get("activity") || ""),
          message: String(data.get("message") || ""),
          contact_info: String(data.get("contact_info") || ""),
        });
      }}
    >
      {!available && (
        <p className="form-status">{contactMessages.unavailable}</p>
      )}
      <noscript>
        <p className="noscript-note">
          Le formulaire nécessite JavaScript. Vous pouvez écrire à{" "}
          <a href="mailto:contact@sgautier.dev">contact@sgautier.dev</a>.
        </p>
      </noscript>
      <div aria-live="polite" aria-atomic="true">
        {accepted && (
          <p className="form-status" data-tone="success">
            {contactMessages.accepted}
          </p>
        )}
      </div>
      {errorMessage ||
      failedFields.length > 0 ||
      action.result.validationErrors?.formErrors.length ? (
        <div
          ref={summary}
          tabIndex={-1}
          role="alert"
          className="form-status"
          data-tone="error"
        >
          {errorMessage || "Vérifiez les informations du formulaire."}
          {failedFields.length > 0 && (
            <ul>
              {failedFields.map((field) => (
                <li key={field}>
                  <a href={`#${id}-${field}`}>
                    {labels[field]} : {errors?.[field]?.[0]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
      <fieldset disabled={!hydrated} className="form-fields">
        <legend className="sr-only">Votre demande</legend>
        <div className="form-row">
          {renderField("name")}
          {renderField("email")}
        </div>
        {renderField("activity")}
        {renderField("message")}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor={`${id}-contact-info`}>Leave this field empty</label>
          <input
            id={`${id}-contact-info`}
            name="contact_info"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            maxLength={200}
          />
        </div>
        <p className="form-privacy">
          Les informations de ce formulaire servent à traiter votre demande. Des
          contrôles techniques sont également utilisés pour prévenir les abus.
          Consultez la politique de confidentialité pour en savoir plus.{" "}
          <Link href="/confidentialite">Politique de confidentialité</Link>.
        </p>
        <button
          type="submit"
          className="button form-button"
          disabled={action.isPending}
          aria-busy={action.isPending}
        >
          {action.isPending ? "Envoi…" : "Envoyer ma demande"}
          <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
    </form>
  );
}
