"use client";

import { useActionState } from "react";
import { login, type FormState } from "@/lib/actions/admin";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});

  return (
    <form action={action} className="mt-8 grid gap-4">
      <input
        type="password"
        name="password"
        required
        autoFocus
        autoComplete="current-password"
        placeholder="Գաղտնաբառ"
        className="input"
        aria-label="Գաղտնաբառ"
      />
      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? "Ստուգվում է..." : "Մուտք"}
      </button>
    </form>
  );
}
