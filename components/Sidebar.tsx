"use client";

// "use client" is required here because:
// - usePathname() reads the current route (browser API)
// - useState() drives the mobile menu open/close
// The trade-off: this whole component is included in the client JS bundle.
// To minimise that cost, keep all data (navItems, socials) as plain constants —
// no fetching, no context, just serialisable values.

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { sidebarStyles as s } from "@/lib/styles";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const HomeIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 11L12 4l9 7v9a1 1 0 0 1-1 1h-5v-5H9v5H4a1 1 0 0 1-1-1v-9z"
    />
  </svg>
);
const ProjectsIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h10v8H4zM10 14h10v6H10zM14 4h6v6h-6z"
    />
  </svg>
);
const ExperienceIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 3h10l3 4v14H4V7z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 3v4h4M8 13h8M8 17h8"
    />
  </svg>
);
const ToolsIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 7a4 4 0 0 1 0 8l6 6-2 2-6-6a4 4 0 1 1 2-10z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 8l3 3" />
  </svg>
);
const UserIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden
    className={className}
    {...props}
  >
    <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 20a8 8 0 0 1 16 0"
    />
  </svg>
);
const MailIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden
    className={className}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v12H3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 7 9-7" />
  </svg>
);
const MenuIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 7h16M4 12h16M4 17h16"
    />
  </svg>
);
const CloseIcon = ({ className, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden
    className={className}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8m0-8l-8 8" />
  </svg>
);

const navItems = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/projects", label: "Projects", Icon: ProjectsIcon },
  { href: "/experience", label: "Experience", Icon: ExperienceIcon },
  { href: "/tools", label: "Tools", Icon: ToolsIcon },
  { href: "/about", label: "About", Icon: UserIcon },
  { href: "/contact", label: "Contact", Icon: MailIcon },
];

