export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  slug: string;
  image: string;
  tags: string[];
  status: "active" | "archived";
  links: {
    visit?: string;
    github?: string;
    pypi?: string;
    link?: string;
    youtube?: string;
    archive?: string;
    howIBuilt?: string;
  };
  author: string;
  authorAvatar: string;
  techStack: string[];
  features: string[];
  learningOutcomes: string[];
}

/**
 * Flagship work — the projects that carry Etinosa's real senior story.
 *
 * TODO (Etinosa): supply real links + images/videos where marked. Images are
 * referenced at /public/projects/<slug>.jpg — drop the files in and they render.
 * Tech stacks marked with "confirm" are conservative guesses; correct as needed.
 */
export const projects: Project[] = [
  {
    id: "1",
    title: "Razor — Web3 Wallet & DEX",
    slug: "razor",
    description:
      "Lead frontend across three Web3 products on Movement — the first DEX, which scaled to 1.47M+ users, plus browser & mobile wallets.",
    detailedDescription:
      "Razor is a suite of three production Web3 products in the Movement blockchain ecosystem: the first decentralized exchange on Movement, a browser-extension wallet, and a React Native / Expo mobile wallet. As lead frontend engineer I own the architecture and UI consistency across all three codebases. The DEX ships swap, liquidity pools, and a lottery, and has scaled to 1.47M+ users and 50M+ transactions (32M+ swaps and 7.5M+ liquidity operations). The whole thing lives under one hard constraint: a money-moving interface has to stay fast, correct, and resilient while providers, networks, and quotes fail underneath it.",
    image: "/projects/razor.jpg", // TODO: add image
    tags: ["Web3", "Wallet", "DEX", "React Native", "TypeScript"],
    status: "active",
    techStack: ["React", "TypeScript", "React Native / Expo", "Redux", "Wagmi / Viem", "GraphQL"],
    features: [
      "Three products, one system: the first DEX on Movement, a browser-extension wallet, and a React Native / Expo mobile wallet",
      "A DEX that scaled to 1.47M+ users and 50M+ transactions — 32M+ swaps and 7.5M+ liquidity operations",
      "Built the swap interface at the center of that volume — race- and stale-quote-safe",
      "RPC failover (health checks, retry/timeout, fallback) that keeps wallets working through provider outages",
      "Core wallet flows across extension + mobile: account generation, network switching, secure storage, full transaction-lifecycle tracking",
      "A reusable component library standardizing UI across all three codebases",
    ],
    learningOutcomes: [
      "Owned frontend architecture across three separate codebases and kept them visually and behaviorally consistent",
      "Built an RPC failover layer so a single provider outage never takes wallets offline",
      "Engineered swap state to stay correct under stale quotes and network churn at 50M+ transaction scale",
      "Integrated monitoring that surfaced production frontend errors which previously failed silently",
    ],
    links: {
      visit: "https://razordex.xyz",
      link: "https://chromewebstore.google.com/detail/razor-wallet/fdcnegogpncmfejlfnffnofpngdiejii",
    },
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
  {
    id: "2",
    title: "Sportz — Real-Time Broadcast Platform",
    slug: "sportz",
    description:
      "A full-stack real-time multi-sport broadcast system delivering live scores and commentary at sub-second latency.",
    detailedDescription:
      "Sportz is a full-stack real-time broadcast platform that streams live scores and ball-by-ball commentary to viewers at sub-second latency. It's built the way production systems should be: real-time state as a single source of truth, a full test pyramid, end-to-end observability, and hardened APIs — with the whole architecture and its failure modes documented in a 50+ page engineering handbook.",
    image: "/projects/sportz.jpg", // TODO: add image
    tags: ["Real-time", "Full-Stack", "TypeScript", "Observability", "Testing"],
    status: "active",
    techStack: [
      "TypeScript",
      "Node.js",
      "Express",
      "WebSockets",
      "PostgreSQL (Neon)",
      "OpenTelemetry",
      "Sentry",
      "Docker",
    ],
    features: [
      "Live scores and ball-by-ball commentary at sub-second latency via room-scoped pub/sub",
      "Heartbeat-based ghost-connection reaping and exponential-backoff reconnect",
      "Server state unified as a single source of truth — removing an entire fetched-vs-live reconciliation layer",
      "Full test pyramid: 95 backend tests against real databases and live WebSocket pairs, plus e2e with accessibility scanning on production builds",
      "End-to-end observability across browser, backend, and database as a single trace",
      "API hardening — rate limiting, bot detection, and schema validation at every boundary",
      "CI/CD on both repos, a multi-stage non-root Docker backend, and per-PR preview deploys",
    ],
    learningOutcomes: [
      "Designed real-time delivery correct by construction — room-scoped pub/sub, ghost-connection reaping, backoff reconnect",
      "Collapsed fetched-vs-live state into one source of truth, deleting a whole class of reconciliation bugs",
      "Made the system observable end to end so a single request is followable browser → backend → DB",
      "Authored a 50+ page handbook of ADRs and production post-mortems as it was built",
    ],
    links: {
      // TODO: add repo link if shareable
    },
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
  {
    id: "3",
    title: "Stratos Wallet",
    slug: "stratos-wallet",
    description:
      "A production-grade fintech wallet frontend built around ledger-first correctness and real-time resilience.",
    detailedDescription:
      "Stratos is a production-grade fintech wallet frontend — a deliberate deep-dive into the hard parts of money software on the client: correctness, real-time state, and resilience under failure. It pairs a ledger-first data model with a custom real-time reliability protocol and a chaos harness that proves the UI degrades gracefully instead of only working on the happy path.",
    image: "/projects/stratos.jpg", // TODO: add image
    tags: ["Fintech", "React", "TypeScript", "GraphQL", "Real-time"],
    status: "active",
    techStack: [
      "React 19",
      "TypeScript (strict)",
      "GraphQL (codegen)",
      "TanStack Query",
      "Zustand",
      "WebSockets",
      "MSW",
      "Vitest",
    ],
    features: [
      "Ledger-first data model — an append-only ledger with balances derived, never stored",
      "Contract-first codegen with optimistic mutations, cache-snapshot rollback, and idempotency keys on every money-moving operation",
      "Custom WebSocket reliability protocol: sequence numbers with gap detection, dedup, missed-event replay on reconnect, backoff with jitter",
      "Chaos / fault-injection harness with 18 failure presets to verify graceful degradation",
    ],
    learningOutcomes: [
      "Chose event-sourced, derived balances over stored balances — no drift, with a documented snapshot scaling path",
      "Built at-least-once real-time delivery correct by construction: dedup by event ID, replay missed events on reconnect",
      "Made money operations safe against double-submits with idempotency keys and rollback snapshots",
      "Made resilience testable by injecting 18 failure modes instead of trusting the happy path",
    ],
    links: {
      // TODO: add repo / live / docs links
    },
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
  {
    id: "4",
    title: "Echo — Multi-Tenant AI Support SaaS",
    slug: "echo",
    description:
      "A multi-tenant AI customer-support platform with an embeddable widget, RAG, and hard tenant isolation.",
    detailedDescription:
      "Echo is a multi-tenant AI customer-support SaaS: an embeddable AI support widget backed by a retrieval-augmented generation pipeline, real-time conversation management, and human-escalation workflows — with full organization isolation and production security boundaries so one tenant can never reach another's data.",
    image: "/projects/echo.jpg", // TODO: add image
    tags: ["AI", "RAG", "SaaS", "Multi-Tenant"],
    status: "active",
    techStack: ["React", "TypeScript", "RAG", "Embeddings", "Vector Search", "Node.js"], // confirm/expand
    features: [
      "Embeddable AI support widget with a retrieval-augmented generation pipeline",
      "Full organization isolation across every tenant",
      "Real-time conversation management with human-escalation workflows",
      "Production security boundaries: tenant-scoped authorization and a plugin architecture that stores only secret references, with credentials in a managed secrets store",
    ],
    learningOutcomes: [
      "Designed hard multi-tenant isolation so a bug can't leak one org's data to another",
      "Built a RAG pipeline that grounds answers in each tenant's own knowledge",
      "Kept credentials out of the app entirely — only secret references stored, real secrets in a managed store",
    ],
    links: {
      // TODO: add link if shareable
    },
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
  {
    id: "5",
    title: "Geoscape — AI Email Automation",
    slug: "geoscape",
    description:
      "Contract work: an AI platform that classifies email intent and automates CRM workflows, with a reliability layer.",
    detailedDescription:
      "A contract build: an AI-powered email management and workflow automation platform that reads incoming email intent and routes requests straight into CRM workflows, replacing manual triage. The core of the work is an AI reliability layer — structured prompting, output validation, confidence-based routing, and fallback behavior — so malformed or hallucinated model responses never reach downstream CRM systems. Built on the Vercel AI SDK (Gemini).",
    image: "/projects/geoscape.jpg", // TODO: add image
    tags: ["AI", "LLM", "Automation", "Contract"],
    status: "active",
    techStack: ["React", "TypeScript", "Vercel AI SDK", "Gemini", "Node.js"],
    features: [
      "Classifies incoming email intent and routes requests into CRM workflows automatically",
      "AI reliability layer: structured prompting, output validation, confidence-based routing, and fallback",
      "Agent dashboard for reviewing, monitoring, and overriding AI decisions",
      "Provider-agnostic LLM integration on the Vercel AI SDK (Gemini) — swappable without rewrites",
    ],
    learningOutcomes: [
      "Treated an LLM as an unreliable dependency and built validation + fallback so bad output never reaches the CRM",
      "Replaced manual email triage with confidence-based automated routing",
      "Kept a human in the loop with an override dashboard rather than a black box",
    ],
    links: {
      // TODO: add link if shareable (contract — may stay private)
    },
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
];

/* -------------------------
   Helper utilities
   ------------------------- */

/** Return a project by slug or null */
export function getProjectBySlug(slug: string | undefined | null): Project | null {
  // defensive normalization: decode URI components, coerce to string, trim
  const normalized = decodeURIComponent(String(slug ?? "")).trim();
  if (!normalized) return null;
  return projects.find((p) => p.slug === normalized) ?? null;
}
/** Return all slugs (useful for generateStaticParams or getStaticPaths) */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/** Compose the canonical URL for a project (useful in UIs) */
export function getProjectUrl(project: Project | { slug: string }) {
  return `/projects/${project.slug}`;
}

/** Return all projects (shallow copy) */
export function getAllProjects(): Project[] {
  return [...projects];
}
