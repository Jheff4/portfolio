"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  const colors = [
    "#93c5fd",
    "#f9a8d4",
    "#86efac",
    "#fde047",
    "#fca5a5",
    "#d8b4fe",
    "#93c5fd",
    "#a5b4fc",
    "#c4b5fd",
  ];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-zinc-900"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{ transition: { duration: 2 } }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-zinc-900"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute top-[-14px] left-[-22px] h-6 w-10 stroke-[1px] text-zinc-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Mobile only: the 15,000-cell motion.div grid above is what caused the
// nav/menu lag on the contact page — mounting that many Motion components
// blocks the main thread, and CSS alone (display:none via a Tailwind
// breakpoint) doesn't help since the components still mount underneath it.
// So below md the grid isn't mounted at all (gated by matchMedia, not CSS),
// and a fixed, viewport-anchored noise texture is shown instead — a single
// SVG feTurbulence filter, no elements to mount and no grid lines. `fixed`
// (not `absolute`) means it always covers the full screen regardless of how
// tall the page's content makes it.
const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

const MobileGridBackground = () => (
  <div
    className="fixed inset-0 z-0 bg-zinc-950"
    style={{
      backgroundImage: `url("${NOISE_SVG}")`,
      backgroundSize: "200px 200px",
      opacity: 0.15,
    }}
  />
);

const BoxesCoreMemo = React.memo(BoxesCore);

export const Boxes = (props: { className?: string }) => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Render nothing until the media query resolves client-side, so mobile
  // never briefly mounts (then unmounts) the 15,000-cell grid.
  if (isDesktop === null) return null;

  return isDesktop ? <BoxesCoreMemo {...props} /> : <MobileGridBackground />;
};
