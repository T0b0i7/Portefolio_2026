import { useState } from "react";
import { ExternalLink, Github, Eye, Code, Palette, Smartphone, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "Système d'Automatisation SIAB",
    category: "Automatisation",
    description:
      "Développement d'outils internes d'automatisation pour la Société Industrielle d'Acier du Bénin, réduisant le temps de traitement de 30%.",
    tags: ["React", "Node.js", "PostgreSQL", "Automatisation"],
    metrics: { impact: "-30% temps", type: "Productivité" },
    color: "primary",
    featured: true,
  },
  {
    id: 2,
    title: "Applications Internes INNOVTECH",
    category: "Full-Stack",
    description:
      "Création d'interfaces et intégration de fonctionnalités pour les applications internes. Optimisation et automatisation des processus métiers.",
    tags: ["React", "TypeScript", "Tailwind", "API REST"],
    metrics: { impact: "En cours", type: "Innovation" },
    color: "secondary",
    featured: true,
  },
  {
    id: 3,
    title: "Sites Web Vitrine",
    category: "Web Design",
    description:
      "Création de sites web modernes et responsifs pour particuliers et petites entreprises. Focus sur l'expérience utilisateur et la performance.",
    tags: ["HTML/CSS", "JavaScript", "Figma", "SEO"],
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
  },
];

const categories = ["Tous", "Full-Stack", "Automatisation", "Web Design", "Design"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground glow-cyan"
                  : "glass text-muted-foreground hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProject === project.id;

            return (
              <div
                key={project.id}
                className={cn(
                  "group relative glass rounded-2xl overflow-hidden transition-all duration-500 card-hover",
                  project.featured && "md:col-span-2",
                  isHovered && "z-10"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Visual */}
                <div
                  className={cn(
                    "h-48 md:h-64 bg-gradient-to-br relative overflow-hidden",
                    project.color === "primary" && "from-primary/20 to-accent/20",
                    project.color === "secondary" && "from-secondary/20 to-warning/20",
                    project.color === "accent" && "from-accent/20 to-primary/20",
                    project.color === "warning" && "from-warning/20 to-secondary/20"
                  )}
                >
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  <div
                    className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl transition-all duration-500",
                      project.color === "primary" && "bg-primary/30",
                      project.color === "secondary" && "bg-secondary/30",
                      project.color === "accent" && "bg-accent/30",
                      project.color === "warning" && "bg-warning/30",
                      isHovered && "scale-150"
                    )}
                  />

                  {/* Category Icon */}
                  <div className="absolute top-6 left-6 p-4 glass rounded-xl">
                    {project.category === "Full-Stack" && <Code className="w-8 h-8 text-primary" />}
                    {project.category === "Automatisation" && <Globe className="w-8 h-8 text-secondary" />}
                    {project.category === "Web Design" && <Smartphone className="w-8 h-8 text-accent" />}
                    {project.category === "Design" && <Palette className="w-8 h-8 text-warning" />}
                  </div>

                  {/* Metrics Badge */}
                  <div className="absolute top-6 right-6 px-4 py-2 glass rounded-full">
                    <span className="text-sm font-medium">{project.metrics.impact}</span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute bottom-6 left-6 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full">
                      <span className="text-sm font-medium text-primary">Projet phare</span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        project.color === "primary" && "bg-primary/20 text-primary",
                        project.color === "secondary" && "bg-secondary/20 text-secondary",
                        project.color === "accent" && "bg-accent/20 text-accent",
                        project.color === "warning" && "bg-warning/20 text-warning"
                      )}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.metrics.type}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-display font-bold mb-3">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Voir le projet
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
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
    </section>
  );
}
