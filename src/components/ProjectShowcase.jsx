import { ExternalLink, Github, FileText, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Full case-study content for every project shown in Work.jsx. One file,
// one object, keyed by slug — same pattern as experienceContent in
// Experience.jsx. Real facts were pulled from each project's actual
// GitHub repo (ai-powered-ecommerce, Open_Source_CMS, stroid,
// HELMETHEADS-NEPAL, NP_NEWS_PORTAL) and from this repo's own history for
// portfolio-v2. Where a repo genuinely doesn't support a section (e.g. no
// code pushed yet, or a section doesn't apply to a client library), that
// is stated plainly rather than invented.

const showcaseData = {
  'ai-ecommerce': {
    title: 'AI Integrated E-Commerce',
    oneLiner:
      'An e-commerce platform where AI does more than a chatbot bolt-on: personalized recommendations, semantic search, review summarization, and an FAQ assistant driven by real user behavior data.',
    status:
      'Active development — the build currently has 3 known-broken API routes, documented in the repo’s own ENDPOINT.md audit.',
    duration: '~2 months (May–Jul 2026), ongoing',
    role: 'Solo full-stack developer',
    teamSize: '1',
    links: {
      demo: '',
      github: 'https://github.com/Himesh-Bhattarai/ai-powered-ecommerce',
      docs: '',
    },
    overview: {
      purpose:
        'Personalize the shopping experience using real tracked user behavior instead of static categories, and give sellers a self-serve dashboard.',
      targetUsers: 'Shoppers browsing/buying, and sellers managing a storefront.',
      businessProblem:
        'Generic e-commerce search and static FAQs don’t help shoppers find what they want, and sellers get no signal on buyer intent.',
      objectives: [
        'Personalize search/recommendations from real user events, not just categories',
        'Give sellers a self-serve dashboard instead of manual product management',
        'Reduce support load with an AI FAQ assistant',
      ],
    },
    techStack: {
      frontend: [
        { name: 'Next.js 16', why: 'App Router + Turbopack for storefront and seller dashboard in one codebase' },
        { name: 'React 19', why: '' },
        { name: 'TypeScript', why: 'catches shape mismatches across 13 Mongoose models' },
      ],
      backend: [{ name: 'Next.js API routes', why: '' }],
      database: [
        { name: 'MongoDB via Mongoose', why: '13 models (Product, Order, Cart, Review, Seller, UserIntent, UserEvent, UserPreference, RecommendationLog, Faqs, Wishlist, SellerInfo, User) shaped around tracking behavior, not just typical CRUD' },
      ],
      auth: [{ name: 'next-auth + custom JWT layer (lib/jwt, lib/auth)', why: '' }],
      ai: [{ name: 'OpenAI SDK', why: 'powers product search, review summarization, and the FAQ assistant' }],
      devops: [],
      deployment: [],
      libraries: [
        { name: 'zustand', why: 'client state' },
        { name: 'nodemailer', why: 'OTP / password-reset email' },
      ],
    },
    features: [
      {
        name: 'AI Product Search',
        description: 'Semantic search over the product catalog instead of exact keyword match.',
        implementation: 'OpenAI SDK integrated in lib/ai, called from search routes.',
        challenges: 'Keeping results relevant without a dedicated vector database.',
        benefits: 'Shoppers find relevant products even with imprecise queries.',
      },
      {
        name: 'Personalization engine',
        description: 'Recommendations driven by tracked user behavior.',
        implementation: 'UserEvent / UserIntent / UserPreference / RecommendationLog models feed lib/personalization.',
        challenges: 'Not yet validated against real traffic — the models exist but need usage data to prove the recommendations are actually better.',
        benefits: 'Recommendations grounded in real behavior, not static category tags.',
      },
      {
        name: 'Seller dashboard',
        description: 'Self-serve storefront management for sellers.',
        implementation: 'become-seller and seller-dashboard routes, Seller/SellerInfo models.',
        challenges: 'Not yet documented in detail.',
        benefits: 'Sellers manage listings without manual intervention.',
      },
    ],
    architecture: {
      flow: ['Frontend (Next.js App Router)', 'API routes', 'lib/ (ai, auth, personalization, jwt, database)', 'MongoDB (13 models)', 'OpenAI API'],
      folderStructure:
        'app/ (account, api, become-seller, checkout, help-support, login, products, seller-dashboard, signup, wishlist) · models/ (13 Mongoose schemas) · lib/ (ai, auth, database, jwt, nodeMailer, otp, personalization)',
      appFlow: 'Buyer and seller flows share one Next.js app, split by route group.',
      requestLifecycle: 'Not yet documented in detail for this project.',
    },
    databaseDesign: {
      collections: [
        { name: 'Product / Order / Cart / Review / Wishlist', notes: 'core commerce entities' },
        { name: 'Seller / SellerInfo', notes: 'seller-dashboard-facing entities' },
        { name: 'UserEvent / UserIntent / UserPreference / RecommendationLog', notes: 'behavior-tracking entities that feed personalization' },
        { name: 'Faqs / User', notes: 'support and account entities' },
      ],
      reasoning: '13 models is more than a typical storefront needs — the extra 4 behavior-tracking collections exist specifically to make personalization data-driven instead of rule-based.',
    },
    apiDocs: [],
    apiDocsNote:
      'Full endpoint list not reproduced here — see the repo’s own ENDPOINT.md for the current self-audit, including the 3 routes with known bugs.',
    authFlow: {
      login: 'Combination of next-auth and a custom JWT layer (lib/jwt, lib/auth).',
      jwt: 'Custom-issued tokens for API routes outside next-auth’s own session handling.',
      notes: 'Which routes use which strategy isn’t fully documented yet — a real gap, not a stylistic choice.',
    },
    screenshots: [],
    challenges: [
      {
        problem: '3 API routes fail at build time.',
        why: 'Documented in the repo’s own ENDPOINT.md: /api/refreshToken, /api/forgot-password/send-otp, and /api/forgot-password/reset-password have missing/incorrect imports and an inconsistent password-hashing helper.',
        solution: 'Not yet fixed as of this write-up.',
        tradeoffs: 'Shipped other features before circling back to harden auth edge cases.',
        lessons: 'Writing the self-audit (ENDPOINT.md) as you go — not after — is what made the gap visible and fixable at all.',
      },
    ],
    performance: { lighthouse: 'Not measured yet.', techniques: [] },
    security: {
      considerations: [
        'Password-reset flow currently has known bugs (see Challenges) — not production-hardened yet.',
        'Two auth systems (next-auth + custom JWT) in use together; needs one clear strategy.',
      ],
    },
    deployment: { hosting: 'Not yet deployed live.', cicd: 'None yet.' },
    futureImprovements: [
      'Fix the 3 documented broken routes.',
      'Add a vector database for search instead of raw per-query OpenAI calls.',
      'Add a test suite — none exists yet.',
    ],
    lessonsLearned: [
      'Personalization needs real usage data to prove value, not just the models to store it.',
      'Self-auditing (ENDPOINT.md) surfaces real problems that shipping optimism hides.',
    ],
    metrics: { devTime: '~2 months so far (May 28 – Jul 26 2026)', commits: '19', technologies: 'Next.js, TypeScript, MongoDB/Mongoose (13 models), OpenAI SDK' },
    timeline: [
      { label: '2026-05-28', description: 'Repo created, initial commit.' },
      { label: '2026-07-26', description: 'Most recent commit — 19 total over ~2 months of active work.' },
    ],
    recruiterSummary: {
      role: 'Solo full-stack developer',
      responsibilities: [
        'Designed a 13-model MongoDB schema for behavior-driven personalization',
        'Integrated the OpenAI SDK for search, review summarization, and an FAQ assistant',
        'Built both the seller-facing dashboard and buyer-facing storefront in one Next.js app',
      ],
      impact: ['No live users yet — impact not measurable at this stage.'],
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'OpenAI SDK'],
      skills: ['AI integration', 'schema design for personalization', 'honest self-auditing practice'],
    },
  },

  contentflow: {
    title: 'ContentFlow CMS',
    oneLiner:
      'An open-source, API-first headless CMS built for developers who want control over content modeling instead of a rigid off-the-shelf CMS.',
    status: 'Actively developed, deployed live.',
    duration: '~2 months (Dec 2025–Feb 2026), 246 commits — high intensity.',
    role: 'Solo full-stack developer',
    teamSize: '1',
    links: {
      demo: 'https://contentflow.duckdns.org',
      github: 'https://github.com/Himesh-Bhattarai/Open_Source_CMS',
      docs: '',
    },
    overview: {
      purpose: 'A genuinely modular, API-first CMS instead of a themed website builder.',
      targetUsers: 'Developers who need a customizable content backend for their own apps.',
      businessProblem: 'Most CMSs are either too rigid (WordPress-style) or too expensive (SaaS headless CMS) for small teams who just want an API.',
      objectives: [
        'Ship a real open-source project: docs, contributing guide, security policy, changelog',
        'Prove production-readiness with tests and load testing, not just a demo',
      ],
    },
    techStack: {
      frontend: [
        { name: 'Next.js 16 + React 19 + TypeScript', why: '' },
        { name: 'Tailwind + Radix UI + Sonner', why: 'consistent, accessible UI without hand-rolling primitives' },
      ],
      backend: [
        { name: 'Express', why: '' },
        { name: 'Mongoose', why: '' },
      ],
      database: [{ name: 'MongoDB', why: '' }],
      auth: [{ name: 'JWT + server-side sessions/cookies', why: '' }],
      ai: [],
      devops: [{ name: 'Redis', why: 'rate limiting' }],
      deployment: [{ name: 'contentflow.duckdns.org', why: 'live deployment' }],
      libraries: [
        { name: 'k6', why: 'load testing' },
        { name: 'Playwright', why: 'end-to-end tests on the client' },
        { name: 'Jest', why: 'server-side unit tests' },
      ],
    },
    features: [
      {
        name: 'Role-based content API',
        description: 'API-first content modeling with role-based access control.',
        implementation: 'Server/Api, Server/Routes, Server/Models, Server/Validation.',
        challenges: 'Keeping the API genuinely modular instead of coupling it to one frontend shape.',
        benefits: 'Any frontend can consume the same content API.',
      },
      {
        name: 'Rate-limited, load-tested API',
        description: 'Redis-backed rate limiting, validated under load.',
        implementation: 'Redis middleware in the Express server; k6 scripts and TTFB checks committed in-repo.',
        challenges: 'Load testing infra is extra overhead for a solo project.',
        benefits: 'Confidence the API holds up under real traffic, not just functional testing.',
      },
    ],
    architecture: {
      flow: ['Client (Next.js)', 'Api/ layer', 'Routes → Services', 'Database (Mongoose models)', 'Redis (rate limiting)'],
      folderStructure:
        'Monorepo: Client/ (Api, app, components, context, hooks, lib, styles, tests, Playwright config) · Server/ (Api, CheckPoint, Database, Models, Routes, Services, Utils, Validation, core, config, Jest config)',
      appFlow: 'Client and server are separate deployables in one repo, communicating over the REST API.',
      requestLifecycle: 'Documented in the repo’s own docs/API_ROUTE_MAP.md and docs/CODEBASE_MAP.md.',
    },
    databaseDesign: {
      collections: [{ name: 'Content / User / session-related models', notes: 'see Server/Models/ in the repo for the exact schema' }],
      reasoning: 'Not reproduced in detail here — see docs/CODEBASE_MAP.md in the repo.',
    },
    apiDocs: [],
    apiDocsNote: 'Full endpoint map documented in the repo’s docs/API_ROUTE_MAP.md.',
    authFlow: {
      login: 'JWT-based, backed by server-side sessions/cookies.',
      middleware: 'Redis-backed rate limiting sits in front of the API.',
      notes: 'Full flow documented in docs/ENVIRONMENT_REFERENCE.md and docs/API_ROUTE_MAP.md.',
    },
    screenshots: [],
    challenges: [
      {
        problem: 'Needed to prove the CMS holds up under load, not just functionally work.',
        why: 'Open-source infrastructure projects get judged on production-readiness.',
        solution: 'Added k6 load tests and TTFB checks in-repo, plus a lint gate banning explicit `any` in TypeScript.',
        tradeoffs: 'More tooling overhead for a solo project.',
        lessons: 'Treating a personal project with real CI/tests/docs from early on pays off in credibility.',
      },
    ],
    performance: { lighthouse: 'Not reproduced here — see repo perf scripts.', techniques: ['Redis-backed rate limiting', 'k6 load testing + TTFB checks committed in-repo'] },
    security: {
      considerations: [
        'JWT + cookie/session auth',
        'Redis rate limiting on the API',
        'Dedicated SECURITY.md policy in the repo',
      ],
    },
    deployment: {
      hosting: 'Live at contentflow.duckdns.org',
      cicd: 'GitHub Actions (deploy workflow badge in the repo README)',
      prodSetup: 'docs/DEPLOYMENT_GUIDE.md and docs/RELEASE_PROCESS.md document the real process.',
    },
    futureImprovements: ['Not yet documented here — see the repo’s own CHANGELOG.md for planned work.'],
    lessonsLearned: [
      'Documentation (CODEBASE_MAP, ENVIRONMENT_REFERENCE) written alongside the code, not after, made the repo actually usable by someone else.',
    ],
    metrics: { devTime: '~2 months (Dec 25 2025 – Feb 25 2026)', commits: '246', technologies: 'Next.js, Express, MongoDB, Redis, Jest, Playwright, k6' },
    timeline: [
      { label: 'status(203)', description: 'Add CI and status-commit check.' },
      { label: 'status(302)', description: 'Increase token expiry by 2h.' },
      { label: 'status(601)', description: 'Fix signup redirect on account creation.' },
    ],
    recruiterSummary: {
      role: 'Solo full-stack developer',
      responsibilities: [
        'Built a monorepo CMS (Next.js client + Express server) from scratch',
        'Set up CI, E2E (Playwright), and unit (Jest) test suites',
        'Load-tested the API with k6 and fixed TTFB issues',
        'Wrote real open-source project docs (contributing guide, security policy, deployment guide)',
      ],
      impact: ['Deployed and publicly reachable at contentflow.duckdns.org'],
      technologies: ['Next.js', 'Express', 'MongoDB', 'Redis'],
      skills: ['Production-minded engineering practice', 'open-source project stewardship', 'performance testing'],
    },
  },

  stroid: {
    title: 'Stroid',
    oneLiner:
      'A deterministic state engine for React/TypeScript built specifically for concurrent SSR — solving state drift and hydration mismatches that typical state libraries don’t address.',
    status: 'Published npm package (v0.1.5), actively maintained.',
    duration: '~4 months (Feb–Jun 2026), 488 commits — a mix of feature work and automated dependency bumps.',
    role: 'Solo library author',
    teamSize: '1',
    links: {
      demo: 'https://stroid-docs.vercel.app/docs',
      github: 'https://github.com/Himesh-Bhattarai/stroid',
      docs: 'https://stroid-docs.vercel.app/docs',
    },
    overview: {
      purpose: 'Guarantee deterministic state across server and client renders under React’s concurrent features.',
      targetUsers: 'React/Next.js developers hitting hydration or SSR state bugs with existing state libraries.',
      businessProblem: 'Most state management libraries weren’t designed for concurrent SSR — they can produce hydration mismatches or non-deterministic state.',
      objectives: [
        'Per-request isolation for true concurrent SSR safety',
        'Stay tree-shakeable via multiple subpath exports instead of one bundle',
      ],
    },
    techStack: {
      frontend: [{ name: 'TypeScript', why: 'the entire library, published to npm' }],
      backend: [],
      database: [],
      auth: [],
      ai: [],
      devops: [{ name: 'release-please', why: 'automated versioning/changelog' }],
      deployment: [],
      libraries: [
        { name: 'vitest', why: 'test suite' },
        { name: 'tsup', why: 'bundling for multiple entry points' },
      ],
    },
    features: [
      {
        name: 'Per-request isolation',
        description: 'State doesn’t bleed across concurrent server requests.',
        implementation: 'core/ and server/ modules.',
        challenges: 'Not documented in detail here.',
        benefits: 'Safe to use under React concurrent SSR without cross-request contamination.',
      },
      {
        name: 'Modular subpath exports',
        description: './psr, ./core, ./query, ./runtime-tools, ./runtime-admin, ./selectors, ./computed, ./helpers.',
        implementation: 'package.json exports map.',
        challenges: 'More packaging/build complexity (tsup config, multiple entry points).',
        benefits: 'Consumers only bundle what they actually use.',
      },
      {
        name: 'DevTools',
        description: 'Inspecting state at runtime.',
        implementation: 'devtools/ module.',
        challenges: '',
        benefits: 'Debuggability for consumers of the library.',
      },
    ],
    architecture: {
      flow: ['Consumer app', 'react/ bindings', 'core/ + internals/', 'server/ (SSR isolation)', 'persist/sync/query modules'],
      folderStructure:
        'src/ split into adapters, async, computed, core, devtools, features, helpers, integrations, internals, notification, psr, react, runtime-admin, runtime-tools, selectors, server, types, utils, plus store.ts / sync.ts / query.ts / persist.ts / install.ts at the root',
      appFlow: 'Not a web app — a library consumed by other React/Next.js apps.',
      requestLifecycle: 'Per-request state isolation is the core architectural guarantee — see server/ module.',
    },
    databaseDesign: { collections: [], reasoning: 'Not applicable — client-side state library, no database.' },
    apiDocs: [],
    apiDocsNote: 'Not a REST API — full API reference lives at stroid-docs.vercel.app/docs.',
    authFlow: { notes: 'Not applicable — client-side state library, no auth surface.' },
    screenshots: [],
    challenges: [
      {
        problem: 'Keeping the library genuinely tree-shakeable while supporting many features (persistence, sync, devtools, server integration).',
        why: 'A single monolithic export would force consumers to bundle everything.',
        solution: 'Split into explicit subpath exports (./core, ./query, ./psr, etc.) so consumers only pull in what they use.',
        tradeoffs: 'More packaging/build complexity.',
        lessons: 'Library architecture decisions (the exports map) matter as much as the runtime code.',
      },
    ],
    performance: { lighthouse: 'Not applicable — not a web page.', techniques: ['Tree-shakeable subpath exports', 'per-request isolation avoids cross-request state bleed under concurrent SSR'] },
    security: { considerations: ['Not applicable — client-side state library, no server/auth surface.'] },
    deployment: { hosting: 'Published to npm (v0.1.5).', cicd: 'Automated releases via release-please, CI on push.' },
    futureImprovements: ['Not yet documented here — see the repo’s own docs/ for planned work.'],
    lessonsLearned: [
      'Maintaining a real npm package (488 commits, dependency bumps, automated releases) is a different discipline than app development — packaging and API stability matter more than features.',
    ],
    metrics: { devTime: '~4 months (Feb 27 – Jun 19 2026)', commits: '488 (feature work mixed with automated dependency bumps)', technologies: 'TypeScript, Vitest, tsup, release-please' },
    timeline: [
      { label: '2026-02-27', description: 'First commit.' },
      { label: '2026-06-19', description: 'Most recent commit — 488 total over ~4 months.' },
    ],
    recruiterSummary: {
      role: 'Solo library author',
      responsibilities: [
        'Designed and published an npm package solving concurrent-SSR state determinism',
        'Built a modular export architecture for tree-shaking',
        'Set up an automated versioning/release pipeline (release-please) and CI',
      ],
      impact: ['Published and versioned on npm (v0.1.5), with a dedicated docs site.'],
      technologies: ['TypeScript', 'React', 'Vitest'],
      skills: ['Library/package architecture', 'TypeScript API design', 'release engineering'],
    },
  },

  'portfolio-v2': {
    title: 'Portfolio v2',
    oneLiner:
      'This site — a portfolio that’s also a real production app: its own auth, database-backed blog CMS, and (in progress) an AI agent that can log in and manage content conversationally.',
    status: 'Actively developed — currently mid-build on an AI + MCP admin agent.',
    duration: 'Started Mar 2025; 35 commits, with a concentrated rebuild sprint in the last week (Vite → Next.js migration, admin auth, blog API, AI/MCP planning).',
    role: 'Solo developer',
    teamSize: '1',
    links: {
      demo: '',
      github: 'https://github.com/Himesh-Bhattarai/PORTFOLIO-HIMESH',
      docs: '/plan.md',
    },
    overview: {
      purpose: 'Prove production engineering judgment, not just UI — real auth, a real database-backed CMS, and an honestly-documented build process.',
      targetUsers: 'Recruiters, engineering managers, and other developers evaluating this work.',
      businessProblem: 'A static portfolio doesn’t demonstrate backend/architecture skill.',
      objectives: [
        'Migrate from Vite to Next.js without losing existing content',
        'Ship real JWT-based admin auth + a MongoDB blog CMS',
        'Design (and eventually build) an AI agent that can safely perform admin actions without becoming a security hole for random visitors',
        'Give every project a real, honest case-study page instead of a static card',
      ],
    },
    techStack: {
      frontend: [
        { name: 'Next.js 16 (App Router, Turbopack)', why: '' },
        { name: 'React 19', why: '' },
        { name: 'Tailwind + Radix UI', why: '' },
        { name: 'Framer Motion, Three.js (react-three-fiber)', why: 'hero visuals' },
      ],
      backend: [{ name: 'Next.js API routes', why: '' }],
      database: [{ name: 'MongoDB via Mongoose', why: '' }],
      auth: [{ name: 'JWT (jsonwebtoken) + bcryptjs, httpOnly cookie', why: '' }],
      ai: [{ name: 'MCP server (scaffolded, not implemented yet)', why: 'planned admin agent — see plan.md' }],
      devops: [],
      deployment: [],
      libraries: [{ name: 'Resend', why: 'contact form email delivery' }],
    },
    features: [
      {
        name: 'Blog CMS',
        description: 'Admin-only create/edit/delete, public read.',
        implementation: 'app/api/blog route, JWT session check via src/lib/jwt.js, Mongoose Blog model.',
        challenges: 'Was pushed with broken imports and a missing DB connection — fixed and verified with a real npm run build.',
        benefits: 'Real persisted content instead of hardcoded JSX.',
      },
      {
        name: 'AI search bar (in progress)',
        description: 'Hero-section chat UI, backend not yet wired.',
        implementation: 'src/components/SearchBar.jsx; orchestrator (/api/chat) and MCP tool server not built yet.',
        challenges: 'Designing the auth boundary so the AI can perform admin actions for the owner only, without becoming a prompt-injection hole for visitors — see plan.md.',
        benefits: 'Once built: conversational admin login + content management with no visible login button.',
      },
    ],
    architecture: {
      flow: ['Frontend (App Router pages/components)', 'API routes (app/api)', 'src/lib (jwt, connectDB)', 'MongoDB'],
      folderStructure: 'app/ (API routes) · src/ (components/sections, ui, lib, models) · mcp-server/ (scaffolded, empty) · plan.md (living roadmap)',
      authFlow: 'ID/password → bcrypt compare → JWT issued → httpOnly cookie → validateToken() checked per request on gated routes.',
    },
    databaseDesign: {
      collections: [{ name: 'Blog', notes: 'title, description, image, body, timestamps — the only model so far' }],
      reasoning: 'Minimal schema so far; a Project/AdminCredential model is planned once the AI admin agent and passkey work start (see plan.md).',
    },
    apiDocs: [
      { method: 'POST', url: '/api/contact', purpose: 'Send a contact-form email via Resend', auth: 'none' },
      { method: 'POST', url: '/api/admin-login', purpose: 'Admin login, issues JWT cookie', auth: 'ID + password' },
      { method: 'GET/POST/PATCH/DELETE', url: '/api/blog', purpose: 'Blog CRUD', auth: 'GET public, writes require admin JWT cookie' },
    ],
    authFlow: {
      login: 'POST /api/admin-login with ID + bcrypt-hashed password comparison.',
      jwt: 'Signed via jsonwebtoken, 1h expiry.',
      cookies: 'httpOnly, secure, sameSite=lax.',
      middleware: 'None yet — each gated route calls validateToken() directly.',
      rbac: 'Single admin role only, no granular permissions yet.',
    },
    screenshots: [],
    challenges: [
      {
        problem: 'Migrating from a Vite SPA to Next.js App Router without breaking existing content.',
        why: 'The old app used import.meta.env and a runtime README-fetch hook that don’t exist in Next.js.',
        solution: 'Verified the old sync mechanism was already disabled before touching anything, then rebuilt content as plain React components.',
        tradeoffs: 'Kept app/page.jsx as a thin client wrapper around the pre-existing src/App.jsx during the transition instead of a full rewrite.',
        lessons: 'Verify assumptions about what’s actually live in a codebase before refactoring — grep before you delete.',
      },
      {
        problem: 'New API routes were pushed with missing imports and undeclared dependencies.',
        why: 'Scaffolding was drafted faster than it was verified.',
        solution: 'Fixed the imports, installed the missing packages, added a real Mongo connection + schema, confirmed with an actual npm run build.',
        tradeoffs: '—',
        lessons: 'Running npm run build before every push catches this entire class of bug immediately.',
      },
    ],
    performance: { lighthouse: 'Not measured yet.', techniques: [] },
    security: {
      considerations: [
        'Admin password stored as a bcrypt hash, never plaintext, in a gitignored .env.local',
        'JWT session in an httpOnly cookie',
        'The planned AI admin agent keeps authorization strictly server-side — the model’s belief about the conversation is never trusted as an auth decision (see plan.md)',
      ],
    },
    deployment: { hosting: 'Not yet deployed to production.', cicd: 'None yet.' },
    futureImprovements: [
      'Build the /api/chat orchestrator + MCP tool server',
      'Add passkey/OTP 2FA for the admin agent',
      'Fill in real screenshots and metrics across all project showcase pages',
    ],
    lessonsLearned: [
      'A commit message convention that encodes reliability (status(###)) is more useful than generic messages — used consistently, it becomes a real audit trail.',
      'Planning security-critical features (AI admin access) before writing code caught a real prompt-injection-shaped mistake before it was built.',
    ],
    metrics: { devTime: 'Mar 2025 – present', commits: '35 (as of Aug 2026)', technologies: 'Next.js, React, MongoDB, JWT' },
    timeline: [
      { label: 'Mar 2025', description: 'Initial commit.' },
      { label: 'Jul 2026', description: 'Migrated from Vite to Next.js.' },
      { label: 'Aug 2026', description: 'Admin auth + blog API fixed and wired to MongoDB; AI + MCP admin agent architecture planned; project showcase pages built.' },
    ],
    recruiterSummary: {
      role: 'Solo full-stack developer',
      responsibilities: [
        'Migrated the site from Vite to Next.js App Router',
        'Built and fixed JWT-based admin auth and a MongoDB-backed blog CMS',
        'Designed a security-first architecture for an AI admin agent before implementing it',
      ],
      impact: ['You’re looking at it.'],
      technologies: ['Next.js', 'React', 'MongoDB', 'JWT'],
      skills: ['Migration planning', 'security-first architecture design', 'honest documentation practice'],
    },
  },

  'helmet-head': {
    title: 'Helmet Head Nepal',
    oneLiner: 'Intended as an e-commerce experience for motorcycle helmets and accessories.',
    status: 'Concept — the GitHub repo contains no implementation: README only, 1 commit, untouched since April 2025.',
    duration: 'N/A — no development history to report.',
    role: 'N/A',
    teamSize: 'N/A',
    links: {
      demo: '',
      github: 'https://github.com/Himesh-Bhattarai/HELMETHEADS-NEPAL',
      docs: '',
    },
    overview: {
      purpose: 'A modern e-commerce experience for motorcycle helmets, per the original project description.',
      targetUsers: 'Not documented.',
      businessProblem: 'Not documented.',
      objectives: [],
    },
    techStack: {
      frontend: [],
      backend: [],
      database: [],
      auth: [],
      ai: [],
      devops: [],
      deployment: [],
      libraries: [],
    },
    techStackNote:
      'The listed stack on the project card (Next.js, Three.js, Express, Tailwind) reflects the original project description — it isn’t verifiable from the current repo, which contains no code.',
    features: [],
    architecture: { flow: [], folderStructure: 'Not available — no code in the repository.' },
    databaseDesign: { collections: [], reasoning: '' },
    apiDocs: [],
    authFlow: {},
    screenshots: [],
    challenges: [],
    performance: {},
    security: { considerations: [] },
    deployment: {},
    futureImprovements: [],
    lessonsLearned: [],
    metrics: { commits: '1 (initial commit only)', devTime: 'N/A' },
    timeline: [{ label: '2025-04-20', description: 'Repository created with a one-line README. No further commits since.' }],
    recruiterSummary: {
      role: 'N/A',
      responsibilities: [],
      impact: [],
      technologies: [],
      skills: [],
    },
  },

  nprevolution: {
    title: 'NP Revolution',
    oneLiner: 'An independent Nepali news platform delivering categorized news, dynamic content, and a clean reading experience.',
    status: 'Early-stage prototype — 4 commits over 10 days, not actively maintained since April 2025.',
    duration: '10 days (Mar 30 – Apr 9 2025)',
    role: 'Solo developer',
    teamSize: '1',
    links: {
      demo: '',
      github: 'https://github.com/Himesh-Bhattarai/NP_NEWS_PORTAL',
      docs: '',
    },
    overview: {
      purpose: 'A Nepali news platform with categorized, dynamically updated content.',
      targetUsers: 'Readers looking for a clean, categorized news experience.',
      businessProblem: 'Not documented — repo has no README.',
      objectives: [],
    },
    techStack: {
      frontend: [{ name: 'Vite + React', why: '' }, { name: 'Tailwind', why: '' }],
      backend: [{ name: 'Express', why: '' }],
      database: [{ name: 'MongoDB via Mongoose', why: '' }],
      auth: [
        { name: 'JWT (jsonwebtoken) + bcryptjs', why: '' },
        { name: 'Passport + passport-google-oauth20', why: 'Google OAuth login' },
      ],
      ai: [],
      devops: [],
      deployment: [],
      libraries: [
        { name: 'Cloudinary', why: 'media hosting' },
        { name: 'express-rate-limit, helmet', why: 'basic API hardening' },
        { name: 'joi', why: 'request validation' },
        { name: 'multer', why: 'file uploads' },
      ],
    },
    features: [],
    architecture: {
      flow: [],
      folderStructure: 'frontend/ (Vite + React) and backend/ (Express) as two top-level folders.',
    },
    databaseDesign: { collections: [], reasoning: 'Not documented — no README or schema docs in the repo.' },
    apiDocs: [],
    authFlow: { login: 'JWT + Google OAuth (Passport).', notes: 'Not documented in further detail.' },
    screenshots: [],
    challenges: [
      {
        problem: 'Very short build window.',
        why: 'Only 4 commits across 10 days.',
        solution: 'Not enough history to describe specific engineering challenges beyond initial setup.',
        tradeoffs: '—',
        lessons: '—',
      },
    ],
    performance: {},
    security: { considerations: ['express-rate-limit and helmet middleware present in the backend dependencies.'] },
    deployment: { hosting: 'Not deployed.', cicd: 'None.' },
    futureImprovements: [],
    lessonsLearned: [],
    metrics: { commits: '4', devTime: '10 days (Mar 30 – Apr 9 2025)', technologies: 'Vite, React, Express, MongoDB' },
    timeline: [
      { label: '2025-03-30', description: 'Initial commit with frontend and backend.' },
      { label: '2025-04-09', description: 'Last commit — "Working on Routing".' },
    ],
    recruiterSummary: {
      role: 'Solo developer',
      responsibilities: ['Set up a production-shaped backend (rate limiting, Helmet.js headers, Google OAuth, Cloudinary media, Joi validation) in a short prototype window.'],
      impact: ['Prototype only — not deployed or maintained further.'],
      technologies: ['Vite', 'React', 'Express', 'MongoDB'],
      skills: ['Rapid backend scaffolding with production-grade middleware choices'],
    },
  },
};

