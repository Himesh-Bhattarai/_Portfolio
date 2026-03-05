import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
export default function Experience({ data }) {
  const experiences = data && Array.isArray(data) ? data : [];
  return (
    <section id="experience" className="px-6 py-20 border-b border-[--line] bg-[--page-bg] text-[--page-fg]">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Roles that shaped my craft.</h2>
          <p className="text-[--muted] max-w-3xl">
            From self-driven stacks to freelance delivery, I keep a bias for shipping and measurable improvements.
          </p>
        </header>

        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-[--line] hidden md:block" aria-hidden />
          <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.title} className="relative md:pl-12">
                <div className="hidden md:block absolute left-3 top-6 h-3 w-3 rounded-full bg-[--accent] shadow-[0_0_0_6px_rgba(45,243,163,0.15)]" />
                <Card className="border-[--line] bg-[--card]">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-[--muted]">{exp.company} · {exp.location}</p>
                      </div>
                      <Badge variant="outline" className="border-[--line] text-[--muted]">
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[--muted]">{exp.summary}</p>
                    <ul className="space-y-2 list-disc list-inside text-sm text-[--muted]">
                      {exp.achievements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
