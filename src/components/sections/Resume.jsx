import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Resume({ data }) {

  const profile = {
  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "HTML5",
        "CSS3"
      ]
    },

    {
      category: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST API",
        "JWT Authentication",
        "Role-Based Access Control",
        "Mongoose"
      ]
    },

    {
      category: "AI & Modern Development",
      items: [
        "LLM Integration",
        "RAG",
        "MCP",
        "Ollama",
        "Prompt Engineering",
        "AI API Integration"
      ]
    },

    {
      category: "DevOps & Tools",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "GitHub Actions",
        "Postman",
        "VS Code"
      ]
    },

    {
      category: "Soft Skills",
      items: [
        "Problem Solving",
        "Critical Thinking",
        "Communication",
        "Team Collaboration",
        "Analytical Thinking",
        "Continuous Learning"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Xavier International College",
      university: "Tribhuvan University",
      period: "2023 – Present",
      description:
        "Studying computer science fundamentals, software engineering, databases, networking, algorithms, and modern web technologies."
    },

    {
      degree: "+2 in Computer Management",
      institution: "Orchid Public Secondary School",
      period: "Completed",
      gpa: "3.09",
      description:
        "Focused on computer science, programming fundamentals, mathematics, and business studies."
    },

    {
      degree: "Secondary Education Examination (SEE)",
      institution: "Sunshine English Boarding School",
      period: "Completed",
      gpa: "3.60"
    }
  ],

  certifications: [
    {
      name: "CS50's Introduction to Computer Science",
      issuer: "Harvard University",
      year: "2024"
    },

    {
      name: "CS50's Introduction to Programming with Python",
      issuer: "Harvard University",
      year: "2025"
    },

    {
      name: "Front End Development Libraries",
      issuer: "freeCodeCamp",
      year: "2025"
    }
  ],

  languages: [
    {
      name: "Nepali",
      proficiency: "Native"
    },

    {
      name: "English",
      proficiency: "Professional Working"
    },

    {
      name: "Hindi",
      proficiency: "Professional Working"
    }
  ]
};

  return (
    <section id="resume" className="px-6 py-20 border-b border-[--line] bg-[--page-bg] text-[--page-fg]">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
           Skills & Qualifications
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
              {profile.skills.map((group, idx) => (
                <div key={group.label || group.category || idx} className="space-y-2">
                  <div className="text-sm font-semibold">{group.label || group.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {(group.items || []).map((item) => (
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
                {profile.education.map((edu, idx) => (
                  <div key={edu.degree || idx} className="border border-transparent border-b-[--line] last:border-b-0 pb-3 last:pb-0">
                    <div className="text-base font-semibold">{edu.degree || edu}</div>
                    {edu.institution && <div className="text-sm text-[--muted]">{edu.institution}</div>}
                    {edu.period && <div className="text-xs font-mono text-[--muted]">{edu.period}</div>}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-[--line] bg-[--card]">
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.certifications.map((cert, idx) => (
                  <div key={cert.name || idx} className="flex items-center justify-between border border-transparent border-b-[--line] last:border-b-0 pb-3 last:pb-0">
                    <div>
                      <div className="text-base font-semibold">{cert.name || cert}</div>
                      {cert.issuer && <div className="text-sm text-[--muted]">{cert.issuer}</div>}
                    </div>
                    {(cert.year || cert.period) && (
                      <Badge variant="outline" className="border-[--line] text-[--muted]">
                        {cert.year || cert.period}
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-[--line] bg-[--card]">
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {profile.languages.map((lang) => (
                  <span key={lang.name} className="rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
                    {lang.name}{lang.proficiency ? ` (${lang.proficiency})` : ''}
                  </span>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
