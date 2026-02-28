import { HeroSection } from "@/components/HeroSection";
import { EvolutionSection } from "@/components/EvolutionSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { EnigmaSection } from "@/components/EnigmaSection";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section - The Solar System Greeting */}
        <HeroSection />

        {/* Evolution Section */}
        <EvolutionSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Enigma Section - The Suspended Question */}
        <EnigmaSection />

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
