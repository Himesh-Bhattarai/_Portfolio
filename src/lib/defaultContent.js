export const defaultContent = {
  navbar: {
    brandImage: "/loog-hcb.png",
    brandName: "Himesh Bhattarai",
    links: ["Home", "Work", "Experience", "About", "Resume", "Contact"],
  },
  hero: {
    title: "I build sharp, fast web experiences.",
    subtitle: "Brutalist-inspired interfaces, clean architecture, production-minded details.",
    location: "Kathmandu, Nepal",
    availability: "Open for freelance/contract",
    socials: [
      { label: "Facebook", url: "https://facebook.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle" },
      { label: "GitHub", url: "https://github.com/your-handle" },
      { label: "Twitter", url: "https://twitter.com/your-handle" },
      { label: "Phone", url: "tel:+977000000000" },
    ],
  },
  about: {
    paragraphs: [
      "I’m Himesh Bhattarai, a Kathmandu-based developer focused on sharp, high-performance web experiences. I like opinionated layouts, accessible interactions, and codebases that are easy to extend. When I’m not polishing UIs, I’m wiring up auth, CI/CD, or small DevOps experiments.",
      "I build with React, Next.js, and Node, balancing brutalist visual language with clean architecture and production-minded details. I’m comfortable owning work from design handoff to deployment. Current interests: TypeScript everywhere, lean CI/CD, and keeping interfaces honest and legible."
    ],
    name: "HIMESHCHANCHAL BHATTARAI",
    email: "code.himesh@gmail.com",
    location: "KATHMANDU, NEPAL",
    availability: "Open for freelance/contract",
    portrait: "/WhatsApp Image 2025-12-01 at 7.49.26 PM (1).jpeg",
  },
  projects: [
    {
      title: "NP Revolution",
      description: "Independent Nepali news platform with real-time updates and simplified summaries.",
      image: "/nprevolution.png?height=800&width=600",
      tags: ["Next.js", "TypeScript", "Tailwind", "Node"],
      link: "https://nprevolution.example.com",
      code: "https://github.com/your-handle/nprevolution"
    },
    {
      title: "Helmet Head Nepal",
      description: "E-commerce experience for helmets and moto accessories.",
      image: "/fav-con.png?height=600&width=800",
      tags: ["Next.js", "Three.js", "Express", "Tailwind"],
      link: "https://helmethead.example.com",
      code: "https://github.com/your-handle/helmet-head"
    },
    {
      title: "HerbalWisdom",
      description: "Herbal knowledge base with uses, cautions, and search.",
      image: "/portfolio.png?height=800&width=600",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      link: "https://herbalwisdom.example.com",
      code: "https://github.com/your-handle/herbalwisdom"
    },
    {
      title: "Portfolio v1",
      description: "First shipped portfolio to showcase skills and projects.",
      image: "/first-portfolio.png?height=600&width=800",
      tags: ["React", "Tailwind"],
      link: "https://portfolio-hcb.vercel.app",
      code: "https://github.com/your-handle/portfolio-v1"
    },
  ],
  experience: [
    {
      period: "2024 — Present",
      title: "Full-Stack Developer (Self-Directed / Open Source)",
      company: "Personal & Open-Source Projects",
      location: "Lalitpur, Nepal",
      description:
        "Building full-stack applications and tools while learning advanced backend and DevOps concepts.",
      achievements: [
        "Built CLI that scaffolds backends with JWT auth and refresh.",
        "Shipped multiple React/Next frontends with clean UI systems.",
        "Experimented with Docker + GitHub Actions for CI/CD.",
      ],
      skills: ["Node.js", "Express", "MongoDB", "React", "Next.js", "CI/CD"],
    },
    {
      period: "2023 — 2024",
      title: "Frontend Developer (Freelance / Practice Projects)",
      company: "Self-Employed",
      location: "Kathmandu, Nepal",
      description:
        "Built responsive and interactive web interfaces and improved frontend development skills.",
      achievements: [
        "Delivered responsive landing pages and component libraries.",
        "Implemented validation/auth flows and API integrations.",
        "Improved UX with motion and accessibility tweaks.",
      ],
      skills: ["React", "JavaScript", "Tailwind", "UI Systems"],
    },
    {
      period: "2022 — 2023",
      title: "Technical Intern / Learner",
      company: "Learning Phase",
      location: "Nepal",
      description:
        "Studied programming fundamentals and built small applications to strengthen logic and problem-solving.",
      achievements: [
        "Completed C/Python mini-projects and DS exercises.",
        "Built CRUD/to-do tools; learned Git/GitHub workflows.",
      ],
      skills: ["C", "Python", "Git", "Problem Solving"],
    },
  ],
  resume: {
    skills: [
      { category: "Technical Skills", items: ["React JS", "Next JS", "JavaScript", "TypeScript", "Node JS", "MongoDB", "Express", "Tailwind CSS", "Framer Motion", "Git & GitHub"] },
      { category: "Soft Skills", items: ["Communication", "Critical Thinking", "Analytical Skills", "Remote Collaboration"] },
      { category: "Computer Fundamentals", items: ["MS PowerPoint", "MS Excel", "MS Word", "Photoshop"] },
    ],
    education: [
      { degree: "Bachelor of Computer Applications (BCA)", institution: "Xavier International College", period: "Ongoing", description: "Currently pursuing degree in Computer Applications", gpa: "" },
      { degree: "+2, Computer Management", institution: "Orchid Public Secondary School", period: "Completed", description: "Higher secondary education in Computer Management", gpa: "3.09" },
      { degree: "Secondary Education Examination", institution: "Sunshine English Boarding School", period: "Completed", description: "School level education", gpa: "3.60" },
    ],
    certifications: [
      { name: "Front End Development Libraries", issuer: "freeCodeCamp", year: "2025" },
      { name: "CS50 Introduction to Python Programming Language", issuer: "Harvard University CS50", year: "2025" },
      { name: "CS50 Introduction to Computer Science", issuer: "Harvard University", year: "2024" },
    ],
    languages: [
      { name: "Nepali", proficiency: "Native" },
      { name: "English", proficiency: "Fluent" },
      { name: "Hindi", proficiency: "Fluent" },
    ],
  },
  contact: {
    email: "you@example.com",
    phone: "+977000000000",
    location: "Kathmandu, Nepal",
    calendly: "https://calendly.com/your-handle",
  },
  footer: {
    tagline: "Sharp, fast web experiences. Based in Kathmandu, shipping globally.",
    quickLinks: ["Home", "Work", "Experience", "About", "Resume", "Contact"],
    socialLinks: ["GitHub", "LinkedIn", "Twitter", "Mail"],
    copyright: "© 2026 Himesh Bhattarai. All rights reserved.",
  },
  assets: {
    logo: "/loog-hcb.png",
    portrait: "/WhatsApp Image 2025-12-01 at 7.49.26 PM (1).jpeg",
    projectImages: ["/nprevolution.png", "/fav-con.png", "/portfolio.png", "/first-portfolio.png"],
  },
};
