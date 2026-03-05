import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillGroups as defaultSkills, education as defaultEdu, certifications as defaultCerts } from '@/data/skills';

export default function Resume({ data }) {
  const skillGroups = data?.skills || defaultSkills;
  const education = data?.education || defaultEdu;
  const certifications = data?.certifications || defaultCerts;
  const languages = data?.languages || [
    { name: "Nepali", proficiency: "Native" },
    { name: "English", proficiency: "Fluent" },
    { name: "Hindi", proficiency: "Fluent" }
  ];
  return (
    <section id="resume" className="px-6 py-20 border-b border-[--line] bg-[--page-bg] text-[--page-fg]">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            Resume snapshot
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Skills, education, and signals.</h2>
          <p className="text-[--muted] max-w-3xl">
            A concise view of what I work with and how I’ve learned. Full CV available on request.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-[--line] bg-[--card]">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.label} className="space-y-2">
                  <div className="text-sm font-semibold">{group.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-[--line] bg-[--card]">
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.degree} className="border border-transparent border-b-[--line] last:border-b-0 pb-3 last:pb-0">
                    <div className="text-base font-semibold">{edu.degree}</div>
                    <div className="text-sm text-[--muted]">{edu.institution}</div>
                    <div className="text-xs font-mono text-[--muted]">{edu.period}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-[--line] bg-[--card]">
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center justify-between border border-transparent border-b-[--line] last:border-b-0 pb-3 last:pb-0">
                    <div>
                      <div className="text-base font-semibold">{cert.name}</div>
                      <div className="text-sm text-[--muted]">{cert.issuer}</div>
                    </div>
                    <Badge variant="outline" className="border-[--line] text-[--muted]">
                      {cert.year}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
