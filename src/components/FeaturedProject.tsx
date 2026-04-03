import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Wand2,
  User,
  FileText,
  ExternalLink,
  Github,
  Activity,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedProjectProps {
  projectUrl?: string;
  repoUrl?: string;
  beforeImage?: string;
  afterImage?: string;
}

interface Metric {
  value: string;
  label: string;
}

const modes = [
  {
    icon: Sparkles,
    name: "Restauration",
    description: "Débruitage (DnCNN) + Upscaling 4K",
  },
  {
    icon: Wand2,
    name: "Génération",
    description: "Inpainting & extension via prompts",
  },
  {
    icon: User,
    name: "Portrait",
    description: "Retouche cutanée & mise en valeur",
  },
  {
    icon: FileText,
    name: "Document",
    description: "Optimisation lisibilité + anti-ombres",
  },
];

const stack = [
  "React",
  "TypeScript",
  "Tailwind",
  "Vite",
  "Gemini AI",
  "PWA",
];

const metrics: Metric[] = [
  { value: "2.5 Flash", label: "Modèle Gemini" },
  { value: "4", label: "Modes IA" },
  { value: "4K", label: "Résolution max" },
  { value: "PWA", label: "Installable" },
];

const galleryImages = [
  "/design/AfriEnhance AI/AfriEnhance AI_3.PNG",
  "/design/AfriEnhance AI/AfriEnhance AI_4.PNG",
  "/design/AfriEnhance AI/AfriEnhance AI_5.PNG",
  "/design/AfriEnhance AI/AfriEnhance AI_6.PNG",
];

