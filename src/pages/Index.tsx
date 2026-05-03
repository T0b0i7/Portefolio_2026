import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TechStackSection } from "@/components/TechStackSection";
import { EvolutionSection } from "@/components/EvolutionSection";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { Layout, ShieldCheck, Zap, GraduationCap, FileText, Monitor } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-parchment text-near-black selection:bg-terracotta/20 selection:text-near-black">
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

        {/* Featured Project - Dark */}
        <section id="portfolio-os" className="bg-near-black text-ivory">
          <FeaturedProject
            projectUrl="https://portefolio-os.netlify.app/"
            repoUrl="https://github.com/T0b0i7/Portefolio_2026"
          />
        </section>

        {/* Imona Featured Project - Dark */}
        <section id="imona-featured" className="bg-near-black text-ivory">
          <FeaturedProject
            title_fr="Imona"
            title_en="Imona"
            description_fr="IMONA est une application béninoise de gestion locative simplifiée destinée aux propriétaires au Bénin."
            description_en="IMONA is a simplified Beninese rental management application designed for property owners in Benin."
            projectUrl="https://imona.app/"
            techStack={["Laravel", "TypeScript", "PHP", "Blade", "CSS", "Dockerfile", "HTML"]}
            cta_fr="Explorer Imona"
            cta_en="Launch Imona"
            goalsDescription_fr="Le défi était de créer un outil digital adapté au marché local, permettant une gestion transparente et automatisée des biens immobiliers."
            goalsDescription_en="The challenge was to create a digital tool adapted to the local market, allowing transparent and automated management of real estate properties."
            goalsList={[
              { fr: "Gestion automatisée des loyers", en: "Automated rent management" },
              { fr: "Suivi des paiements en temps réel", en: "Real-time payment tracking" },
              { fr: "Simplification administrative", en: "Administrative simplification" }
            ]}
            capabilities={[
              { icon: Layout, label: "Tableau de Bord" },
              { icon: ShieldCheck, label: "Accès Sécurisé" },
              { icon: Zap, label: "Optimisé" }
            ]}
            images={[
              "/design/Imona/I1.PNG",
              "/design/Imona/I2.PNG",
              "/design/Imona/I3.PNG",
              "/design/Imona/I4.PNG",
              "/design/Imona/I5.PNG",
              "/design/Imona/I6.PNG",
              "/design/Imona/I7.PNG"
            ]}
          />
        </section>

        {/* IPPh Featured Project - Dark */}
        <section id="ipph-featured" className="bg-near-black text-ivory border-t border-white/5">
          <FeaturedProject
            title_fr="IPPh"
            title_en="IPPh"
            description_fr="IPPh est une plateforme web conçue pour représenter l'Institut Polytechnique Paul Hazoumé en ligne. Elle inclut un site vitrine ainsi qu'un back-office permettant la gestion dynamique des contenus."
            description_en="IPPh is a web platform designed to represent the Institut Polytechnique Paul Hazoumé online. It includes a showcase site as well as a back-office allowing dynamic content management."
            projectUrl="https://ip-ph.netlify.app/"
            techStack={["TypeScript", "PHP", "Blade", "CSS", "Dockerfile", "HTML"]}
            cta_fr="Explorer l'IUUP"
            cta_en="Launch IUUP"
            goalsDescription_fr="L'objectif était de moderniser la communication de l'institut avec une plateforme dynamique intégrant un back-office complet pour la gestion académique."
            goalsDescription_en="The objective was to modernize the institute's communication with a dynamic platform integrating a complete back-office for academic management."
            goalsList={[
              { fr: "Site vitrine académique", en: "Academic showcase site" },
              { fr: "Gestion des formations", en: "Training management" },
              { fr: "Administration autonome", en: "Autonomous administration" }
            ]}
            capabilities={[
              { icon: GraduationCap, label: "Portail Académique" },
              { icon: FileText, label: "Gestion CMS" },
              { icon: Monitor, label: "Interface Vitrine" }
            ]}
            images={[
              "/design/IUUP/1.PNG",
              "/design/IUUP/2.PNG",
              "/design/IUUP/3.PNG",
              "/design/IUUP/4.PNG"
            ]}
          />
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
