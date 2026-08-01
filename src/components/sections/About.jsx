export default function About({ data }) {


const aboutContent = {
  headline: "Building modern software with full-stack expertise and AI innovation.",

  paragraphs: [
    "I'm Himeshchanchal Bhattarai, a Full Stack Developer based in Kathmandu, Nepal, with professional experience building modern web applications using React, Next.js, Node.js, TypeScript, and MongoDB. I enjoy transforming ideas into scalable, maintainable software with a strong focus on clean architecture, performance, and user experience.",

    "Over the past year, I've built full-stack applications ranging from AI-powered platforms and content management systems to e-commerce solutions and developer tools. While full-stack development is my foundation, I'm actively specializing in AI engineering, exploring local LLMs, AI agents, MCP, and intelligent automation to build the next generation of software."
  ],

  stats: [
    {
      value: "1+",
      label: "Years Experience",
    },
    {
      value: "15+",
      label: "Projects Built",
    },
    {
      value: "20+",
      label: "Technologies Used",
    },
    {
      value: "AI",
      label: "Engineering Focus",
    },
  ],

  name: "HIMESHCHANCHAL BHATTARAI",

  email: "code.himesh@gmail.com",

  location: "Kathmandu, Nepal",

  availability: "Open to Full-Time Opportunities",

  portrait: "/WhatsApp Image 2025-12-01 at 7.49.26 PM (1).jpeg",
};
  return (
    <section id="about" className="px-6 py-20 border-b border-[--line] bg-[--panel] text-[--page-fg]">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-start">
        <div className="space-y-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{aboutContent.headline}</h2>
          {(aboutContent.paragraphs.length ? aboutContent.paragraphs : [null]).map((p, i) => p && (
            <p key={i} className="text-[--muted] leading-relaxed">
              {p}
            </p>
          ))}
          {aboutContent.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {aboutContent.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[--line] bg-[--card] px-4 py-3">
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wide text-[--muted]">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-[--line] bg-[--card] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-[--line] relative">
                <img
                  src={aboutContent.portrait}
                  alt="Portrait of Himesh Bhattarai"
                  className="h-full w-full object-cover grayscale"
                />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/40 px-3 py-2 text-xs font-mono text-[--muted] backdrop-blur border-t border-[--line]">
                <span>{aboutContent.location}</span>
                <span>{aboutContent.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
