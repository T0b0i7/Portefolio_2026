import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Terminal, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, lang } = useLanguage();

  const navLinks = [
    { href: "#accueil", label: lang("Accueil", "Home") },
    { href: "#parcours", label: lang("Parcours", "Timeline") },
    { href: "#projects", label: lang("Projets", "Projects") },
    { href: "#services", label: lang("Services", "Services") },
    { href: "#contact", label: lang("Contact", "Contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "glass-card border-b border-white/5 bg-brand-dark/80 backdrop-blur-md"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* New Dev Logo */}
        <a href="#accueil" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-blue-400 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-brand-accent" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 leading-none">
              <span className="text-lg font-bold text-white tracking-tighter uppercase">Eucher</span>
              <span className="text-lg font-bold text-brand-accent tracking-tighter uppercase">Abatti</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1 group">
              <span className="text-brand-accent font-bold">const</span>
              <span>role</span>
              <span className="text-blue-400">=</span>
              <span className="text-orange-400">"dev"</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="group flex items-center gap-2 bg-slate-900/50 hover:bg-brand-accent border border-white/5 hover:border-brand-accent px-3 py-1.5 rounded-full transition-all shadow-lg hidden sm:flex"
          >
            <Globe className="w-4 h-4 text-brand-accent group-hover:text-white transition-colors animate-spin-slow" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {language}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/5 animate-slide-down">
          <div className="px-4 sm:px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-muted-foreground hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Language toggle in mobile menu */}
            <button
              className="flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-5 py-2.5 rounded-full text-sm font-semibold text-brand-accent hover:bg-brand-accent hover:text-white transition-all mt-2 w-full justify-center"
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
            >
              <Globe className="w-4 h-4" />
              <span>{language === "FR" ? "Passer en EN" : "Switch to FR"}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

