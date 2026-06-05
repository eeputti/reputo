import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="brand" aria-label="Reputo">
      <span className="brand-mark">R</span>
      <span>Reputo</span>
    </Link>
  );
}

