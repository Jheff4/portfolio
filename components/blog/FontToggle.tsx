"use client";

import { useEffect, useState } from "react";

type ReadingFont = "mono" | "sans";
const STORAGE_KEY = "blog-reading-font";

function applyFont(font: ReadingFont) {
  document.documentElement.setAttribute("data-reading-font", font);
}

export function FontToggle() {
  const [font, setFont] = useState<ReadingFont>("mono");

  // Reading localStorage in the useState initializer would make the
  // client's first render (during hydration) diverge from the server's
  // plain-HTML output — a text mismatch React would warn about. Deferring
  // the read to an effect is the deliberate fix for that, even though it
  // means one extra render when a saved preference exists.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "sans" || stored === "mono") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing a client-only preference after mount is the point here, not a smell to remove
      setFont(stored);
      applyFont(stored);
    }
  }, []);

  const toggle = () => {
    const next: ReadingFont = font === "mono" ? "sans" : "mono";
    setFont(next);
    applyFont(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title="Toggle reading font"
      className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100"
    >
      <span aria-hidden className="text-sm">Aa</span>
      {font === "mono" ? "Switch to Sans" : "Switch to Mono"}
    </button>
  );
}
