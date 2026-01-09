import { useState } from "react";
import { ExternalLink, Github, Eye, Code, Palette, Smartphone, Globe, Sparkles, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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
    images: [
      "/design/siab.png",
    ],
  },
  {
    id: 2,
    title: "Applications Internes INNOVTECH",
    category: "Full-Stack",
    description:
      "GestiLoc est un logiciel de gestion locative immobilière en ligne, gratuit et conçu pour les propriétaires au Bénin. Il automatise de nombreuses tâches, comme la création de contrats et de quittances, facilitant ainsi la gestion de vos biens immobiliers.",
    tags: ["React", "TypeScript", "Tailwind", "API REST"],
    metrics: { impact: "En cours", type: "Innovation" },
    color: "secondary",
    image: "/design/gestiloc.PNG",
  },
  {
    id: 3,
    title: "Sites Web Vitrine & Applications Design",
    category: "Web Design",
    description:
      "Design assisté par l'IA (+50% de gain de temps).",
    tags: ["HTML/CSS", "JavaScript", "Figma", "SEO", "IA"],
    images: [
      "/design/F1.PNG",
      "/design/f2.png",
      "/design/F3.PNG",
      "/design/Uzima1.PNG",
      "/design/Uzima2.PNG",
      "/design/Uzima3.PNG",
    ],
    metrics: { impact: "+5 clients", type: "Freelance" },
    color: "accent",
  },
  {
    id: 4,
    title: "Supports Visuels & Communication",
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
      "/design/DK (1).png",
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
      "/design/A (1).png",
      "/design/A (2).jpg",
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
    id: 6,
    title: "Pipeline d'Automatisation CI/CD",
    category: "Automatisation",
    description:
      "Mise en place de workflows d'intégration continue automatisés réduisant les déploiements manuels de 95%.",
    tags: ["Docker", "GitHub Actions", "Kubernetes", "DevOps"],
    metrics: { impact: "-95% manuel", type: "Infrastructure" },
    color: "secondary",
    status: "En cours de développement",
    locked: true,
  },
  {
    id: 7,
    title: "Redesign UI/UX Application Mobile",
    category: "Web Design",
    description:
      "Refonte complète de l'interface utilisateur d'une application mobile augmentant l'engagement de 45%.",
    tags: ["Figma", "User Research", "Prototyping", "Accessibility"],
    metrics: { impact: "+45% engagement", type: "Product" },
    color: "accent",
    locked: true,
  },
  {
    id: 8,
    title: "Branding Complet Startup Tech",
    category: "Design",
    description:
      "Création identité visuelle complète : logo, palette couleur, typographie et guidelines de marque pour startup technologique.",
    tags: ["Branding", "Design System", "Identity", "Guidelines"],
    metrics: { impact: "Complet", type: "Branding" },
    color: "warning",
    locked: true,
  },
  {
    id: 9,
    title: "Dashboard Analytics Real-time",
    category: "Full-Stack",
    description:
      "Tableau de bord d'analyse en temps réel avec visualisations interactives et export de données pour 500+ entreprises.",
    tags: ["React", "D3.js", "WebSocket", "PostgreSQL"],
    metrics: { impact: "500+ orgs", type: "SaaS" },
    color: "primary",
    locked: true,
  },
  {
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
    id: 16,
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
    id: 17,
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
    id: 18,
    title: "christmas-tree-3d",
    category: "Full-Stack",
    description:
      "Petit projet créé pour célébrer Noël. À l'origine, je voulais simplement dessiner un sapin de Noël 3D, mais ça manquait de fun. J'y ai donc ajouté la reconnaissance gestuelle et des effets de particules. Grâce à la caméra, on contrôle l'arbre à distance et on peut y accrocher ses photos préférées. Quelques centaines de lignes de code, mais un rendu visuel spectaculaire, surtout sur grand écran.",
    tags: ["React", "WebXR", "IA", "Design"],
    metrics: { impact: "Animation CSS JS", type: "Innovation" },
    color: "accent",
    url: "https://christmas-tree-3d.netlify.app/",
    images: [
      "/design/MC1.PNG",
      "/design/MC2.PNG",
    ],
    offers: [
      {
        name: "Startup Essential",
        savings: "Économie : 450K (-16%)",
        price: "2 250 000 FCFA",
        features: [
          "Identité visuelle complète",
          "Site web vitrine premium (5 pages)",
          "UI/UX design sur mesure",
          "6 mois maintenance Pro"
        ]
      },
      {
        name: "Scale-Up Pro",
        savings: "Économie : 1.2M (-20%)",
        price: "4 800 000 FCFA",
        features: [
          "Audit stratégique complet",
          "Application web SaaS",
          "Système d'automatisation",
          "Gestion de projet 3 mois",
          "12 mois maintenance Enterprise"
        ]
      },
      {
        name: "Services complémentaires",
        features: [
          "Prompt Engineering",
          "Design graphique professionnel",
          "Formations IA",
          "Maintenance & Support",
          "Conseil informatique"
        ]
      }
    ],
  },
];

