import React, { useState } from "react";
import { ExternalLink, Github, Eye, Code, Palette, Smartphone, Globe, Sparkles, ChevronLeft, ChevronRight, Lock, ArrowRight, Database, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: { impact: string; type: string };
  color: "primary" | "secondary" | "accent" | "warning";
  image?: string;
  images?: string[];
  url?: string;
  status?: string;
  locked?: boolean;
  featured?: boolean;
  offers?: {
    name: string;
    savings?: string;
    price?: string;
    features: string[];
  }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Système d'Automatisation SIAB",
    category: "Automatisation",
    description:
      "Informations confidentielles — pour en savoir plus, veuillez contacter la référence : Chef service Informatique, Mr EPIPHANE KOUTANGNI, +229 01 97 27 90 33.",
    tags: ["HTML", "Node.js", "SQL Server", "Automatisation", "CSS", "PHP"],
    metrics: { impact: "-30% temps", type: "Productivité" },
    color: "primary",
    image: "/design/siab.png",
    locked: true,
    featured: true,
    images: [
      "/design/siab.png",
    ],
  },
  {
    id: 2,
    title: "Applications Internes INNOVTECH",
    category: "Full-Stack",
    description:
      "Plateforme complète pour la gestion interne des processus métier, avec tableaux de bord interactifs et automatisation des tâches répétitives.",
    tags: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    metrics: { impact: "+45% efficacité", type: "Entreprise" },
    color: "secondary",
    status: "Terminé",
    image: "/design/gestiloc.PNG",
    images: [
      "/design/gestiloc.PNG",
    ],
  },
  {
    id: 3,
    title: "Design Graphique DK",
    category: "Design",
    description:
      "Réalisation d'affiches, logos et supports visuels pour la communication digitale de diverses organisations.",
    tags: ["Figma", "Canva", "Branding", "Print"],
    metrics: { impact: "Multiple", type: "Créatif" },
    color: "warning",
    images: [
      "/design/DK (7).png",
      "/design/DK (6).png",
      "/design/DK (5).png",
      "/design/DK (4).png",
      "/design/DK (3).png",
      "/design/DK (2).png",
      "/design/A (11).jpeg",
      "/design/A (10).png",
      "/design/A (9).png",
      "/design/A (8).png",
      "/design/A (7).png",
      "/design/A (6).png",
      "/design/A (6).jpg",
      "/design/A (5).png",
      "/design/A (5).jpg",
      "/design/A (4).png",
      "/design/A (4).jpg",
      "/design/A (3).png",
      "/design/A (3).jpg",
      "/design/A (2).png",
      "/design/A (2).jpg",
      "/design/A (1).png",
      "/design/A (1).jpg",
      "/design/A (12).jpeg",
    ],
  },
  {
    id: 5,
    title: "Plateforme E-commerce Haute Performance",
    category: "Full-Stack",
    description:
      "Développement d'une plateforme e-commerce moderne avec paiement intégré et gestion d'inventaire en temps réel.",
    tags: ["Next.js", "Stripe", "MongoDB", "Vercel"],
    metrics: { impact: "+100k users", type: "Startup" },
    color: "primary",
    status: "En cours",
    images: [
      "/design/Luxe.PNG",
      "/design/Luxe1.PNG",
    ],
  },
  {
    id: 7,
    title: "Afrimemorie",
    category: "Web Design",
    description:
      "La mémoire de nos noms, la voix de nos peuples. Plateforme dédiée à la préservation et à la transmission de l'héritage culturel africain, reliant générations, traditions orales et patrimoine linguistique.",
    tags: ["React", "Node.js", "MongoDB"],
    metrics: { impact: "Conservation culturelle", type: "Société" },
    color: "accent",
    image: "/design/Afrimemorie.PNG",
    url: "https://afri-memory.netlify.app/",
  },
  {
    id: 8,
    title: "Toile d'Hiver",
    category: "Web Design",
    description:
      "Application web festive offrant une aventure personnalisée de Noël : entrez votre nom pour découvrir un voyage poétique à travers des scènes cinématiques, des jeux interactifs et des souhaits magiques.",
    tags: ["HTML", "CSS", "JavaScript"],
    metrics: { impact: "Expérience festive", type: "LOISIR" },
    color: "primary",
    image: "/design/AnimNoel.jpg",
    url: "https://merry-chritmas.netlify.app/",
  },
  {
    id: 9,
    title: "BitoLab Studio",
    category: "Design",
    description:
      "BitoLab – L'Exception Générative. Suite créative pilotée par l'IA (Gemini 2.5 & 3). Interface Nexus Intelligence, design Liquid Motion & Midnight Royal. Projet en interne, aperçu via images.",
    tags: ["IA", "Design", "Generative"],
    metrics: { impact: "R&D", type: "Innovation" },
    color: "warning",
    image: "/design/Bitolab.jpg",
    status: "En cours",
    images: [
      "/design/bitolab1.PNG",
      "/design/bitolab2.PNG",
      "/design/bitolab3.PNG",
      "/design/bitolab4.PNG",
      "/design/bitolab5.PNG",
      "/design/bitola6.PNG",
    ],
  },
  {
    id: 10,
    title: "UNO – Jeu de cartes",
    category: "Web Design",
    description:
      "Une version numérique du célèbre jeu de cartes UNO en 1v1 contre l'ordinateur. Expérience de jeu minimaliste et captivante.",
    tags: ["HTML", "CSS", "JavaScript"],
    metrics: { impact: "Divertissement", type: "Jeu" },
    color: "secondary",
    image: "/design/uno.JPG",
    url: "https://unog-ame.netlify.app/",
  },
  {
    id: 11,
    title: "Vigilance BJ",
    category: "Full-Stack",
    description:
      "Plateforme citoyenne pour signaler anonymement arnaques, harcèlement et hameçonnage au Bénin, avec suivi et interface moderne.",
    tags: ["TypeScript", "Supabase", "HTML", "CSS"],
    metrics: { impact: "Sécurité civique", type: "Civic Tech" },
    color: "primary",
    image: "/design/vigilancebj.jpg",
    url: "https://vigilance-bj.vercel.app/",
  },
  {
    id: 12,
    title: "Portefeuille InnovTech",
    category: "Web Design",
    description:
      "Vitrine numérique d'InnovTech SAS : développement web & mobile, UI/UX, conseil digital et maintenance IT. Basée à Cotonou, Bénin.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    metrics: { impact: "Agence", type: "Portefeuille" },
    color: "accent",
    image: "/design/Pinnovetech.PNG",
    url: "https://innovtechportefolio01.netlify.app/",
  },
  {
    id: 13,
    title: "Emotilist",
    category: "Web Design",
    description:
      "Application ToDoList interactive et festive : thèmes personnalisables, animations saisonnières, mini-lecteur audio intégré et persistance des données.",
    tags: ["JavaScript", "HTML", "CSS"],
    metrics: { impact: "Productivité ludique", type: "App" },
    color: "secondary",
    image: "/design/emotilist.PNG",
    url: "https://emotilist.netlify.app/",
  },
  {
    id: 14,
    title: "Communio",
    category: "Full-Stack",
    description:
      "Application web et mobile pour la communauté chrétienne : géolocalisation des paroisses, Bible interactive, gestion de communautés et partage d'intentions de prière.",
    tags: ["TypeScript", "React Native", "Node.js"],
    metrics: { impact: "Communauté", type: "Social" },
    color: "primary",
    image: "/design/communio.PNG",
    url: "https://communio-christian.netlify.app/",
    status: "En cours",
  },
  {
    id: 15,
    title: "CREACOM",
    category: "Web Design",
    description:
      "Portefolio professionnel CREACOM : vitrine digitale présentant les créations et services en communication visuelle, design graphique et développement web.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Design"],
    metrics: { impact: "Portefolio", type: "Professionnel" },
    color: "accent",
    image: "/design/CREACOM.PNG",
    url: "https://grace-branco-portfolio.netlify.app/",
  },
  {
    id: 16,
    title: "Savékari",
    category: "Web Design",
    description:
      "Fabriqués avec du pur beurre de karité béninois et des ingrédients naturels. Une tradition familiale au service de votre beauté.",
    tags: ["HTML", "CSS", "JavaScript", "E-commerce"],
    metrics: { impact: "Produits naturels", type: "E-commerce" },
    color: "primary",
    image: "/design/Savékari.PNG",
    url: "https://savekari.netlify.app/",
  },
];

