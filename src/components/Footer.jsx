import Link from 'next/link';

const PAGE_LINKS = { Now: '/now', Uses: '/uses' };

export default function Footer({ data, navLinks, socialLinks }) {
  const links = navLinks?.length ? navLinks : (data?.quickLinks || []);
  const socials = data?.socialLinks?.map((label) => ({ label, url: '#' })) || socialLinks || [];
  const brandImage = data?.logo || data?.brandImage || '/loog-hcb.png';
  const brandName = data?.brandName || 'Himesh Bhattarai';
  const tagline = data?.tagline || 'Sharp, fast web experiences. Based in Kathmandu, shipping globally.';

  const footerContent = {
    brandImage: "/loog-hcb.png",
    brandName: "Himeshchanchal Bhattarai",
    tagLine: "Full Stack Developer building modern web applications and AI-powered software.",
    quickLinks: ["Home", "Work", "Experience", "About", "Resume", "Contact", "Now", "Uses"],
    socialLinks: [
      {label: "GitHub", url: "https://github.com/your-handle"},
      {label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle"},
      {label: "Mail", url: "mailto:you@example.com"},
    ],
    copyright: "© 2026 Himesh Bhattarai. All rights reserved."
  }
  return (
    <footer className="border-t border-[--line] bg-[--page-bg] text-[--muted]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[--page-fg] font-semibold">
            <img src={footerContent.brandImage} alt="HCB logo" className="h-7 w-auto" />
            <span>{footerContent.brandName}</span>
          </div>
          <p className="text-sm text-[--muted]">{footerContent.tagLine}</p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {footerContent.quickLinks.map((label) =>
            PAGE_LINKS[label] ? (
              <Link key={label} href={PAGE_LINKS[label]} className="text-sm hover:text-[--page-fg] transition-colors">
                {label}
              </Link>
            ) : (
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
            )
          )}
        </div>

        <div className="flex items-center gap-5 whitespace-nowrap">
  {footerContent.socialLinks.map((social) => (
    <a
      key={social.label}
      href={social.url || "#"}
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
