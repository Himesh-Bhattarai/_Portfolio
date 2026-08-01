# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (Next.js, Turbopack)
- `npm run build` — production build; **always run this after touching `mcp-server/` or `src/lib/`** — it's the fastest way to catch a broken import
- `npm run lint` — ESLint
- `npm run start` — run the production build
- No test suite exists in this repo yet.

To verify `mcp-server/` code (it does **not** get checked by `npm run build` in the same way — see below), run it directly:
```
node mcp-server/index.js
```

## Architecture

### Two separate runtimes that don't share module resolution

This is the single most important thing to know before touching `mcp-server/`. The repo has two runtimes:

1. **The Next.js app** (`app/`, `src/`) — bundled by Next.js/Turbopack. The `@/*` → `./src/*` alias (from `jsconfig.json`) works here.
2. **`mcp-server/`** — runs as a **standalone Node.js script** (`node mcp-server/index.js`), never passed through Next's bundler. Real Node ESM resolution rules apply:
   - Every relative import needs an explicit `.js` extension (`"./server.js"`, not `"./server"`).
   - The `@/` alias **does not resolve** here — use relative paths instead (e.g. `../../../src/lib/jwt.js` from `mcp-server/tools/*/route.js`).
   - This has caused real bugs multiple times already; when adding a new file under `mcp-server/`, verify it actually runs with `node mcp-server/index.js`, not just that `npm run build` succeeds (Next's bundler is more lenient and can hide these bugs).

### Content convention: inline data, not a content folder

Every homepage section component owns its content as a plain object defined inline at the top of the same file — e.g. `Hero.jsx` has `heroContent`, `Footer.jsx` has `footerContent`, `Work.jsx` has `projects`, `Experience.jsx` has `experienceContent`. There is **no shared `src/content/` folder** — this was tried once and explicitly reverted. When adding a new section or a data-driven page, match this pattern (one file, one inline object, JSX in the same file) unless there's a hard technical reason not to (see `ProjectShowcase.jsx` and `mcp-server/tools/public/route.js`, which both need the same project data but can't share a `.jsx` file since the MCP server can't parse JSX — that's why `get_project_info` queries MongoDB directly instead of importing the component's data).

### Shared logic between an API route and an MCP tool: never self-fetch

When the same business logic is needed by both a Next.js API route and an MCP tool (e.g. admin login, blog updates), it lives in `src/lib/` as a plain function that both call **directly** — an MCP tool must never `fetch()` this app's own API routes. Both run server-side in the same codebase; a self-fetch is a wasted network hop. See `src/lib/verifyAdmin.js`, used by both `app/api/admin-login/route.js` and `mcp-server/tools/auth/route.js`.

### Auth model: real session, never the model's word

- `verify_admin` (MCP tool, `mcp-server/tools/auth/route.js`) checks **credentials** (id + bcrypt-compared password) and issues a JWT — this happens once, at login.
- Every privileged tool (e.g. `update_content` in `mcp-server/tools/admin/route.js`) instead validates an existing **token** (`validateToken()` from `src/lib/jwt.js`), fresh, on every single call — it never re-checks a password, and never trusts that a prior call in the same conversation was already verified.
- `app/api/chat/route.js` (the orchestrator) reads and validates the real `accessToken` httpOnly cookie on every request, and uses that — not anything the LLM says — to decide whether privileged tools (`PRIVILEGED_TOOLS` set) are even included in the tool list offered to the model. If a tool isn't offered, the model cannot call it.
- Rule of thumb for any new privileged tool: authorization is decided by code checking a signed token, never by the LLM's belief about the conversation.

### MCP server structure

`mcp-server/server.js` builds the `McpServer` instance and registers tool groups from `mcp-server/tools/{public,auth,admin}/route.js`, each exporting a `register*(server)` function called from `createServer()`. Tool `name` values are snake_case identifiers the LLM calls programmatically (`verify_admin`, `get_project_info`, `update_content`) — `title`/`description` in the tool config are the human-readable versions.

`app/api/chat/route.js` connects an MCP **client** to this MCP **server** in-process via `InMemoryTransport.createLinkedPair()` — a real MCP protocol connection (not a plain function call, and not a subprocess/network transport) per the project's explicit decision to use real MCP rather than in-app tool-calling.

### LLM provider abstraction

`src/lib/llm/index.js`'s `getProvider()` resolves `LLM_PROVIDER` (env var) to `ollama.js` or `anthropic.js`, both currently stub files that throw "not implemented." Both must implement the same `chat({ message, tools, isAuthenticated, callTool })` shape so swapping providers never requires touching `/api/chat` or the MCP tool layer.

### Commit convention

Commits follow `status(###): message`, documented in the separate repo `github.com/Himesh-Bhattarai/STATUS_COMMIT`. Codes run 0xx (Initialization) through 6xx (Recovery) — e.g. `301` new feature, `601` bug fixed, `203` docs. Use this convention for commits in this repo.

### Roadmap / living spec

`plan.md` at the repo root tracks the AI + MCP admin agent and Project Showcase work — what's done, what's not started, required env vars. Keep it updated as work progresses rather than treating it as a one-off planning artifact.

## Known gaps (intentional, not oversights)

- `Work.jsx`'s project card images point at `public/projects/*.png` files that don't exist — 404s on the live site. Left for real screenshots to be added; not a bug to silently fix with placeholders.
- No global Navbar/Footer outside the homepage: `app/layout.jsx` only wraps `ThemeProvider`; `Navbar`/`Footer` render exclusively inside `Dashboard.jsx`, which only the homepage uses. `/now`, `/uses`, and `/projects/[slug]` have no site chrome beyond their own breadcrumb.
- `Navbar.jsx`'s links use `document.getElementById(id)` scroll-to, assuming it's always rendered on the homepage — would silently no-op if reused elsewhere without changes.
- `MONGODB_URI` and `RESEND_API_KEY` in `.env.local` are placeholders — the blog API and contact form don't actually work until real values are supplied.
- No rate limiting yet on `verify_admin` / `app/api/admin-login` — a known, not-yet-closed gap.
- Project Showcase pages are statically generated from an inline object in `ProjectShowcase.jsx`, not database-backed — moving them to MongoDB was discussed and deliberately deferred.
