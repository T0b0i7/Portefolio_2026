import React, { useState, useEffect, useMemo } from "react";
import { ExternalLink, Eye, Code, Palette, Smartphone, Globe, Sparkles, ChevronLeft, ChevronRight, Database, Camera, Search, Filter, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useOptimizedImages } from "@/hooks/use-optimized-images";
import { useTracking } from "@/hooks/useTracking";
import { projectService } from "@/services/projectService";
import { Project } from "@/types/project";
import { getProjects } from "@/data/projectsData";
import { useIsMobile } from "@/hooks/use-mobile";

const ITEMS_PER_PAGE_DESKTOP = 9;
const ITEMS_PER_PAGE_MOBILE = 4;
const EXCLUDED_CATEGORIES = new Set(["Anniversaire"]);
const DESCRIPTION_TRUNCATE_LENGTH = 300;

function ProjectDescription({ description }: { description: string }) {
  const { lang } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = description.length > DESCRIPTION_TRUNCATE_LENGTH;

  return (
    <div className="text-slate-200 text-base leading-relaxed">
      <p className={isLong && !isExpanded ? "line-clamp-6" : ""}>
        {isLong && !isExpanded ? description.slice(0, DESCRIPTION_TRUNCATE_LENGTH) + "..." : description}
      </p>
      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-accent hover:text-blue-400 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              {lang("Réduire", "Show less")}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              {lang("Lire la suite", "Read more")}
            </>
          )}
        </button>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const { lang, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(getProjects(lang));
  const { getOptimizedImage } = useOptimizedImages();
  const { trackEvent } = useTracking();

  useEffect(() => {
    const fetchDBProjects = async () => {
      const dbProjects = await projectService.getAllProjects(language);
      if (dbProjects && dbProjects.length > 0) {
        setProjects(dbProjects);
      }
    };
    fetchDBProjects();
  }, [language]);

  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(
    () => [
      { id: "all", name: lang("Tous les projets", "All Projects"), icon: Code },
      { id: "Full-Stack", name: "Full-Stack", icon: Globe },
      { id: "Prototypage", name: lang("Prototypage", "Prototyping"), icon: Code },
      { id: "Web Design", name: "Web Design", icon: Globe },
      { id: "Design Graphique", name: lang("Design Graphique", "Graphic Design"), icon: Palette },
      { id: "Mobile", name: "Mobile", icon: Smartphone },
      { id: "Landing Pages", name: "Landing Pages", icon: Globe },
      { id: "E-commerce", name: "E-commerce", icon: Globe },
      { id: "Gaming", name: "Gaming", icon: Globe },
      { id: "Portfolio", name: "Portfolio", icon: Camera },
      { id: "Automatisation", name: lang("Automatisation", "Automation"), icon: Database },
    ],
    [lang]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Colors for the design
  const colors = {
    primary: "#3b82f6",
    secondary: "#60a5fa",
    accent: "#60a5fa",
    warning: "#f59e0b",
    background: "#020617",
    surface: "#0f172a",
    border: "#1e293b",
    text: "#f8fafc",
    textSecondary: "#94a3b8",
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  const projectCardMinHeight = isMobile ? 340 : 370;

  const searchableProjects = useMemo(
    () => projects.filter((project) => !project.locked && !EXCLUDED_CATEGORIES.has(project.category)),
    [projects]
  );

  const searchScopedProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return searchableProjects;

    return searchableProjects.filter((project) => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        project.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, searchableProjects]);

  const smartCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          count:
            category.id === "all"
              ? searchScopedProjects.length
              : searchScopedProjects.filter((project) => project.category === category.id).length,
        }))
        .filter((category) => category.id === "all" || category.count > 0),
    [categories, searchScopedProjects]
  );

  const selectedCategory =
    smartCategories.find((category) => category.id === activeCategory) ??
    categories.find((category) => category.id === activeCategory) ??
    categories[0];

  const filteredProjects = useMemo(
    () =>
      searchScopedProjects.filter(
        (project) => activeCategory === "all" || project.category === activeCategory
      ),
    [activeCategory, searchScopedProjects]
  );

  const paginatedProjects = useMemo(() => filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ), [currentPage, filteredProjects, itemsPerPage]);

  const totalPages = useMemo(() => Math.ceil(filteredProjects.length / itemsPerPage), [filteredProjects.length, itemsPerPage]);

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

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
    trackEvent("project-view", { id: project.id, title: project.title });
    // Focus management for accessibility
    setTimeout(() => {
      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      if (modal) modal.focus();
    }, 100);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
    setFailedImages(new Set());
  };

  return (
    <section id="projects" className="py-10 sm:py-14 md:py-16" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
        <div className={`flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-[54px] px-4 rounded-2xl bg-slate-900/70 border border-slate-700/60 text-slate-100 flex items-center gap-2 hover:border-brand-accent/50 transition-colors"
                  aria-label={lang("Filtrer les catégories", "Filter categories")}
                >
                  <Filter className="w-4 h-4 text-brand-accent" />
                  <span className="text-sm font-bold">{selectedCategory?.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold">
                    {selectedCategory?.id === "all" ? filteredProjects.length : (selectedCategory as { count?: number }).count ?? 0}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 bg-slate-900 border-slate-700 text-slate-100">
                <p className="px-2 py-1 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                  {lang("Filtrage intelligent", "Smart filtering")}
                </p>
                <p className="px-2 pb-2 text-xs text-slate-500">
                  {lang("Les catégories sont adaptées à ta recherche", "Categories adapt to your search query")}
                </p>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuRadioGroup
                  value={activeCategory}
                  onValueChange={(value) => {
                    setActiveCategory(value);
                    trackEvent("category-filter", { category: value, query: searchQuery || null });
                  }}
                >
                  {smartCategories.map((category) => (
                    <DropdownMenuRadioItem
                      key={category.id}
                      value={category.id}
                      className="focus:bg-slate-800 focus:text-white cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full gap-3">
                        <span className="flex items-center gap-2">
                          <category.icon className="w-3.5 h-3.5 text-brand-accent" />
                          <span>{category.name}</span>
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {category.count}
                        </span>
                      </div>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {(activeCategory !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="h-[54px] px-4 rounded-2xl border border-slate-700/60 bg-slate-900/40 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-brand-accent/40 transition-colors"
              >
                {lang("Reset", "Reset")}
              </button>
            )}
          </div>
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
                    minHeight: `${projectCardMinHeight}px`,
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
                    {project.image || (project.images && project.images[0]) ? (() => {
                      const imagePath = project.image ?? project.images?.[0] ?? '';
                      const optimized = getOptimizedImage(imagePath);

                      return (
                        <picture>
                          {optimized ? (
                            <source
                              type="image/webp"
                              srcSet={optimized.srcset}
                              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                          ) : null}
                          <img
                            src={optimized?.webp ?? imagePath}
                            alt={`${project.title} - aperçu principal`}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </picture>
                      );
                    })() : (
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
                          onClick={() => {
                            window.open(project.url, "_blank");
                            trackEvent("project-external-link", { id: project.id, title: project.title });
                          }}
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
          <div className="text-center py-12 mb-10">
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
          <div className="flex justify-center items-center gap-1 sm:gap-2 mb-8 sm:mb-10">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-4"
            style={{ backgroundColor: colors.primary + '15' }}
          >
            <Sparkles className="w-5 h-5" style={{ color: colors.primary }} />
            <span style={{ color: colors.text }}>{filteredProjects.length} {lang("projets disponibles", "projects available")}</span>
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>
            {lang("Prêt à", "Ready to")} <span style={{ color: colors.primary }}>{lang("collaborer", "collaborate")}</span> ?
          </h3>
          <Button
            size="lg"
            className="px-8 py-4 text-base font-semibold text-white"
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
                  <ProjectDescription description={selectedProject.description} />
                </div>

                {/* Media Gallery */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                      {lang("Galerie projet", "Project gallery")}
                    </h4>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedProject.images.map((image, index) => {
                        const optimized = getOptimizedImage(image);

                        return (
                          <div
                            key={index}
                            className="relative group rounded-2xl overflow-hidden aspect-video cursor-zoom-in bg-slate-800 border border-white/5"
                            onClick={() => setActiveImage(optimized?.webp ?? image)}
                          >
                            {failedImages.has(index) ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <Camera className="w-6 h-6 text-slate-600" />
                              </div>
                            ) : (
                              <>
                                <picture>
                                  {optimized ? (
                                    <source
                                      type="image/webp"
                                      srcSet={optimized.srcset}
                                      sizes="(max-width: 1024px) 50vw, 33vw"
                                    />
                                  ) : null}
                                  <img
                                    src={optimized?.webp ?? image}
                                    alt={`${selectedProject.title} - ${lang("Image de la galerie", "Gallery image")} ${index + 1}/${selectedProject.images.length}`}
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                                    onError={() => setFailedImages(prev => new Set([...prev, index]))}
                                  />
                                </picture>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Eye className="w-6 h-6 text-white" />
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
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
                      <Mail className="w-4 h-4 text-brand-accent" />
                      {lang("Discuter de ce projet", "Discuss this project")}
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
            loading="eager"
            decoding="async"
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg border border-white/5"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
