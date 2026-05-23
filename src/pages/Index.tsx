import { useState, useEffect } from "react";
import { AnimatedHeroSection } from "@/components/AnimatedHeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TechStackSection } from "@/components/TechStackSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "accueil", label: { fr: "Accueil", en: "Home" } },
  { id: "apropos", label: { fr: "À propos", en: "About" } },
  { id: "arsenal", label: { fr: "Arsenal", en: "Arsenal" } },
  { id: "projects", label: { fr: "Projets", en: "Projects" } },
  { id: "services", label: { fr: "Services", en: "Services" } },
  { id: "temoignages", label: { fr: "Témoignages", en: "Testimonials" } },
  { id: "contact", label: { fr: "Contact", en: "Contact" } },
];

const Index = () => {
  const { lang } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <div className="min-h-screen bg-parchment text-near-black selection:bg-terracotta/20 selection:text-near-black">
      {/* Skip to content link for keyboard accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-ivory focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta font-sans text-sm font-medium"
      >
        {lang("Aller au contenu principal", "Skip to main content")}
      </a>

      {/* Navigation */}
      <Navigation />

      <main id="main-content">
        {/* Hero Section - Light */}
        <section id="accueil" className="bg-parchment">
          <AnimatedHeroSection />
        </section>

        {/* About Section - Dark */}
        <section id="apropos" className="bg-near-black text-ivory">
          <AboutSection />
        </section>

        {/* Visual Separator */}
        <div className="h-24 md:h-48 bg-near-black" />

        {/* Tech Stack Section - Dark */}
        <section id="arsenal" className="bg-near-black text-ivory">
          <TechStackSection />
        </section>

        {/* Featured Projects Grid - Dark */}
        <section id="featured-projects" className="bg-near-black text-ivory">
          <FeaturedProjects />
        </section>

        {/* Projects Section - Light */}
        <section id="projects" className="bg-parchment">
          <ProjectsSection />
        </section>

        {/* Services Section - Dark */}
        <section id="services" className="bg-near-black text-ivory">
          <ServicesSection />
        </section>

        {/* Testimonials Section - Light */}
        <section id="temoignages" className="bg-parchment">
          <TestimonialsSection />
        </section>

        {/* Contact Section - Dark */}
        <section id="contact" className="bg-near-black text-ivory border-t border-white/5">
          <ContactSection />
        </section>
      </main>

      {/* Footer - Light/Warm */}
      <Footer />

      {/* Quick Navigation - Section dots */}
      <nav aria-label="Quick navigation" className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[80] hidden lg:flex flex-col items-center gap-3 no-print">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={lang(s.label.fr, s.label.en)}
            className="group relative flex items-center justify-center"
          >
            <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === s.id
                ? "bg-terracotta scale-125 shadow-sm shadow-terracotta/40"
                : "bg-stone-gray/30 hover:bg-stone-gray/60"
            }`} />
            <span className="absolute right-full mr-3 px-2 py-1 rounded-md bg-near-black text-ivory text-[10px] font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {lang(s.label.fr, s.label.en)}
            </span>
          </a>
        ))}
        <div className="w-px h-8 bg-border-cream/50 mt-1" />
      </nav>

      {/* Scroll to Top FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={scrollToTop}
            aria-label={lang("Retour en haut", "Back to top")}
            className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-2xl bg-terracotta text-ivory shadow-lg shadow-terracotta/30 flex items-center justify-center hover:bg-terracotta/90 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-parchment"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* <WhatsAppFloatButton /> - Temporarily hidden for redesign check */}
    </div>
  );
};


export default Index;
