import { useState, useEffect, useMemo } from "react";
import { Github, Linkedin, Facebook, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTracking } from "@/hooks/useTracking";

const socialLinks = [
  { icon: Github, href: "https://github.com/T0b0i7/", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/eucher-abatti-7a9472283", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/bi.to.77235", label: "Facebook" },
];

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { lang } = useLanguage();
  const { trackEvent } = useTracking();
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const typingTexts = useMemo(
    () => [
      lang("solutions numériques qui transforment", "digital solutions that transform"),
      lang("systèmes qui automatisent", "systems that automate"),
      lang("marques qui se démarquent", "brands that stand out"),
    ],
    [lang]
  );
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        size: Math.random() * 2 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
      })),
    []
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    setBtnPos({ x, y });
  };

  const handleMouseLeave = () => setBtnPos({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const currentText = typingTexts[typingIndex] ?? "";
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (!isDeleting && typedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 70);
    } else if (!isDeleting && typedText.length === currentText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1400);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTypingIndex((prev) => (prev + 1) % typingTexts.length);
      }, 240);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [typedText, isDeleting, typingIndex, typingTexts]);

  return (
    <section
      id="accueil"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-slate-950 pt-28 pb-14 sm:pb-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden text-white/5">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 right-0 -z-10 h-1/3 w-1/3 rounded-full bg-brand-accent/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-1/4 w-1/4 rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-12">
        <div className={`transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="mb-5 inline-flex animate-float items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-accent" />
            TobiDev Studio
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              React.js
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#17cf17]/20 bg-[#17cf17]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#17cf17]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#17cf17] animate-pulse" />
              {lang("IA & Automatisation", "AI & Automation")}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
              Node.js
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              {lang("App Mobile", "Mobile App")}
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter text-white uppercase sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
            {lang("Je crée des", "I build")} <br className="hidden sm:block" />
            <span className="hero-gradient-flow bg-gradient-to-r from-brand-accent via-blue-300 to-brand-accent bg-clip-text text-transparent">
              {typedText}
              <span className="hero-type-cursor ml-1 inline-block h-[0.95em] w-[2px] bg-blue-300 align-[-0.08em]" />
            </span>
          </h1>

          <div className="mb-5 h-[3px] w-28 rounded-full bg-gradient-to-r from-brand-accent to-blue-400/60 animate-pulse" />

          <p className="mb-4 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
            {lang(
              "Design, copywriting et IA réunis pour transformer tes visiteurs en clients, avec une exécution claire et professionnelle.",
              "Design, copywriting, and AI combined to turn visitors into clients, with clear and professional execution."
            )}
          </p>

          <div className="mb-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {lang("Disponible pour missions", "Available for projects")}
            </span>
          </div>

          <div className="mb-6 flex flex-col flex-wrap gap-2 text-sm text-slate-300 sm:flex-row sm:gap-4">
            <a href="tel:+2290157002427" className="flex items-center gap-2 transition-colors hover:text-brand-accent">
              <Phone className="h-4 w-4 shrink-0" />
              <span>+229 0157002427</span>
            </a>
            <a href="mailto:abattieucher@gmail.com" className="flex items-center gap-2 transition-colors hover:text-brand-accent">
              <Mail className="h-4 w-4 shrink-0" />
              <span>abattieucher@gmail.com</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{lang("Porto-Novo, Benin", "Porto-Novo, Benin")}</span>
            </span>
          </div>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#projects"
              onClick={() => trackEvent("hero-view-projects")}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transform: `translate(${btnPos.x}px, ${btnPos.y}px)` }}
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-8 py-4 text-sm font-bold tracking-wider uppercase shadow-xl shadow-brand-accent/20 transition-transform duration-75"
            >
              {lang("Voir mes projets", "View my projects")}
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              onClick={() => trackEvent("hero-contact-me")}
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-center text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all hover:bg-white/10"
            >
              {lang("Me contacter", "Contact me")}
            </a>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("social-click", { platform: social.label })}
                className="text-muted-foreground transition-colors hover:text-white"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        <div className={`relative flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
          <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[450px] lg:w-[450px]">
            <div className="absolute h-[80%] w-[80%] rounded-full bg-brand-accent/5 blur-[80px]" />
            <div className="absolute h-[60%] w-[60%] rounded-full bg-blue-500/5 blur-[60px]" />

            <div className="relative z-10 h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-[350px] lg:w-[350px]">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-brand-accent/20 via-blue-500/20 to-brand-accent/20 blur-xl opacity-50 animate-pulse" />

              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-brand-accent via-blue-400 to-brand-accent p-1 shadow-2xl">
                <div className="h-full w-full overflow-hidden rounded-[2.2rem] bg-slate-900 p-1">
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-slate-950">
                    <img
                      src="/profil.png"
                      alt="TobiDev"
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover grayscale-[10%] transition-all duration-700 hover:scale-105 hover:grayscale-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -bottom-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950 shadow-xl">
                <div className="h-6 w-6 rounded-lg bg-brand-accent opacity-80" />
              </div>
            </div>

            <div className="absolute top-10 right-10 h-4 w-4 rounded-full border border-brand-accent/20" />
            <div className="absolute bottom-20 left-0 h-2 w-2 rounded-full bg-brand-accent/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
