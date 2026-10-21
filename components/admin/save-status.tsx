import type { FormState } from "@/lib/actions/admin";
import { Icon } from "../icon";

export function SaveStatus({ state }: { state: FormState }) {
  if (state.error) {
    return (
      <span role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
        {state.error}
      </span>
    );
  }
  if (state.ok) {
    return (
      <span
        key={state.savedAt}
        role="status"
        className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
        style={{ animation: "fade-out 3.5s ease forwards" }}
      >
        <Icon name="check" className="size-4" /> Պահպանված է
      </span>
    );
  }
  return null;
}
