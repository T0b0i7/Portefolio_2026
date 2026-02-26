import React, { useState } from "react";
import {
  Code,
  Palette,
  Smartphone,
  Globe,
  Database,
  Zap,
  Shield,
  Rocket,
  Users,
  Target,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Bot,
  Cloud,
  Wrench,
  Monitor,
  Cpu,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: any;
  color: string;
  category: string;
}

const services: Service[] = [
  {
    category: "Développement Web",
    title: "Applications Web Complètes",
    description: "Création de sites web et applications web modernes, responsives et performants adaptées à vos besoins spécifiques.",
    features: [
      "Sites vitrines et portfolios",
      "Applications web sur mesure",
      "E-commerce et plateformes en ligne",
      "Tableaux de bord et interfaces admin",
      "API REST et GraphQL",
      "Optimisation SEO et performance",
      "Hébergement et déploiement",
    ],
    icon: Code,
    color: "text-blue-500",
  },
  {
    category: "Développement Mobile",
    title: "Applications Mobile iOS & Android",
    description: "Développement d'applications mobiles natives et multiplateformes pour atteindre vos utilisateurs sur tous les appareils.",
    features: [
      "Applications iOS natives (Swift/Objective-C)",
      "Applications Android natives (Kotlin/Java)",
      "Applications cross-platform (React Native/Flutter)",
      "Interface utilisateur intuitive et adaptative",
      "Intégration avec les APIs mobiles",
      "Publication sur App Store et Google Play",
      "Maintenance et mises à jour",
    ],
    icon: Smartphone,
    color: "text-green-500",
  },
  {
    category: "Design & UX",
    title: "Design UI/UX & Prototypage",
    description: "Création d'interfaces utilisateur magnifiques et expériences mémorables qui fidélisent vos utilisateurs.",
    features: [
      "Design d'interfaces utilisateur (UI)",
      "Expérience utilisateur (UX)",
      "Wireframes et maquettes interactives",
      "Prototypes animés et cliquables",
      "Design responsive et adaptatif",
      "Tests utilisateurs et itérations",
      "Charte graphique et identité visuelle",
      "Design system et guidelines",
    ],
    icon: Palette,
    color: "text-purple-500",
  },
  {
    category: "Base de Données",
    title: "Architecture & Gestion de Données",
    description: "Conception de bases de données robustes et évolutives pour gérer efficacement vos informations critiques.",
    features: [
      "Modélisation et conception de schémas",
      "Bases de données SQL et NoSQL",
      "Optimisation des requêtes et performances",
      "Migration et synchronisation de données",
      "Sauvegarde et récupération",
      "Sécurité des données et conformité",
      "API et gestion des accès",
    ],
    icon: Database,
    color: "text-orange-500",
  },
  {
    category: "Cloud & DevOps",
    title: "Solutions Cloud & Infrastructure",
    description: "Mise en place d'infrastructures cloud modernes et de pipelines CI/CD pour un déploiement continu et fiable.",
    features: [
      "Architecture cloud et microservices",
      "Hébergement sur AWS, Azure, Google Cloud",
      "Conteneurisation (Docker, Kubernetes)",
      "Intégration continue et déploiement (CI/CD)",
      "Monitoring et alertes en temps réel",
      "Sauvegarde et reprise après sinistre",
      "Sécurité et conformité RGPD",
    ],
    icon: Cloud,
    color: "text-cyan-500",
  },
  {
    category: "Automatisation & IA",
    title: "Automatisation & Intelligence Artificielle",
    description: "Intégration de l'intelligence artificielle et de l'automatisation pour optimiser vos processus métier.",
    features: [
      "Développement de chatbots et assistants IA",
      "Automatisation des workflows métier",
      "Machine Learning et analyse prédictive",
      "Traitement du langage naturel (NLP)",
      "Intégration d'APIs IA (OpenAI, Claude, etc.)",
      "Scripts Python et automatisation personnalisés",
      "Tableaux de bord intelligents et analytics",
    ],
    icon: Bot,
    color: "text-pink-500",
  },
  {
    category: "Maintenance & Support",
    title: "Maintenance & Support Technique",
    description: "Service de maintenance continue et de support technique pour garantir la performance et la fiabilité de vos applications.",
    features: [
      "Maintenance corrective et évolutive",
      "Surveillance 24/7 et monitoring",
      "Support technique et assistance utilisateur",
      "Mises à jour et patches de sécurité",
      "Optimisation des performances",
      "Documentation technique et formation",
      "Sauvegarde et plan de reprise",
    ],
    icon: Wrench,
    color: "text-yellow-500",
  },
];

