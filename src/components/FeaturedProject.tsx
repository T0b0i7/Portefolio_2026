import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  FileText,
  Github,
  Sparkles,
  User,
  Wand2,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { useToast } from "@/hooks/use-toast";

interface FeaturedProjectProps {
  projectUrl?: string;
  repoUrl?: string;
  beforeImage?: string;
  afterImage?: string;
}

const modes = [
  {
    icon: Sparkles,
    name: "Restauration",
    description: "Denuitage + amelioration resolution",
  },
  {
    icon: Wand2,
    name: "Generation",
    description: "Inpainting et extension guidee par prompt",
  },
  {
    icon: User,
    name: "Portrait",
    description: "Retouche intelligente des visages",
  },
  {
    icon: FileText,
    name: "Document",
    description: "Nettoyage scan et lisibilite",
  },
];

const stack = ["React", "TypeScript", "Tailwind", "Vite", "Gemini AI", "PWA"];

const metrics = [
  { value: "Gemini 2.5", label: "Modele IA" },
  { value: "4", label: "Modes IA" },
  { value: "4K", label: "Resolution max" },
  { value: "PWA", label: "Installable" },
];

const galleryImages = [
  "/design/AfriEnhance AI/AfriEnhance AI_3.PNG",
  "/design/AfriEnhance AI/AfriEnhance AI_4.PNG",
  "/design/AfriEnhance AI/AfriEnhance AI_5.PNG",
  "/design/AfriEnhance AI/AfriEnhance AI_6.PNG",
];

