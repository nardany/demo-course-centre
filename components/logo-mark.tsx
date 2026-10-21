/** Demo logo drawn inline so it follows the selected colour palette. */
export function LogoMark({ className = "size-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M14 8h36a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10H30l-12 9 2-9h-6A10 10 0 0 1 4 38V18A10 10 0 0 1 14 8z"
        fill="var(--brand-btn)"
      />
      <path
        d="m32 15 3.7 7.6 8.3 1.2-6 5.9 1.4 8.3-7.4-3.9-7.4 3.9 1.4-8.3-6-5.9 8.3-1.2z"
        fill="var(--accent)"
      />
    </svg>
  );
}
