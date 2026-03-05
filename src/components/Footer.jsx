import { socialLinks as defaultSocial, navLinks as defaultNav } from '@/data/links';

export default function Footer({ data, navLinks, socialLinks }) {
  const links = navLinks?.length ? navLinks : defaultNav.map((l) => l.label);
  const socials = socialLinks || defaultSocial;
  return (
    <footer className="border-t border-[--line] bg-[--page-bg] text-[--muted]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[--page-fg] font-semibold">
            <img src="/loog-hcb.png" alt="HCB logo" className="h-7 w-auto" />
            <span>Himesh Bhattarai</span>
          </div>
          <p className="text-sm text-[--muted]">Sharp, fast web experiences. Based in Kathmandu, shipping globally.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {links.map((label) => (
            <button
              key={label}
              onClick={() => {
                const el = document.getElementById(label.toLowerCase());
                if (!el) return;
                const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }}
              className="text-sm hover:text-[--page-fg] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:text-[--page-fg] transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-[--line] px-6 py-4 text-center text-xs text-[--muted]">
        {data?.copyright || `© ${new Date().getFullYear()} Himesh Bhattarai. All rights reserved.`}
      </div>
    </footer>
  );
}