export function FeaturedProject({
  projectUrl = "#projects",
  repoUrl,
  beforeImage = "/design/AfriEnhance AI/AfriEnhance AI_1.PNG",
  afterImage = "/design/AfriEnhance AI/AfriEnhance AI_2.PNG",
}: FeaturedProjectProps) {
  const { toast } = useToast();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: "Code source non disponible",
      description: "Le code source du projet AfriEnhance AI n'est pas encore disponible pour le moment.",
      variant: "default",
    });
  };

  const handleSliderMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const newPosition = Math.max(1, Math.min(99, (x / rect.width) * 100));
    setSliderPosition(newPosition);
  }, []);

  const stopDragging = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("mousemove", handleSliderMove);
    document.addEventListener("touchmove", handleSliderMove);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);

    return () => {
      document.removeEventListener("mousemove", handleSliderMove);
      document.removeEventListener("touchmove", handleSliderMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging, handleSliderMove, stopDragging]);

  const openLightbox = (image: string) => {
    const index = galleryImages.indexOf(image);
    setActiveImage(image);
    setActiveImageIndex(index === -1 ? 0 : index);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!activeImage) return;
    const currentIndex = galleryImages.indexOf(activeImage);
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + galleryImages.length) % galleryImages.length
        : (currentIndex + 1) % galleryImages.length;
    setActiveImage(galleryImages[newIndex]);
    setActiveImageIndex(newIndex);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 py-14 sm:py-16 md:py-20">
      <ScrollAnimation>
        <div className="container mx-auto mb-10 px-4 sm:mb-12">
          <h2 className="mb-3 text-center text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Projet Vedette
          </h2>
          <p className="text-center text-base text-slate-400 sm:text-lg">
            Produit IA oriente usage reel et experience claire
          </p>
        </div>
      </ScrollAnimation>

      <div className="absolute left-10 top-20 h-96 w-96 rounded-full bg-brand-accent/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl animate-pulse" />

      <div className="container relative z-10 mx-auto px-4">
        <ScrollAnimation delay={80}>
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Production case study
                </span>
              </div>
              <h3 className="mb-2 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                AfriEnhance{" "}
                <span className="bg-gradient-to-r from-brand-accent via-blue-300 to-brand-accent bg-clip-text text-transparent">
                  AI
                </span>
              </h3>
              <p className="text-base font-light text-slate-300 sm:text-lg">
                Retouche d&apos;image professionnelle propulsee par IA
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-right font-mono text-xs">
              <div className="flex items-center justify-end gap-2 text-blue-300">
                <Activity className="h-3 w-3" />
                <span>ENGINE_ACTIVE</span>
              </div>
              <div className="ml-auto h-px w-32 bg-blue-500/30" />
              <span className="text-slate-500">4K_READY</span>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:auto-rows-[220px]">
          <ScrollAnimation className="md:col-span-2 md:row-span-2" delay={120}>
            <div
              ref={sliderRef}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="group relative h-full cursor-col-resize overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur transition-all duration-300 hover:border-brand-accent/50"
            >
              <img src={beforeImage} alt="Avant traitement IA" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 h-full w-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <img src={afterImage} alt="Apres traitement IA" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div
                className="absolute bottom-0 top-0 w-1 bg-gradient-to-b from-transparent via-brand-accent to-transparent"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-accent bg-brand-accent/20" />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-5 sm:p-6">
                <p className="font-mono text-sm text-blue-300">Glissez pour comparer</p>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="h-full rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur transition-all hover:border-brand-accent/50 sm:p-5">
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-300">Stack Technique</h4>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span key={tech} className="rounded-lg border border-brand-accent/20 bg-brand-accent/10 px-2.5 py-1 text-xs font-mono text-brand-accent">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={260}>
            <div className="h-full rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur transition-all hover:border-brand-accent/50 sm:p-5">
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-300">Metriques</h4>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="space-y-0.5">
                    <p className="text-base font-black leading-tight text-blue-300 sm:text-lg">{metric.value}</p>
                    <p className="text-[10px] font-semibold uppercase text-slate-500">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation className="md:col-span-2" delay={320}>
            <div className="h-full rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur transition-all hover:border-brand-accent/50 sm:p-5">
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-300">Modes IA</h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <div key={mode.name} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-accent/10">
                        <Icon className="h-3.5 w-3.5 text-brand-accent" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-xs font-semibold text-white">{mode.name}</h5>
                        <p className="text-[10px] leading-tight text-slate-400">{mode.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={380}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 backdrop-blur transition-all hover:border-brand-accent/50 sm:p-5">
              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-300">Acces</h4>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-2/3 bg-gradient-to-r from-brand-accent to-blue-400 animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={projectUrl}
                  onClick={handleProjectClick}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-accent/50 bg-gradient-to-r from-brand-accent to-blue-500 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Voir le projet
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {repoUrl ? (
                  <a
                    href={repoUrl}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-brand-accent/50 hover:text-brand-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code source
                    <Github className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation delay={120}>
          <div className="mt-10 sm:mt-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-accent/10">
                <Eye className="h-4 w-4 text-brand-accent" />
              </div>
              <h4 className="text-2xl font-bold text-white">Apercu du projet</h4>
            </div>

            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
              {galleryImages.map((image, idx) => (
                <button
                  key={image}
                  className="group relative aspect-square w-48 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur transition-all duration-300 hover:scale-105 hover:border-brand-accent/50"
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={image}
                    alt={`Apercu ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="text-xs font-semibold text-white">Apercu {idx + 1}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {activeImage ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl" onClick={() => setActiveImage(null)}>
          <button
            className="absolute right-8 top-8 z-10 text-white/50 transition-colors hover:text-white"
            onClick={() => setActiveImage(null)}
            aria-label="Fermer la galerie"
          >
            <span className="text-4xl">x</span>
          </button>

          <button
            className="absolute left-8 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white/50 transition-colors hover:bg-black/40 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            aria-label="Image precedente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-8 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white/50 transition-colors hover:bg-black/40 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-sm text-white/70">
            {activeImageIndex + 1} / {galleryImages.length}
          </div>

          <img
            src={activeImage}
            alt="Plein ecran"
            loading="eager"
            decoding="async"
            className="max-h-full max-w-full rounded-lg border border-white/5 object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
