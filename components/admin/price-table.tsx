"use client";

import { useActionState, useRef, useState } from "react";
import { savePrices, type FormState } from "@/lib/actions/admin";
import type { Course, Package } from "@/lib/types";
import { CourseBadge } from "../site/course-badge";
import { SaveStatus } from "./save-status";
import { submitWith } from "./use-form-action";

export function PriceTable({ courses, packages }: { courses: Course[]; packages: Package[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePrices, {});
  const formRef = useRef<HTMLFormElement>(null);

  const lastEdited = useRef(new Map<string, HTMLInputElement>());
  const [filled, setFilled] = useState<string | undefined>();

  function fillColumn(pkgId: string) {
    const inputs = [...(formRef.current?.querySelectorAll<HTMLInputElement>(`input[data-pkg="${pkgId}"]`) ?? [])];
    const source = lastEdited.current.get(pkgId) ?? inputs.find((i) => i.value.trim());
    const value = source?.value.trim();
    if (!value) return;
    for (const input of inputs) input.value = value;
    setFilled(pkgId);
    setTimeout(() => setFilled((current) => (current === pkgId ? undefined : current)), 1500);
  }

  return (
    <section className="paper p-4 sm:p-8">
      <h2 className="text-xl font-semibold">Գներ</h2>
      <p className="mt-1 text-sm text-muted">
        Յուրաքանչյուր լեզվի համար գրեք փաթեթի գինը։ Դատարկ թողեք, եթե տվյալ լեզվի համար այդ փաթեթը չկա։ Եթե գինը
        բոլոր լեզուների համար նույնն է, գրեք այն մեկ վանդակում և սեղմեք «Լրացնել բոլորին», հետո՝ «Պահպանել գները»։
      </p>

      {courses.length === 0 || packages.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center text-muted">
          Նախ ավելացրեք առնվազն մեկ լեզու և մեկ փաթեթ։
        </p>
      ) : (
        <form ref={formRef} action={action} onSubmit={submitWith(action)} className="mt-6">
          <div className="mb-4 flex flex-wrap gap-2 sm:hidden">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => fillColumn(pkg.id)}
                className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-brand"
              >
                {filled === pkg.id ? `${pkg.name} · լրացված է ✓` : `${pkg.name} · լրացնել բոլորին`}
              </button>
            ))}
          </div>
          <div className="sm:overflow-x-auto sm:rounded-xl sm:border-[1.5px] sm:border-border">
            <table className="w-full border-collapse text-sm max-sm:block sm:min-w-[34rem]">
              <thead className="max-sm:hidden">
                <tr className="bg-surface-2">
                  <th className="p-3 text-left font-semibold">Լեզու</th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className="p-3 text-left font-semibold">
                      {pkg.name}
                      <button
                        type="button"
                        onClick={() => fillColumn(pkg.id)}
                        className="mt-1 block text-xs font-normal text-brand hover:underline"
                        title="Վերջին գրած գինը դնել այս սյան բոլոր լեզուների համար"
                      >
                        {filled === pkg.id ? "Լրացված է ✓" : "Լրացնել բոլորին"}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="max-sm:grid max-sm:gap-3">
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-t border-border max-sm:block max-sm:rounded-2xl max-sm:border max-sm:p-3"
                  >
                    <th scope="row" className="p-3 text-left font-medium max-sm:block max-sm:p-0 max-sm:pb-2">
                      <span className="flex items-center gap-2.5">
                        <CourseBadge course={course} className="size-8 !rounded-lg text-[11px]" />
                        {course.name}
                      </span>
                    </th>
                    {packages.map((pkg) => (
                      <td key={pkg.id} className="p-2 max-sm:flex max-sm:items-center max-sm:gap-3 max-sm:px-0 max-sm:py-1">
                        <span className="w-28 shrink-0 truncate text-xs text-muted sm:hidden">{pkg.name}</span>
                        <input
                          name={`price:${pkg.id}:${course.id}`}
                          data-pkg={pkg.id}
                          onInput={(e) => lastEdited.current.set(pkg.id, e.currentTarget)}
                          defaultValue={pkg.prices?.[course.id] ?? ""}
                          placeholder="—"
                          aria-label={`${course.name}, ${pkg.name}`}
                          className="input !rounded-lg !px-3 !py-2"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={pending} className="btn btn-primary max-sm:w-full">
              {pending ? "Պահպանվում է..." : "Պահպանել գները"}
            </button>
            <SaveStatus state={state} />
          </div>
        </form>
      )}
    </section>
  );
}
