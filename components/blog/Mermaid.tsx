"use client";

import { useEffect, useId, useRef, useState } from "react";

// mermaid is loaded dynamically (not at module scope) because it's a large,
// browser-oriented library with no reason to be part of the server bundle —
// this component only ever runs client-side anyway.
export function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/[:]/g, "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        themeVariables: {
          background: "#09090b",
          primaryColor: "#27272a",
          primaryTextColor: "#f4f4f5",
          primaryBorderColor: "#f59e0b",
          lineColor: "#71717a",
          secondaryColor: "#18181b",
          tertiaryColor: "#18181b",
        },
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="my-8 overflow-x-auto rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-400">
        Mermaid diagram failed to render: {error}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-8 flex justify-center overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 [&_svg]:max-w-full"
    />
  );
}
