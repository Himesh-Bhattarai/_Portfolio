import Link from 'next/link';

export const metadata = {
  title: 'Now — Himesh Bhattarai',
  description: 'What Himesh Bhattarai is currently focused on building and learning.',
};

// Inline content, same pattern as Hero.jsx/Experience.jsx — update this
// periodically (a /now page is meant to go stale and get refreshed, not
// stay static like About).
const nowContent = {
  updated: 'August 2026',
  focus: [
    'Building an AI + MCP admin agent for this portfolio — a chat interface in the Hero search bar that can log in and manage content conversationally, with authorization decided by a real server-side session, never by what the AI believes about the conversation. Full design in plan.md.',
    'Just migrated this site from a Vite SPA to Next.js App Router, and rebuilt admin auth (JWT + bcrypt) and a MongoDB-backed blog CMS on top of it.',
    'Just shipped full case-study "Project Showcase" pages for my real projects — content sourced from their actual GitHub repos, not fabricated.',
  ],
  learning: ['WebAuthn / passkeys', 'MCP tool-server design', 'Running local LLMs with Ollama for agentic tool-calling'],
  status: 'Open to full-time opportunities',
  location: 'Kathmandu, Nepal',
};

export default function NowPage() {
  return (
    <article className="px-6 py-16 text-[--page-fg]">
      <div className="mx-auto max-w-2xl space-y-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[--muted]">
          <Link href="/" className="hover:text-[--page-fg] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[--page-fg]">Now</span>
        </nav>

        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">What I'm doing now</h1>
          <p className="text-xs font-mono text-[--muted]">Last updated: {nowContent.updated}</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wide text-[--muted]">Focus</h2>
          <ul className="space-y-3 text-[--muted]">
            {nowContent.focus.map((item) => (
              <li key={item} className="border-l-2 border-[--line] pl-4">{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wide text-[--muted]">Learning</h2>
          <div className="flex flex-wrap gap-2">
            {nowContent.learning.map((item) => (
              <span key={item} className="rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-1 text-sm text-[--muted]">
          <p>{nowContent.status} · {nowContent.location}</p>
        </section>

        <p className="text-xs text-[--muted]">
          This is a <a href="https://nownownow.com" target="_blank" rel="noreferrer" className="underline hover:text-[--page-fg]">now page</a> — it says what I'm focused on at this moment, not a static bio. See <Link href="/uses" className="underline hover:text-[--page-fg]">/uses</Link> for the tools.
        </p>
      </div>
    </article>
  );
}