const categories = [
  { id: "all", name: "Tous les projets", icon: Code },
  { id: "Full-Stack", name: "Full-Stack", icon: Globe },
  { id: "Mobile", name: "Mobile", icon: Smartphone },
  { id: "Design", name: "Design", icon: Palette },
  { id: "Automatisation", name: "Automatisation", icon: Sparkles },
  { id: "Data", name: "Data", icon: Database },
  { id: "Cloud", name: "Cloud", icon: Cloud },
];

const ITEMS_PER_PAGE = 9;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { colors, theme } = useTheme();

  const filteredProjects = projects.filter((project) => !project.locked);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // Reset page when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: colors.primary + '10', color: colors.primary }}>
            <Code className="w-4 h-4" />
            Projets Réalisés
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.text }}>
            Mes <span style={{ color: colors.primary }}>Réalisations</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            Découvrez mes projets les plus significatifs, de la conception à la mise en production, 
            en passant par toutes les étapes du développement.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                activeCategory === category.id
                  ? "text-white shadow-lg"
                  : ""
              )}
              style={{
                backgroundColor: activeCategory === category.id ? colors.primary : colors.surface,
                color: activeCategory === category.id ? '#ffffff' : colors.text
              }}
              onMouseEnter={(e) => { 
                if (activeCategory !== category.id) e.currentTarget.style.backgroundColor = colors.primary + '10'; 
              }}
              onMouseLeave={(e) => { 
                if (activeCategory !== category.id) e.currentTarget.style.backgroundColor = colors.surface; 
              }}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                {category.id === "all" 
                  ? filteredProjects.length 
                  : projects.filter(p => p.category === category.name).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {paginatedProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                {project.image || (project.images && project.images[0]) ? (
                  <img
                    src={project.image ?? project.images?.[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "flex";
                      target.style.alignItems = "center";
                      target.style.justifyContent = "center";
                      target.style.backgroundColor = colors.primary + '20';
                      target.innerHTML = `<svg class="w-8 h-8" style="color: ${colors.primary}">${getCategoryIcon(project.category)}</svg>`;
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    {getCategoryIcon(project.category)}
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 rounded-lg"
                    style={{ backgroundColor: colors.surface + '80', borderColor: colors.border }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '20'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.surface + '80'; }}
                    onClick={() => openProjectDialog(project)}
                  >
                    <Eye className="w-4 h-4" style={{ color: colors.text }} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 rounded-lg"
                    style={{ backgroundColor: colors.surface + '80', borderColor: colors.border }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '20'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.surface + '80'; }}
                    onClick={() => window.open(project.url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" style={{ color: colors.text }} />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3" style={{ backgroundColor: colors.primary + '10', color: colors.primary }}>
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>{project.title}</h3>

                {/* Description */}
                <p className="text-sm mb-4 line-clamp-3" style={{ color: colors.textSecondary }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                    <span className="font-medium">{project.metrics.impact}</span>
                    <span>({project.metrics.type})</span>
                  </div>
                  {project.status && (
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ backgroundColor: getProjectStatusColor(project.status) }}
                    >
                      {project.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-16">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{ borderColor: colors.border, color: colors.text }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '10'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10"
                  style={{
                    backgroundColor: currentPage === page ? colors.primary : colors.surface,
                    color: currentPage === page ? '#ffffff' : colors.text,
                    borderColor: colors.border
                  }}
                  onMouseEnter={(e) => { 
                    if (currentPage !== page) e.currentTarget.style.backgroundColor = colors.primary + '10'; 
                  }}
                  onMouseLeave={(e) => { 
                    if (currentPage !== page) e.currentTarget.style.backgroundColor = colors.surface; 
                  }}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              style={{ borderColor: colors.border, color: colors.text }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '10'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6" style={{ backgroundColor: colors.primary + '10' }}>
            <Sparkles className="w-5 h-5" style={{ color: colors.primary }} />
            <span style={{ color: colors.text }}>Tous mes projets sont disponibles</span>
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
            Prêt à <span style={{ color: colors.primary }}>collaborer</span> ?
          </h3>
          <p className="mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            Chaque projet est une opportunité d'apprentissage et d'innovation. 
            Je suis ouvert aux collaborations et aux défis techniques stimulants.
          </p>
          <Button
            size="lg"
            className="px-12 py-6 text-lg font-semibold text-white"
            style={{ backgroundColor: colors.primary }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Discutons de votre projet
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedProject && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: colors.surface, color: colors.text }}>
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-2xl font-bold" style={{ color: colors.text }}>
                {selectedProject.title}
              </DialogTitle>
              <DialogClose
                onClick={closeDialog}
                className="rounded-full h-8 w-8 flex items-center justify-center"
                style={{ backgroundColor: colors.border }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '20'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.border; }}
              >
                <span className="text-xl" style={{ color: colors.text }}>×</span>
              </DialogClose>
            </div>
            <DialogDescription style={{ color: colors.textSecondary }}>
              {selectedProject.description}
            </DialogDescription>
            
            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Catégorie</h4>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(selectedProject.category)}
                  <span style={{ color: colors.text }}>{selectedProject.category}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Résultats</h4>
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.textSecondary }}>
                    Impact: <strong style={{ color: colors.text }}>{selectedProject.metrics.impact}</strong>
                  </span>
                  <span style={{ color: colors.textSecondary }}>
                    Type: <strong style={{ color: colors.text }}>{selectedProject.metrics.type}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                {selectedProject.url && (
                  <Button
                    onClick={() => window.open(selectedProject.url, "_blank")}
                    className="flex-1"
                    style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir le projet
                  </Button>
                )}
                <Button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex-1"
                  variant="outline"
                  style={{ borderColor: colors.border, color: colors.text }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary + '10'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  Contacter pour ce projet
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

// Helper functions
function getCategoryIcon(category: string) {
  switch (category) {
    case "Full-Stack":
      return <Code className="w-8 h-8" />;
    case "Automatisation":
      return <Globe className="w-8 h-8" />;
    case "Web Design":
      return <Smartphone className="w-8 h-8" />;
    case "Design":
      return <Palette className="w-8 h-8" />;
    case "Mobile":
      return <Smartphone className="w-8 h-8" />;
    case "Data":
      return <Database className="w-8 h-8" />;
    case "Cloud":
      return <Cloud className="w-8 h-8" />;
    default:
      return <Code className="w-8 h-8" />;
  }
}

function getProjectStatusColor(status: string) {
  const colors: Record<string, string> = {
    "En cours": "rgba(34, 197, 94, 0.2)",
    "Terminé": "rgba(59, 130, 246, 0.2)",
    "En pause": "rgba(251, 146, 60, 0.2)"
  };
  return colors[status] || "rgba(156, 163, 175, 0.2)";
}
