// Experience page — "use client" required because Timeline uses framer motion scroll hooks
// (useScroll, useTransform). Those are browser APIs and can't run on the server.
// The trade-off: the entire timeline is hydrated client-side, but the data is
// serialised as literals — no fetching, so hydration is near-instant.
"use client";

import { Timeline } from "@/components/ui/timeline";
import { timelineStyles as s } from "@/lib/styles";

const legend = [
  { label: "Current Role", color: "bg-blue-500" },
  { label: "AI Startup", color: "bg-purple-500" },
  { label: "Growth Startup", color: "bg-green-500" },
  { label: "Early Career", color: "bg-amber-500" },
];

// Timeline data — one entry per role/era. The title is the year range shown
// on the left-hand sticky label. Content is the role card on the right.
const timelineData = [
  {
    title: "2024 - Present",
    content: (
      <div className="space-y-6">
        <div className={s.itemContainer}>
          <div className={s.itemFlexContainer}>
            <div className={s.iconContainerBlue}>
              <svg className={s.iconBlue} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <div>
              <p className={s.contentTitle}>Frontend Engineer · Product Studio</p>
              <p className={s.contentSubtitle}>Building AI-powered user interfaces · Remote</p>
              <p className={s.contentText}>
                Leading frontend architecture for a suite of AI tools. Focused on
                performance, animation quality, and delivering interfaces that feel
                instant and intentional.
              </p>
              <ul className={`${s.list} mt-3`}>
                {[
                  "Built core UI with Next.js App Router, Server Components, and streaming",
                  "Implemented complex animations using Framer Motion and CSS keyframes",
                  "Reduced LCP by 40% through image optimisation and font subsetting",
                  "Shipped design system used across 3 products",
                ].map((item) => (
                  <li key={item} className={s.listItem}>
                    <div className={s.bulletBlue} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={s.techBadgesContainer}>
                {["Next.js", "TypeScript", "Tailwind", "Framer Motion", "React Query"].map((t) => (
                  <span key={t} className={s.techBadge}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2022 - 2024",
    content: (
      <div className="space-y-6">
        <div className={s.itemContainer}>
          <div className={s.itemFlexContainer}>
            <div className={s.iconContainerPurple}>
              <svg className={s.iconPurple} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className={s.contentTitle}>Full-Stack Engineer · AI Startup</p>
              <p className={s.contentSubtitle}>Early-stage AI tooling company · Lagos / Remote</p>
              <p className={s.contentText}>
                Joined as a generalist engineer at seed stage. Owned the frontend
                completely and contributed to API design. Helped grow the product
                from 0 to 1,000+ daily active users.
              </p>
              <ul className={`${s.list} mt-3`}>
                {[
                  "Designed and built the entire client from scratch in React",
                  "Integrated LLM APIs (OpenAI, Anthropic) into production workflows",
                  "Collaborated directly with founders on product strategy and UX",
                  "Set up CI/CD pipelines and deployment on Vercel and Railway",
                ].map((item) => (
                  <li key={item} className={s.listItem}>
                    <div className={s.bulletPurple} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={s.techBadgesContainer}>
                {["React", "Node.js", "OpenAI API", "PostgreSQL", "Redis"].map((t) => (
                  <span key={t} className={s.techBadge}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2020 - 2022",
    content: (
      <div className="space-y-6">
        <div className={s.itemContainer}>
          <div className={s.itemFlexContainer}>
            <div className={s.iconContainerGreen}>
              <svg className={s.iconGreen} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className={s.contentTitle}>Frontend Developer · Growth Startup</p>
              <p className={s.contentSubtitle}>Series A SaaS company · Lagos</p>
              <p className={s.contentText}>
                First professional engineering role. Worked in a fast-paced team
                shipping features weekly. Developed a deep appreciation for
                component architecture and DX tooling.
              </p>
              <ul className={`${s.list} mt-3`}>
                {[
                  "Built and maintained React component library used across 4 teams",
                  "Improved test coverage from 20% to 70% with React Testing Library",
                  "Mentored 2 junior developers on frontend best practices",
                  "Migrated legacy class components to hooks across the codebase",
                ].map((item) => (
                  <li key={item} className={s.listItem}>
                    <div className={s.bulletGreen} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={s.techBadgesContainer}>
                {["React", "JavaScript", "CSS Modules", "Jest", "Webpack"].map((t) => (
                  <span key={t} className={s.techBadge}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2018 - 2020",
    content: (
      <div className="space-y-6">
        <div className={s.itemContainer}>
          <div className={s.itemFlexContainer}>
            <div className={s.iconContainerAmber}>
              <svg className={s.iconAmber} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className={s.contentTitle}>Self-taught · Early Career</p>
              <p className={s.contentSubtitle}>Freelance & Open Source · Remote</p>
              <p className={s.contentText}>
                Started coding in HTML/CSS and worked through increasingly complex
                projects. Built client websites, contributed to open source, and
                landed the first engineering role through portfolio work.
              </p>
              <div className={s.techBadgesContainer}>
                {["HTML", "CSS", "JavaScript", "Vue.js", "Firebase"].map((t) => (
                  <span key={t} className={s.techBadge}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ExperiencePage() {
  return (
    <div className={s.container}>
      <div className={s.innerContainer}>

        {/* Badge */}
        <div className={s.timelineBadge}>
          <span className={s.timelineBadgeText}>Career Timeline</span>
        </div>

        <h1 className={s.mainTitle}>Changelog from my journey</h1>
        <p className={s.mainParagraph}>
          Frontend engineer focused on shipping fast, accessible interfaces with
          strong attention to animation and performance. Here&apos;s a timeline
          of the roles and experiences that shaped that.
        </p>

        {/* Legend */}
        <div className={s.legendContainer}>
          {legend.map(({ label, color }) => (
            <div key={label} className={s.legendItem}>
              <div className={`${s.legendDot} ${color}`} />
              <span className={s.legendText}>{label}</span>
            </div>
          ))}
        </div>

        {/* Scroll-driven timeline — the vertical line fills as you scroll */}
        <Timeline data={timelineData} />

      </div>
    </div>
  );
}
