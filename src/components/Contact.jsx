import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact({ data }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Thanks for your message! I'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 px-4 bg-zinc-100 dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">Get In Touch</h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Contact Information</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-full shadow-sm">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-zinc-900 dark:text-white">Email</h4>
                  <p className="text-zinc-600 dark:text-gray-400">{data?.email || "you@example.com"}</p>
              </div>
            </div>

              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-full shadow-sm">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-zinc-900 dark:text-white">Phone</h4>
                  <p className="text-zinc-600 dark:text-gray-400">{data?.phone || "tel:+977000000000"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-full shadow-sm">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-zinc-900 dark:text-white">Location</h4>
                  <p className="text-zinc-600 dark:text-gray-400">{data?.location || "Kathmandu, Nepal"}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800"
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
