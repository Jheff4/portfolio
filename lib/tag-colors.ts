// Maps known blog tags to a distinct color so the tag row is scannable at a
// glance (topic areas differentiated by color) instead of a wall of
// identical gray chips. Unrecognized tags fall back to the neutral style.
const TAG_COLORS: Record<string, string> = {
  Performance: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  Security: "border-red-500/30 bg-red-500/10 text-red-300",
  React: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  "Framer Motion": "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300",
  "Node.js": "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  TypeScript: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  "Next.js": "border-zinc-400/30 bg-zinc-400/10 text-zinc-200",
  AI: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  Accessibility: "border-teal-500/30 bg-teal-500/10 text-teal-300",
};

const FALLBACK = "border-zinc-700 bg-zinc-800 text-zinc-300";

export function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? FALLBACK;
}
