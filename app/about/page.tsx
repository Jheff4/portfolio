// About page — Server Component. All static content; no interactivity needed.
// The Gmail compose link is built server-side and injected as a plain href.
import Link from "next/link";
import { aboutPageStyles as s } from "@/lib/styles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Frontend engineer. AI builder. I care about the gap between a good UI and a great one.",
};

const email = "ogbevoenetinosa@gmail.com";

const interests = [
  "FULL-STACK DEV",
  "AI ENGINEER",
  "LLMS",
  "TRAVEL",
  "MUSIC",
  "F1",
  "READING",
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Postgres",
  "LLMs",
];

export default function AboutPage() {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <div className={s.pageContainer}>
      <div className={s.contentContainer}>

        <div className={s.backgroundContainer}>
          <div className={s.contentWrapper}>

            {/* Large name heading — the signature visual of this page */}
            <h1 className={s.mainHeading}>Etinosa</h1>

            {/* Interests dot-separated row */}
            <div className={s.interestsContainer}>
              {interests.map((interest, i) => (
                <span key={interest} className={s.interestItem}>
                  {interest}
                  {i < interests.length - 1 && (
                    <span className={s.interestSeparator} aria-hidden>·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Tech stack pills */}
            <div className={s.techStackContainer}>
              {techStack.map((tech) => (
                <span key={tech} className={s.techPill}>{tech}</span>
              ))}
            </div>

            {/* Content sections */}
            <div className={s.sectionsContainer}>

              <section>
                <h2 className={s.sectionHeading}>Who I Am</h2>
                <p className={s.paragraph}>
                  Hey, I&apos;m Etinosa — a frontend engineer with a sharp eye
                  for detail and a bias for shipping. I&apos;ve been building
                  interfaces since 2018, writing about performance, AI tooling,
                  and the craft of making things that feel great to use.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>What I Do</h2>
                <p className={s.paragraph}>
                  I build fast, accessible, and visually sharp products. My
                  focus is on the frontend — architecture, animation quality,
                  loading performance — but I&apos;m comfortable across the
                  stack when the project needs it. I care about the gap between
                  a good UI and a great one.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>My Journey</h2>
                <p className={s.paragraph}>
                  Started freelancing in HTML/CSS, moved through startups as a
                  generalist, and eventually narrowed into frontend engineering
                  with a growing focus on AI-integrated products. Recently
                  shipped several micro-builds and SaaS experiments, keeping the
                  shipping momentum going.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>Vision</h2>
                <p className={s.paragraph}>
                  LLMs will reshape how interfaces are built and how people
                  interact with software. I want to stay at the edge of that
                  transformation — building the tools and the UX that make AI
                  actually useful in everyday work.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>Beyond Code</h2>
                <p className={s.paragraph}>
                  Into house music, follow F1 (Verstappen), play chess, and read
                  widely. Travelling when possible — experiences outside the
                  screen sharpen the taste that goes into the work.
                </p>
              </section>

            </div>

            {/* CTA buttons */}
            <div className={s.ctaContainer}>
              <Link
                href="/contact"
                className={s.primaryButton}
                aria-label="Get in touch — open contact page"
              >
                Get in Touch
              </Link>
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.secondaryButton}
                aria-label={`Compose email to ${email} in Gmail`}
              >
                <svg
                  className={s.emailIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                E-Mail
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
