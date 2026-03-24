import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";


const navLinks = [
  { href: "#home", label: "Главная" },
  { href: "#about", label: "О компании" },
  { href: "#services", label: "Услуги" },
  { href: "#production", label: "Производство" },
  { href: "#contacts", label: "Контакты" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => handleNav("#home")}
          className="flex items-center group"
        >
          <img
            src="https://cdn.poehali.dev/projects/dfb49ee8-efb6-4a16-899e-6b2691fe21f4/bucket/fc847760-8653-4140-98f8-f07d3569cb4a.png"
            alt="СВ-ТехноГрупп"
            className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => handleNav("#contacts")}
          className="hidden md:block btn-primary px-5 py-2.5 rounded-lg text-sm font-semibold text-background"
        >
          Получить КП
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-white/5 px-6 pb-6 pt-2 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="block w-full text-left text-base text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-white/5 font-body"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#contacts")}
            className="btn-primary w-full py-3 rounded-lg text-sm font-semibold text-background mt-2"
          >
            Получить КП
          </button>
        </div>
      )}
    </header>
  );
}