const expertise = [
  {
    icon: Code,
    title: "Langages & Frameworks",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Django",
      "Flask",
    ],
  },
  {
    icon: Database,
    title: "Base de Données",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Redis",
      "Supabase",
      "Prisma",
      "MongoDB Atlas",
    ],
  },
  {
    icon: Palette,
    title: "Design & Outils",
    items: [
      "Figma",
      "Tailwind CSS",
      "Bootstrap",
      "Material-UI",
      "Adobe XD",
      "VS Code",
      "Git",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Vercel",
      "Netlify",
      "CI/CD",
    ],
  },
];

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const { colors, theme } = useTheme();

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter((service) => service.category === activeCategory);

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const categories = [
    { id: "all", name: "Tous les services", icon: Rocket },
    { id: "Développement Web", name: "Développement Web", icon: Code },
    { id: "Développement Mobile", name: "Développement Mobile", icon: Smartphone },
    { id: "Design & UX", name: "Design & UX", icon: Palette },
    { id: "Base de Données", name: "Base de Données", icon: Database },
    { id: "Cloud & DevOps", name: "Cloud & DevOps", icon: Cloud },
    { id: "Automatisation & IA", name: "Automatisation & IA", icon: Bot },
    { id: "Maintenance & Support", name: "Maintenance & Support", icon: Wrench },
  ];

  // Reset page when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <section id="services" className="py-20" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: colors.primary + '10', color: colors.primary }}>
            <Zap className="w-4 h-4" />
            Services Développeur
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Des Solutions <span style={{ color: colors.primary }}>Complètes</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            En tant que développeur full-stack, je vous accompagne dans tous vos projets digitaux, 
            de la conception à la mise en production, en passant par toutes les technologies nécessaires.
          </p>
        </div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((exp, index) => (
            <div
              key={exp.title}
              className="rounded-xl p-6 border transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                  <exp.icon className="w-6 h-6" style={{ color: colors.primary }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{exp.title}</h3>
              </div>
              <ul className="space-y-2">
                {exp.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary + '40' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
                  : "hover:bg-gray-100"
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
                  ? services.length 
                  : services.filter(s => s.category === category.name).length}
              </span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {paginatedServices.map((service, index) => (
            <div
              key={service.title}
              className="rounded-xl p-8 border transition-all duration-300 relative overflow-hidden"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; }}
            >
              {/* Service Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: colors.primary + '10' }}
                >
                  <service.icon className={cn("w-6 h-6", service.color)} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: colors.textSecondary }}>
                    {service.category}
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>{service.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 leading-relaxed" style={{ color: colors.textSecondary }}>
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2" style={{ color: colors.text }}>
                  <Target className="w-4 h-4" style={{ color: colors.primary }} />
                  Compétences clés
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary + '40' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
                <Button
                  size="lg"
                  className="w-full text-white font-medium"
                  style={{ backgroundColor: colors.primary }}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Discutons de votre projet
                </Button>
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
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6" style={{ backgroundColor: colors.primary + '10' }}>
            <TrendingUp className="w-5 h-5" style={{ color: colors.primary }} />
            <span style={{ color: colors.text }}>Prêt à concrétiser votre projet ?</span>
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
            De l'idée à la <span style={{ color: colors.primary }}>réalité</span>
          </h3>
          <p className="mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: colors.textSecondary }}>
            Chaque projet est unique. Je m'engage à vous livrer une solution de qualité, 
            adaptée à vos besoins spécifiques, dans le respect des délais et du budget.
          </p>
          <Button
            size="lg"
            className="px-12 py-6 text-lg font-semibold text-white"
            style={{ backgroundColor: colors.primary }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Démarrer votre projet
          </Button>
        </div>
      </div>
    </section>
  );
}
