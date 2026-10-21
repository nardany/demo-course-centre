"use client";

import { useState } from "react";
import type { Field } from "@/lib/admin-schema";
import { Icon } from "../icon";

export function FieldInput({ field, value }: { field: Field; value: unknown }) {
  const id = `f-${field.name}`;
  const label = (
    <span className="text-sm font-medium">
      {field.label}
      {field.required && <span className="text-accent-strong"> *</span>}
    </span>
  );
  const help = field.help && <span className="text-xs text-muted">{field.help}</span>;

  switch (field.type) {
    case "checkbox":
      return (
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border-[1.5px] border-border bg-bg p-4">
          {label}
          <span className="relative inline-flex">
            <input type="checkbox" name={field.name} defaultChecked={Boolean(value)} className="peer sr-only" />
            <span className="h-7 w-12 rounded-full bg-border transition peer-checked:bg-brand-btn peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20" />
            <span className="absolute top-1 left-1 size-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
          </span>
        </label>
      );
    case "textarea":
      return (
        <label className="grid gap-2" htmlFor={id}>
          {label}
          <textarea id={id} name={field.name} defaultValue={String(value ?? "")} required={field.required} rows={4} className="input resize-y" placeholder={field.placeholder} />
          {help}
        </label>
      );
    case "lines":
      return (
        <label className="grid gap-2" htmlFor={id}>
          {label}
          <textarea
            id={id}
            name={field.name}
            defaultValue={Array.isArray(value) ? value.join("\n") : ""}
            rows={4}
            className="input resize-y font-mono text-sm"
            placeholder={field.placeholder}
          />
          {help}
        </label>
      );
    case "select":
      return (
        <label className="grid gap-2" htmlFor={id}>
          {label}
          <select id={id} name={field.name} defaultValue={String(value ?? "")} className="input">
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {help}
        </label>
      );
    case "image":
      return <ImageInput field={field} value={String(value ?? "")} />;
    default:
      return (
        <label className="grid gap-2" htmlFor={id}>
          {label}
          <input
            id={id}
            name={field.name}
            type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
            min={field.min}
            max={field.max}
            defaultValue={String(value ?? "")}
            required={field.required}
            className="input"
            placeholder={field.placeholder}
          />
          {help}
        </label>
      );
  }
}

function ImageInput({ field, value }: { field: Field; value: string }) {
  const [preview, setPreview] = useState(value);
  const [removed, setRemoved] = useState(false);

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium">{field.label}</span>
      <div className="flex items-center gap-4 rounded-xl border-[1.5px] border-dashed border-border bg-bg p-4">
        <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface-2 text-muted">
          {preview && !removed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="size-full object-cover" />
          ) : (
            <Icon name="image" className="size-7" />
          )}
        </span>
        <div className="grid gap-2">
          <label className="btn btn-ghost cursor-pointer !px-4 !py-2 text-sm">
            <Icon name="plus" className="size-4" /> Ընտրել նկար
            <input
              type="file"
              name={`${field.name}__file`}
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              onChange={async (e) => {
                const input = e.currentTarget;
                const file = input.files?.[0];
                if (!file) return;
                const small = await shrinkImage(file);
                if (small !== file) {
                  const dt = new DataTransfer();
                  dt.items.add(small);
                  input.files = dt.files;
                }
                setPreview(URL.createObjectURL(small));
                setRemoved(false);
              }}
            />
          </label>
          {value && (
            <label className="flex items-center gap-2 text-xs text-muted">
              <input type="checkbox" name={`${field.name}__remove`} checked={removed} onChange={(e) => setRemoved(e.target.checked)} />
              Հեռացնել նկարը
            </label>
          )}
          <span className="text-xs text-muted">JPG, PNG, WEBP · մեծ նկարները ավտոմատ կփոքրացվեն</span>
        </div>
      </div>
    </div>
  );
}

const MAX_SIDE = 1600;

/** Re-encodes large photos as WebP (max 1600px) so uploads stay small and fast. GIFs are left alone. */
async function shrinkImage(file: File): Promise<File> {
  if (file.type === "image/gif" || !file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1024 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}
