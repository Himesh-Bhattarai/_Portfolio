import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { contactLinks as defaults } from '@/data/links';

export default function Contact({ data }) {
  const contact = { ...defaults, ...(data || {}) };
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="px-6 py-20 bg-[--panel] text-[--page-fg]">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-start">
        <div className="space-y-4">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Let’s ship something together.</h2>
          <p className="text-[--muted] max-w-xl">
            Tell me about the problem, the users, and the timeline. I’ll respond within 24 hours.
          </p>

          <div className="space-y-3 text-sm text-[--muted]">
            {contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[--accent]" />
                <a href={`mailto:${contact.email}`} className="hover:text-[--page-fg]">{contact.email}</a>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[--accent]" />
                <a href={`tel:${contact.phone}`} className="hover:text-[--page-fg]">{contact.phone}</a>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[--accent]" />
                <span>{contact.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[--line] bg-[--card] p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-transparent border-[--line] focus-visible:ring-[--accent]"
            />
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-transparent border-[--line] focus-visible:ring-[--accent]"
            />
            <Textarea
              name="message"
              placeholder="Project goals, timeline, constraints..."
              value={form.message}
              onChange={handleChange}
              required
              className="bg-transparent border-[--line] min-h-[140px] focus-visible:ring-[--accent]"
            />
            <div className="flex items-center justify-between">
              <Button type="submit" className="gap-2">
                Send Message <ArrowRight className="h-4 w-4" />
              </Button>
              {sent && <span className="text-xs text-[--muted]">Message queued. I’ll reply shortly.</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
