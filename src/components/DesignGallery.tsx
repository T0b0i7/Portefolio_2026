import React, { useState } from "react";
import { Palette, Eye, Maximize2, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjects } from "@/data/projectsData";
import { cn } from "@/lib/utils";
import { ScrollAnimation } from "./ui/ScrollAnimation";

export function DesignGallery() {
  const { lang } = useLanguage();
  const allProjects = getProjects(lang);
  
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Design categories mapping
  const mainCategories = ["All", "Prototypage", "Design Graphique"];
  
  // Filter design projects
  const designProjects = allProjects.filter(p => 
    (p.category === "Prototypage" || p.category === "Design Graphique") && !p.locked
  );

  // Get filtered projects
  const filteredProjects = designProjects.filter(p => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const subcategoryMatch = activeSubcategory === "All" || p.subcategory === activeSubcategory;
    return categoryMatch && subcategoryMatch;
  });

  // Get unique subcategories for current main category
  const subcategories = ["All", ...new Set(designProjects
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .map(p => p.subcategory)
    .filter(Boolean) as string[])];

  const getAspectClass = (ratio?: string) => {
    switch (ratio) {
      case "portrait": return "aspect-[3/4]";
      case "video": return "aspect-video";
      case "square": return "aspect-square";
      default: return "aspect-video text-xs";
    }
  };

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
                >
                  {cat === "All" ? lang("Tout", "All") : cat}
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
                >
                  {sub === "All" ? lang("Tout", "All") : sub}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 min-h-[400px]">
          {filteredProjects.map((project, index) => (
            <ScrollAnimation key={project.id} animation="fade-up" delay={index * 50}>
              <div 
                className={cn(
                  "group relative rounded-3xl overflow-hidden border border-white/5 bg-slate-900/50 backdrop-blur-sm transition-all duration-500 hover:border-pink-500/30 hover:scale-[1.02] cursor-pointer",
                  getAspectClass(project.design_aspect_ratio)
                )}
                onClick={() => setSelectedImage(project.image || project.images?.[0] || null)}
              >
                <img 
                  src={project.image || project.images?.[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[0.0] transition-all duration-700 hover:scale-110"
                />
                
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
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={selectedImage} 
            alt="View" 
            className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10 object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
