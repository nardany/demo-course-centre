"use client";

import { useActionState } from "react";
import { sections } from "@/lib/admin-schema";
import { saveSection, type FormState } from "@/lib/actions/admin";
import type { SectionKey } from "@/lib/types";
import { FieldInput } from "./field-input";
import { SaveStatus } from "./save-status";
import { submitWith } from "./use-form-action";

export function SectionForm({ sectionKey, values }: { sectionKey: SectionKey; values: Record<string, unknown> }) {
  const spec = sections[sectionKey];
  const [state, action, pending] = useActionState<FormState, FormData>(saveSection, {});

  return (
    <section className="paper p-4 sm:p-8">
      <h2 className="text-xl font-semibold">{spec.title}</h2>
      {spec.description && <p className="mt-1 text-sm text-muted">{spec.description}</p>}
      <form key={state.savedAt ?? 0} action={action} onSubmit={submitWith(action)} className="mt-6 grid gap-5">
        <input type="hidden" name="__section" value={sectionKey} />
        {spec.fields.map((field) => (
          <FieldInput key={field.name} field={field} value={values[field.name]} />
        ))}
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={pending} className="btn btn-primary">
            {pending ? "Պահպանվում է..." : "Պահպանել"}
          </button>
          <SaveStatus state={state} />
        </div>
      </form>
    </section>
  );
}