function PlaceholderImage({ caption }) {
  return (
    <div className="flex h-56 w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[--line] bg-[--chip-bg] text-center text-xs text-[--muted]">
      <span>Screenshot not added yet</span>
      {caption && <span className="text-[--muted]">{caption}</span>}
    </div>
  );
}

function Section({ id, title, children }) {
  if (!children) return null;
  return (
    <section id={id} className="space-y-4 border-t border-[--line] pt-10 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4 text-sm text-[--muted]">{children}</div>
    </section>
  );
}

function TagList({ items }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
          {item}
        </span>
      ))}
    </div>
  );
}

function StackGroup({ label, items }) {
  if (!items?.length) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-mono uppercase tracking-wide text-[--muted]">{label}</h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.name}>
            <span className="text-[--page-fg] font-medium">{item.name}</span>
            {item.why && <span> — {item.why}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectShowcase({ slug }) {
  const data = showcaseData[slug];
  if (!data) return null;

  return (
    <article className="px-6 py-16 text-[--page-fg]">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* 1. Hero */}
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{data.title}</h1>
          <p className="max-w-2xl text-[--muted]">{data.oneLiner}</p>
          <div className="flex flex-wrap gap-4 text-sm text-[--muted]">
            {data.status && <span><strong className="text-[--page-fg]">Status:</strong> {data.status}</span>}
            {data.duration && <span><strong className="text-[--page-fg]">Duration:</strong> {data.duration}</span>}
            {data.role && <span><strong className="text-[--page-fg]">Role:</strong> {data.role}</span>}
            {data.teamSize && <span><strong className="text-[--page-fg]">Team:</strong> {data.teamSize}</span>}
          </div>
          <div className="flex gap-2">
            {data.links?.demo && (
              <Button variant="outline" size="sm" className="gap-2 border-[--line]" asChild>
                <a href={data.links.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink className="h-4 w-4" /></a>
              </Button>
            )}
            {data.links?.github && (
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <a href={data.links.github} target="_blank" rel="noreferrer">GitHub <Github className="h-4 w-4" /></a>
              </Button>
            )}
            {data.links?.docs && (
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <a href={data.links.docs} target="_blank" rel="noreferrer">Documentation <FileText className="h-4 w-4" /></a>
              </Button>
            )}
          </div>
          <PlaceholderImage caption={`Add a banner at public/projects/${slug}-banner.png`} />
        </header>

        {/* 2. Overview */}
        <Section id="overview" title="Overview">
          {data.overview?.purpose && <p><strong className="text-[--page-fg]">Purpose:</strong> {data.overview.purpose}</p>}
          {data.overview?.targetUsers && <p><strong className="text-[--page-fg]">Target users:</strong> {data.overview.targetUsers}</p>}
          {data.overview?.businessProblem && <p><strong className="text-[--page-fg]">Problem:</strong> {data.overview.businessProblem}</p>}
          {data.overview?.objectives?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {data.overview.objectives.map((o) => <li key={o}>{o}</li>)}
            </ul>
          )}
        </Section>

        {/* 3. Tech Stack */}
        <Section id="tech-stack" title="Tech Stack">
          {data.techStackNote && <p className="italic">{data.techStackNote}</p>}
          <div className="grid gap-6 sm:grid-cols-2">
            <StackGroup label="Frontend" items={data.techStack?.frontend} />
            <StackGroup label="Backend" items={data.techStack?.backend} />
            <StackGroup label="Database" items={data.techStack?.database} />
            <StackGroup label="Auth" items={data.techStack?.auth} />
            <StackGroup label="AI" items={data.techStack?.ai} />
            <StackGroup label="DevOps" items={data.techStack?.devops} />
            <StackGroup label="Deployment" items={data.techStack?.deployment} />
            <StackGroup label="Libraries" items={data.techStack?.libraries} />
          </div>
        </Section>

        {/* 4. Features */}
        <Section id="features" title="Features">
          {data.features?.length > 0 ? (
            <div className="space-y-4">
              {data.features.map((f) => (
                <Card key={f.name} className="border-[--line] bg-[--card]">
                  <CardHeader className="pb-2"><h3 className="text-base font-semibold text-[--page-fg]">{f.name}</h3></CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    {f.description && <p>{f.description}</p>}
                    {f.implementation && <p><strong className="text-[--page-fg]">How:</strong> {f.implementation}</p>}
                    {f.challenges && <p><strong className="text-[--page-fg]">Challenge:</strong> {f.challenges}</p>}
                    {f.benefits && <p><strong className="text-[--page-fg]">Benefit:</strong> {f.benefits}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : <p>Not documented yet.</p>}
        </Section>

        {/* 5. Architecture */}
        <Section id="architecture" title="Architecture">
          {data.architecture?.flow?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {data.architecture.flow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded border border-[--line] bg-[--chip-bg] px-3 py-1">{step}</span>
                  {i < data.architecture.flow.length - 1 && <span>→</span>}
                </span>
              ))}
            </div>
          )}
          {data.architecture?.folderStructure && <p><strong className="text-[--page-fg]">Folder structure:</strong> {data.architecture.folderStructure}</p>}
          {data.architecture?.appFlow && <p><strong className="text-[--page-fg]">App flow:</strong> {data.architecture.appFlow}</p>}
          {data.architecture?.authFlow && <p><strong className="text-[--page-fg]">Auth flow:</strong> {data.architecture.authFlow}</p>}
          {data.architecture?.requestLifecycle && <p><strong className="text-[--page-fg]">Request lifecycle:</strong> {data.architecture.requestLifecycle}</p>}
        </Section>

        {/* 6. Database Design */}
        <Section id="database-design" title="Database Design">
          {data.databaseDesign?.collections?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {data.databaseDesign.collections.map((c) => (
                <li key={c.name}><strong className="text-[--page-fg]">{c.name}</strong>{c.notes ? ` — ${c.notes}` : ''}</li>
              ))}
            </ul>
          )}
          {data.databaseDesign?.reasoning && <p>{data.databaseDesign.reasoning}</p>}
        </Section>

        {/* 7. API Documentation */}
        <Section id="api-docs" title="API Documentation">
          {data.apiDocsNote && <p className="italic">{data.apiDocsNote}</p>}
          {data.apiDocs?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[--line] text-[--page-fg]">
                    <th className="py-2 pr-4">Method</th>
                    <th className="py-2 pr-4">URL</th>
                    <th className="py-2 pr-4">Purpose</th>
                    <th className="py-2">Auth</th>
                  </tr>
                </thead>
                <tbody>
                  {data.apiDocs.map((d) => (
                    <tr key={d.url + d.method} className="border-b border-[--line]">
                      <td className="py-2 pr-4 font-mono">{d.method}</td>
                      <td className="py-2 pr-4 font-mono">{d.url}</td>
                      <td className="py-2 pr-4">{d.purpose}</td>
                      <td className="py-2">{d.auth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* 8. Authentication Flow */}
        <Section id="auth-flow" title="Authentication Flow">
          {Object.entries(data.authFlow || {}).map(([key, value]) => value && (
            <p key={key}><strong className="text-[--page-fg] capitalize">{key}:</strong> {value}</p>
          ))}
        </Section>

        {/* 9. Screenshots */}
        <Section id="screenshots" title="Screenshots">
          {data.screenshots?.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.screenshots.map((s) => (
                <figure key={s.caption}>
                  {s.src ? <img src={s.src} alt={s.caption} className="rounded-lg" /> : <PlaceholderImage caption={s.caption} />}
                  <figcaption className="mt-1 text-xs">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : <PlaceholderImage caption={`No screenshots added yet for ${data.title}`} />}
        </Section>

        {/* 10. Challenges */}
        <Section id="challenges" title="Challenges">
          {data.challenges?.length > 0 ? (
            <div className="space-y-4">
              {data.challenges.map((c) => (
                <Card key={c.problem} className="border-[--line] bg-[--card]">
                  <CardContent className="space-y-1 pt-4 text-sm">
                    <p><strong className="text-[--page-fg]">Problem:</strong> {c.problem}</p>
                    {c.why && <p><strong className="text-[--page-fg]">Why:</strong> {c.why}</p>}
                    {c.solution && <p><strong className="text-[--page-fg]">Solution:</strong> {c.solution}</p>}
                    {c.tradeoffs && <p><strong className="text-[--page-fg]">Tradeoffs:</strong> {c.tradeoffs}</p>}
                    {c.lessons && <p><strong className="text-[--page-fg]">Lessons:</strong> {c.lessons}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : <p>None documented yet.</p>}
        </Section>

        {/* 11. Performance */}
        <Section id="performance" title="Performance">
          {data.performance?.lighthouse && <p><strong className="text-[--page-fg]">Lighthouse:</strong> {data.performance.lighthouse}</p>}
          {data.performance?.techniques?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">{data.performance.techniques.map((t) => <li key={t}>{t}</li>)}</ul>
          )}
        </Section>

        {/* 12. Security */}
        <Section id="security" title="Security">
          {data.security?.considerations?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">{data.security.considerations.map((s) => <li key={s}>{s}</li>)}</ul>
          )}
        </Section>

        {/* 13. Deployment */}
        <Section id="deployment" title="Deployment">
          {Object.entries(data.deployment || {}).map(([key, value]) => value && (
            <p key={key}><strong className="text-[--page-fg] capitalize">{key}:</strong> {value}</p>
          ))}
        </Section>

        {/* 14. Future Improvements */}
        <Section id="future-improvements" title="Future Improvements">
          {data.futureImprovements?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">{data.futureImprovements.map((f) => <li key={f}>{f}</li>)}</ul>
          )}
        </Section>

        {/* 15. Lessons Learned */}
        <Section id="lessons-learned" title="Lessons Learned">
          {data.lessonsLearned?.length > 0 && (
            <ul className="list-disc list-inside space-y-1">{data.lessonsLearned.map((l) => <li key={l}>{l}</li>)}</ul>
          )}
        </Section>

        {/* 16. Project Metrics */}
        <Section id="metrics" title="Project Metrics">
          <TagList items={Object.entries(data.metrics || {}).map(([k, v]) => `${k}: ${v}`)} />
        </Section>

        {/* 17. Timeline */}
        <Section id="timeline" title="Timeline">
          {data.timeline?.length > 0 && (
            <ol className="space-y-2 border-l border-[--line] pl-4">
              {data.timeline.map((t) => (
                <li key={t.label}><strong className="text-[--page-fg] font-mono">{t.label}</strong> — {t.description}</li>
              ))}
            </ol>
          )}
        </Section>

        {/* 18. AI Assistant */}
        <Section id="ai-assistant" title="Ask about this project">
          <div className="flex items-center gap-3 rounded-full border border-[--line] bg-[--chip-bg] px-4 py-2 opacity-60">
            <Sparkles className="h-4 w-4 text-[--accent]" />
            <input
              disabled
              placeholder={`Coming soon — ask why ${data.title} used MongoDB, explain its auth flow, etc.`}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[--muted]"
            />
          </div>
          <p className="text-xs">Depends on the /api/chat orchestrator and MCP tool server — not built yet (see plan.md).</p>
        </Section>

        {/* 19. Recruiter Summary */}
        <Section id="recruiter-summary" title="Recruiter Summary">
          {data.recruiterSummary?.role && <p><strong className="text-[--page-fg]">Role:</strong> {data.recruiterSummary.role}</p>}
          {data.recruiterSummary?.responsibilities?.length > 0 && (
            <div>
              <strong className="text-[--page-fg]">Responsibilities:</strong>
              <ul className="list-disc list-inside space-y-1">{data.recruiterSummary.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          )}
          {data.recruiterSummary?.impact?.length > 0 && (
            <div>
              <strong className="text-[--page-fg]">Impact:</strong>
              <ul className="list-disc list-inside space-y-1">{data.recruiterSummary.impact.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          )}
          <TagList items={data.recruiterSummary?.technologies} />
          <TagList items={data.recruiterSummary?.skills} />
        </Section>
      </div>
    </article>
  );
}

export const projectSlugs = Object.keys(showcaseData);
