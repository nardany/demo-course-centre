"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const observe = () =>
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
