import { Code, Layers, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">About Me</h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm a passionate FRONTEND, BACKEND, FULLSTACK DAEVELOPER and DESIGNER with expertise in creating immersive digital experiences. My work
            combines technical precision with creative vision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-xl">
              <img src="public\WhatsApp Image 2025-12-01 at 7.49.26 PM (1).jpeg?height=1200&width=600" alt="Profile" className="object-cover" />
              {/* Smoke Effect Overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div> */}

              {/* Animated Smoke */}
              {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="smoke-1"></div>
                <div className="smoke-2"></div>
                <div className="smoke-3"></div>
              </div> */}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
              Creative Developer
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              I'm Himesh Bhattarai, a passionate app and web developer from Prakashpur, Sunsari, Nepal. From a young age, I was fascinated by technology, and this curiosity drove me to explore the world of coding and software development. My journey began with simple HTML pages, but soon, I was diving into complex web applications and mobile app development.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              My goal is to create intuitive, efficient, and user-friendly applications that solve real-world problems. I'm particularly interested in front-end development and have been sharpening my skills in React, JavaScript, and other modern web technologies. I aspire to work on projects that challenge me and allow me to grow as a developer.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-white mb-2">Name:</h4>
                <p className="text-zinc-600 dark:text-zinc-400">HIMESHCHANCHAL BHATTARAI</p>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-white mb-2">Email:</h4>
                <p className="text-zinc-600 dark:text-zinc-400">code.himesh@gmail.com</p>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-white mb-2">Location:</h4>
                <p className="text-zinc-600 dark:text-zinc-400">KATHMANDU, NEPAL</p>
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-white mb-2">Availability:</h4>
                <p className="text-zinc-600 dark:text-zinc-400">WEBSITE || APP DEVELOPER</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-medium text-white hover:opacity-90 transition-opacity">
                Download CV
              </button>
              <button className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg font-medium text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Contact Me
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="pb-2">
              <Code className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-zinc-900 dark:text-white">Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-zinc-600 dark:text-gray-400">
                Expert in React, Innovative Design, and various Frontend frameworks. I build performant and visually stunning web
                applications.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="pb-2">
              <Layers className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-zinc-900 dark:text-white">Backend</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-zinc-600 dark:text-gray-400">
                Skilled in Express, Node & Other Backend Framework
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20">
            <CardHeader className="pb-2">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-zinc-900 dark:text-white">Creative Direction</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-zinc-600 dark:text-gray-400">
                Bringing ideas to life with a focus on user experience and innovative design solutions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

