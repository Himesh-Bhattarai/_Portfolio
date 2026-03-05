import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/Theme-provider';

const scrollTo = (id, close) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
  window.scrollTo({ top: y, behavior: 'smooth' });
  if (close) close(false);
};

export default function Navbar({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const links = data?.links || ["Home", "Work", "Experience", "About", "Resume", "Contact"];
  const brandImage = data?.brandImage || "/loog-hcb.png";
  const brandName = data?.brandName || "Himesh Bhattarai";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(11,11,15,0.9)] backdrop-blur border-b border-[--line]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <img src={brandImage} alt="HCB logo" className="h-8 w-auto" />
          <span className="hidden sm:inline text-[--muted]">{brandName}</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((label) => (
            <button
              key={label}
              onClick={() => scrollTo(label.toLowerCase())}
              className="px-3 py-2 text-sm font-medium text-[--muted] hover:text-[--page-fg] transition-colors"
            >
              {label}
            </button>
          ))}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>

        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-1">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen((s) => !s)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[--line] bg-[--panel]">
          <div className="px-4 py-3 space-y-1">
            {links.map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase(), setIsOpen)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-[--muted] hover:text-[--page-fg] rounded-md"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
