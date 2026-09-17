import type { ReactNode } from "react";

export type CalloutType = "note" | "tip" | "warning" | "danger" | "important";

const CONFIG: Record<
  CalloutType,
  { label: string; border: string; bg: string; text: string; icon: ReactNode }
> = {
  note: {
    label: "Note",
    border: "border-sky-500/40",
    bg: "bg-sky-500/10",
    text: "text-sky-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8h.01M11 12h1v4h1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  tip: {
    label: "Tip",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M9 18h6M10 22h4M12 2a6 6 0 00-4 10.5c.6.6 1 1.5 1 2.5h6c0-1 .4-1.9 1-2.5A6 6 0 0012 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  important: {
    label: "Important",
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
    text: "text-violet-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M12 2 2 7v6c0 5 4 9 10 9s10-4 10-9V7z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v5M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  warning: {
    label: "Warning",
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  danger: {
    label: "Danger",
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    text: "text-red-300",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export function Callout({ type = "note", children }: { type?: CalloutType; children?: ReactNode }) {
  const config = CONFIG[type] ?? CONFIG.note;
  return (
    <div className={`not-prose my-6 rounded-xl border ${config.border} ${config.bg} px-5 py-4`}>
      <div className={`flex items-center gap-2 text-sm font-semibold ${config.text}`}>
        {config.icon}
        {config.label}
      </div>
      <div className="callout-body mt-2 text-[1.05rem] leading-7 text-zinc-300 [&>p]:mt-0 [&>p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}
