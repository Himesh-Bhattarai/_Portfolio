import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
export default function Experience() {

  const experienceContent = [
  {
    period: "Sep 2025 – Oct 2026",
    title: "Junior Full Stack Developer",
    company: "Infinite Pro Technology Pvt. Ltd.",
    location: "Lalitpur, Nepal",

    description:
      "Worked as a Junior Full Stack Developer after successfully completing the internship, contributing to the development and maintenance of production web applications using the MERN stack, Next.js, and TypeScript.",

    achievements: [
      "Designed and developed responsive, reusable, and maintainable frontend interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
      "Built and enhanced RESTful APIs with Node.js, Express.js, and MongoDB to support production features.",
      "Implemented secure authentication and authorization using JWT, cookies, and role-based access control.",
      "Collaborated with senior developers to deliver new features, resolve bugs, and continuously improve application performance.",
      "Integrated frontend applications with backend services, ensuring reliable data flow and seamless user experiences.",
      "Participated in code reviews, debugging, testing, and deployment activities while following professional Git workflows and coding standards."
    ],

    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "REST API",
      "Git"
    ]
  },

  {
    period: "Apr 2025 – Aug 2025",
    title: "Full Stack Developer Intern",
    company: "Infinite Pro Technology Pvt. Ltd.",
    location: "Lalitpur, Nepal",

    description:
      "Completed a full-stack development internship, gaining hands-on experience in modern web development while contributing to real-world business applications.",

    achievements: [
      "Developed responsive user interfaces with React, Next.js, and Tailwind CSS under the guidance of senior developers.",
      "Implemented backend APIs using Node.js, Express.js, MongoDB, and TypeScript.",
      "Worked with authentication, form validation, CRUD operations, and API integrations across multiple modules.",
      "Learned professional software development practices including Git version control, code reviews, issue tracking, and collaborative development.",
      "Assisted in debugging production issues, testing new features, and improving overall application stability.",
      "Built reusable UI components and gained practical experience with full-stack application architecture."
    ],

    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Git"
    ]
  },

  {
    period: "2023 – Present",
    title: "Independent Full Stack Developer",
    company: "Personal Projects & Open Source",
    location: "Kathmandu, Nepal",

    description:
      "Continuously building personal projects to explore modern web development, AI engineering, and scalable software architecture beyond professional work.",

    achievements: [
      "Developed an AI-powered e-commerce platform integrating LLM capabilities and intelligent search.",
      "Built a headless CMS with authentication, role-based access control, and dynamic content management.",
      "Designed and developed reusable React component libraries and modern UI systems.",
      "Explored Docker, CI/CD, local LLMs, MCP, and AI-assisted development workflows through personal projects."
    ],

    skills: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Docker",
      "AI",
      "MCP"
    ]
  }
];


  return (
    <section id="experience" className="px-6 py-20 border-b border-[--line] bg-[--page-bg] text-[--page-fg]">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Professional Experience.</h2>
          <p className="text-[--muted] max-w-3xl">
            Professional experience building production web applications, collaborating with teams, and delivering scalable full-stack solutions.
          </p>
        </header>

        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-[--line] hidden md:block" aria-hidden />
          <div className="space-y-8">
          {experienceContent.map((exp) => (
            <div key={`${exp.title}-${exp.period}`} className="relative md:pl-12">
                <div className="hidden md:block absolute left-3 top-6 h-3 w-3 rounded-full bg-[--accent] shadow-[0_0_0_6px_rgba(45,243,163,0.15)]" />
                <Card className="border-[--line] bg-[--card]">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        {(exp.company || exp.location) && (
                          <p className="text-[--muted]">{[exp.company, exp.location].filter(Boolean).join(' · ')}</p>
                        )}
                      </div>
                      {exp.period && (
                        <Badge variant="outline" className="border-[--line] text-[--muted]">
                          {exp.period}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {exp.summary && <p className="text-[--muted]">{exp.summary}</p>}
                    {exp.achievements?.length > 0 && (
                      <ul className="space-y-2 list-disc list-inside text-sm text-[--muted]">
                        {exp.achievements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {exp.skills?.length > 0 && (
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
                    )}
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
