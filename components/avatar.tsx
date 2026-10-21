import Image from "next/image";

const gradients = [
  "from-[var(--brand-btn)] to-[var(--brand-2)]",
  "from-[var(--accent)] to-[var(--accent-light)]",
  "from-[var(--brand-2)] to-[var(--accent)]",
  "from-[var(--ink)] to-[var(--brand-btn)]",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ name, photo, className = "size-12 text-base" }: { name: string; photo?: string; className?: string }) {
  if (photo) {
    return (
      <span className={`relative block shrink-0 overflow-hidden rounded-full ${className}`}>
        <Image src={photo} alt={name} fill sizes="200px" className="object-cover" unoptimized />
      </span>
    );
  }
  const gradient = gradients[name.length % gradients.length];
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-linear-to-br font-bold text-white ${gradient} ${className}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
