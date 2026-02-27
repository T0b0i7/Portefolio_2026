import React, { useState, useEffect, useRef } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const ITEMS_PER_PAGE = 6;
  const { colors, theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter((service) => service.category === activeCategory);

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Trigger initial animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-animate-id');
            if (elementId) {
              setTimeout(() => {
                setVisibleElements((prev) => new Set([...prev, elementId]));
              }, 100);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Use component-scoped query for IntersectionObserver
    const container = sectionRef.current;
    const elements = container ? container.querySelectorAll('[data-animate-id]') : [];
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [paginatedServices, activeCategory]);

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
    <section id="services" className="py-20" style={{ backgroundColor: colors.background }} ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: '100ms' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: colors.primary + '10', color: colors.primary }}>
            <Zap className="w-4 h-4" />
            <span className="typewriter">Services Développeur</span>
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
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {expertise.map((exp, index) => (
            <div
              key={exp.title}
              data-animate-id={`expertise-${index}`}
              className={`expertise-card flex items-center gap-6 p-6 rounded-xl border transition-all duration-500 ${
                visibleElements.has(`expertise-${index}`) ? 'visible' : ''
              }`}
              style={{ 
                backgroundColor: colors.surface, 
                borderColor: colors.border,
                transitionDelay: `${200 + index * 150}ms`
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; }}
            >
              {/* Card à gauche - Contenu texte */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary + '10' }}>
                    <exp.icon className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: colors.text }}>{exp.title}</h3>
                </div>
                <ul className="space-y-2">
                  {exp.items.slice(0, 4).map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary + '40' }} />
                      {item}
                    </li>
                  ))}
                  {exp.items.length > 4 && (
                    <li className="text-sm" style={{ color: colors.primary }}>
                      +{exp.items.length - 4} autres...
                    </li>
                  )}
                </ul>
              </div>

              {/* SVG à droite - Animation dynamique */}
              <div className="flex-shrink-0 relative">
                <svg 
                  width="120" 
                  height="120" 
                  viewBox="0 0 120 120" 
                  className="expertise-svg"
                  style={{ 
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {exp.title === "Développement Web" && (
                    <g>
                      {/* Animation de développement web */}
                      <rect x="15" y="25" width="90" height="70" rx="6" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.2"/>
                      <rect x="15" y="25" width="90" height="70" rx="6" fill="none" stroke={colors.primary} strokeWidth="2" className="web-browser">
                        <animate attributeName="width" values="0;90;90" dur="2s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="20" y="35" width="80" height="50" rx="4" fill={colors.primary + '15'}/>
                      <circle cx="30" cy="45" r="2" fill={colors.primary}>
                        <animate attributeName="cy" values="45;55;45" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                      <rect x="40" y="50" width="40" height="3" rx="1" fill={colors.primary} className="code-typing">
                        <animate attributeName="width" values="0;40;0" dur="3s" repeatCount="indefinite"/>
                      </rect>
                      <circle cx="85" cy="40" r="3" fill={colors.text}>
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <path d="M25 65 L35 65 M30 60 L40 65" stroke={colors.text} strokeWidth="1.5" fill="none" className="connection-pulse">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                      </path>
                    </g>
                  )}

                  {exp.title === "Développement Mobile" && (
                    <g>
                      {/* Animation de développement mobile */}
                      <rect x="25" y="20" width="70" height="80" rx="8" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.2"/>
                      <rect x="25" y="20" width="70" height="80" rx="8" fill={colors.primary + '15'} className="phone-frame">
                        <animate attributeName="height" values="0;80;80" dur="2s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="30" y="30" width="60" height="60" rx="4" fill={colors.surface} stroke={colors.primary} strokeWidth="1"/>
                      <circle cx="60" cy="50" r="8" fill="none" stroke={colors.primary} strokeWidth="2" className="app-loading">
                        <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <path d="M55 50 L65 50 M60 45 L60 55" stroke={colors.text} strokeWidth="2" className="mobile-signal">
                        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
                      </path>
                      <circle cx="35" cy="70" r="2" fill={colors.primary}>
                        <animate attributeName="r" values="2;3;2" dur="1s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  )}

                  {exp.title === "Design & UX" && (
                    <g>
                      {/* Animation de design UX */}
                      <rect x="20" y="30" width="80" height="60" rx="6" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.2"/>
                      <rect x="20" y="30" width="80" height="60" rx="6" fill={colors.primary + '15'} className="design-canvas">
                        <animate attributeName="width" values="0;80;80" dur="2.5s" repeatCount="indefinite"/>
                      </rect>
                      <circle cx="35" cy="45" r="6" fill="none" stroke={colors.primary} strokeWidth="2" className="ux-circle">
                        <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <path d="M35 45 Q50 35 65 45" stroke={colors.primary} strokeWidth="2" fill="none" className="design-path">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                      </path>
                      <rect x="50" y="55" width="15" height="15" rx="2" fill={colors.text} className="design-element">
                        <animate attributeName="y" values="55;45;55" dur="1.5s" repeatCount="indefinite"/>
                      </rect>
                      <circle cx="75" cy="40" r="3" fill={colors.primary}>
                        <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin="1s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  )}

                  {exp.title === "Base de Données" && (
                    <g>
                      {/* Animation de base de données améliorée */}
                      <ellipse cx="60" cy="50" rx="40" ry="20" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.2"/>
                      <ellipse cx="60" cy="50" rx="40" ry="20" fill={colors.primary + '15'} className="database-main">
                        <animate attributeName="ry" values="0;20;20" dur="2s" repeatCount="indefinite"/>
                      </ellipse>
                      <ellipse cx="60" cy="50" rx="35" ry="15" fill="none" stroke={colors.primary} strokeWidth="1.5" className="data-ring">
                        <animate attributeName="rx" values="35;40;35" dur="3s" repeatCount="indefinite"/>
                      </ellipse>
                      <circle cx="45" cy="45" r="4" fill={colors.text} className="data-node">
                        <animate attributeName="cy" values="45;35;55;45" dur="2.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="75" cy="55" r="4" fill={colors.text} className="data-node">
                        <animate attributeName="cy" values="55;65;45;55" dur="2.5s" begin="0.8s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="60" cy="50" r="6" fill={colors.primary} opacity="0.8"/>
                      <path d="M45 45 L75 55 M60 35 L60 65" stroke={colors.primary} strokeWidth="1" opacity="0.4" className="data-connections"/>
                    </g>
                  )}

                  {exp.title === "Cloud & DevOps" && (
                    <g>
                      {/* Animation de Cloud & DevOps améliorée */}
                      <ellipse cx="35" cy="35" rx="18" ry="10" fill={colors.primary + '20'} className="cloud-main">
                        <animate attributeName="cx" values="35;40;35" dur="3s" repeatCount="indefinite"/>
                      </ellipse>
                      <ellipse cx="75" cy="40" rx="15" ry="8" fill={colors.primary + '20'} className="cloud-secondary">
                        <animate attributeName="cx" values="75;70;75" dur="3s" begin="1s" repeatCount="indefinite"/>
                      </ellipse>
                      <ellipse cx="55" cy="30" rx="12" ry="6" fill={colors.primary + '20'} className="cloud-tertiary">
                        <animate attributeName="cx" values="55;60;55" dur="3s" begin="2s" repeatCount="indefinite"/>
                      </ellipse>
                      <rect x="25" y="55" width="70" height="35" rx="4" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.2"/>
                      <rect x="25" y="55" width="70" height="35" rx="4" fill={colors.primary + '10'} className="server-rack">
                        <animate attributeName="height" values="0;35;35" dur="2.5s" repeatCount="indefinite"/>
                      </rect>
                      <circle cx="35" cy="65" r="2" fill={colors.primary}>
                        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="50" cy="65" r="2" fill={colors.primary}>
                        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.3s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="65" cy="65" r="2" fill={colors.primary}>
                        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.6s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="80" cy="65" r="2" fill={colors.primary}>
                        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.9s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  )}

                  {exp.title === "Automatisation & IA" && (
                    <g>
                      {/* Animation d'IA et automatisation */}
                      <circle cx="60" cy="45" r="25" fill="none" stroke={colors.primary} strokeWidth="2" opacity="0.2"/>
                      <circle cx="60" cy="45" r="25" fill={colors.primary + '15'} className="ai-brain">
                        <animate attributeName="r" values="0;25;25" dur="2.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="60" cy="45" r="15" fill="none" stroke={colors.primary} strokeWidth="1.5" className="ai-core">
                        <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="60" cy="45" r="8" fill={colors.primary} opacity="0.9"/>
                      <path d="M45 30 Q35 20 25 30 M75 30 Q85 20 95 30" stroke={colors.primary} strokeWidth="1.5" fill="none" className="neural-path">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
                      </path>
                      <circle cx="45" cy="30" r="3" fill={colors.text} className="neural-node">
                        <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="75" cy="30" r="3" fill={colors.text} className="neural-node">
                        <animate attributeName="r" values="3;4;3" dur="1.5s" begin="0.7s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="25" cy="30" r="3" fill={colors.text} className="neural-node">
                        <animate attributeName="r" values="3;4;3" dur="1.5s" begin="1.4s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="95" cy="30" r="3" fill={colors.text} className="neural-node">
                        <animate attributeName="r" values="3;4;3" dur="1.5s" begin="2.1s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 fade-in-up ${
          visibleElements.has('category-filter') ? 'visible' : ''
        }`}
             data-animate-id="category-filter"
             style={{ transitionDelay: '600ms' }}>
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
              data-animate-id={`service-${index}`}
              className={`service-card rounded-xl p-8 border transition-all duration-300 relative overflow-hidden ${
                visibleElements.has(`service-${index}`) ? 'visible' : ''
              }`}
              style={{ 
                backgroundColor: colors.surface, 
                borderColor: colors.border,
                transitionDelay: `${800 + index * 150}ms`
              }}
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
        <div className={`text-center fade-in-up ${
          visibleElements.has('bottom-cta') ? 'visible' : ''
        }`}
             data-animate-id="bottom-cta"
             style={{ transitionDelay: '1200ms' }}>
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
