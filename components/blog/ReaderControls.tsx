import Link from "next/link";
import { FontToggle } from "./FontToggle";

const ReaderIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
    {active ? (
      <path d="M4 4h16v16H4zM9 4v16" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

// isReaderMode is known server-side already (the page read it off searchParams),
// so this stays a plain prop — no client-side URL reading needed here at all.
export function ReaderControls({ slug, isReaderMode }: { slug: string; isReaderMode: boolean }) {
  const href = isReaderMode ? `/writing/${slug}` : `/writing/${slug}?reader=1`;

  return (
    <div className="flex items-center gap-2">
      <FontToggle />
      <Link
        href={href}
        title={isReaderMode ? "Exit reader mode" : "Enter reader mode"}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100"
      >
        <ReaderIcon active={isReaderMode} />
        {isReaderMode ? "Exit Reader Mode" : "Reader Mode"}
      </Link>
    </div>
  );
}
