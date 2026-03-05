import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Experience from './sections/Experience';
import About from './sections/About';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import { Button } from './ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Dashboard({ content, status, error, onRefresh, isFallback }) {
  const links = content.navbar?.links || [];
  const has = (name) => links.map((l) => l.toLowerCase()).includes(name.toLowerCase());

  return (
    <>
      <Navbar data={content.navbar} />
      {status === 'error' || isFallback ? (
        <div className="bg-amber-900/30 text-amber-100 border border-amber-700 px-4 py-3 flex items-center gap-3 justify-center">
          <AlertTriangle className="h-4 w-4" />
          <span>{isFallback ? "Using fallback content." : "Could not fetch README."} {error || ""}</span>
          <Button size="sm" variant="outline" onClick={onRefresh} className="gap-2 border-amber-500/60 text-amber-50">
            <RefreshCw className="h-4 w-4" /> Retry
          </Button>
        </div>
      ) : null}
      <main className="bg-[--page-bg] text-[--page-fg]">
        <Hero data={content.hero} />
        <Work data={content.projects} />
        {has('Experience') && <Experience data={content.experience} />}
        <About data={content.about} />
        <Resume data={content.resume} />
        <Contact data={content.contact} />
      </main>
      <Footer
        data={{ ...content.footer, logo: content.assets?.logo, brandImage: content.navbar?.brandImage, brandName: content.navbar?.brandName }}
        navLinks={links}
        socialLinks={content.footer?.socialLinks || content.navbar?.socials}
      />
    </>
  );
}