export function FeaturedProject({
  projectUrl = "#",
  repoUrl = "#",
  beforeImage = "/design/AfriEnhance AI/AfriEnhance AI_1.PNG",
  afterImage = "/design/AfriEnhance AI/AfriEnhance AI_2.PNG",
}: FeaturedProjectProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [visibleMetrics, setVisibleMetrics] = useState<Record<number, number>>({});
  const metricsRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Slider Avant/Après draggable
  const handleSliderMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const clientX =
        e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(newPosition);
    },
    []
  );

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("mousemove", handleSliderMove);
    document.addEventListener("touchmove", handleSliderMove);
    document.addEventListener("mouseup", () => setIsDragging(false));
    document.addEventListener("touchend", () => setIsDragging(false));

    return () => {
      document.removeEventListener("mousemove", handleSliderMove);
      document.removeEventListener("touchmove", handleSliderMove);
      document.removeEventListener("mouseup", () => setIsDragging(false));
      document.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging, handleSliderMove]);

  // Count-up animations pour les métriques
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && Object.keys(visibleMetrics).length === 0) {
            metrics.forEach((_, index) => {
              let current = 0;
              const target = index === 1 ? 4 : 100;
              const duration = 2000;
              const increment = target / (duration / 16);

              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setVisibleMetrics((prev) => ({
                    ...prev,
                    [index]: target,
                  }));
                  clearInterval(timer);
                } else {
                  setVisibleMetrics((prev) => ({
                    ...prev,
                    [index]: Math.floor(current),
                  }));
                }
              }, 16);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => {
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
    };
  }, [visibleMetrics]);

  // Download function
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = afterImage;
    link.download = 'afrienhance-ai-result.png';
    link.click();
  };

  // Lightbox navigation functions
  const openLightbox = (image: string) => {
    const index = galleryImages.indexOf(image);
    setActiveImage(image);
    setActiveImageIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!activeImage) return;
    
    const currentIndex = galleryImages.indexOf(activeImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    } else {
      newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setActiveImage(galleryImages[newIndex]);
    setActiveImageIndex(newIndex);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 relative overflow-hidden">
      {/* Section Title */}
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-center text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Projet Vedette
        </h1>
        <p className="text-center text-lg text-slate-400">
          Découvrez notre réalisation phare en intelligence artificielle
        </p>
      </div>

      {/* Animated halos background */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse-glow duration-4000" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-pulse-glow duration-5000 delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-violet-300 text-xs font-bold uppercase tracking-wider">
                  ● LIVE · Gemini 2.5
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
                AfriEnhance{" "}
                <span className="bg-gradient-to-r from-violet-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
                  AI
                </span>
              </h2>
              <p className="text-xl text-slate-300 font-light">
                Retouche d'image professionnelle, propulsée par Gemini 2.5
                Flash
              </p>
            </div>

            <div className="flex flex-col gap-2 text-right text-xs font-mono">
              <div className="flex items-center gap-2 justify-end text-teal-400">
                <Activity className="w-3 h-3" />
                <span>ENGINE_V2_ACTIVE</span>
              </div>
              <div className="h-px w-32 bg-teal-500/30 mx-auto" />
              <span className="text-slate-500">4K_READY</span>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* A: Hero Slider */}
          <div
            ref={sliderRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur cursor-grab active:cursor-grabbing hover:border-violet-500/50 transition-all duration-300"
          >
            {/* Before Image */}
            <img
              src={beforeImage}
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* After Image */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: `${100 / (sliderPosition / 100)}%` }}
              />
            </div>

            {/* Watermark Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-[8vw] font-black text-white/10 uppercase -rotate-12 whitespace-nowrap select-none">
                Contenu Protégé
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-400 to-transparent cursor-col-resize group-hover:w-1.5"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-teal-400/10 border-2 border-teal-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-teal-400" />
              </div>
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Projet Vedette ★
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-300 font-mono text-sm">
                  <span>Glissez pour comparer</span>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg border border-teal-500/30 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-xs font-semibold">Télécharger</span>
                </button>
              </div>
            </div>
          </div>

          {/* B: Stack */}
          <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur p-6 hover:border-teal-500/50 transition-all duration-300">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
              Stack Technique
            </h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1.5 rounded-lg bg-violet-500/10 text-violet-300 text-xs font-mono border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* C: Metrics */}
          <div
            ref={metricsRef}
            className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur p-6 hover:border-teal-500/50 transition-all duration-300"
          >
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
              Métriques
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-lg font-black text-teal-400">
                    {visibleMetrics[idx] ?? 0}
                    {metric.value === "PWA" ? "" : metric.value.includes("Flash") ? "" : "%"}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D: Modes IA Consolidés */}
          <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur p-6 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
              Modes IA
            </h3>
            <div className="space-y-3">
              {modes.map((mode, idx) => {
                const Icon = mode.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-white">
                        {mode.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* H: CTA avec barre de progression */}
          <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur p-6 hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                Prêt à essayer ?
              </h3>
              <div className="space-y-2">
                <div className="text-xs text-slate-500 font-mono">
                  Processing...
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-teal-400 animate-progress-loop" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={projectUrl}
                className="w-full group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-teal-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300 border border-violet-500/50 hover:border-violet-400"
              >
                Voir le projet
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              {repoUrl && (
                <a
                  href={repoUrl}
                  className="w-full group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-transparent text-slate-300 font-semibold text-sm border border-white/10 hover:border-teal-400/50 hover:text-teal-300 transition-all duration-300"
                >
                  Code source
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Aperçu du projet
            </h3>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative flex-shrink-0 w-48 aspect-square rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur cursor-pointer hover:border-violet-500/50 transition-all duration-300 hover:scale-105"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image}
                  alt={`Aperçu ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-xs text-white font-semibold">
                    Aperçu {idx + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox for Gallery Images */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActiveImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
            onClick={() => setActiveImage(null)}
          >
            <span className="text-4xl">×</span>
          </button>

          {/* Navigation buttons */}
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm font-mono z-10">
            {activeImageIndex + 1} / {galleryImages.length}
          </div>

          <img
            src={activeImage}
            alt="Plein écran"
            loading="eager"
            decoding="async"
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg border border-white/5"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Lightbox overlay protection */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black text-white/5 pointer-events-none select-none uppercase -rotate-12 whitespace-nowrap">
            Contenu Protégé
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .animate-pulse-glow {
          animation: pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-progress-loop {
          animation: progress-loop 3s ease-in-out infinite;
        }

        @keyframes progress-loop {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        body {
          --bg-main: #0a0c12;
          --surface: #12141e;
          --border: rgba(255, 255, 255, 0.06);
          --accent-1: #6c63ff;
          --accent-2: #00d4aa;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
          --text-main: #f0f0f5;
          --text-muted: #8b8fa8;
        }
      `}</style>
    </section>
  );
}
