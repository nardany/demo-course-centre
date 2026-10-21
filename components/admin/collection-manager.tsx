"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { collections } from "@/lib/admin-schema";
import { deleteItem, moveItem, saveItem, type FormState } from "@/lib/actions/admin";
import type { CollectionKey } from "@/lib/types";
import { Avatar } from "../avatar";
import { Icon } from "../icon";
import { FieldInput } from "./field-input";
import { SaveStatus } from "./save-status";
import { submitWith } from "./use-form-action";

type Item = { id: string } & Record<string, unknown>;

export function CollectionManager({ collectionKey, items }: { collectionKey: CollectionKey; items: Item[] }) {
  const spec = collections[collectionKey];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editing, setEditing] = useState<{ item?: Item; session: number }>({ session: 0 });
  const [pending, startTransition] = useTransition();

  function open(item?: Item) {
    setEditing((prev) => ({ item, session: prev.session + 1 }));
    dialogRef.current?.showModal();
  }

  function remove(item: Item) {
    if (!confirm(`Ջնջե՞լ «${String(item[spec.titleField])}»-ը։ Այս գործողությունը հնարավոր չէ հետարկել։`)) return;
    startTransition(async () => {
      const result = await deleteItem(collectionKey, item.id);
      if (result.error) alert(result.error);
    });
  }

  function move(item: Item, direction: -1 | 1) {
    startTransition(async () => {
      const result = await moveItem(collectionKey, item.id, direction);
      if (result.error) alert(result.error);
    });
  }

  return (
    <section className="paper p-4 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            {spec.title}
            <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-semibold text-muted">{items.length}</span>
          </h2>
          {spec.description && <p className="mt-1 text-sm text-muted">{spec.description}</p>}
        </div>
        <button type="button" onClick={() => open()} className="btn btn-primary w-full !py-2.5 text-sm sm:w-auto">
          <Icon name="plus" className="size-4" /> Ավելացնել {spec.singular}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 rounded-xl border-[1.5px] border-dashed border-border p-8 text-center text-muted">
          Դեռ ոչինչ չկա։ Սեղմեք «Ավելացնել»։
        </p>
      ) : (
        <ul className={`mt-6 divide-y divide-border rounded-xl border-[1.5px] border-border transition ${pending ? "opacity-60" : ""}`}>
          {items.map((item, i) => {
            const title = String(item[spec.titleField] ?? "");
            const subtitle = spec.subtitleField ? String(item[spec.subtitleField] ?? "") : "";
            return (
              <li key={item.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3 sm:flex-nowrap sm:p-4">
                {spec.imageField && (
                  <Avatar name={title || "?"} photo={String(item[spec.imageField] ?? "")} className="size-11 text-sm" />
                )}
                <div className="min-w-0 flex-1 basis-40">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                    <span className="max-w-full truncate">{title}</span>
                    {spec.warning?.(item) && (
                      <span className="shrink-0 rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-600 dark:text-red-400">
                        {spec.warning(item)}
                      </span>
                    )}
                    {item.highlighted === true && (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent-strong">Ընդգծված</span>
                    )}
                  </div>
                  {subtitle && <div className="truncate text-sm text-muted">{subtitle}</div>}
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-1">
                  <IconButton label="Վեր" icon="chevronUp" disabled={i === 0 || pending} onClick={() => move(item, -1)} />
                  <IconButton
                    label="Վար"
                    icon="chevronDown"
                    disabled={i === items.length - 1 || pending}
                    onClick={() => move(item, 1)}
                  />
                  <IconButton label="Խմբագրել" icon="edit" onClick={() => open(item)} />
                  <IconButton label="Ջնջել" icon="trash" danger disabled={pending} onClick={() => remove(item)} />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        className="m-auto w-[min(40rem,calc(100vw-2rem))] rounded-xl border border-border bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm max-sm:mb-0 max-sm:w-full max-sm:max-w-full max-sm:rounded-b-none"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <ItemForm
          key={editing.session}
          collectionKey={collectionKey}
          item={editing.item}
          onDone={() => dialogRef.current?.close()}
        />
      </dialog>
    </section>
  );
}

function ItemForm({
  collectionKey,
  item,
  onDone,
}: {
  collectionKey: CollectionKey;
  item?: Item;
  onDone: () => void;
}) {
  const spec = collections[collectionKey];
  const [state, action, pending] = useActionState<FormState, FormData>(saveItem, {});
  const handled = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (state.ok && state.savedAt !== handled.current) {
      handled.current = state.savedAt;
      onDone();
    }
  }, [state, onDone]);

  return (
    <form action={action} onSubmit={submitWith(action)} className="flex max-h-[92dvh] flex-col sm:max-h-[85dvh]">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6 sm:py-4">
        <h3 className="text-lg font-semibold">
          {item ? "Խմբագրել" : "Նոր"} {spec.singular}
        </h3>
        <button type="button" onClick={onDone} className="grid size-9 place-items-center rounded-full hover:bg-surface-2" aria-label="Փակել">
          <Icon name="x" className="size-5" />
        </button>
      </div>
      <div className="grid gap-5 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
        <input type="hidden" name="__collection" value={collectionKey} />
        <input type="hidden" name="id" value={item?.id ?? ""} />
        {spec.fields.map((field) => (
          <FieldInput key={field.name} field={field} value={item?.[field.name] ?? (field.type === "number" ? field.max : "")} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t border-border px-4 py-3 sm:px-6 sm:py-4">
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? "Պահպանվում է..." : "Պահպանել"}
        </button>
        <button type="button" onClick={onDone} className="btn btn-ghost">
          Չեղարկել
        </button>
        <SaveStatus state={state.error ? state : {}} />
      </div>
    </form>
  );
}

function IconButton({
  label,
  icon,
  onClick,
  disabled,
  danger,
}: {
  label: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`grid size-9 place-items-center rounded-xl text-muted transition hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-30 ${
        danger ? "hover:!bg-red-500/10 hover:text-red-600" : "hover:text-fg"
      }`}
    >
      <Icon name={icon} className="size-4" />
    </button>
  );
}
