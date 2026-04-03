import { HeroSection } from "@/components/HeroSection";
import { EvolutionSection } from "@/components/EvolutionSection";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectsSection } from "@/components/ProjectsSection";
import { DesignGallery } from "@/components/DesignGallery";
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

        {/* Featured Project - AfriEnhance AI */}
        <FeaturedProject 
          projectUrl="https://afri-enhance-ai.vercel.app"
          repoUrl="https://github.com/yourusername/afri-enhance-ai"
          beforeImage="/design/AfriEnhance AI/AfriEnhance AI_1.PNG"
          afterImage="/design/AfriEnhance AI/AfriEnhance AI_2.PNG"
        />

        {/* Projects Section (Projets) */}
        <ProjectsSection />

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
