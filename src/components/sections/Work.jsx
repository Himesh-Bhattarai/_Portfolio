import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Work({ data }) {
  const list = data && Array.isArray(data) ? data : [];

  const projects = [
  {
    title: "AI Integrated E-Commerce",

    description:
      "A full-stack AI-powered e-commerce platform featuring intelligent product search, AI chatbot, review summarization, FAQ generation, seller dashboards, authentication, and modern commerce workflows.",

    image: "/projects/ai-ecommerce.png",

    tags: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Node.js",
      "AI",
      "RAG"
    ],

    featured: true,

    link: "",

    code: ""
  },

  {
    title: "ContentFlow CMS",

    description:
      "A modern headless CMS with role-based authentication, dynamic content management, reusable APIs, media handling, and scalable architecture.",

    image: "/projects/contentflow.png",

    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT"
    ],

    featured: true,

    link: "",

    code: ""
  },
  {
    title: "Stroid",

    description:
      "A deterministic React state management library supporting configurable store authority, predictable hydration, and drift detection for modern React applications.",

    image: "/projects/stroid.png",

    tags: [
      "React",
      "TypeScript",
      "Library",
      "NPM"
    ],

    featured: true,

    link: "",

    code: ""
  },

  {
    title: "Portfolio v2",

    description:
      "Personal portfolio built with React and modern UI architecture, designed to evolve into an AI-powered portfolio where an assistant can manage content through structured APIs and automation.",

    image: "/projects/portfolio-v2.png",

    tags: [
      "React",
      "Vite",
      "Tailwind",
      "Framer Motion"
    ],

    featured: true,

    link: "",

    code: ""
  },


  {
    title: "Helmet Head Nepal",

    description:
      "A modern e-commerce experience for motorcycle helmets featuring responsive layouts, smooth shopping flows, and interactive product presentation.",

    image: "/projects/helmet-head.png",

    tags: [
      "Next.js",
      "Three.js",
      "Express",
      "Tailwind"
    ],

    featured: false,

    link: "",

    code: ""
  },

  {
    title: "NP Revolution",

    description:
      "An independent Nepali news platform delivering categorized news, dynamic content, and a clean reading experience.",

    image: "/projects/nprevolution.png",

    tags: [
      "Next.js",
      "TypeScript",
      "MongoDB"
    ],

    featured: false,

    link: "",

    code: ""
  }

  ]
  return (
    <section id="work" className="px-6 py-20 border-b border-[--line] bg-[--panel] text-[--page-fg]">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            Selected work
          </p>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Building software from idea to deployment.</h2>
            <p className="text-[--muted] max-w-2xl">
              These projects demonstrate my experience building full-stack applications, AI-powered solutions, and scalable software using modern technologies. Each reflects real-world problem solving, clean architecture, and a focus on performance and maintainability.
            </p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
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
