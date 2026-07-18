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
    x?: string;
  };
  /** True when the source is closed (employer-owned, NDA, etc.) — surfaced as a badge instead of leaving the reader to wonder why there's no GitHub link. */
  isPrivateRepo?: boolean;
  /** Short reason shown alongside the private badge, e.g. "NDA". */
  privateRepoNote?: string;
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
    title: "Razor DEX",
    slug: "razor-dex",
    description:
      "A DEX for the Move ecosystem (Aptos, Sui, Movement) — and the first to launch on Movement — at the center of 50M+ transactions.",
    detailedDescription:
      "Razor DEX is a decentralized exchange for the Move ecosystem — the chains built on the Move language, including Aptos, Sui, and Movement — and the first DEX to launch on Movement. I lead the frontend — the swap interface, liquidity pools, and an on-chain lottery — built for correctness while quotes, providers, and the network shift underneath it. Across the ecosystem it has processed 50M+ transactions (32M+ swaps and 7.5M+ liquidity operations) for 1.47M+ users.",
    image: "/projects/razor-dex.jpg", // TODO: product screenshot
    tags: ["Web3", "DEX", "DeFi", "Frontend", "TypeScript"],
    status: "active",
    techStack: ["React", "TypeScript", "Redux", "Wagmi / Viem", "GraphQL"],
    features: [
      "Swap interface engineered against race conditions and stale-quote trades",
      "Liquidity pools driving 7.5M+ add/remove-liquidity operations",
      "On-chain lottery",
      "50M+ transactions and 32M+ swaps processed across 1.47M+ users",
      "Multi-chain across the Move ecosystem (Aptos, Sui, Movement) — and the first DEX to launch on Movement",
    ],
    learningOutcomes: [
      "Engineered swap state to stay correct under stale quotes and network churn at 50M+ transaction scale",
      "Kept every money-moving flow race-safe and idempotent",
      "Built first-mover on a brand-new chain — no established tooling to lean on",
    ],
    links: {
      visit: "https://razordex.xyz",
      x: "https://x.com/RazorDex_",
    },
    isPrivateRepo: true,
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
  {
    id: "2",
    title: "Razor Wallet",
    slug: "razor-wallet",
    description:
      "A self-custody wallet for the Move ecosystem (Aptos, Sui, Movement), across browser extension and mobile, trusted by 80K+ people.",
    detailedDescription:
      "Razor Wallet is a self-custody wallet for the Move ecosystem — Aptos, Sui, and Movement — shipping as a browser extension (80,000+ installs) and a React Native / Expo mobile app for iOS and Android. I lead the frontend across both — account generation and management, network switching, secure storage, and full transaction-lifecycle tracking — backed by an RPC failover layer that keeps wallets working through provider outages.",
    image: "/projects/razor-wallet.jpg", // TODO: product screenshot
    tags: ["Web3", "Wallet", "React Native", "Frontend", "TypeScript"],
    status: "active",
    techStack: ["React", "TypeScript", "React Native / Expo", "Redux", "Wagmi / Viem"],
    features: [
      "Browser extension with 80,000+ installs, plus a React Native / Expo mobile app (iOS & Android)",
      "Account generation, network switching, and secure storage",
      "Full transaction-lifecycle tracking",
      "RPC failover (health checks, retry/timeout, fallback) that survives provider outages",
    ],
    learningOutcomes: [
      "Built an RPC failover layer so a single provider outage never takes wallets offline",
      "Shared one UI system across extension and mobile without forking the design",
      "Handled key generation and secure storage with the care self-custody demands",
    ],
    links: {
      visit: "https://razorwallet.xyz",
      link: "https://chromewebstore.google.com/detail/razor-wallet/fdcnegogpncmfejlfnffnofpngdiejii",
      x: "https://x.com/RazorDAO",
    },
    isPrivateRepo: true,
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
  {
    id: "3",
    title: "Razor Kit",
    slug: "razor-kit",
    description:
      "An open-source wallet-connection kit for the Move ecosystem — MIT, TypeScript, 100% coverage.",
    detailedDescription:
      "Razor Kit is the open-source wallet-connection kit for the Move ecosystem — the reusable frontend layer that lets any Move dapp (Aptos, Sui, Movement) add wallet connection and management in a few lines. Built in TypeScript with built-in themes, full customization, and 100% test coverage, published to npm and documented at kit.razorwallet.xyz. It's the standardized UI foundation behind Razor's own products, opened up for everyone.",
    image: "/projects/razor-kit.jpg", // TODO: docs / demo screenshot
    tags: ["Open Source", "TypeScript", "Library", "Web3"],
    status: "active",
    techStack: ["TypeScript", "React", "Vite", "npm"],
    features: [
      "Drop-in wallet connection and management for any Movement dapp",
      "Built-in themes and fully customizable components",
      "100% test coverage",
      "Published to npm as @razorlabs/razorkit, MIT-licensed",
    ],
    learningOutcomes: [
      "Designed a public API other developers build against — DX and docs treated as first-class",
      "Held it to 100% coverage, because a library's bugs become everyone's bugs",
      "Made it themeable by design so teams match their brand without forking",
    ],
    links: {
      visit: "https://kit.razorwallet.xyz",
      github: "https://github.com/razorlabsorg/razorkit",
      link: "https://www.npmjs.com/package/@razorlabs/razorkit",
    },
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
  {
    id: "4",
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
      github: "https://github.com/Jheff4/sportz-websockets",
    },
    author: "Etinosa Ogbevoen",
    authorAvatar: "/icon.svg",
  },
  {
    id: "5",
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
    id: "6",
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
    id: "7",
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
      // NDA — private software handling sensitive data; no public link.
    },
    isPrivateRepo: true,
    privateRepoNote: "NDA",
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
