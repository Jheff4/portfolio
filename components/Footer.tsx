"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const formatTime = () => new Date().toLocaleTimeString();

export default function Footer() {
  const [timeNow, setTimeNow] = useState("");

  useEffect(() => {
    const initialId = window.setTimeout(() => setTimeNow(formatTime()), 0);
    const intervalId = window.setInterval(() => setTimeNow(formatTime()), 1000);
    return () => {
      window.clearTimeout(initialId);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <footer className="relative pb-12 md:pb-5 bg-zinc-950 border-t border-zinc-800 text-zinc-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-20 py-5">
        <Link
          href="/contact"
          className="text-lg cursor-pointer hover:text-zinc-100 transition-colors"
        >
          Reach out →
        </Link>
        <TextHoverEffect text="ETINOSA" />
        <div className="text-lg tabular-nums">{timeNow}</div>
      </div>
    </footer>
  );
}
