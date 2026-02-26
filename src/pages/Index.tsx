import { HeroSection } from "@/components/HeroSection";
import { EvolutionSection } from "@/components/EvolutionSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Evolution Section */}
        <EvolutionSection />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Services Section */}
        <ServicesSection />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