const categories = ["Tous", "Full-Stack", "Automatisation", "Web Design", "Design"];
const ITEMS_PER_PAGE = 9; // 3x3 grid

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[] | null>(null);
  const [modalIndex, setModalIndex] = useState(0);

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Projets <span className="gradient-text">Réalisés</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une sélection de mes réalisations démontrant mon expertise en développement
            full-stack et design.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 backdrop-blur-sm">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "relative px-6 py-3 font-medium transition-all duration-300 overflow-hidden rounded-full group",
                activeCategory === category
                  ? "bg-gradient-to-r from-primary to-accent text-foreground glow-cyan shadow-lg"
                  : "glass text-muted-foreground hover:text-foreground hover:bg-card/80"
              )}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 blur-xl -z-10 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Packs Pré-configurés */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold">Packs Pré-configurés</h3>
          <p className="text-sm text-muted-foreground">Solutions complètes à prix avantageux</p>
        </div>

        {/* Projects Grid - 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]">
          {paginatedProjects.map((project, index) => {
            const isHovered = hoveredProject === project.id;

            return (
              <div
                key={project.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl transition-all duration-500",
                  "border border-border/30 hover:border-primary/50",
                  isHovered && "z-10",
                  project.locked && "cursor-not-allowed opacity-75 hover:opacity-85"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => {
                  if (project.locked) return;
                  
                  if (project.url) {
                    try {
                      window.open(project.url, "_blank", "noopener,noreferrer");
                    } catch (e) {
                      // fallback
                      window.location.href = project.url;
                    }
                    return;
                  }

                  // Open modal gallery if images exist
                  const imgs = project.images ? project.images : project.image ? [project.image] : null;
                  if (imgs && imgs.length > 0) {
                    setModalImages(imgs);
                    setModalIndex(0);
                    setModalOpen(true);
                  }
                }}
              >
                {/* Gradient Background - Dynamic per project */}
                <div className="absolute inset-0 -z-10">
                  <div
                    className={cn(
                      "absolute inset-0 transition-all duration-500",
                      project.color === "primary" && "bg-gradient-to-br from-primary/10 via-background to-accent/10",
                      project.color === "secondary" && "bg-gradient-to-br from-secondary/10 via-background to-warning/10",
                      project.color === "accent" && "bg-gradient-to-br from-accent/10 via-background to-primary/10",
                      project.color === "warning" && "bg-gradient-to-br from-warning/10 via-background to-secondary/10"
                    )}
                  />
                  {/* Animated gradient overlay on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      project.color === "primary" && "bg-gradient-to-br from-primary/20 to-accent/20",
                      project.color === "secondary" && "bg-gradient-to-br from-secondary/20 to-warning/20",
                      project.color === "accent" && "bg-gradient-to-br from-accent/20 to-primary/20",
                      project.color === "warning" && "bg-gradient-to-br from-warning/20 to-secondary/20"
                    )}
                  />
                </div>

                {/* Frosted Glass Overlay */}
                <div className="absolute inset-0 backdrop-blur-xl opacity-30 -z-10" />

                {/* Glow effect on hover */}
                <div
                  className={cn(
                    "absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10",
                    project.color === "primary" && "bg-primary",
                    project.color === "secondary" && "bg-secondary",
                    project.color === "accent" && "bg-accent",
                    project.color === "warning" && "bg-warning"
                  )}
                />

                {/* Hover prompt for clickable image cards or locked message (non-blocking) */}
                <div className="absolute inset-0 pointer-events-none">
                  {project.locked ? (
                    project.id === 1 ? (
                      /* Discret badge top-right for SIAB so description stays visible */
                      <div className="absolute top-3 right-3 pointer-events-auto transform transition-transform hover:scale-105">
                        <div className="w-44 max-w-xs bg-gradient-to-br from-primary/8 to-accent/8 border border-primary/20 backdrop-blur-md text-primary px-3 py-2 rounded-lg text-sm font-medium flex flex-col gap-1 shadow">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            <span className="font-semibold">Accès restreint</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">Contactez la référence pour plus d'infos</p>
                          <a href="tel:+229019727903" className="text-xs text-primary underline">Mr EPIPHANE KOUTANGI — +229 01 97 27 90 33</a>
                        </div>
                      </div>
                    ) : (
                      /* Small centered badge for other locked projects (non-interactive) */
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="opacity-90 bg-background/80 text-primary px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm border border-primary/30">
                          <Lock className="w-4 h-4" />
                          Pas encore disponible
                        </div>
                      </div>
                    )
                  ) : ((project.image) || (project.images && project.images.length > 0)) ? (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/70 text-foreground px-4 py-2 rounded-full text-sm font-medium">
                      Ouvre‑moi — Clique pour voir
                    </div>
                  ) : null}
                </div>

                {/* Project Visual Section */}
                <div
                  className={cn(
                    "relative h-32 overflow-hidden bg-gradient-to-br",
                    project.color === "primary" && "from-primary/5 to-accent/5",
                    project.color === "secondary" && "from-secondary/5 to-warning/5",
                    project.color === "accent" && "from-accent/5 to-primary/5",
                    project.color === "warning" && "from-warning/5 to-secondary/5"
                  )}
                >
                  {/* If project has image(s), show main image */}
                  {project.image || (project.images && project.images[0]) ? (
                    <img
                      src={project.image ?? project.images?.[0]}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  ) : null}
                  {/* Animated Grid Pattern */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Decorative Blob */}
                  <div
                    className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-3xl transition-all duration-500",
                      project.color === "primary" && "bg-primary/20",
                      project.color === "secondary" && "bg-secondary/20",
                      project.color === "accent" && "bg-accent/20",
                      project.color === "warning" && "bg-warning/20",
                      isHovered && "scale-125 blur-2xl"
                    )}
                  />

                  {/* Category Icon - Larger & More Prominent */}
                  <div
                    className={cn(
                      "absolute top-5 left-5 p-3 rounded-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                      project.color === "primary" && "bg-primary/20 border border-primary/30",
                      project.color === "secondary" && "bg-secondary/20 border border-secondary/30",
                      project.color === "accent" && "bg-accent/20 border border-accent/30",
                      project.color === "warning" && "bg-warning/20 border border-warning/30"
                    )}
                  >
                    {project.category === "Full-Stack" && <Code className="w-7 h-7 text-primary" />}
                    {project.category === "Automatisation" && <Globe className="w-7 h-7 text-secondary" />}
                    {project.category === "Web Design" && <Smartphone className="w-7 h-7 text-accent" />}
                    {project.category === "Design" && <Palette className="w-7 h-7 text-warning" />}
                  </div>

                  {/* Impact Badge - Enhanced */}
                  <div
                    className={cn(
                      "absolute top-5 right-5 px-4 py-2 rounded-full backdrop-blur-md text-sm font-semibold transition-all duration-300 group-hover:scale-110",
                      project.color === "primary" && "bg-primary/20 text-primary border border-primary/30",
                      project.color === "secondary" && "bg-secondary/20 text-secondary border border-secondary/30",
                      project.color === "accent" && "bg-accent/20 text-accent border border-accent/30",
                      project.color === "warning" && "bg-warning/20 text-warning border border-warning/30"
                    )}
                  >
                    {project.metrics.impact}
                  </div>

                  {/* Shine effect on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      "bg-gradient-to-r from-transparent via-white/10 to-transparent",
                      "translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                    )}
                  />
                </div>

                {/* Project Info Section */}
                <div className="p-4 flex flex-col h-full bg-gradient-to-b from-card/50 to-background/80">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                        project.color === "primary" && "bg-primary/20 text-primary border border-primary/30",
                        project.color === "secondary" && "bg-secondary/20 text-secondary border border-secondary/30",
                        project.color === "accent" && "bg-accent/20 text-accent border border-accent/30",
                        project.color === "warning" && "bg-warning/20 text-warning border border-warning/30"
                      )}
                    >
                      {project.category}
                    </span>
                    {project.status && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground bg-card/60 border border-border/20">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-display font-bold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={cn(
                      "text-xs text-muted-foreground mb-2 flex-grow leading-relaxed",
                      project.id === 1 ? "text-sm" : "line-clamp-1"
                    )}
                  >
                    {project.description}
                  </p>

                  {/* Thumbnails for design galleries */}
                  {project.images && Array.isArray(project.images) && (
                    <div className="flex items-center gap-2 mb-2">
                      {project.images.slice(0, 4).map((src: string, i: number) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${project.title} ${i + 1}`}
                          className="w-14 h-10 object-cover rounded-md border border-border/20"
                        />
                      ))}
                    </div>
                  )}

                  {/* Tags with enhanced styling */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded text-xs font-medium bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-muted/40 text-muted-foreground">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {project.locked ? (
                    <div className="flex items-center justify-center mt-auto pt-2 border-t border-border/50 w-full">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        <span>Verrouillé</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-border/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.url) {
                            try {
                              window.open(project.url, "_blank", "noopener,noreferrer");
                            } catch (err) {
                              window.location.href = project.url;
                            }
                            return;
                          }

                          const imgs = project.images ? project.images : project.image ? [project.image] : null;
                          if (imgs && imgs.length > 0) {
                            setModalImages(imgs);
                            setModalIndex(0);
                            setModalOpen(true);
                          }
                        }}
                        className={cn(
                          "flex-1 h-8 rounded text-xs transition-all duration-300 font-medium",
                          "hover:scale-105",
                          project.color === "primary" && "hover:bg-primary/20 hover:text-primary",
                          project.color === "secondary" && "hover:bg-secondary/20 hover:text-secondary",
                          project.color === "accent" && "hover:bg-accent/20 hover:text-accent",
                          project.color === "warning" && "hover:bg-warning/20 hover:text-warning"
                        )}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Voir
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "flex-1 h-8 rounded text-xs transition-all duration-300 font-medium",
                          "hover:scale-105",
                          project.color === "primary" && "hover:bg-primary/20 hover:text-primary",
                          project.color === "secondary" && "hover:bg-secondary/20 hover:text-secondary",
                          project.color === "accent" && "hover:bg-accent/20 hover:text-accent",
                          project.color === "warning" && "hover:bg-warning/20 hover:text-warning"
                        )}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls - Enhanced Design */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-6 mt-16">
            {/* Page Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 relative",
                    currentPage === page
                      ? "bg-gradient-to-r from-primary to-accent text-foreground glow-cyan scale-110 shadow-lg"
                      : "glass text-muted-foreground hover:bg-card/80 hover:text-foreground hover:scale-105"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Previous / Next Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={cn(
                  "gap-2 rounded-full px-6 transition-all duration-300",
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
                Précédent
              </Button>

              <div className="px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground">
                Page {currentPage} / {totalPages}
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={cn(
                  "gap-2 rounded-full px-6 transition-all duration-300",
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                )}
              >
                Suivant
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="text-center mt-8 text-muted-foreground text-sm opacity-70">
          Affichage {startIndex + 1} à {Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)} sur {filteredProjects.length} projets
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Intéressé par une collaboration ?
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Discutons de votre projet
          </Button>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <Dialog open={modalOpen} onOpenChange={(open) => setModalOpen(open)}>
        {modalImages && (
          <DialogContent className="max-w-4xl w-[90%]">
            <DialogTitle>{"Galerie — Supports Visuels & Communication"}</DialogTitle>
            <DialogDescription>Parcourez les visuels du projet.</DialogDescription>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full flex items-center justify-center">
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass"
                  onClick={() => setModalIndex((i) => (i - 1 + modalImages.length) % modalImages.length)}
                >
                  ‹
                </button>

                <img
                  src={modalImages[modalIndex]}
                  alt={`Galerie ${modalIndex + 1}`}
                  className="max-h-[60vh] object-contain rounded-md"
                />

                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass"
                  onClick={() => setModalIndex((i) => (i + 1) % modalImages.length)}
                >
                  ›
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto w-full py-2">
                {modalImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setModalIndex(i)}
                    className={cn(
                      "rounded-md overflow-hidden border border-border/20",
                      modalIndex === i && "ring-2 ring-primary"
                    )}
                  >
                    <img src={src} alt={`thumb ${i + 1}`} className="w-20 h-12 object-cover" />
                  </button>
                ))}
              </div>

              <div className="w-full flex justify-end">
                <DialogClose asChild>
                  <Button size="sm">Fermer</Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
