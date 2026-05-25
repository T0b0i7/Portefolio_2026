import React, { useState, useEffect, useMemo } from "react";
import {
  ExternalLink,
  Eye,
  Code,
  Palette,
  Smartphone,
  Globe,
  Search,
  Filter,
  Camera,
  ChevronUp,
  ChevronDown,
  Github,
  Mail,
  Database,
  Lock,
  ArrowRight,
  Maximize2,
  Cpu,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { ProjectRating } from "@/components/ui/ProjectRating";
import { TechBadge } from "@/components/TechBadge";
import { useCmsProjects } from "@/hooks/useCmsProjects";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title_fr: string;
  title_en: string;
  category: string;
  description_fr: string;
  description_en: string;
  tags: string[];
  impact?: string;
  metrics_type?: string;
  color?: string;
  image_url?: string;
  gallery_urls?: string[];
  project_url?: string;
  is_locked?: boolean;
  is_featured?: boolean;
  status_fr?: string;
  status_en?: string;
}

export function ProjectsSection() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTech, setActiveTech] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const filterContainerRef = React.useRef<HTMLDivElement>(null);
  const techFilterRef = React.useRef<HTMLDivElement>(null);
  const [projectsPerPage, setProjectsPerPage] = useState(4);

  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 768px)");
    setProjectsPerPage(mdQuery.matches ? 6 : 4);
    const handleResize = (e: MediaQueryListEvent) => setProjectsPerPage(e.matches ? 6 : 4);
    mdQuery.addEventListener("change", handleResize);
    return () => mdQuery.removeEventListener("change", handleResize);
  }, []);

  const handleProjectsPerPageChange = (value: string) => {
    setProjectsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
    
    // Auto-scroll to center the active category
    if (filterContainerRef.current && activeCategory !== "all") {
      const container = filterContainerRef.current;
      const activeButton = container.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
      if (activeButton) {
        const scrollLeft = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    } else if (filterContainerRef.current && activeCategory === "all") {
      filterContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeCategory, searchQuery]);

  const { projects, loading } = useCmsProjects();
  const typedProjects = projects as Project[];

  const scrollFilters = (direction: "left" | "right") => {
    if (filterContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      filterContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const filteredProjects = useMemo(() => {
    return typedProjects.filter(p => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesTech = activeTech === "all" || p.tags.some(t => t.toLowerCase().includes(activeTech));
      const title = lang(p.title_fr, p.title_en);
      const desc = lang(p.description_fr, p.description_en);
      const matchesSearch = 
        title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [activeCategory, activeTech, searchQuery, lang, typedProjects]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = useMemo(() => {
    if (showAll) return filteredProjects;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    return filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  }, [filteredProjects, currentPage, projectsPerPage, showAll]);

  const categories = useMemo(() => {
    const counts: Record<string, number> = { all: typedProjects.length };
    typedProjects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    
    const availableCategories = [
      { id: "all", name: lang("Tous les projets", "All Projects"), icon: Code },
      { id: "Full-Stack", name: "Full-Stack", icon: Globe },
      { id: "Web Design", name: "Web Design", icon: Palette },
      { id: "Mobile", name: "Mobile", icon: Smartphone },
      { id: "Automatisation", name: lang("Automatisation", "Automation"), icon: Database },
      { id: "E-commerce", name: "E-commerce", icon: Globe },
      { id: "Gaming", name: "Gaming", icon: Smartphone },
      { id: "Portfolio", name: "Portfolio", icon: Code },
    ];

    return availableCategories.filter(cat => cat.id === "all" || (counts[cat.id] || 0) > 0);
  }, [lang, typedProjects]);

  const technologies = useMemo(() => {
    const techSet = new Set<string>();
    typedProjects.forEach(p => {
      p.tags.forEach(tag => {
        const tech = tag.split(' ')[0].toLowerCase();
        if (tech.length > 2) techSet.add(tech);
      });
    });
    const sortedTech = Array.from(techSet).sort();
    return [
      { id: "all", name: lang("Toutes tech", "All tech") },
      ...sortedTech.slice(0, 12).map(t => ({ id: t, name: t }))
    ];
  }, [typedProjects, lang]);

  const scrollTechFilters = (direction: "left" | "right") => {
    if (techFilterRef.current) {
      const scrollAmount = direction === "left" ? -150 : 150;
      techFilterRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
    setActiveImageIndex(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
    
    // Auto-scroll to center the active category
    if (filterContainerRef.current && activeCategory !== "all") {
      const container = filterContainerRef.current;
      const activeButton = container.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
      if (activeButton) {
        const scrollLeft = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    } else if (filterContainerRef.current && activeCategory === "all") {
      filterContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeCategory, searchQuery]);

  const SkeletonCard = () => (
    <div className="flex flex-col h-full animate-pulse">
      <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 bg-warm-sand/30" />
      <div className="space-y-3 flex-1">
        <div className="h-3 w-16 bg-warm-sand/30 rounded" />
        <div className="h-5 w-3/4 bg-warm-sand/30 rounded" />
        <div className="h-3 w-full bg-warm-sand/20 rounded" />
        <div className="h-3 w-2/3 bg-warm-sand/20 rounded" />
      </div>
      <div className="pt-6 mt-auto flex gap-1.5">
        <div className="h-5 w-14 bg-warm-sand/20 rounded-full" />
        <div className="h-5 w-16 bg-warm-sand/20 rounded-full" />
        <div className="h-5 w-12 bg-warm-sand/20 rounded-full" />
      </div>
    </div>
  );

  return (
    <div id="projects" className="py-24 md:py-40 bg-parchment text-near-black">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimation>
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-5 h-5 text-terracotta" />
              <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-stone-gray">
                {lang("Portfolio & Travaux", "Portfolio & Works")}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-[1.15] mb-8">
              {lang("Sélection de réalisations.", "Selected works.")}
            </h2>
            <p className="text-lg md:text-xl text-stone-gray font-sans leading-relaxed">
              {lang(
                "Chaque projet est une exploration de l'équilibre entre esthétique pure et utilité fonctionnelle.",
                "Every project is an exploration of the balance between pure aesthetics and functional utility."
              )}
            </p>
          </div>
        </ScrollAnimation>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {Array.from({ length: projectsPerPage }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-gray group-focus-within:text-terracotta transition-colors" />
            <input 
              type="text" 
              placeholder={lang("Rechercher un projet...", "Search projects...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-warm-sand/30 border border-border-cream rounded-xl py-3 pl-12 pr-4 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-terracotta/20 transition-all"
            />
          </div>

          {/* Mobile Filter & Projects Per Page */}
          <div className="flex gap-4">
            <div className="md:hidden flex-1 relative">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full bg-warm-sand/40 border border-border-cream rounded-xl py-3 px-4 text-sm font-sans font-medium text-stone-gray appearance-none focus:outline-none focus:ring-1 focus:ring-terracotta/20"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-gray pointer-events-none" />
            </div>
            
            <div className="md:hidden w-32 relative">
              <select
                value={projectsPerPage.toString()}
                onChange={(e) => handleProjectsPerPageChange(e.target.value)}
                className="w-full bg-warm-sand/40 border border-border-cream rounded-xl py-3 px-4 text-sm font-sans font-medium text-stone-gray appearance-none focus:outline-none focus:ring-1 focus:ring-terracotta/20"
              >
                <option value="4">4 / page</option>
                <option value="6">6 / page</option>
                <option value="8">8 / page</option>
                <option value="10">10 / page</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-gray pointer-events-none" />
            </div>
          </div>

          <div className="hidden md:flex relative w-full flex-1 min-w-0 items-center gap-2 group/filter-nav">
            {/* Scroll Buttons - Desktop only */}
            <button 
              onClick={() => scrollFilters("left")}
              className="hidden md:flex absolute -left-4 z-20 w-8 h-8 rounded-full bg-ivory border border-border-cream items-center justify-center text-stone-gray hover:text-terracotta shadow-whisper opacity-0 group-hover/filter-nav:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Gradient Masks for scrolling */}
            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-parchment to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-parchment to-transparent z-10 pointer-events-none" />
            
            <div 
              ref={filterContainerRef}
              className="flex items-center gap-2 overflow-x-auto pb-4 w-full scroll-smooth no-scrollbar select-none"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  data-category={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-xs font-sans font-medium uppercase tracking-widest transition-all whitespace-nowrap border shrink-0",
                    activeCategory === cat.id
                      ? "bg-terracotta text-ivory shadow-ring border-terracotta/20 scale-105"
                      : "bg-warm-sand/40 text-stone-gray hover:bg-warm-sand/60 border-border-cream/50 hover:scale-105 active:scale-95"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <cat.icon className={cn("w-3.5 h-3.5", activeCategory === cat.id ? "text-ivory" : "text-terracotta")} />
                    {cat.name}
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={() => scrollFilters("right")}
              className="hidden md:flex absolute -right-4 z-20 w-8 h-8 rounded-full bg-ivory border border-border-cream items-center justify-center text-stone-gray hover:text-terracotta shadow-whisper opacity-0 group-hover/filter-nav:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Visual indicator for desktop */}
            <div className="hidden md:block absolute -bottom-1 left-0 right-0 h-0.5 bg-border-cream/20 rounded-full overflow-hidden">
                <div className="h-full bg-terracotta/20 transition-all duration-300" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Technology Filters - Cross-filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-terracotta" />
            <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-charcoal-warm">
              {lang("Filtrer par technologie:", "Filter by technology:")}
            </span>
          </div>
          <div className="relative flex items-center gap-2 group/tech-nav">
            <button 
              onClick={() => scrollTechFilters("left")}
              className="hidden md:flex absolute -left-2 z-20 w-6 h-6 rounded-full bg-ivory border border-border-cream items-center justify-center text-stone-gray hover:text-terracotta shadow-whisper opacity-0 group-hover/tech-nav:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <div 
              ref={techFilterRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 w-full scroll-smooth no-scrollbar"
            >
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => { setActiveTech(tech.id); setCurrentPage(1); }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-sans font-medium uppercase tracking-wider transition-all whitespace-nowrap border shrink-0",
                    activeTech === tech.id
                      ? "bg-near-black text-ivory border-near-black"
                      : "bg-white text-charcoal-warm border-border-cream hover:border-terracotta/50 hover:bg-warm-sand/30"
                  )}
                >
                  {tech.name}
                </button>
              ))}
            </div>
            <button 
              onClick={() => scrollTechFilters("right")}
              className="hidden md:flex absolute -right-2 z-20 w-6 h-6 rounded-full bg-ivory border border-border-cream items-center justify-center text-stone-gray hover:text-terracotta shadow-whisper opacity-0 group-hover/tech-nav:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {!loading && (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            {currentProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openProjectDialog(project)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 border border-border-cream shadow-whisper group-hover:shadow-ring transition-all bg-warm-sand/20">
                  <img 
                    src={project.image_url || (project.gallery_urls?.[0]) || "/placeholder.svg"} 
                    alt={lang(project.title_fr, project.title_en)}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-near-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-ivory flex items-center justify-center text-near-black shadow-xl">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                  {project.is_locked && (
                    <div className="absolute top-4 right-4 bg-near-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-ivory">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                
                 <div className="space-y-3 flex-1">
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-terracotta bg-terracotta/5 px-2 py-1 rounded">
                       {project.category}
                     </span>
                     {project.status_fr && (
                       <span className="text-[9px] font-sans font-medium uppercase tracking-tighter text-stone-gray italic">
                         {lang(project.status_fr, project.status_en)}
                       </span>
                     )}
                   </div>
                   <h3 className="text-2xl font-serif font-medium">{lang(project.title_fr, project.title_en)}</h3>
                   <p className="text-sm text-stone-gray font-sans line-clamp-2 leading-relaxed">
                     {lang(project.description_fr, project.description_en)}
                   </p>
                   <ProjectRating projectId={project.id} size="sm" />
                 </div>

                <div className="pt-6 mt-auto">
                    <div className="flex flex-wrap gap-1.5 opacity-70">
                         {project.tags.slice(0, 3).map(tag => (
                             <TechBadge key={tag} tag={tag} size="sm" />
                         ))}
                         {project.tags.length > 3 && (
                             <span className="text-[9px] font-sans font-bold text-charcoal-warm self-center">+{project.tags.length - 3}</span>
                         )}
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            {!showAll ? (
              <>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-full border border-border-cream flex items-center justify-center text-stone-gray hover:bg-terracotta hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-gray transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "w-12 h-12 rounded-full font-sans text-sm font-medium transition-all border",
                          currentPage === page 
                            ? "bg-terracotta text-white border-terracotta shadow-ring" 
                            : "bg-warm-sand/20 text-stone-gray border-border-cream hover:bg-warm-sand/40"
                        )}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-full border border-border-cream flex items-center justify-center text-stone-gray hover:bg-terracotta hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-gray transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setShowAll(true)}
                  className="px-6 py-3 rounded-xl border border-border-cream text-charcoal-warm text-sm font-sans font-medium hover:bg-warm-sand/30 hover:border-terracotta/50 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  {lang("Tout charger", "Load all")} ({filteredProjects.length} {lang("projets", "projects")})
                </button>
              </>
            ) : (
              <button
                onClick={() => { setShowAll(false); setCurrentPage(1); }}
                className="px-6 py-3 rounded-xl border border-border-cream text-charcoal-warm text-sm font-sans font-medium hover:bg-warm-sand/30 hover:border-terracotta/50 transition-all flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                {lang("Retour à la pagination", "Back to pagination")}
              </button>
            )}
            
            <p className="text-xs text-stone-gray font-sans">
              {lang("Affichage de", "Showing")} {currentProjects.length} {lang("sur", "of")} {filteredProjects.length} {lang("projets", "projects")}
            </p>
          </div>

        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-5xl bg-ivory border-border-cream rounded-[40px] p-0 overflow-hidden shadow-2xl">
            {selectedProject && (
              <div className="grid md:grid-cols-2 h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
                <div className="relative h-[250px] sm:h-[350px] md:h-auto bg-warm-sand/20">
                    {/* Gallery / Main Image */}
                    {selectedProject.gallery_urls && selectedProject.gallery_urls.length > 0 ? (
                        <div className="h-full relative flex flex-col">
                             <div className="flex-1 overflow-hidden relative">
                                <img 
                                    src={selectedProject.gallery_urls[activeImageIndex]} 
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-contain p-2 md:p-6" 
                                    alt={lang(selectedProject.title_fr, selectedProject.title_en)} 
                                />
                             </div>
                             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 scrollbar-hide py-2 bg-near-black/30 backdrop-blur-md rounded-2xl border border-white/10">
                                {selectedProject.gallery_urls.map((url, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={cn(
                                            "w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                                            activeImageIndex === idx ? "border-terracotta scale-110" : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <img src={url} loading="lazy" decoding="async" className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                             </div>
                        </div>
                    ) : (
                        <img 
                            src={selectedProject.image_url || "/placeholder.svg"} 
                            className="w-full h-full object-contain p-4" 
                            alt={lang(selectedProject.title_fr, selectedProject.title_en)} 
                        />
                    )}

                    {selectedProject.is_locked && (
                        <div className="absolute inset-0 bg-near-black/40 backdrop-blur-sm flex items-center justify-center p-8 text-center">
                            <div className="bg-ivory/95 p-6 rounded-3xl shadow-xl max-w-xs border border-border-cream">
                                <Lock className="w-8 h-8 text-terracotta mx-auto mb-4" />
                                <h3 className="font-serif text-lg mb-2">{lang("Accès restreint", "Access Restricted")}</h3>
                                <p className="text-xs text-stone-gray font-sans leading-relaxed">
                                    {lang(
                                        "Ce projet contient des informations confidentielles. Veuillez me contacter pour plus de détails.",
                                        "This project contains confidential information. Please contact me for more details."
                                    )}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 md:p-14 flex flex-col h-full bg-ivory scroll-smooth overflow-y-auto">
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-terracotta">
                            {selectedProject.category}
                        </span>
                        {selectedProject.impact && (
                            <span className="px-3 py-1 bg-terracotta/5 border border-terracotta/10 rounded-full text-[10px] font-sans font-bold text-terracotta uppercase tracking-[0.1em]">
                                {selectedProject.impact}
                            </span>
                        )}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 leading-tight">{lang(selectedProject.title_fr, selectedProject.title_en)}</h2>
                    <p className="text-olive-gray font-sans text-lg leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:text-terracotta first-letter:mr-1">
                      {lang(selectedProject.description_fr, selectedProject.description_en)}
                    </p>
                    <div className="mt-6">
                      <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-gray mb-3">
                        {lang("Votre évaluation", "Your Rating")}
                      </h4>
                      <ProjectRating projectId={selectedProject.id} size="lg" />
                    </div>
                  </div>

                  <div className="space-y-8 mb-12 flex-1">
                    {/* Detail section */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                             <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-gray mb-3">{lang("Rôle / Type", "Role / Type")}</h4>
                             <p className="text-sm font-serif">{selectedProject.metrics_type || "Production"}</p>
                        </div>
                        {selectedProject.status_fr && (
                            <div>
                                <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-gray mb-3">{lang("État", "Status")}</h4>
                                <p className="text-sm font-serif">{lang(selectedProject.status_fr, selectedProject.status_en)}</p>
                            </div>
                        )}
                    </div>

                    <div>
                      <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-gray mb-4">{lang("Technologies", "Technical Stack")}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <TechBadge key={tag} tag={tag} size="md" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 flex flex-wrap gap-4 border-t border-border-cream/50">
                    {selectedProject.project_url && (
                        <a 
                            href={selectedProject.project_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-primary flex-1 group min-w-[200px]"
                        >
                            {lang("Voir le projet", "View Live Experience")}
                            <Maximize2 className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform" />
                        </a>
                    )}
                    
                    <a
                      href="#contact"
                      onClick={() => setIsDialogOpen(false)}
                      className="btn-primary flex-1 min-w-[200px] bg-transparent border border-border-cream text-near-black hover:bg-warm-sand/30"
                    >
                      {lang("Envoyer un message", "Send Message")}
                      <Mail className="ml-2 w-4 h-4" />
                    </a>

                    {selectedProject.is_locked && (
                         <a 
                            href="#contact" 
                            onClick={() => setIsDialogOpen(false)}
                            className="btn-primary flex-1 min-w-[200px] bg-near-black text-ivory hover:bg-stone-gray"
                        >
                            {lang("Demander l'accès", "Request Access")}
                            <Mail className="ml-2 w-4 h-4" />
                        </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
