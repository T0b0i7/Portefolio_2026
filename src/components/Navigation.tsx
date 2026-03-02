import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Terminal, Globe, Layout, Cpu, Briefcase, Mail, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("#accueil");
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, lang } = useLanguage();

  const navLinks = [
    { href: "#accueil", label: lang("Accueil", "Home"), icon: Layout },
    { href: "#parcours", label: lang("Parcours", "Journey"), icon: Cpu },
    { href: "#projects", label: lang("Projets", "Projects"), icon: Briefcase },
    { href: "#services", label: lang("Services", "Services"), icon: Globe },
    { href: "#contact", label: lang("Contact", "Contact"), icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active tab based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveTab(`#${section}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
        isScrolled
          ? "py-3 px-4 sm:px-6"
          : "py-6 px-4 sm:px-10"
      )}
    >
      <nav
        className={cn(
          "max-w-7xl mx-auto rounded-2xl transition-all duration-500 border border-white/5",
          isScrolled
            ? "glass-card bg-brand-dark/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-4 sm:px-8 h-16"
            : "bg-transparent px-0 h-20 border-transparent shadow-none"
        )}
      >
        <div className="h-full flex items-center justify-between">
          {/* ══════════ LOGO SECTION ══════════ */}
          <a
            href="#accueil"
            className="group flex items-center gap-3 relative overflow-hidden"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full group-hover:bg-brand-accent/40 transition-colors" />
              <div className="relative w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center overflow-hidden">
                <Terminal className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/10 to-transparent" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-black tracking-tight text-white uppercase sm:text-xl">Eucher</span>
                <span className="text-lg font-light tracking-widest text-brand-accent uppercase sm:text-xl opacity-80">Abatti</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[9px] font-mono text-slate-400 border border-white/5">
                  <span className="text-brand-accent">const</span> role <span className="text-blue-400">=</span> <span className="text-emerald-400">"dev"</span>
                </span>
              </div>
            </div>
          </a>

          {/* ══════════ CENTER NAVIGATION ══════════ */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-full p-1.5 px-2 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveTab(link.href)}
                className={cn(
                  "relative px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full",
                  activeTab === link.href
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {activeTab === link.href && (
                  <span className="absolute inset-0 bg-brand-accent rounded-full -z-10 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300" />
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* ══════════ SETTINGS ACTIONS ══════════ */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme currently fixed to dark */}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="group hidden sm:flex items-center gap-2.5 bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 px-4 py-2.5 rounded-xl transition-all active:scale-95"
            >
              <Globe className="w-4 h-4 text-brand-accent group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-brand-accent opacity-50" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════ MOBILE MENU ══════════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 mx-auto max-w-sm glass-card border border-white/10 rounded-3xl overflow-hidden animate-slide-down shadow-2xl">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all",
                  activeTab === link.href
                    ? "bg-brand-accent/20 text-brand-accent"
                    : "text-slate-400 hover:bg-white/5"
                )}
                onClick={() => {
                  setActiveTab(link.href);
                  setMobileMenuOpen(false);
                }}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-white/5 grid grid-cols-1 gap-3">
              <button
                className="flex items-center justify-between px-5 py-4 bg-brand-accent rounded-2xl text-white font-bold"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  <span>{language === "FR" ? "English" : "Français"}</span>
                </div>
                <span className="text-xs opacity-80 uppercase">{language === "FR" ? "EN" : "FR"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

