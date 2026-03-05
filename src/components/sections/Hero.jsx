import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactLinks as defaultContact } from '@/data/links';
import { stats as defaultStats } from '@/data/stats';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

export default function Hero({ data }) {
  const contactLinks = { ...defaultContact, ...(data?.contact || {}) };
  const stats = data?.stats || defaultStats;
  const socialLinks = data?.socials || [];
  const title = data?.title || "I build sharp, fast web experiences with React, Next.js, and Node.";
  const subtitle = data?.subtitle || "Brutalist-inspired interfaces, clean architecture, and production-minded details— from auth to CI/CD.";
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[--page-bg] text-[--page-fg] border-b border-[--line] px-6 py-24 md:py-28"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-[--chip-bg] text-[--muted] px-3 py-1 rounded-full font-mono text-xs border border-[--line]">
            <span>Full-stack engineer</span>
            <span className="h-1 w-1 rounded-full bg-[--accent]" />
            <span>{contactLinks.location}</span>
            <span className="h-1 w-1 rounded-full bg-[--accent]" />
            <span>Available for projects</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-lg text-[--muted] max-w-2xl">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2" onClick={() => scrollTo('work')}>
              View Work <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-[--line]"
              onClick={() => scrollTo('resume')}
            >
              Download CV <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[130px] rounded-lg border border-[--line] px-4 py-3 bg-[--panel]"
              >
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-xs uppercase tracking-wide text-[--muted]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
          {(socialLinks.length ? socialLinks : []).map((social) => (
            <a
              key={social.label}
              href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-mono text-[--muted] hover:text-[--page-fg] transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[--accent] group-hover:scale-110 transition-transform" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-[--line] bg-[--panel] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-[--line] relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,243,163,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(125,166,255,0.16),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
              <div className="absolute inset-0 grid-background opacity-60" aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-52 w-52 md:h-64 md:w-64 rounded-full border border-[--line] flex items-center justify-center">
                  <div className="h-40 w-40 md:h-48 md:w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(45,243,163,0.2),rgba(125,166,255,0.18))] border border-[--line]" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 backdrop-blur border border-[--line]">
                <div className="text-sm font-semibold">Kathmandu • Remote</div>
                <div className="text-xs text-[--muted] font-mono">Design / Build / Ship</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
