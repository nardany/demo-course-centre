"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "@/components/icon";

export default function SiteError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-3xl font-bold">Ինչ-որ բան այն չէ</h1>
        <p className="mt-4 text-lg text-muted">
          Էջը ժամանակավորապես չհաջողվեց բեռնել։ Փորձեք կրկին մի քանի վայրկյանից։
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={retry} className="btn btn-primary">
            Փորձել կրկին
          </button>
          <Link href="/" className="btn btn-ghost">
            <Icon name="home" className="size-4" /> Գլխավոր էջ
          </Link>
        </div>
      </div>
    </section>
  );
}
