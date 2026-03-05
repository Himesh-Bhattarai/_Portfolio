import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, BookOpen, Award, Briefcase, GraduationCap, Code, Lightbulb, Zap, Star } from "lucide-react"

export default function Resume() {
  const skills = [
    {
      category: "Technical Skills",
      items: ["React JS", "Next JS", "JavaScript", "TypeScript", "Node JS", "MongoDB", "Express", "Tailwind CSS", "Framer Motion", "Git & GitHub"],
      icon: Code,
      color: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      category: "Soft Skills",
      items: ["Communication", "Critical Thinking", "Analytical Skills", "Remote Collaboration"],
      icon: Zap,
      color: "bg-gradient-to-r from-indigo-500 to-purple-600"
    },
    {
      category: "Computer Fundamentals",
      items: ["MS PowerPoint", "MS Excel", "MS Word", "Photoshop"],
      icon: Briefcase,
      color: "bg-gradient-to-r from-green-500 to-emerald-400"
    }
  ]

  const education = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Xavier International College",
      period: "Ongoing",
      description: "Currently pursuing degree in Computer Applications",
      gpa: ""
    },
    {
      degree: "+2, Computer Management",
      institution: "Orchid Public Secondary School",
      period: "Completed",
      description: "Higher secondary education in Computer Management",
      gpa: "3.09"
    },
    {
      degree: "Secondary Education Examination",
      institution: "Sunshine English Boarding School",
      period: "Completed",
      description: "School level education",
      gpa: "3.60"
    }
  ]

  const certifications = [
    {
      name: "Front End Development Libraries",
      issuer: "freeCodeCamp",
      year: "2025",
      icon: Star
    },
    {
      name: "CS50 Introduction to Python Programming Language",
      issuer: "Harvard University CS50",
      year: "2025",
      icon: Award
    },
    {
      name: "CS50 Introduction to Computer Science",
      issuer: "Harvard University",
      year: "2024",
      icon: Award
    }
  ]

  const projects = [
    {
      name: "Personal Website",
      description: "A personal portfolio website designed to showcase my professional background, skills, and projects.",
      technologies: ["Web Development"],
      link: "GitHub - Repo"
    },
    {
      name: "YourAlbum",
      description: "Web application to securely back up, organize, and manage digital memories.",
      technologies: ["Web Development"],
      link: "GitHub - Repo"
    },
    {
      name: "Note Me - Note Your Thought",
      description: "Web application for storing, organizing, and managing thoughts and ideas.",
      technologies: ["React.js"],
      link: ""
    },
    {
      name: "Other Projects",
      description: "NewsDiller, MakeAdvertis, Renamo.io and many more projects.",
      technologies: [],
      link: ""
    }
  ]

  const languages = [
    { name: "Nepali", proficiency: "Native" },
    { name: "English", proficiency: "Fluent" },
    { name: "Hindi", proficiency: "Fluent" }
  ]

  return (
    <section id="resume" className="py-20 px-4 bg-zinc-100 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">My Resume</h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my qualifications, skills, and professional journey
          </p>
          <Button className="mt-6 gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">
            <Download className="h-4 w-4" /> Download Resume
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Left column - Skills & Certifications */}
          <div className="md:col-span-5 space-y-8">
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  <CardTitle className="text-zinc-900 dark:text-white">Skills & Expertise</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skills.map((skillGroup, index) => (
                    <div
                      key={index}
                      className="pb-5 last:pb-0 border-b last:border-0 border-zinc-200 dark:border-zinc-800"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-md ${skillGroup.color} flex items-center justify-center`}>
                          <skillGroup.icon className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="text-base font-semibold text-zinc-900 dark:text-white">{skillGroup.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-11">
                        {skillGroup.items.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-zinc-900 dark:text-white">Certifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-500">
                        <cert.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-zinc-900 dark:text-white">{cert.name}</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{cert.issuer}</p>
                      </div>
                      <Badge>{cert.year}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-zinc-900 dark:text-white">Languages</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                        {lang.name}
                      </Badge>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Education & Projects */}
          <div className="md:col-span-7 space-y-8">
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-zinc-900 dark:text-white">Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-blue-500/30 last:pb-0">
                      <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-white text-lg">{edu.degree}</h4>
                          <p className="text-blue-500">{edu.institution}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                          >
                            {edu.period}
                          </Badge>
                          {edu.gpa && (
                            <Badge className="bg-blue-500">GPA: {edu.gpa}</Badge>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-zinc-600 dark:text-zinc-300">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500 w-full"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-zinc-900 dark:text-white">Projects</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={index} className="pb-5 last:pb-0 border-b last:border-0 border-zinc-200 dark:border-zinc-800">
                      <h4 className="font-bold text-zinc-900 dark:text-white text-lg">{project.name}</h4>
                      <p className="mt-1 text-zinc-600 dark:text-zinc-300">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href="#"
                          className="inline-block mt-3 text-sm text-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          {project.link}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
