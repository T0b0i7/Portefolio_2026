import { useState, useEffect, useMemo } from "react";
import { Menu, X, Globe, Layout, Cpu, Briefcase, Mail, UserRound } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./ThemeSwitcher";
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("#accueil");
  const { toggleLanguage, lang } = useLanguage();

  const navLinks = useMemo(
    () => [
      { href: "#accueil", label: lang("Accueil", "Home"), icon: Layout },
      { href: "#apropos", label: lang("À propos", "About"), icon: UserRound },
      { label: lang("Parcours", "Timeline"), href: "#parcours", icon: Cpu },
      { label: lang("Projets", "Projects"), href: "#projects", icon: Briefcase },
      { href: "#services", label: lang("Services", "Services"), icon: Globe },
      { label: lang("Contact", "Contact"), href: "#contact", icon: Mail },
    ],
    [lang]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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
  }, [navLinks]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300",
        isScrolled
          ? "bg-ivory/90 backdrop-blur-xl backdrop-saturate-150 border-b border-border-cream py-3"
          : "bg-transparent py-6"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a
          href="#accueil"
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl font-serif font-medium text-near-black">
            Tobi<span className="text-terracotta">Dev</span>
          </span>
        </a>

{/* ══════════ CENTER NAVIGATION ══════════ */}
        <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.href);
                }}
                className={cn(
                "px-4 py-2 text-[15px] font-medium transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2",
                activeTab === link.href
                  ? "text-near-black bg-warm-sand/60 font-semibold"
                  : "text-charcoal-warm hover:text-near-black hover:bg-warm-sand/30"
              )}
              >
                {link.label}
              </a>
            ))}
        </div>

        {/* ══════════ ACTIONS ══════════ */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-cream hover:bg-warm-sand/30 transition-all text-xs font-medium text-charcoal-warm"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase">{lang("EN", "FR")}</span>
          </button>

          <a 
            href="#contact" 
            className="hidden sm:flex btn-primary !px-5 !py-2 !text-sm"
          >
            {lang("Parlons-en", "Let's talk")}
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-near-black hover:bg-warm-sand/30 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* ══════════ MOBILE MENU ══════════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-ivory border-b border-border-cream shadow-whisper animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition-all",
                  activeTab === link.href
                    ? "bg-warm-sand/50 text-near-black"
                    : "text-olive-gray hover:bg-warm-sand/20"
                )}
                onClick={() => {
                  setActiveTab(link.href);
                  setMobileMenuOpen(false);
                }}
              >
                <link.icon className="w-5 h-5 opacity-60" />
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-border-cream">
              <button
                className="w-full flex items-center justify-between px-4 py-3 bg-terracotta rounded-xl text-ivory font-medium"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  <span>{lang("English", "Français")}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
