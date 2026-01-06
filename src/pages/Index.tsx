import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SkillsOrb } from "@/components/SkillsOrb";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { GraduationCap, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Parcours Section */}
      <section id="parcours" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-radial from-secondary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              Parcours
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Mon <span className="gradient-text">Évolution</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              De la formation académique aux expériences professionnelles, découvrez
              les étapes qui ont forgé mon expertise.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Experience Timeline */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                Expériences & Formation
              </h3>
              <ExperienceTimeline />
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                Compétences Techniques
              </h3>
              <SkillsOrb />
            </div>
          </div>
        </div>
      </section>

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
  );
};

export default Index;
