"use client";

import { useEffect } from "react";

export default function AdminError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="paper max-w-xl p-8">
      <h1 className="text-xl font-semibold">Չհաջողվեց բեռնել էջը</h1>
      <p className="mt-2 text-muted">
        Հավանաբար բազայի հետ կապը ժամանակավորապես ընդհատվել է։ Ձեր պահպանված տվյալները անվտանգ են։
      </p>
      <button type="button" onClick={retry} className="btn btn-primary mt-6">
        Փորձել կրկին
      </button>
    </div>
  );
}
