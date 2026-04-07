import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Palette, Eye, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjects } from "@/data/projectsData";
import { cn } from "@/lib/utils";
import { useOptimizedImages } from "@/hooks/use-optimized-images";
import { ScrollAnimation } from "./ui/ScrollAnimation";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

export function DesignGallery() {
  const { lang } = useLanguage();
  const allProjects = getProjects(lang);
  const { getOptimizedImage } = useOptimizedImages();
  
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Design categories mapping
  const mainCategories = ["All", "Prototypage", "Design Graphique"];
  
  // Filter design projects
  const designProjects = useMemo(() => allProjects.filter(p => 
    (p.category === "Prototypage" || p.category === "Design Graphique") && !p.locked
  ), [allProjects]);

  // Get filtered projects
  const filteredProjects = useMemo(() => designProjects.filter(p => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const subcategoryMatch = activeSubcategory === "All" || p.subcategory === activeSubcategory;
    return categoryMatch && subcategoryMatch;
  }), [designProjects, activeCategory, activeSubcategory]);

  // Get unique subcategories for current main category
  const subcategories = ["All", ...new Set(designProjects
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .map(p => p.subcategory)
    .filter(Boolean) as string[])];

  // Calculate counts for categories
  const getCategoryCount = (cat: string) => {
    if (cat === "All") return designProjects.length;
    return designProjects.filter(p => p.category === cat).length;
  };

  // Calculate counts for subcategories
  const getSubcategoryCount = (sub: string) => {
    if (sub === "All") return designProjects.filter(p => activeCategory === "All" || p.category === activeCategory).length;
    return designProjects.filter(p => (activeCategory === "All" || p.category === activeCategory) && p.subcategory === sub).length;
  };

  const getAspectClass = (ratio?: string) => {
    switch (ratio) {
      case "portrait": return "aspect-[3/4]";
      case "video": return "aspect-video";
      case "square": return "aspect-square";
      default: return "aspect-video text-xs";
    }
  };

  const goToPrev = useCallback(() => {
    if (selectedIndex > 0) {
      const prevProject = filteredProjects[selectedIndex - 1];
      setSelectedImage(prevProject.image || prevProject.images?.[0] || null);
      setSelectedIndex(selectedIndex - 1);
    }
  }, [filteredProjects, selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex < filteredProjects.length - 1) {
      const nextProject = filteredProjects[selectedIndex + 1];
      setSelectedImage(nextProject.image || nextProject.images?.[0] || null);
      setSelectedIndex(selectedIndex + 1);
    }
  }, [filteredProjects, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          setSelectedImage(null);
          setSelectedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, selectedImage]);

  return (
    <section id="design" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Palette className="w-3 h-3" />
              {lang("Studio Créatif", "Creative Studio")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              {lang("Galerie", "Design")} <span className="text-pink-500">Design</span>
            </h2>
            
            {/* Main Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {mainCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveSubcategory("All");
                  }}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all border",
                    activeCategory === cat 
                      ? "bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20" 
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                  )}
                  aria-selected={activeCategory === cat}
                  aria-label={`${cat === "All" ? lang("Tout", "All") : cat} (${getCategoryCount(cat)} ${lang("projets", "projects")})`}
                >
                  {cat === "All" ? lang("Tout", "All") : cat} ({getCategoryCount(cat)})
                </button>
              ))}
            </div>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0",
                    activeSubcategory === sub
                      ? "bg-white text-slate-950 border-white"
                      : "bg-white/5 border-white/5 text-slate-500 hover:text-white"
                  )}
                  aria-selected={activeSubcategory === sub}
                  aria-label={`${sub === "All" ? lang("Tout", "All") : sub} (${getSubcategoryCount(sub)} ${lang("projets", "projects")})`}
                >
                  {sub === "All" ? lang("Tout", "All") : sub} ({getSubcategoryCount(sub)})
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 min-h-[400px]">
          {filteredProjects.map((project, index) => (
            <ScrollAnimation key={project.id} animation="fade-up" delay={index * 50}>
              {(() => {
                const imagePath = project.image || project.images?.[0];
                const optimized = imagePath ? getOptimizedImage(imagePath) : null;
                return (
              <div 
                className={cn(
                  "group relative rounded-3xl overflow-hidden border border-white/5 bg-slate-900/50 backdrop-blur-sm transition-all duration-500 hover:border-pink-500/30 hover:scale-[1.02] cursor-pointer",
                  getAspectClass(project.design_aspect_ratio)
                )}
                onClick={() => {
                  setSelectedImage((optimized?.webp ?? imagePath) || null);
                  setSelectedIndex(index);
                }}
              >
                <picture>
                  {optimized ? (
                    <source
                      type="image/webp"
                      srcSet={optimized.srcset}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : null}
                  <img
                    src={optimized?.webp ?? imagePath}
                    alt={`${project.title} - aperçu design`}
                    className="w-full h-full object-cover grayscale-[0.0] transition-all duration-700 hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-pink-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-pink-500/10 rounded-md border border-pink-500/20">
                      {project.category}
                    </span>
                    {project.subcategory && (
                      <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest">
                        • {project.subcategory}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                    <Maximize2 className="w-3 h-3" />
                    <span>{lang("Agrandir", "View Full")}</span>
                  </div>
                </div>
              </div>
                );
              })()}
            </ScrollAnimation>
          ))}

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-pink-500/20 mb-4">
                <Palette className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">
                {lang("Aucun projet trouvé", "No projects found")}
              </h3>
              <p className="text-slate-400 text-sm">
                {lang("Essayez de changer les filtres", "Try changing the filters")}
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none">
          <DialogClose className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10">
            <X className="w-6 h-6" />
          </DialogClose>
          
          {selectedIndex > 0 && (
            <button
              onClick={goToPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
              aria-label={lang("Image précédente", "Previous image")}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {selectedIndex < filteredProjects.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
              aria-label={lang("Image suivante", "Next image")}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
          
          <img 
            src={selectedImage || ''} 
            alt="View" 
            className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10 object-contain"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
