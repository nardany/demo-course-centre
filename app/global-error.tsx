"use client";

import "./globals.css";

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="hy">
      <body className="grid min-h-dvh place-items-center bg-bg p-6 font-sans text-fg">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold">Կայքը ժամանակավորապես անհասանելի է</h1>
          <p className="mt-3 text-muted">Խնդրում ենք փորձել մի փոքր ուշ կամ զանգահարել մեզ։</p>
          <button type="button" onClick={retry} className="btn btn-primary mt-6">
            Փորձել կրկին
          </button>
        </div>
      </body>
    </html>
  );
}
