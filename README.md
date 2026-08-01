# Himesh Bhattarai — Portfolio

Personal portfolio and engineering playground for **Himesh Bhattarai**, a
Kathmandu-based full-stack developer. Built as a real production app, not
just a static resume site — it has its own auth, database-backed blog API,
and an in-progress AI admin agent (see [Roadmap](#roadmap)).

**Live:** himeshchanchal.com.np · **Location:** Kathmandu, Nepal

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | React 19, Tailwind CSS, [Radix UI](https://www.radix-ui.com/) primitives, `shadcn`-style components |
| Motion / 3D | Framer Motion, Three.js (`@react-three/fiber`, `@react-three/drei`) |
| Forms | React Hook Form + Zod |
| Backend | Next.js API routes (`app/api/*`) |
| Database | MongoDB via Mongoose |
| Auth | JWT (`jsonwebtoken`) in an httpOnly cookie, password hashing via `bcryptjs` |
| Email | [Resend](https://resend.com) |
| Content | Markdown rendering (`react-markdown`, `remark-gfm`, `rehype-sanitize`) |

## Features

- Responsive one-page portfolio: Hero, About, Work, Experience, Resume, Contact
- Light/dark theme (persisted, system-aware)
- Contact form → email delivery via Resend (`app/api/contact`)
- Blog CMS API with admin-only write access (`app/api/blog`) — full CRUD, JWT-gated
- Cookie-based admin authentication (`app/api/admin-login`)
- AI search bar in the Hero section (`src/components/SearchBar.jsx`) — currently UI-only, becoming a full conversational admin agent (see Roadmap)

## Project Structure

```
app/
  layout.jsx, page.jsx       # App Router entry
  api/
    admin-login/              # Admin auth (JWT + httpOnly cookie)
    blog/                     # Blog CRUD, admin-gated
    contact/                  # Contact form → Resend
src/
  components/
    sections/                 # Hero, About, Work, Experience, Resume, Contact
    ui/                       # Radix-based primitives (button, card, input, ...)
    Navbar.jsx, Footer.jsx, Dashboard.jsx, SearchBar.jsx
  lib/                        # jwt.js, connectDB.js, llm/ (scaffold)
  models/                     # Mongoose schemas (Blog, ...)
mcp-server/                    # MCP tool server (scaffold — see plan.md)
public/                        # Images, logos, static assets
plan.md                        # Living spec for the AI + MCP admin agent
```

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # fill in the values below
npm run dev
```

Runs at `http://localhost:3000`. `npm run build` for a production build,
`npm run lint` for ESLint.

### Environment Variables

All in `.env.local` (gitignored).

| Variable | Required for | Notes |
|---|---|---|
| `ADMIN_ID` | admin login | plain string (e.g. an email) |
| `ADMIN_PASSWORD` | admin login | must be a **bcrypt hash**, not plaintext |
| `JWT_SECRET` | admin login | signs the session cookie |
| `MONGODB_URI` | blog API | MongoDB connection string |
| `RESEND_API_KEY` | contact form | from resend.com |
| `LLM_PROVIDER`, `OLLAMA_BASE_URL`, `OLLAMA_MODEL`, `ANTHROPIC_API_KEY` | AI admin agent (not built yet) | see `plan.md` |

## Commit Convention

Commits follow the `status(###): summary` format documented in
[STATUS_COMMIT](https://github.com/Himesh-Bhattarai/STATUS_COMMIT) — the
number communicates the actual reliability of the change (e.g. `101`
scaffolding, `301` new feature, `601` bug fixed), not just what changed.

## Roadmap

Full design and current build status live in [`plan.md`](./plan.md).
In short:

- **AI admin agent** — a real MCP server exposing tools (search projects,
  manage the blog) to a chat agent in the Hero search bar. Only the site
  owner can trigger admin actions (login, create/edit/delete blog posts),
  gated by a real server-side session + passkey/OTP 2FA — never by what
  the AI "believes" about the conversation. Starting on local Ollama,
  moving to Claude once the tool-calling flow is validated.
- **Project showcase pages** — each project gets a full case-study page
  (architecture, tech decisions, challenges, metrics, its own scoped AI
  assistant) instead of a single portfolio card. In design.

## License

Personal project — all rights reserved.
