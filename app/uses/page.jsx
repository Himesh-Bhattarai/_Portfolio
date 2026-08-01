import Link from 'next/link';

export const metadata = {
  title: 'Uses — Himesh Bhattarai',
  description: 'The tools, hardware, and software Himesh Bhattarai actually uses day to day.',
};

// Inline content, same pattern as Hero.jsx/Experience.jsx. Placeholders
// below are intentional — this page is only honest if it reflects what's
// actually used, not a guessed/typical dev setup. Fill in real values.
const usesContent = {
  editor: {
    label: 'Editor',
    items: ['TODO: e.g. VS Code — list your real extensions if you want (Prettier, ESLint, GitLens, etc.)'],
  },
  terminal: {
    label: 'Terminal & shell',
    items: ['TODO: e.g. zsh, iTerm2/Warp, oh-my-zsh, any prompt theme'],
  },
  hardware: {
    label: 'Hardware',
    items: ['TODO: laptop model/specs, monitor, keyboard/mouse if notable'],
  },
  devTools: {
    label: 'Dev tools',
    items: ['TODO: e.g. Postman, Docker Desktop, TablePlus/MongoDB Compass, gh CLI'],
  },
  browser: {
    label: 'Browser',
    items: ['TODO: e.g. Chrome/Arc/Firefox, any notable extensions'],
  },
  other: {
    label: 'Other',
    items: ['TODO: anything else worth mentioning — productivity apps, note-taking, etc.'],
  },
};

export default function UsesPage() {
  return (
    <article className="px-6 py-16 text-[--page-fg]">
      <div className="mx-auto max-w-2xl space-y-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[--muted]">
          <Link href="/" className="hover:text-[--page-fg] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[--page-fg]">Uses</span>
        </nav>

        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">What I use</h1>
          <p className="text-[--muted]">The actual tools and setup behind the work — not a wishlist.</p>
        </header>

        <div className="space-y-8">
          {Object.values(usesContent).map((group) => (
            <section key={group.label} className="space-y-2">
              <h2 className="text-sm font-mono uppercase tracking-wide text-[--muted]">{group.label}</h2>
              <ul className="list-disc list-inside space-y-1 text-[--muted]">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-xs text-[--muted]">
          Inspired by <a href="https://uses.tech" target="_blank" rel="noreferrer" className="underline hover:text-[--page-fg]">uses.tech</a>. See <Link href="/now" className="underline hover:text-[--page-fg]">/now</Link> for what I'm currently working on.
        </p>
      </div>
    </article>
  );
}
