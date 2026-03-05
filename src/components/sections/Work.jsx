import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Work({ data }) {
  const list = data && Array.isArray(data) ? data : [];
  return (
    <section id="work" className="px-6 py-20 border-b border-[--line] bg-[--panel] text-[--page-fg]">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            Selected work
          </p>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Projects that carry weight.</h2>
            <p className="text-[--muted] max-w-2xl">
              Real interfaces, pragmatic stacks, and production-minded details. Each built to be fast, legible, and maintainable.
            </p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {list.map((project) => {
            const tags = project.tags || [];
            return (
            <Card
              key={project.title}
              className="group border-[--line] bg-[--card] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden border-b border-[--line]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-[--muted] text-sm leading-relaxed">{project.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {(project.link || project.live) && (
                    <Button variant="outline" size="sm" className="gap-2 border-[--line]" asChild>
                      <a href={project.link || project.live} target="_blank" rel="noreferrer">
                        Live <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.code && (
                    <Button variant="ghost" size="sm" className="gap-2" asChild>
                      <a href={project.code} target="_blank" rel="noreferrer">
                        Code <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      </div>
    </section>
  );
}
