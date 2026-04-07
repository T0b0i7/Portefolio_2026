import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { EvolutionSection } from "@/components/EvolutionSection";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Navigation */}
        <Navigation />

        <main id="main-content">
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AboutSection />

          {/* Evolution Section (Parcours) */}
          <EvolutionSection />

          {/* Featured Project - AfriEnhance AI */}
          <FeaturedProject
            projectUrl="https://afri-enhance-ai.vercel.app"
            repoUrl=""
            beforeImage="/design/AfriEnhance AI/AfriEnhance AI_1.PNG"
            afterImage="/design/AfriEnhance AI/AfriEnhance AI_2.PNG"
          />

          {/* Projects Section (Projets) */}
          <ProjectsSection />

          {/* Services / Expertise Section */}
          <ServicesSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <div className="mt-8 sm:mt-10">
          <Footer />
        </div>

        <WhatsAppFloatButton />
      </div>
    </ThemeProvider>
  );
};

export default Index;
