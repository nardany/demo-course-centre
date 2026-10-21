import Image from "next/image";
import type { Course } from "@/lib/types";

export function CourseBadge({ course, className = "" }: { course: Course; className?: string }) {
  if (course.image) {
    return (
      <span className={`relative block shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/10 ${className}`}>
        <Image src={course.image} alt="" fill sizes="64px" className="object-cover" unoptimized />
      </span>
    );
  }
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl bg-brand-btn font-display font-bold text-white ${className}`}
    >
      {course.code || course.name.slice(0, 2)}
    </span>
  );
}
