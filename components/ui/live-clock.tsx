"use client";

// Needs "use client" — setInterval is a browser API.
// Kept as a tiny leaf component so the clock's JS doesn't bloat any page.
import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  // Empty string on server → hydrates with real time on client with no mismatch
  return <span suppressHydrationWarning>{time}</span>;
}
