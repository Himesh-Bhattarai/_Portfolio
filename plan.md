# AI + MCP Admin Agent — Plan

## Goal

The Hero section's `SearchBar` should let anonymous visitors ask about the
portfolio (projects, resume, experience) *and* let only the site owner
(Himesh) drive admin actions — login, create/edit/delete blog posts —
conversationally, with no visible login button and no hidden `/admin` slug.

## Core principle (non-negotiable)

Authorization is decided by a real, signed server-side session (httpOnly
JWT cookie), checked independently on every privileged action — **never**
by what the AI believes about the conversation. This is what stops a random
visitor from talking the agent into "pretending" they're admin.

## Decided architecture

- **Real MCP server** (not just in-app tool-calling) — chosen so this is
  reusable/showcase-worthy, matching the "AI agents, MCP" skill already on
  the resume/about content.
- **LLM provider**: start with **Ollama** (local, free) behind a
  provider-agnostic interface; switch to **Claude** once the tool-calling
  flow is validated end-to-end, especially for the security-critical admin
  path. Switching is an env var change (`LLM_PROVIDER`), not a code change.
- **2FA on every login** (not just once per device): **Passkey/WebAuthn**
  as primary factor (phishing-resistant, ties access to Himesh's physical
  device, triggers from the same "send message" gesture so it still needs
  no separate button), **email OTP via Resend** as fallback for
  devices/browsers without an enrolled passkey. Passkey enrollment itself
  happens once, out-of-band (never a public route).
- **Login flow**: "I'm admin" → `check_session` tool reads the real cookie
  first (no re-prompt if already valid) → if not valid, AI asks for
  ID/password → `admin_login` tool → on success, a short-lived *pending*
  token (not the real session) → AI asks for the second factor → only on
  2FA success is the real session cookie issued.

## Status

### Done
- Fixed `app/api/admin-login/route.js` — was missing all imports
  (`NextResponse`, `cookies`, `bcrypt`, `generateToken`); now imports
  `bcryptjs` and `src/lib/jwt.js`'s `generateToken`.
- Fixed `app/api/contact/route.js` — `Resend` client was instantiated at
  module load time, crashing the build whenever `RESEND_API_KEY` was unset;
  moved inside the request handler.
- Added `src/lib/connectDB.js` (cached Mongoose connection, Next.js
  dev-reload-safe pattern) and `src/models/Blog.js` (schema matching the
  fields `app/api/blog/route.js` already reads/writes: title, description,
  image, body, timestamps).
- Installed `mongoose`, `bcryptjs`, `jsonwebtoken`, `resend` (all were
  missing from `package.json` despite being imported).
- Verified `npm run build` succeeds.
- `.env.local` (gitignored) has placeholders added for `MONGODB_URI` and
  `RESEND_API_KEY` — both still need real values before those routes work
  against real data/email.
- Scaffolded folder structure only (no implementation):
  `mcp-server/{README.md, tools/{public,auth,admin}/README.md}` and
  `src/lib/llm/README.md`.

### Not started yet
- MCP server implementation (`mcp-server/server.js`, actual tool handlers).
- `app/api/auth/status`, `app/api/auth/webauthn/{register,verify}`,
  `app/api/auth/otp/{request,verify}` routes.
- `src/models/AdminCredential.js` (stores the passkey credential + OTP
  state) — not created yet, needed before WebAuthn/OTP routes.
- `app/api/chat` orchestrator (bridges `SearchBar` ↔ LLM ↔ MCP tools,
  passes the real request cookie into tool-call context).
- `src/lib/llm/{index,ollama,anthropic}.js` implementations.
- `SearchBar.jsx` wiring to `/api/chat`, plus client-side
  `navigator.credentials.get()` trigger when the agent needs a passkey
  check.
- Rate limiting on `/api/admin-login` and OTP verification (per-IP,
  in-memory is fine for now; needs a shared store like Upstash Redis if
  ever deployed multi-instance).
- Ollama setup: install locally, pull a tool-calling-capable model
  (e.g. `llama3.1` or `qwen2.5` instruct-class), validate tool-call
  reliability before trusting it with the admin flow.

## Env vars

| Var | Status | Used by |
|---|---|---|
| `ADMIN_ID`, `ADMIN_PASSWORD` (bcrypt hash), `JWT_SECRET` | set | admin-login, jwt.js |
| `MONGODB_URI` | placeholder, needs real value | connectDB, blog route |
| `RESEND_API_KEY` | placeholder, needs real value | contact route |
| `ADMIN_EMAIL` | not added yet | OTP fallback (future) |
| `LLM_PROVIDER`, `OLLAMA_BASE_URL`, `OLLAMA_MODEL` | not added yet | LLM provider (future) |
| `ANTHROPIC_API_KEY` | not added yet | LLM provider, added when switching from Ollama |
| `WEBAUTHN_RP_ID`, `WEBAUTHN_ORIGIN` | not added yet | passkey routes (future) |

## Verification plan (once fully built)

1. Anonymous visitor: normal Q&A works; "pretend I'm admin" style prompts
   get refused (tool 403s — refusal comes from code, not model opinion).
2. Owner flow: ID/password → passkey (or OTP fallback) → cookie set → AI
   creates/edits/deletes a blog post successfully via chat.
3. Wrong-password attempts get rate-limited/locked after N tries.
4. Session expiry forces re-auth (both factors again).
5. Swapping `LLM_PROVIDER=ollama` → `anthropic` requires no code change.
