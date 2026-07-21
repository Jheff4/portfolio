// Server Component — the timeline content is static markup (no state, no handlers),
// so it's built here on the server and passed to the Timeline client leaf as props.
// Result: all role text/bullets/badges ship as zero-JS HTML; only Timeline's
// framer-motion scroll animation hydrates in the browser.
import { Timeline } from "@/components/ui/timeline";
import { timelineStyles as s } from "@/lib/styles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Career timeline — roles, milestones, and the tech I've worked with.",
};

const timelineData = [
  {
    title: "2023 - Present",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerBlue}>
            {/* Lucide: rocket */}
            <svg className={s.iconBlue} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Lead Frontend Engineer · Razor DAO</p>
            <p className={s.contentSubtitle}>The first DEX on the Movement blockchain — plus wallet & mobile</p>
            <p className={s.contentText}>Apr 2023 – Present · Remote</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            <>As one of the first engineers, helped take Razor from the first commit to <strong className="font-semibold text-white">1.47M+ users</strong> — leading frontend across three production Web3 products (the first DEX on Movement, a browser-extension wallet, and a React Native / Expo mobile wallet, iOS &amp; Android) and owning architecture and UI consistency across all three codebases</>,
            <>Built the DEX interface — swap, liquidity pools, and a lottery — at the center of <strong className="font-semibold text-white">32M+ swaps</strong> and <strong className="font-semibold text-white">50M+ total transactions</strong>, engineered against race conditions and stale-quote trades</>,
            "Architected an RPC failover system (health checks, retry/timeout, fallback selection) that keeps wallets functional through provider outages",
            "Shipped core wallet flows across extension and mobile: account generation, network switching, secure storage, and full transaction-lifecycle tracking",
            "Defined frontend architectural standards and built Razor Kit — the open-source, MIT-licensed wallet-connection kit (100% test coverage) that standardizes UI across the Movement ecosystem",
          ].map((item, i) => (
            <li key={i} className={s.listItem}>
              <div className={s.bulletBlue} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["React", "TypeScript", "React Native / Expo", "Redux", "Wagmi / Viem", "GraphQL"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerPurple}>
            {/* Lucide: code-xml */}
            <svg className={s.iconPurple} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Software Engineer · Geoscape Limited</p>
            <p className={s.contentSubtitle}>AI-powered email management & workflow automation</p>
            <p className={s.contentText}>Jul 2025 – Dec 2025 · Remote</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "Architected an automated email management system (TypeScript, Express) that listens for, processes, and routes incoming customer requests",
            "Built an AI intent-classification layer on the Vercel AI SDK — provider-agnostic (Gemini, OpenAI, Grok, and more) — to categorize emails into sales, support, and other intents and drive accurate, pre-defined agent assignment",
            "Designed backend API endpoints with validation and fault tolerance, integrated with an internal CRM and agent dashboard for real-time monitoring and full conversation-lifecycle tracking",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletPurple} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["TypeScript", "Express", "Vercel AI SDK", "Node.js"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerCyan}>
            {/* Lucide: layers */}
            <svg className={s.iconCyan} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
              <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
              <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Frontend Engineer · Movemint</p>
            <p className={s.contentSubtitle}>NFT marketplace</p>
            <p className={s.contentText}>2024 · Remote</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "Built the NFT marketplace frontend — minting, listing, and purchase flows with wallet integrations and on-chain transaction workflows",
            "Implemented wallet-connection and live transaction-status flows so users always knew where a mint or purchase stood",
            "Built marketplace discovery — collection browsing, search, and filtering — so buyers could surface the right item fast",
            "Handled the messy on-chain edge cases — pending, failed, and rejected transactions — so a dropped mint never left the UI in a broken state",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletCyan} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["React", "TypeScript", "Web3 / EVM", "Tailwind"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerAmber}>
            {/* Lucide: landmark */}
            <svg className={s.iconAmber} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" x2="21" y1="22" y2="22" />
              <line x1="6" x2="6" y1="18" y2="11" />
              <line x1="10" x2="10" y1="18" y2="11" />
              <line x1="14" x2="14" y1="18" y2="11" />
              <line x1="18" x2="18" y1="18" y2="11" />
              <polygon points="12 2 20 7 4 7" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Frontend Engineer · Lensly Finance</p>
            <p className={s.contentSubtitle}>Decentralized lending & borrowing protocol</p>
            <p className={s.contentText}>Oct 2023 – Dec 2023 · Remote</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "Built the complete frontend for a DeFi lending protocol — supplying assets, borrowing, repaying, and managing collateral positions",
            "Developed dashboards visualizing lending pools, borrowing positions, collateral ratios, and protocol stats (React, Next.js, TypeScript)",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletAmber} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["React", "Next.js", "TypeScript", "DeFi"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2022 - 2023",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerRose}>
            {/* Lucide: arrow-left-right */}
            <svg className={s.iconRose} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3 4 7l4 4" />
              <path d="M4 7h16" />
              <path d="m16 21 4-4-4-4" />
              <path d="M20 17H4" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Frontend Developer · Andex Protocol</p>
            <p className={s.contentSubtitle}>DEX protocol & wallet extension</p>
            <p className={s.contentText}>Nov 2022 – Nov 2023 · Remote</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "Built the DEX protocol interface and contributed to the browser wallet-extension frontend — wallet interaction states and transaction interfaces",
            "Built reusable UI kits and shared component libraries used across the protocol's products, connecting smart-contract logic to frontend transaction flows",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletRose} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["React", "TypeScript", "Web3 / EVM", "Component Systems"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerIndigo}>
            {/* Lucide: graduation-cap */}
            <svg className={s.iconIndigo} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path d="M22 10v6" />
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Software Development Trainee · Zuri Team</p>
            <p className={s.contentSubtitle}>Where the fundamentals were forged</p>
            <p className={s.contentText}>May 2021 – Aug 2021 · Remote</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "Intensive full-stack training — JavaScript on the frontend, Python on the backend — through collaborative, Git-based agile workflows",
            "Built Haggle, a capstone e-commerce project, with a team — wiring the full stack together end to end",
            "Cut my teeth on responsive UI, version control, and shipping as part of a team",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletIndigo} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["JavaScript", "Python", "HTML", "CSS", "Git"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2018 - 2019",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerOrange}>
            {/* Lucide: monitor */}
            <svg className={s.iconOrange} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Software Development Intern · Computer Training Institute</p>
            <p className={s.contentSubtitle}>Where it started</p>
            <p className={s.contentText}>May 2018 – Feb 2019 · On-site</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "First taste of building software — desktop apps in Visual Basic / .NET and web pages in HTML/CSS — learning application structure, program logic, and clean coding habits",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletOrange} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["Visual Basic / .NET", "HTML", "CSS"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Leadership & Impact",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerEmerald}>
            {/* Lucide: award */}
            <svg className={s.iconEmerald} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
              <circle cx="12" cy="8" r="6" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Mentorship, Speaking & Impact</p>
            <p className={s.contentSubtitle}>Numbers I can stand behind</p>
          </div>
        </div>
        <div className={s.achievementGrid}>
          {[
            { label: "Platform Users", value: "1.47M+", sub: "Razor, on Movement" },
            { label: "Transactions", value: "50M+", sub: "32M+ swaps" },
            { label: "Developers Mentored", value: "30+", sub: "and counting" },
            { label: "Years Building", value: "5+", sub: "Frontend at scale" },
          ].map(({ label, value, sub }) => (
            <div key={label} className={s.achievementCard}>
              <p className={s.achievementCardTitle}>{label}</p>
              <p className={s.achievementCardValue}>{value}</p>
              <p className={s.achievementCardSub}>{sub}</p>
            </div>
          ))}
        </div>
        <ul className={s.list}>
          {[
            <>Mentored <strong className="font-semibold text-white">30+ developers</strong> as a Software Development Mentor with 3MTT (Sep – Nov 2024) — JavaScript, TypeScript, React, Node.js, Express, and MongoDB — through hands-on builds, code reviews, and agile sprints, plus independent mentoring beyond the program</>,
            <>Spoke to secondary-school students from <strong className="font-semibold text-white">20+ schools</strong> on leveraging technology</>,
            "Author of engineering handbooks, ADRs, and post-mortems used as onboarding and learning resources for other engineers",
          ].map((item, i) => (
            <li key={i} className={s.listItem}>
              <div className={s.bulletEmerald} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className={s.specializationContainer}>
          <p className={s.specializationTitle}>Specializations</p>
          <div className={s.specializationBadgesContainer}>
            {["Frontend Architecture", "Real-time & Web3", "AI Integration", "Backend & Systems", "Mentorship"].map((spec) => (
              <span key={spec} className={s.specializationBadge}>{spec}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const techCategories = [
  { label: "Frontend", color: s.textBlue, techs: "React, Next.js, React Native, TypeScript, Tailwind" },
  { label: "State & Data", color: s.textGreen, techs: "TanStack Query, Redux Toolkit, Zustand, Jotai, REST, GraphQL, Zod" },
  { label: "Real-time & Web3", color: s.textCyan, techs: "WebSockets, reliability protocols, Wagmi, Viem, Foundry" },
  { label: "AI / LLM", color: s.textPurple, techs: "Vercel AI SDK, Gemini, RAG, embeddings" },
  { label: "Backend & Data", color: s.textAmber, techs: "Node.js, Express, PostgreSQL, AWS, Convex" },
  { label: "DevOps & Observability", color: s.textRose, techs: "Docker, GitHub Actions, Vercel, OpenTelemetry, Sentry, New Relic, PostHog" },
];

export default function ExperiencePage() {
  return (
    <div className={s.container}>
      <div className={s.innerContainer}>

        <div className={s.timelineBadge}>
          <span className={s.timelineBadgeText}>Career Timeline</span>
        </div>
        <h1 className={s.mainTitle}>Changelog from my journey</h1>
        <p className={s.mainParagraph}>
          Frontend engineer with 5+ years building interfaces where mistakes are
          expensive — wallets, exchanges, and AI products. Here&apos;s the
          timeline of roles and work that got me here.
        </p>

        <Timeline data={timelineData} />

        {/* Technologies Mastered */}
        <div className={s.techSectionContainer}>
          <div className={s.techSectionHeader}>
            <div className={s.techSectionIconContainer}>
              <svg className={s.techSectionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <p className={s.techSectionTitle}>Technologies I Work With</p>
              <p className={s.techSectionSubtitle}>Frontend-first, full-stack when it counts</p>
            </div>
          </div>
          <div className={s.techGrid}>
            {techCategories.map(({ label, color, techs }) => (
              <div key={label} className={s.techCard}>
                <p className={`${s.techCardTitle} ${color}`}>{label}</p>
                <p className={s.techCardContent}>{techs}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
