import { useState, useEffect } from "react";
import { Github, Linkedin, Facebook, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Github, href: "https://github.com/ton-T0b0i7/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/eucher-abatti-7a9472283", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/bi.to.77235", label: "Facebook" },
];



export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="accueil"
      className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center bg-slate-950"
    >
      {/* Dynamic Starfield Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-white/5">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-brand-accent/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-blue-500/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Hero Content */}
        <div className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              React.js
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17cf17]/10 border border-[#17cf17]/20 text-[#17cf17] text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17cf17] animate-pulse" />
              {lang("IA & Automatisation", "AI & Automation")}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Node.js
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              {lang("App Mobile", "Mobile App")}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 text-white tracking-tighter uppercase">
            {lang("Créateur de", "Creator of")} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">
              {lang("Solutions Digitales", "Digital Solutions")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-lg mb-6 leading-relaxed">
            {lang(
              "Je construis des ponts entre la tech et le métier, avec une expertise reconnue en architecture logicielle et intégration IA.",
              "I build bridges between tech and business, with recognized expertise in software architecture and AI integration."
            )}
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-6 text-sm text-muted-foreground">
            <a href="tel:+2290157002427" className="flex items-center gap-2 hover:text-brand-accent transition-colors">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+229 0157002427</span>
            </a>
            <a href="mailto:abattieucher@gmail.com" className="flex items-center gap-2 hover:text-brand-accent transition-colors">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>abattieucher@gmail.com</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{lang("Porto-Novo, Bénin", "Porto-Novo, Benin")}</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
            <a
              href="#projects"
              className="px-8 py-4 bg-brand-accent rounded-xl font-bold hover:translate-y-[-2px] transition-all shadow-xl shadow-brand-accent/20 flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
            >
              {lang("Voir mes projets", "View my projects")}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl font-bold hover:bg-white/10 transition-all text-center uppercase text-sm tracking-wider"
            >
              {lang("Me contacter", "Contact me")}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Premium Avatar Section */}
        <div className={`relative flex justify-center ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"} transition-all duration-1000 delay-300`}>
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] flex items-center justify-center">

            {/* Background Decorative Auras (Static) */}
            <div className="absolute w-[80%] h-[80%] bg-brand-accent/5 rounded-full blur-[80px]" />
            <div className="absolute w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[60px]" />

            {/* The "Jolie Cadre" - Nice Frame */}
            <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px]">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-accent/20 via-blue-500/20 to-brand-accent/20 rounded-[2.5rem] blur-xl opacity-50 transition-opacity group-hover:opacity-100 animate-pulse" />

              {/* Main Border Container */}
              <div className="absolute inset-0 p-1 bg-gradient-to-tr from-brand-accent via-blue-400 to-brand-accent rounded-[2.5rem] shadow-2xl">
                {/* Inner Background / Padding */}
                <div className="w-full h-full bg-slate-900 rounded-[2.2rem] overflow-hidden p-1">
                  {/* Black Inner Border */}
                  <div className="w-full h-full bg-slate-950 rounded-[2rem] overflow-hidden relative">
                    <img
                      src="/profil.png"
                      alt="Eucher Abatti"
                      className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    />
                    {/* Glass Overlay Reflect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Decorative Accent (Bottom Right Badge Style) */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-950 border border-white/10 rounded-2xl flex items-center justify-center shadow-xl z-20">
                <div className="w-6 h-6 bg-brand-accent rounded-lg opacity-80" />
              </div>
            </div>

            {/* Decorative Floating Elements (Subtle & Static) */}
            <div className="absolute top-10 right-10 w-4 h-4 border border-brand-accent/20 rounded-full" />
            <div className="absolute bottom-20 left-0 w-2 h-2 bg-brand-accent/30 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
