import { useCallback, useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Sparkles,
  ArrowRight,
  Monitor,
  Cpu,
  Zap,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FeaturedProjectProps {
  projectUrl?: string;
  repoUrl?: string;
  images?: string[];
  title_fr?: string;
  title_en?: string;
  description_fr?: string;
  description_en?: string;
  techStack?: string[];
  capabilities?: { icon: any; label: string }[];
  cta_fr?: string;
  cta_en?: string;
  goalsDescription_fr?: string;
  goalsDescription_en?: string;
  goalsList?: { fr: string; en: string }[];
}

const defaultCapabilities = [
  { icon: Sparkles, label: "10+ Themes" },
  { icon: Monitor, label: "Real-time Switch" },
  { icon: Cpu, label: "React 19 Fiber" },
  { icon: Zap, label: "Optimized Perf" },
];

const defaultImages = [
  "/design/Portfolio.Os/P1.PNG",
  "/design/Portfolio.Os/P2.PNG",
  "/design/Portfolio.Os/P3.PNG",
  "/design/Portfolio.Os/P4.PNG",
  "/design/Portfolio.Os/P5.PNG",
  "/design/Portfolio.Os/P6.PNG",
  "/design/Portfolio.Os/P7.PNG",
  "/design/Portfolio.Os/P8.PNG",
  "/design/Portfolio.Os/P9.PNG",
  "/design/Portfolio.Os/P10.PNG",
  "/design/Portfolio.Os/P11.PNG",
];

export function FeaturedProject({
  projectUrl = "https://portefolio-os.netlify.app/",
  repoUrl = "https://github.com/T0b0i7/Portefolio.OS",
  images = defaultImages,
  title_fr,
  title_en,
  description_fr,
  description_en,
  techStack = ["React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Vite", "IA"],
  capabilities = defaultCapabilities,
  cta_fr,
  cta_en,
  goalsDescription_fr,
  goalsDescription_en,
  goalsList,
}: FeaturedProjectProps) {
  const { toast } = useToast();
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeElement = container.children[activeIndex] as HTMLElement;
      if (activeElement) {
        const containerWidth = container.clientWidth;
        const elementOffset = activeElement.offsetLeft;
        const elementWidth = activeElement.clientWidth;
        
        container.scrollTo({
          left: elementOffset - containerWidth / 2 + elementWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!projectUrl || projectUrl === "#projects") {
      e.preventDefault();
      toast({
        title: lang("Lien non disponible", "Link unavailable"),
        description: lang("Le lien du projet n'est pas encore disponible.", "The project link is not yet available."),
      });
    }
  };

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="py-24 md:py-40 bg-near-black text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-terracotta" />
                <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray font-bold">
                  {lang("Étude de Cas Vedette", "Featured Case Study")}
                </span>
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-medium leading-tight text-white mb-6">
                {title_fr && title_en ? lang(title_fr, title_en) : <>Portfolio<span className="text-terracotta">.OS</span></>}
              </h2>
                <p className="text-xl text-stone-gray font-sans leading-relaxed font-medium">
                  {description_fr && description_en
                    ? lang(description_fr, description_en)
                    : lang(
                        "Le Système d'Exploitation du Portfolio Authentique. Une plateforme next-gen permettant d'explorer 10 thèmes différents en temps réel.",
                        "The Authentic Portfolio Operating System. A next-gen platform to explore 10 different themes in real-time."
                      )}
                </p>
            </div>
            
            <div className="flex gap-4">
               <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleProjectClick}
                className="btn-primary"
              >
                {lang("Voir le projet", "View live")}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Interactive Gallery */}
          <div className="lg:col-span-8 space-y-8 min-w-0 w-full">
            <ScrollAnimation animation="fade-up">
              <div className="relative group">
                <div className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-warm-sand/5 shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIndex}
                      src={images[activeIndex]}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt={`Showcase ${activeIndex + 1}`}
                    />
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={prevImage}
                      className="w-14 h-14 rounded-full bg-near-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-terracotta transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="w-14 h-14 rounded-full bg-near-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-terracotta transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-6 right-6 px-4 py-2 bg-near-black/60 backdrop-blur-md rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-white border border-white/10">
                    {activeIndex + 1} / {images.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div 
                  ref={scrollContainerRef}
                  className="mt-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide w-full min-w-0"
                >
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={cn(
                        "relative flex-shrink-0 w-24 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all",
                        activeIndex === idx ? "border-terracotta scale-105 shadow-ring" : "border-transparent opacity-40 hover:opacity-80"
                      )}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-w-0 w-full">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-white/10 transition-colors">
                  <cap.icon className="w-5 h-5 text-terracotta group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-sans font-medium uppercase tracking-wider text-stone-gray">{cap.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h4 className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-stone-gray mb-6 font-bold">
                {lang("Technologies", "Technical Stack")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-sans font-medium text-ivory/90 hover:bg-white/10 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-stone-gray mb-6 font-bold">
                {lang("Objectifs & Défis", "Goals & Challenges")}
              </h4>
              <p className="text-stone-gray leading-relaxed mb-6 font-medium">
                {goalsDescription_fr && goalsDescription_en
                  ? lang(goalsDescription_fr, goalsDescription_en)
                  : lang(
                      "Le défi principal était de concevoir une architecture capable de basculer instantanément entre dix directions artistiques radicalement différentes sans interruption de l'expérience utilisateur.",
                      "The main challenge was to design an architecture capable of switching instantly between ten radically different artistic directions without interrupting the user experience."
                    )}
              </p>
              <ul className="space-y-4">
                {(goalsList || [
                  { fr: "Rendu temps réel performant", en: "High-perf real-time rendering" },
                  { fr: "Système de thèmes dynamique", en: "Dynamic theme system" },
                  { fr: "Interface utilisateur next-gen", en: "Next-gen user interface" }
                ]).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-ivory/80">
                    <ArrowRight className="w-4 h-4 text-terracotta" />
                    <span>{lang(item.fr, item.en)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 flex flex-col gap-6">
               <a 
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center !py-4"
              >
                {cta_fr && cta_en ? lang(cta_fr, cta_en) : lang("Explorer l'OS", "Launch OS Experience")}
                <Maximize2 className="ml-2 w-4 h-4" />
              </a>
              
              <a 
                href={repoUrl} 
                className={cn(
                  "flex items-center gap-2 text-sm font-sans font-medium text-stone-gray hover:text-terracotta transition-colors uppercase tracking-widest",
                  !repoUrl && "opacity-50 cursor-not-allowed"
                )}
              >
                <Github className="w-5 h-5" />
                {lang("Consulter le code source", "Browse Source Code")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
