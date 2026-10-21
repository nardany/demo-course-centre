"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/lib/actions/contact";
import { submitWith } from "../admin/use-form-action";
import { TOPICS } from "@/lib/topics";
import { Icon } from "../icon";

export function ContactForm({ courses }: { courses: string[] }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, {});
  if (state.ok) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" role="status">
        <span className="relative grid size-20 place-items-center rounded-full bg-brand-btn text-white">
          <span className="animate-ping-soft absolute inset-0 rounded-full bg-brand-btn/40" />
          <Icon name="check" className="relative size-9" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold">Շնորհակալություն</h3>
        <p className="mt-2 max-w-sm text-muted">Ձեր հայտը ստացվել է։ Մենք շուտով կզանգահարենք ձեզ։</p>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={submitWith(action)} className="grid gap-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-medium">Ինչ եք ցանկանում</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((topic, i) => (
            <label key={topic.value} className="cursor-pointer">
              <input type="radio" name="topic" value={topic.value} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex rounded-lg border-[1.5px] border-border bg-surface px-4 py-2 text-sm font-medium transition peer-checked:border-brand-btn peer-checked:bg-brand-btn peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20 hover:border-brand">
                {topic.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Անուն Ազգանուն</span>
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" className="input" placeholder="Ձեր անունը" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium">Հեռախոսահամար</span>
          <input
            name="phone"
            type="tel"
            required
            pattern="[\d\s+\(\)\-]{6,20}"
            autoComplete="tel"
            className="input"
            placeholder="0XX XX XX XX"
          />
        </label>
      </div>

      {courses.length > 0 && (
        <label className="grid gap-2">
          <span className="text-sm font-medium">Ո՞ր լեզուն է ձեզ հետաքրքրում</span>
          <select name="course" className="input" defaultValue="">
            <option value="">Դեռ չեմ որոշել</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="grid gap-2">
        <span className="text-sm font-medium">
          Նամակ <span className="font-normal text-muted">(ոչ պարտադիր)</span>
        </span>
        <textarea
          name="message"
          maxLength={2000}
          rows={4}
          className="input resize-y"
          placeholder="Օրինակ՝ երեխայիս տարիքը, հարմար ժամերը կամ ձեր հարցը..."
        />
      </label>

      {state.error && (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full sm:w-auto sm:justify-self-start">
        {pending ? "Ուղարկվում է..." : "Ուղարկել հայտը"}
        <Icon name="send" className="size-4" />
      </button>
    </form>
  );
}
