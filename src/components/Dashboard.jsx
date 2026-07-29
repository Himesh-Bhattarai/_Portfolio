import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './sections/Hero';
import Work from './sections/Work';
import Experience from './sections/Experience';
import About from './sections/About';
import Resume from './sections/Resume';
import Contact from './sections/Contact';

export default function Dashboard({ content }) {
  const links = content.navbar?.links || [];
  const has = (name) => links.map((l) => l.toLowerCase()).includes(name.toLowerCase());

  return (
    <>
      <Navbar data={content.navbar} />
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
