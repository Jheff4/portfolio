// About page — Server Component. All static content; no interactivity needed.
// The Gmail compose link is built server-side and injected as a plain href.
import Link from "next/link";
import { aboutPageStyles as s } from "@/lib/styles";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Frontend engineer building fast, resilient interfaces for wallets, exchanges, and AI products.",
};

const email = "ogbevoenetinosa@gmail.com";

const interests = [
  "FRONTEND ENGINEER",
  "FULL-STACK DEV",
  "LLMS",
  "MUSIC",
  "FOOTBALL",
  "FASHION",
  "READING",
  "TRAVEL",
];

const techStack = [
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "Tailwind",
  "GraphQL",
  "WebSockets",
  "Node.js",
  "LLMs",
];

export default function AboutPage() {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <div className={s.pageContainer}>
      <div className={s.contentContainer}>

        <div className={s.backgroundContainer}>
          {/* Beams as an absolute background decoration behind the content */}
          <div className={s.backgroundEffect}>
            <BackgroundBeamsWithCollision />
          </div>

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

            {/* What I've shipped — flagship work at a glance, links to details */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                What I&apos;ve shipped
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Razor DEX", slug: "razor-dex", blurb: "Move-ecosystem DEX (Aptos, Sui, Movement) — first on Movement", metric: "1.47M+ users · 50M+ transactions" },
                  { title: "Razor Kit", slug: "razor-kit", blurb: "Open-source wallet-connection kit for Movement", metric: "MIT · TypeScript · 100% coverage" },
                  { title: "Sportz", slug: "sportz", blurb: "Real-time multi-sport broadcast platform", metric: "Sub-second latency · 95 tests" },
                  { title: "Echo", slug: "echo", blurb: "Multi-tenant AI customer-support SaaS", metric: "RAG · full tenant isolation" },
                ].map(({ title, slug, blurb, metric }) => (
                  <Link
                    key={slug}
                    href={`/projects/${slug}`}
                    className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{title}</p>
                      <svg
                        className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{blurb}</p>
                    <p className="mt-2 text-xs font-medium text-amber-400">{metric}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Content sections */}
            <div className={s.sectionsContainer}>

              <section>
                <h2 className={s.sectionHeading}>Who I Am</h2>
                <p className={s.paragraph}>
                  Hey, I&apos;m Etinosa — a frontend engineer with{" "}
                  <strong className="font-semibold text-white">5+ years</strong>{" "}
                  building interfaces where mistakes are expensive: crypto
                  wallets, exchanges, and AI products. As one of Razor&apos;s
                  first engineers, I lead frontend across its DEX — now at{" "}
                  <strong className="font-semibold text-white">1.47M+ users</strong>{" "}
                  — and a wallet{" "}
                  <strong className="font-semibold text-white">80,000+</strong>{" "}
                  people trust, and I care most about the unglamorous part of the
                  craft — keeping a product fast, correct, and resilient when the
                  network fails underneath it.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>What I Do</h2>
                <p className={s.paragraph}>
                  I own frontend architecture for products that can&apos;t
                  afford to break. That means real-time state that stays
                  consistent, money-moving flows that are race-safe and
                  idempotent, and failure handled as a first-class case rather
                  than an afterthought — all without losing the polish that
                  separates a good UI from a great one. I have an obsessive eye
                  for the details most people never register — every stroke,
                  indent, and half-degree tilt — because those are exactly what
                  make an interface feel considered. Frontend-first, but
                  comfortable across the stack: GraphQL, WebSockets,
                  observability, and LLM integration when a project needs it.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>How I Work</h2>
                <p className={s.paragraph}>
                  I chase the root cause, not the symptom — when a cursor shows a
                  pointer where there&apos;s no link, I don&apos;t hide the icon,
                  I hunt down the invisible overlay that made it one. Nothing
                  ships until I&apos;ve watched it behave: resized to 320px, poked
                  at the awkward in-between widths, broken on purpose. I build
                  for scale before it shows up — the data model, the folder
                  structure, the state boundaries all assume the product is going
                  to get much bigger, so growth becomes a non-event instead of a
                  rewrite. I hold motion and performance to the same bar — I
                  won&apos;t trade away smooth, deliberate animation to hit a load
                  time, or the reverse; done right, it earns both. And I build for the moment things go
                  wrong: the network drops, the model hallucinates, a provider
                  falls over — in the products I work on, that&apos;s not the edge
                  case, it&apos;s the job.
                </p>
                <p className={`${s.paragraph} mt-4`}>
                  Underneath all of it I&apos;m endlessly curious. I pick up a new
                  tool by rebuilding something real with it, and I&apos;d always
                  rather understand why something works than memorize that it
                  does — that&apos;s the part of the job I&apos;d do for free.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>My Journey</h2>
                <p className={s.paragraph}>
                  I started building for the web in{" "}
                  <strong className="font-semibold text-white">2018</strong> and
                  narrowed from generalist into frontend engineering at scale.
                  Today I lead frontend across Razor&apos;s Move-ecosystem
                  products — a DEX that&apos;s first on Movement (
                  <strong className="font-semibold text-white">1.47M+ users</strong>
                  ,{" "}
                  <strong className="font-semibold text-white">
                    50M+ transactions
                  </strong>
                  ), self-custody wallets, and an open-source wallet kit — take on
                  AI contract work, and build fintech and AI systems to a
                  production standard, documenting the decisions as I go. Along
                  the way I&apos;ve mentored dozens of developers.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>Vision</h2>
                <p className={s.paragraph}>
                  LLMs are reshaping how interfaces are built and how people
                  interact with software. I want to stay at the edge of that
                  shift — building the tools and the UX that make AI genuinely
                  reliable and useful in everyday work, not just impressive in a
                  demo.
                </p>
              </section>

              <section>
                <h2 className={s.sectionHeading}>Beyond Code</h2>
                <p className={s.paragraph}>
                  Big on music — it runs under everything I do — with football
                  never far off. I care about fashion, read widely, and travel
                  when I can; the stuff away from the screen sharpens the taste
                  that goes back into the work.
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
