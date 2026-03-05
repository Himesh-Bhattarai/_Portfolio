import { stats as defaultStats } from '@/data/stats';

export default function About({ data }) {
  const stats = data?.stats || defaultStats;
  const paragraphs = data?.paragraphs || [];
  return (
    <section id="about" className="px-6 py-20 border-b border-[--line] bg-[--panel] text-[--page-fg]">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-start">
        <div className="space-y-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Designer-minded developer with a shipping habit.</h2>
          {(paragraphs.length ? paragraphs : [null]).map((p, i) => p && (
            <p key={i} className="text-[--muted] leading-relaxed">
              {p}
            </p>
          ))}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[--line] bg-[--card] px-4 py-3">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-xs uppercase tracking-wide text-[--muted]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-[--line] bg-[--card] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-[--line] relative">
                <img
                  src={data?.portrait || "/IMG-20240701-WA0000.jpg"}
                  alt="Portrait of Himesh Bhattarai"
                  className="h-full w-full object-cover grayscale"
                />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/40 px-3 py-2 text-xs font-mono text-[--muted] backdrop-blur border-t border-[--line]">
                <span>Kathmandu, Nepal</span>
                <span>Design / Build / Ship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
