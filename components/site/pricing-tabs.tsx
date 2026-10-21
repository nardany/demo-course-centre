"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { Course, Package } from "@/lib/types";
import { PackageCard } from "./package-card";

const PREFIX = "#pricing-";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export function PricingTabs({ courses, packages }: { courses: Course[]; packages: Package[] }) {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => "");
  const sectionRef = useRef<HTMLDivElement>(null);

  const priceOf = (pkg: Package, courseId: string) => String(pkg.prices?.[courseId] ?? "").trim();
  const tabs = courses.filter((c) => packages.some((p) => priceOf(p, c.id)));
  const fromHash = hash.startsWith(PREFIX) ? hash.slice(PREFIX.length) : "";
  const selected = tabs.find((c) => c.id === fromHash) ?? tabs[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!fromHash || !el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [fromHash]);

  if (!selected) return null;
  const visible = packages.filter((p) => priceOf(p, selected.id));

  return (
    <div ref={sectionRef} className="scroll-mt-28">
      {tabs.length > 1 && (
        <nav aria-label="Լեզու" className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-1 rounded-xl border-[1.5px] border-border bg-surface p-1.5">
          {tabs.map((course) => {
            const active = course.id === selected.id;
            return (
              <a
                key={course.id}
                href={`${PREFIX}${course.id}`}
                aria-current={active ? "true" : undefined}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  active ? "bg-[var(--ink)] text-white dark:bg-brand-btn" : "text-muted hover:bg-surface-2 hover:text-fg"
                }`}
              >
                <span className={`text-xs font-black ${active ? "text-accent" : ""}`}>{course.code}</span>
                {course.name}
              </a>
            );
          })}
        </nav>
      )}

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted">
          {selected.name}ի արժեքների համար զանգահարեք կամ գրեք մեզ։
        </p>
      ) : (
        <div
          key={selected.id}
          className={`mx-auto mt-14 grid items-stretch gap-6 md:grid-cols-2 ${
            visible.length >= 4 ? "max-w-7xl lg:grid-cols-4" : "max-w-6xl lg:grid-cols-3"
          }`}
        >
          {visible.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} price={priceOf(pkg, selected.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