const socials = [
  {
    label: "X (Twitter)",
    href: "https://x.com/_Etinosa_",
    svgPath:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/etinosa-ogbevoen",
    svgPath:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  // Medium — commented out for now (no active profile to link yet).
  // {
  //   label: "Medium",
  //   href: "https://medium.com",
  //   svgPath:
  //     "M0 0v24h24V0H0zm19.938 5.686L18.65 7.98a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.27h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.993l-3.62 9.195h-.49L6.69 8.993v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.27H3.815v-.27L5.51 15.863a.82.82 0 0 0 .218-.707V8.98a.624.624 0 0 0-.203-.526L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.27z",
  // },
  {
    label: "Github",
    href: "https://github.com/Jheff4",
    svgPath:
      "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/by.etinosa/",
    svgPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

function EOAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-10 h-10 text-sm" : "w-12 h-12 text-base";
  return (
    <div
      className={`${sz} rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-100 select-none shadow-sm overflow-hidden group cursor-default`}
    >
      <span className="relative z-10 inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-[0.7em]">
        E
      </span>
      <span className="relative inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-[-0.7em]">
        O
      </span>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Escape key closes the drawer
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Prevent background scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Exact match for "/" to avoid highlighting Home on every page
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────── */}
      <div className={s.mobileTopNav}>
        <div className={s.mobileTopNavInner}>
          <div className={s.mobileAvatarContainer}>
            <EOAvatar size="sm" />
            <div>
              <p className={s.mobileName}>Etinosa Ogbevoen</p>
              <TypingAnimation
                className={s.mobileTyping}
                texts={[
                  "Frontend Engineer",
                  "AI Builder",
                  "Full-Stack Engineer",
                  "Product Thinker",
                  "Software Engineer",
                  "React Engineer",
                ]}
              />
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800/50 transition-colors"
            aria-label="Open menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Desktop sidebar ────────────────────────────────── */}
      <aside className={s.desktopSidebar}>
       {/* Fixed nav panel — left is the centered block's left edge, so it stays
           centered on ultra-wide yet never moves on scroll (true position: fixed) */}
       <div
         className={s.desktopSidebarInner}
         style={{ left: "max(0px, calc((100vw - 1660px) / 2))" }}
       >
        <div className={s.desktopAvatarContainer}>
          <EOAvatar size="md" />
          <div className="flex flex-col gap-1">
            <p className={s.desktopName}>Etinosa Ogbevoen</p>
            <TypingAnimation
              className={s.desktopTyping}
              texts={[
                "Frontend Engineer",
                "AI Builder",
                "Full-Stack Engineer",
                "Product Thinker",
                "Software Engineer",
                "React Engineer",
              ]}
            />
          </div>
        </div>

        <nav className={s.navContainer} aria-label="Main navigation">
          <ul className={s.navList}>
            {navItems.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${s.navItem} ${isActive(href) ? s.navItemActive : s.navItemInactive}`}
                >
                  <Icon className={s.navIcon} />
                  <span className={s.navLabel}>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className={s.connectLabel}>Connect</p>
        <ul className={s.socialList}>
          {socials.map(({ label, href, svgPath }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={s.socialItem}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={s.socialIcon}
                  aria-hidden
                >
                  <path d={svgPath} />
                </svg>
                <span className={s.socialLabel}>{label}</span>
              </a>
            </li>
          ))}
        </ul>
       </div>

        <p className={s.footerText}>Made by Etinosa | © 2026</p>
      </aside>

      {/* ── Mobile slide-out menu ──────────────────────────── */}
      {/*
        CSS-driven visibility (opacity + pointer-events) instead of conditional
        rendering — the DOM stays mounted so the transition plays both ways.
        If we used {menuOpen && <menu>} the closing animation would never run.
      */}
      <div
        className={`${s.mobileOverlay} ${menuOpen ? s.mobileOverlayVisible : s.mobileOverlayHidden}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`${s.mobileOverlayBg} ${menuOpen ? s.mobileOverlayBgVisible : s.mobileOverlayBgHidden}`}
        />
        <div
          className={`${s.mobileSidebar} ${menuOpen ? s.mobileSidebarVisible : s.mobileSidebarHidden}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={s.mobileSidebarHeader}>
            <div className={s.mobileHeaderInner}>
              <div className={s.mobileHeaderAvatarContainer}>
                <EOAvatar size="sm" />
                <div>
                  <p className={s.mobileName}>Etinosa Ogbevoen</p>
                  <p className={s.mobileTyping}>Frontend Engineer</p>{" "}
                  {/* cycles on mobile open */}
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className={s.mobileCloseButton}
                aria-label="Close menu"
              >
                <CloseIcon className={s.mobileCloseIcon} />
              </button>
            </div>
          </div>

          <div className={s.mobileContent}>
            <p className={s.mobileSectionLabel}>NAVIGATION</p>
            <ul className={s.mobileNavList}>
              {navItems.map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`${s.mobileNavItem} ${isActive(href) ? "bg-zinc-800 text-zinc-50" : "text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50"}`}
                  >
                    <Icon className={s.mobileNavIcon} />
                    <span className={s.mobileNavLabel}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className={s.mobileSectionLabel}>CONNECT</p>
              <ul className={s.mobileSocialList}>
                {socials.map(({ label, href, svgPath }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.mobileSocialItem}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={s.mobileSocialIcon}
                        aria-hidden
                      >
                        <path d={svgPath} />
                      </svg>
                      <span className={s.mobileSocialText}>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={s.mobileFooter}>
            <p className={s.mobileFooterText}>
              <span>Made by Etinosa | © 2026</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile bottom nav ──────────────────────────────── */}
      {/* Commented out — redundant with the top bar's hamburger drawer,
          which is the nav we're keeping on mobile.
      <div className={s.bottomNav}>
        <div className={s.bottomNavContainer}>
          <div className={s.bottomNavInner}>
            <div className={s.bottomNavBar}>
              <div className={s.bottomNavGrid}>
                {navItems.map(({ href, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${s.bottomNavLink} ${isActive(href) ? s.bottomNavLinkActive : s.bottomNavLinkInactive}`}
                    aria-label={href}
                  >
                    <Icon className={s.bottomNavIcon} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
    </>
  );
}
