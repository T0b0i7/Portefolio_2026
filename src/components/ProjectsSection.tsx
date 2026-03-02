import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Eye, Code, Palette, Smartphone, Globe, Sparkles, ChevronLeft, ChevronRight, Database, Cloud, Camera, Search, Filter, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjects } from "@/data/projectsData";

import { Project } from "@/types/project";

const ITEMS_PER_PAGE_DESKTOP = 9;
const ITEMS_PER_PAGE_MOBILE = 1;

export function ProjectsSection() {
  const { lang, language } = useLanguage();
  const projects = getProjects(lang);

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return projects.filter(p => !p.locked).length;
    return projects.filter(p => p.category === categoryId && !p.locked).length;
  };

  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: lang("Tous les projets", "All Projects"), icon: Code },
    { id: "Full-Stack", name: "Full-Stack", icon: Globe },
    { id: "Frontend", name: "Frontend", icon: Code },
    { id: "Backend", name: "Backend", icon: Database },
    { id: "Mobile", name: "Mobile", icon: Smartphone },
    { id: "Web Design", name: "Web Design", icon: Globe },
    { id: "Design", name: "Design", icon: Palette },
    { id: "Portfolio", name: "Portfolio", icon: Camera },
    { id: "Gaming", name: "Gaming", icon: Globe },
    { id: "Anniversaire", name: lang("Anniversaire", "Birthday"), icon: Sparkles },
    { id: "Landing Pages", name: "Landing Pages", icon: Globe },
    { id: "SaaS", name: "SaaS", icon: Cloud },
    { id: "Automatisation", name: lang("Automatisation", "Automation"), icon: Sparkles },
    { id: "E-commerce", name: "E-commerce", icon: Globe },
    { id: "API", name: "API", icon: Database },
    { id: "Data", name: "Data", icon: Database },
    { id: "Cloud", name: "Cloud", icon: Cloud },
    { id: "IA & ML", name: "IA & ML", icon: Sparkles },
    { id: "DevOps", name: "DevOps", icon: Cloud },
    { id: "Social", name: "Social", icon: Globe },
    { id: "Education", name: "Education", icon: Code },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Colors for the design
  const colors = {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    accent: "#10b981",
    warning: "#f59e0b",
    background: "#0f172a",
    surface: "#1e293b",
    border: "#334155",
    text: "#f8fafc",
    textSecondary: "#94a3b8",
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Screenshot prevention logic (visual & behavior)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (isDialogOpen) e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [isDialogOpen]);

  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;

  const filteredProjects = projects.filter((project) => {
    if (project.locked) return false;

    // Category match
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;

    // Search match
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query)) ||
      project.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const getCategoryIcon = (category: string) => {
    const categoryConfig = categories.find(cat => cat.id === category);
    if (categoryConfig) {
      const IconComponent = categoryConfig.icon;
      return <IconComponent className="w-4 h-4" />;
    }
    return <Code className="w-4 h-4" />;
  };

  // Reset page when category or search changes
  React.useEffect(() => {
    setCurrentPage(1);
    setVisibleProjects(new Set());
  }, [activeCategory, searchQuery]);

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.getAttribute('data-project-id') || '0');
            setTimeout(() => {
              setVisibleProjects((prev) => new Set([...prev, projectId]));
            }, 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const container = document.getElementById('projects');
    const projectElements = container ? container.querySelectorAll('[data-project-id]') : [];
    projectElements.forEach((el) => observer.observe(el));

    return () => {
      projectElements.forEach((el) => observer.unobserve(el));
    };
  }, [paginatedProjects, searchQuery]);

  // Reset animations when page changes
  useEffect(() => {
    setVisibleProjects(new Set());
  }, [currentPage]);

  const checkScrollPosition = () => {
    const element = categoriesRef.current;
    if (element) {
      setCanScrollLeft(element.scrollLeft > 0);
      setCanScrollRight(element.scrollLeft < element.scrollWidth - element.clientWidth);
    }
  };

  const scrollLeft = () => {
    const element = categoriesRef.current;
    if (element) element.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const element = categoriesRef.current;
    if (element) element.scrollBy({ left: 200, behavior: 'smooth' });
  };

  useEffect(() => {
    const element = categoriesRef.current;
    if (element) {
      element.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => element.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  useEffect(() => {
    checkScrollPosition();
  }, [activeCategory]);

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
    setFailedImages(new Set());
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
          >
            <Code className="w-3 h-3 sm:w-4 sm:h-4" />
            {lang("Projets Réalisés", "Past Projects")}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4 sm:px-0" style={{ color: colors.text }}>
            {lang("Mes", "My")} <span style={{ color: colors.primary }}>{lang("Réalisations", "Works")}</span>
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4 sm:px-0" style={{ color: colors.textSecondary }}>
            {lang(
              "Découvrez mes projets les plus significatifs, de la conception à la mise en production.",
              "Discover my most significant projects, from design to production."
            )}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors group-focus-within:text-brand-accent text-slate-500" />
            <input
              type="text"
              placeholder={lang("Rechercher (ex: React, IA, Mobile)...", "Search (e.g. React, AI, Mobile)...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-12 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <span className="text-xl">×</span>
              </button>
            )}
          </div>

          <button
            className="sm:hidden flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-slate-100 active:scale-95 transition-all shadow-inner"
            onClick={() => {
              const el = document.getElementById('mobile-categories');
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            <Filter className="w-4 h-4 text-brand-accent" />
            <span className="text-sm font-bold uppercase tracking-wider">{lang("Filtrer", "Filter")}</span>
          </button>
        </div>

        {/* Category Filter */}
        <div id="mobile-categories" className={`relative mb-8 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Mobile Categories Header */}
          <div className="sm:hidden flex items-center justify-between mb-3 px-1 text-slate-400">
            <div className="flex items-center gap-2">
              <Filter className="w-3 h-3 text-brand-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Parcourir les types</span>
            </div>
            {(activeCategory !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="text-[10px] text-brand-accent font-bold uppercase hover:underline"
              >
                {lang("Tout voir", "See all")}
              </button>
            )}
          </div>

          {/* Mobile: Horizontal scrollable buttons (improved) */}
          <div className="sm:hidden relative">
            <div
              className="overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex gap-2 min-w-max">
                {categories.map((category) => {
                  const count = getCategoryCount(category.id);
                  if (count === 0 && category.id !== 'all') return null;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300",
                        activeCategory === category.id ? "text-white shadow-lg" : "text-slate-400 bg-slate-800/30"
                      )}
                      style={{
                        backgroundColor: activeCategory === category.id ? colors.primary : '',
                        border: `1px solid ${activeCategory === category.id ? colors.primary : colors.border}`,
                      }}
                    >
                      <category.icon className="w-3.5 h-3.5" />
                      <span className="text-xs">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop: Horizontal scrollable buttons */}
          <div className="hidden sm:block relative px-4">
            {/* Scroll Buttons */}
            <button
              onClick={scrollLeft}
              className={cn(
                "absolute -left-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95",
                canScrollLeft ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              )}
              style={{
                backgroundColor: colors.surface,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={scrollRight}
              className={cn(
                "absolute -right-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95",
                canScrollRight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
              )}
              style={{
                backgroundColor: colors.surface,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={categoriesRef}
              className="overflow-x-auto pb-3 scrollbar-hide px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-2 sm:gap-3 min-w-max py-2">
                {categories.map((category, index) => {
                  const count = getCategoryCount(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300",
                        activeCategory === category.id ? "text-white shadow-lg shadow-blue-500/20" : ""
                      )}
                      style={{
                        backgroundColor: activeCategory === category.id ? colors.primary : colors.surface,
                        color: activeCategory === category.id ? '#ffffff' : colors.text,
                        border: `1px solid ${activeCategory === category.id ? colors.primary : colors.border}`,
                      }}
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: activeCategory === category.id ? 'rgba(255,255,255,0.2)' : colors.border,
                          color: activeCategory === category.id ? '#ffffff' : colors.textSecondary
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* End of desktop filter */}
        </div>

        {/* Projects Grid */}
        {paginatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {paginatedProjects.map((project, index) => {
              const isVisible = visibleProjects.has(project.id);
              const animationDelay = `${index * 80}ms`;

              return (
                <div
                  key={project.id}
                  data-project-id={project.id}
                  className="group relative rounded-2xl overflow-hidden border transition-all duration-500"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    minHeight: '420px',
                    transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${animationDelay}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
                    {project.image || (project.images && project.images[0]) ? (
                      <img
                        src={project.image ?? project.images?.[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary + '20' }}
                      >
                        {getCategoryIcon(project.category)}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={() => openProjectDialog(project)}
                        className="h-9 w-9 rounded-lg flex items-center justify-center backdrop-blur-sm"
                        style={{ backgroundColor: colors.surface + '90', border: `1px solid ${colors.border}` }}
                      >
                        <Eye className="w-4 h-4" style={{ color: colors.text }} />
                      </button>
                      {project.url && (
                        <button
                          onClick={() => window.open(project.url, "_blank")}
                          className="h-9 w-9 rounded-lg flex items-center justify-center backdrop-blur-sm"
                          style={{ backgroundColor: colors.surface + '90', border: `1px solid ${colors.border}` }}
                        >
                          <ExternalLink className="w-4 h-4" style={{ color: colors.text }} />
                        </button>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div
                      className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: colors.primary + '90', color: '#ffffff' }}
                    >
                      {getCategoryIcon(project.category)}
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 line-clamp-1" style={{ color: colors.text }}>
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2" style={{ color: colors.textSecondary }}>
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md text-xs font-medium"
                          style={{ backgroundColor: colors.primary + '15', color: colors.primary }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics & Status */}
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: colors.border }}>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: colors.textSecondary }}>
                        <span className="font-semibold" style={{ color: colors.accent }}>{project.metrics.impact}</span>
                        <span>({project.metrics.type})</span>
                      </div>
                      {project.status && (
                        <span
                          className="px-2 py-1 text-xs rounded-full font-medium"
                          style={{
                            backgroundColor: project.status === 'En cours' ? colors.warning + '20' : project.status === 'Publié' ? colors.accent + '20' : colors.primary + '20',
                            color: project.status === 'En cours' ? colors.warning : project.status === 'Publié' ? colors.accent : colors.primary
                          }}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 mb-12">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
              style={{ backgroundColor: colors.primary + '15' }}
            >
              <Search className="w-10 h-10" style={{ color: colors.primary }} />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
              {lang("Aucun résultat trouvé", "No results found")}
            </h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              {lang(
                `Nous n'avons trouvé aucun projet correspondant à votre recherche "${searchQuery}" dans cette catégorie.`,
                `We couldn't find any projects matching your search "${searchQuery}" in this category.`
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                {lang("Effacer la recherche", "Clear search")}
              </Button>
              <Button
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                {lang("Tout réinitialiser", "Reset all")}
              </Button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 mb-10 sm:mb-16">
            {/* Previous Button - Compact on mobile */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={cn(
                "flex items-center justify-center rounded-lg font-medium transition-all duration-200",
                currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
              )}
              style={{
                padding: '8px 12px',
                backgroundColor: colors.surface,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                fontSize: '12px'
              }}
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">{lang("Précédent", "Previous")}</span>
              <span className="sm:hidden">{lang("Prec", "Prev")}</span>
            </button>

            {/* Page Numbers - Compact on mobile */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "rounded-lg font-medium transition-all duration-200 hover:scale-105",
                    "hidden sm:flex items-center justify-center",
                    currentPage === page ? "w-10 h-10" : "w-8 h-8 sm:w-10 sm:h-10"
                  )}
                  style={{
                    backgroundColor: currentPage === page ? colors.primary : 'transparent',
                    color: currentPage === page ? '#ffffff' : colors.text,
                    border: `1px solid ${currentPage === page ? colors.primary : colors.border}`,
                    fontSize: '12px'
                  }}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Mobile: Show current page / total */}
            <div
              className="sm:hidden flex items-center justify-center px-3 py-2 rounded-lg"
              style={{
                backgroundColor: colors.surface,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                fontSize: '12px'
              }}
            >
              {currentPage}/{totalPages}
            </div>

            {/* Next Button - Compact on mobile */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                "flex items-center justify-center rounded-lg font-medium transition-all duration-200",
                currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
              )}
              style={{
                padding: '8px 12px',
                backgroundColor: colors.surface,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                fontSize: '12px'
              }}
            >
              <span className="hidden sm:inline">{lang("Suivant", "Next")}</span>
              <span className="sm:hidden">{lang("Suiv", "Next")}</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={`text-center transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
            style={{ backgroundColor: colors.primary + '15' }}
          >
            <Sparkles className="w-5 h-5" style={{ color: colors.primary }} />
            <span style={{ color: colors.text }}>{filteredProjects.length} {lang("projets disponibles", "projects available")}</span>
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
            {lang("Prêt à", "Ready to")} <span style={{ color: colors.primary }}>{lang("collaborer", "collaborate")}</span> ?
          </h3>
          <Button
            size="lg"
            className="px-10 py-6 text-lg font-semibold text-white"
            style={{ backgroundColor: colors.primary }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {lang("Discutons de votre projet", "Let's discuss your project")}
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedProject && (
          <DialogContent
            className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 border-none bg-transparent"
            style={{ borderRadius: '24px' }}
          >
            <div className="relative bg-slate-900 border border-white/10 overflow-hidden rounded-3xl shadow-2xl flex flex-col group/modal">

              {/* Image Protection Layer (Screen Capture prevention attempt) */}
              <div className="absolute inset-0 pointer-events-none z-[60] mix-blend-overlay opacity-50 select-none overflow-hidden uppercase font-black text-[200px] text-white/5 rotate-12 flex items-center justify-center whitespace-nowrap">
                {lang("Contenu Protégé", "Protected Content")} • {selectedProject.title} • {lang("Contenu Protégé", "Protected Content")}
              </div>

              {/* Modal Header */}
              <div className="sticky top-0 z-50 px-6 py-4 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded uppercase font-bold tracking-widest">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>
                {/* Single Close Button */}
                <button
                  onClick={closeDialog}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-white border border-white/10"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-8 relative z-10">
                {/* DescriptionSection */}
                <div>
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">{lang("À propos", "About")}</h4>
                  <p className="text-slate-200 text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Media Gallery */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{lang("Galerie Sécurisée", "Secure Gallery")}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                        <Lock className="w-3 h-3" />
                        {lang("CONTENU PROTÉGÉ", "PROTECTED CONTENT")}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedProject.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative group rounded-2xl overflow-hidden aspect-video cursor-zoom-in bg-slate-800 border border-white/5"
                          onClick={() => setActiveImage(image)}
                        >
                          {failedImages.has(index) ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <Camera className="w-6 h-6 text-slate-600" />
                            </div>
                          ) : (
                            <>
                              <img
                                src={image}
                                alt="Aperçu"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                                onError={() => setFailedImages(prev => new Set([...prev, index]))}
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="w-6 h-6 text-white" />
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detail Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Tech & Skills */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">{lang("Compétences Clés", "Key Skills")}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-xl text-xs font-bold text-brand-accent">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">{lang("Objectifs Atteints", "Goals Achieved")}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-xs text-slate-400">{lang("Impact Projet", "Project Impact")}</span>
                          <span className="text-xs font-bold text-emerald-400">{selectedProject.metrics.impact}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-xs text-slate-400">{lang("Architecture", "Architecture")}</span>
                          <span className="text-xs font-bold text-white uppercase">{selectedProject.metrics.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end items-center md:col-span-2 mt-4 pt-6 border-t border-white/5">
                    {selectedProject.url && (
                      <button
                        onClick={() => window.open(selectedProject.url, "_blank")}
                        className="w-full sm:flex-1 h-12 flex items-center justify-center gap-2 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {lang("Consulter l'application", "View Application")}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        closeDialog();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:flex-1 h-12 flex items-center justify-center gap-2 bg-slate-800 text-white font-bold rounded-2xl border border-white/10 hover:bg-slate-700 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      <Download className="w-4 h-4 text-brand-accent" />
                      {lang("Télécharger les ressources", "Download Resources")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Lightbox for Images */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
          >
            <span className="text-4xl">×</span>
          </button>
          <img
            src={activeImage}
            alt="Plein écran"
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg border border-white/5"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Lightbox overlay protection */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black text-white/5 pointer-events-none select-none uppercase -rotate-12 whitespace-nowrap">
            {lang("Contenu Protégé", "Protected Content")}
          </div>
        </div>
      )}
    </section>
  );
}
