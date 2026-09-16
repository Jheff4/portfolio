"use client";

import { useState, isValidElement, type ReactNode } from "react";

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
    <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Reconstructs the plain-text source from the highlighted <pre><code> tree —
// rehype-pretty-code turns each line into nested <span> tokens, so there's no
// single "raw code" string handed to us; walking the rendered children and
// concatenating their text nodes always matches what's on screen exactly.
function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

// rehype-pretty-code always wraps highlighted code as <pre><code data-language="...">,
// so the language name for the header bar comes straight off that child.
function getLanguage(children: ReactNode): string | null {
  if (isValidElement<{ "data-language"?: string }>(children)) {
    return children.props["data-language"] ?? null;
  }
  return null;
}

export function Pre({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);
  const language = getLanguage(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(extractText(children));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be denied (permissions, insecure context) —
      // fail silently rather than throwing an unhandled rejection.
    }
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2">
        <span className="font-mono text-xs text-zinc-500">{language ?? "text"}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {/* overflow-x-auto is the whole fix: without it, a long line doesn't
          scroll — it renders past the box's edge, visually bleeding into
          whatever sits to the right (here, the table-of-contents column). */}
      <pre {...props} className="overflow-x-auto p-4 text-[0.85rem] leading-relaxed">
        {children}
      </pre>
    </div>
  );
}
