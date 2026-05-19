import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TechStackSection } from "@/components/TechStackSection";
import { EvolutionSection } from "@/components/EvolutionSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { lang } = useLanguage();
  
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
          <HeroSection />
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

        {/* Evolution Section - Light */}
        <section id="parcours" className="bg-parchment">
          <EvolutionSection />
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

      {/* <WhatsAppFloatButton /> - Temporarily hidden for redesign check */}
    </div>
  );
};


export default Index;
