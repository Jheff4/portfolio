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
            {/* Lucide: rocket — Founding Engineer */}
            <svg className={s.iconBlue} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Founding Engineer · Hexagon Digital Services</p>
            <p className={s.contentSubtitle}>Building Copilot for Insurance Industry</p>
            <p className={s.contentText}>Series A Startup · Remote</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "Leading UI/UX for Copilot to automate insurance workflows",
            "Built Kay Admin App, Client App, and Demo Instance",
            "Experimenting with emerging AI models and UX paradigms",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletBlue} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["React", "TypeScript", "Tailwind", "Python"].map((t) => (
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
          <div className={s.iconContainerPurple}>
            {/* Lucide: code-xml — Co-Founder / CTO */}
            <svg className={s.iconPurple} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Co-Founder / CTO · Hexagon Digital Services</p>
            <p className={s.contentSubtitle}>Designed and developed LLMOps Platform</p>
            <p className={s.contentText}>Pre-Seed Startup · 6 Team Members</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "Led design and development of LLMOps Platform",
            "Built proxy middleware with Cloudflare Workers (sub-20ms)",
            "Created LLM-Powered Apps: Divedash & Almada",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletPurple} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["React", "TypeScript", "Rails", "AWS", "Cloudflare"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2019 - 2020",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerRose}>
            {/* Lucide: graduation-cap — Freelance / Student */}
            <svg className={s.iconRose} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path d="M22 10v6" />
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Freelance Developer & Student</p>
            <p className={s.contentSubtitle}>Built projects while completing education</p>
            <p className={s.contentText}>Independent Projects · Self-Learning</p>
          </div>
        </div>
        <ul className={s.list}>
          {[
            "Developed multiple web applications for local businesses",
            "Learned modern web development stack through projects",
            "Contributed to open source projects on GitHub",
          ].map((item) => (
            <li key={item} className={s.listItem}>
              <div className={s.bulletRose} />
              {item}
            </li>
          ))}
        </ul>
        <div className={s.techBadgesContainer}>
          {["JavaScript", "HTML/CSS", "Node.js", "MongoDB"].map((t) => (
            <span key={t} className={s.techBadge}>{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Key Achievements",
    content: (
      <div className={s.itemContainer}>
        <div className={s.itemFlexContainer}>
          <div className={s.iconContainerEmerald}>
            {/* Lucide: award — Key Achievements */}
            <svg className={s.iconEmerald} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
              <circle cx="12" cy="8" r="6" />
            </svg>
          </div>
          <div>
            <p className={s.contentTitle}>Milestones & Recognition</p>
            <p className={s.contentSubtitle}>Significant achievements across journey</p>
          </div>
        </div>
        <div className={s.achievementGrid}>
          {[
            { label: "Funding Raised", value: "$100K+", sub: "From accelerators & investors" },
            { label: "Users Served", value: "33M+", sub: "Across all platforms" },
            { label: "Startups Founded", value: "3", sub: "As Co-Founder/CTO" },
            { label: "Years Experience", value: "5+", sub: "Building at scale" },
          ].map(({ label, value, sub }) => (
            <div key={label} className={s.achievementCard}>
              <p className={s.achievementCardTitle}>{label}</p>
              <p className={s.achievementCardValue}>{value}</p>
              <p className={s.achievementCardSub}>{sub}</p>
            </div>
          ))}
        </div>
        <div className={s.specializationContainer}>
          <p className={s.specializationTitle}>Specializations</p>
          <div className={s.specializationBadgesContainer}>
            {["AI/ML Applications", "Startup Scaling", "Full-Stack Development", "Team Leadership"].map((spec) => (
              <span key={spec} className={s.specializationBadge}>{spec}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const techCategories = [
  { label: "Frontend", color: s.textBlue, techs: "React, TypeScript, Tailwind, Next.js" },
  { label: "Backend", color: s.textGreen, techs: "Node.js, GoLang, Rails, Python" },
  { label: "AI/ML", color: s.textPurple, techs: "OpenAI, LangChain, Vector DBs" },
  { label: "Databases", color: s.textAmber, techs: "PostgreSQL, Redis, MongoDB, TimescaleDB" },
  { label: "Cloud & DevOps", color: s.textRose, techs: "AWS, Cloudflare, Docker, CI/CD" },
  { label: "Tools", color: s.textCyan, techs: "Git, Figma, Vercel, Agile/Scrum" },
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
          Frontend engineer focused on shipping fast, accessible interfaces with
          strong attention to animation and performance. Here&apos;s a timeline
          of the roles and experiences that shaped that.
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
              <p className={s.techSectionTitle}>Technologies Mastered</p>
              <p className={s.techSectionSubtitle}>Full-stack expertise across modern tech stack</p>
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
