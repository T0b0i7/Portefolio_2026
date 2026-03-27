import { HeroSection } from "@/components/HeroSection";
import { EvolutionSection } from "@/components/EvolutionSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { DesignGallery } from "@/components/DesignGallery";
import { AILab } from "@/components/AILab";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { EnigmaSection } from "@/components/EnigmaSection";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminAccessHub } from "@/components/AdminAccessHub";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <HeroSection />

        {/* Evolution Section (Parcours) */}
        <EvolutionSection />

        {/* Projects Section (Projets) */}
        <ProjectsSection />

        {/* AI Lab Section */}
        <AILab />

        {/* Design Gallery Section */}
        <DesignGallery />

        {/* Services / Expertise Section */}
        <ServicesSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Enigma Section - The Suspended Question */}
        <EnigmaSection />

        {/* Footer */}
        <Footer />

        {/* Admin Hub Access */}
        <AdminAccessHub />
      </div>
    </ThemeProvider>
  );
};

export default Index;
