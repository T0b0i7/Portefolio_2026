import { useState, useEffect } from "react";
import { AutoImageCarousel } from "./AutoImageCarousel";
import { Github, Linkedin, Facebook, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Github, href: "https://github.com/T0b0i7/", label: "GitHub" },
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
    <div className="relative pt-16 pb-12 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-ivory -z-10 rounded-bl-[100px] opacity-50" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div className={`transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="mb-8 flex items-center gap-3">
             <span className="px-3 py-1 rounded-full bg-warm-sand text-[11px] font-sans font-medium uppercase tracking-widest text-charcoal-warm border border-border-cream">
              {lang("Disponible pour missions", "Available for hire")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium text-near-black leading-[1.1] mb-6 md:mb-8">
            {lang("Bénissez votre", "Elevate your")} <br />
            <span className="text-terracotta">{lang("présence numérique", "digital presence")}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoal-warm font-sans leading-relaxed mb-8 md:mb-10 max-w-xl">
            {lang(
              "Développeur Full-Stack & Designer UI/UX. Je conçois des interfaces élégantes et des systèmes robustes qui racontent votre histoire.",
              "Full-Stack Developer & UI/UX Designer. I craft elegant interfaces and robust systems that tell your story."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#projects"
              className="btn-primary group"
            >
              {lang("Explorer mon travail", "Explore my work")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="btn-secondary"
            >
              {lang("Me contacter", "Get in touch")}
            </a>
          </div>

          <div className="flex items-center gap-4 md:gap-8 flex-wrap">
            <span className="text-xs sm:text-sm font-sans text-charcoal-warm uppercase tracking-widest font-medium">{lang("Suivez-moi", "Follow me")}</span>
            <div className="flex gap-3 sm:gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-gray hover:text-terracotta transition-colors p-2 -m-2"
                  aria-label={`${social.label} (nouvelle fenêtre / new window)`}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`relative transition-all duration-1000 delay-300 transform ${isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
          <div className="relative w-full max-w-[520px] aspect-square mx-auto flex flex-col items-center justify-center">
            {/* Organic Shape Backdrops */}
            <div className="absolute inset-0 bg-terracotta/5 rounded-[48px] rotate-6 pointer-events-none" />
            <div className="absolute inset-0 bg-warm-sand/40 rounded-[48px] -rotate-3 pointer-events-none" />

            <div className="relative w-full max-w-[260px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[500px] aspect-square rounded-[32px] overflow-hidden border border-border-cream shadow-whisper z-10">
              <AutoImageCarousel
                images={[
                  { src: "/profil.png", alt: "TobiDev" },
                  { src: "/profil1.png", alt: "TobiDev couleur" },
                ]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating Badge repositionné */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 bg-ivory p-3 sm:p-4 md:p-5 rounded-2xl border border-border-cream shadow-whisper max-w-[160px] z-20">
              <div className="text-terracotta font-serif text-xl sm:text-2xl md:text-3xl font-medium mb-1">5+</div>
              <div className="text-xs font-sans text-charcoal-warm leading-tight uppercase tracking-wider font-medium">
                {lang("Années d'expérience en dev", "Years of dev experience")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
