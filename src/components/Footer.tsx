import React from "react";
import { Github, Linkedin, Facebook, Mail, Phone, MapPin, ArrowUp, Code, Globe, Sparkles, Zap, Users, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const footerSections = [
  {
    title: "Services",
    links: [
      { name: "Développement Web", href: "#services" },
      { name: "Applications Mobile", href: "#services" },
      { name: "UI/UX Design", href: "#services" },
      { name: "Consulting Tech", href: "#services" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { name: "Accueil", href: "#hero" },
      { name: "Parcours", href: "#evolution" },
      { name: "Projets", href: "#projects" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { name: "Mentions légales", href: "#" },
      { name: "Politique de confidentialité", href: "#" },
      { name: "CGU", href: "#" },
    ],
  },
];

const contactInfo = [
  { icon: Mail, value: "abattieucher@gmail.com", href: "mailto:abattieucher@gmail.com" },
  { icon: Phone, value: "+229 0157002427", href: "tel:+22901570024277" },
  { icon: MapPin, value: "Porto-Novo, Bénin" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/T0b0i7/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/eucher-abatti-7a9472283", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/bi.to.77235", label: "Facebook" },
];

const stats = [
  { icon: Code, value: "50+", label: "Projets livrés" },
  { icon: Users, value: "30+", label: "Clients satisfaits" },
  { icon: Award, value: "5+", label: "Années d'expérience" },
  { icon: Globe, value: "8+", label: "Pays desservis" },
];

export function Footer() {
  const { colors, theme } = useTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>Eucher ABATTI</h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>Développeur Full-Stack</p>
              </div>
            </div>
            
            <p className="leading-relaxed" style={{ color: colors.textSecondary }}>
              Spécialisé dans la création d'applications web modernes et solutions digitales innovantes. 
              Je transforme vos idées en expériences performantes et élégantes.
            </p>

            {/* Quick Contact */}
            <div className="space-y-2">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                  <contact.icon className="w-4 h-4" style={{ color: colors.primary }} />
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="hover:underline"
                      style={{ color: colors.textSecondary }}
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <span>{contact.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center border"
                  style={{ backgroundColor: colors.primary + '10', borderColor: colors.border }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '20'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '10'; }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" style={{ color: colors.primary }} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-base" style={{ color: colors.text }}>{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm hover:underline transition-colors"
                      style={{ color: colors.textSecondary }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t" style={{ borderColor: colors.border }}>
          {/* Copyright */}
          <div className="text-sm" style={{ color: colors.textSecondary }}>
            <span>© {currentYear} Eucher ABATTI.</span>
          
          </div>

          {/* Back to Top */}
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="sm"
            style={{ borderColor: colors.border, color: colors.text }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '10'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Haut de page
          </Button>
        </div>
      </div>
    </footer>
  );
}
